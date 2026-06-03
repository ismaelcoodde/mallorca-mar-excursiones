"""
Servidor de reservas para Mallorca Mar Excursiones.
- Guarda las reservas en una base de datos SQLite (un archivo, sin instalar nada).
- Crea pagos con Stripe.
- Cuando un pago se completa, marca el día como ocupado (rojo en el calendario).

Cómo arrancarlo:
    pip install -r requirements.txt
    (rellena el archivo .env con tus claves de Stripe)
    python app.py
"""

import os
import sqlite3
from datetime import datetime

import stripe
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Carga las variables del archivo .env (claves de Stripe, etc.)
load_dotenv()

app = Flask(__name__)
CORS(app)  # permite que tu web (otro dominio/puerto) hable con este servidor

# --- Configuración de Stripe ---
stripe.api_key = os.environ.get("STRIPE_SECRET_KEY", "")
WEBHOOK_SECRET = os.environ.get("STRIPE_WEBHOOK_SECRET", "")
# A dónde volver tras pagar. En local tu web suele estar en localhost:5173 (Vite).
FRONTEND_URL = os.environ.get("FRONTEND_URL", "http://localhost:5173")

DB = "reservas.db"

# Las tarifas y su precio EN CÉNTIMOS (Stripe trabaja en céntimos).
# Definimos el precio aquí en el servidor para que nadie pueda cambiarlo desde el navegador.
TARIFAS = {
    "medio_dia":    {"nombre": "Medio Día - Mallorca Mar",     "precio_centimos": 45000},
    "dia_completo": {"nombre": "Día Completo - Mallorca Mar",  "precio_centimos": 75000},
    "sunset":       {"nombre": "Sunset Charter - Mallorca Mar", "precio_centimos": 30000},
}


# ---------------------------------------------------------------------------
# Base de datos
# ---------------------------------------------------------------------------
def init_db():
    """Crea la tabla de reservas si no existe."""
    con = sqlite3.connect(DB)
    con.execute("""
        CREATE TABLE IF NOT EXISTS reservas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fecha TEXT UNIQUE NOT NULL,        -- 'AAAA-MM-DD'. UNIQUE evita dos reservas el mismo día
            estado TEXT NOT NULL,              -- 'pendiente' (pagando) o 'confirmada' (pagado)
            tarifa TEXT,
            email TEXT,
            stripe_session_id TEXT,
            creado_en TEXT
        )
    """)
    con.commit()
    con.close()


def conexion():
    con = sqlite3.connect(DB)
    con.row_factory = sqlite3.Row
    return con


# ---------------------------------------------------------------------------
# Rutas de la API
# ---------------------------------------------------------------------------
@app.route("/api/dias-ocupados")
def dias_ocupados():
    """Devuelve la lista de días ocupados de un mes dado (?mes=AAAA-MM).
    Cuentan como ocupados tanto los pagos confirmados como los que están en proceso."""
    mes = request.args.get("mes", "")  # ej: '2026-06'
    con = conexion()
    filas = con.execute(
        "SELECT fecha FROM reservas WHERE fecha LIKE ? AND estado IN ('pendiente', 'confirmada')",
        (f"{mes}-%",),
    ).fetchall()
    con.close()
    return jsonify({"ocupados": [f["fecha"] for f in filas]})


@app.route("/api/crear-checkout", methods=["POST"])
def crear_checkout():
    """Crea una sesión de pago en Stripe para un día y una tarifa concretos."""
    datos = request.get_json(force=True)
    fecha = datos.get("fecha")
    tarifa_id = datos.get("tarifa")
    email = datos.get("email", "")

    # Validaciones básicas
    if not fecha or tarifa_id not in TARIFAS:
        return jsonify({"error": "Datos de reserva incorrectos."}), 400

    try:
        datetime.strptime(fecha, "%Y-%m-%d")  # comprobamos que la fecha tiene buen formato
    except ValueError:
        return jsonify({"error": "Fecha no válida."}), 400

    con = conexion()

    # ¿Ese día ya está cogido?
    existe = con.execute(
        "SELECT 1 FROM reservas WHERE fecha = ? AND estado IN ('pendiente', 'confirmada')",
        (fecha,),
    ).fetchone()
    if existe:
        con.close()
        return jsonify({"error": "Ese día ya no está disponible."}), 409

    tarifa = TARIFAS[tarifa_id]

    try:
        # Creamos la página de pago de Stripe (Stripe Checkout)
        session = stripe.checkout.Session.create(
            mode="payment",
            customer_email=email or None,
            line_items=[{
                "price_data": {
                    "currency": "eur",
                    "product_data": {"name": f"{tarifa['nombre']} — {fecha}"},
                    "unit_amount": tarifa["precio_centimos"],
                },
                "quantity": 1,
            }],
            # Guardamos la fecha y la tarifa para recuperarlas en el webhook
            metadata={"fecha": fecha, "tarifa": tarifa_id},
            success_url=f"{FRONTEND_URL}/reservar?pago=exito",
            cancel_url=f"{FRONTEND_URL}/reservar?pago=cancelado",
            expires_at=int(datetime.now().timestamp()) + 1800,  # caduca en 30 min
        )
    except Exception as e:
        con.close()
        return jsonify({"error": f"Error con Stripe: {e}"}), 500

    # Reservamos el día como 'pendiente' mientras el cliente paga.
    # Así nadie más puede cogerlo a la vez.
    con.execute(
        """INSERT INTO reservas (fecha, estado, tarifa, email, stripe_session_id, creado_en)
           VALUES (?, 'pendiente', ?, ?, ?, ?)""",
        (fecha, tarifa_id, email, session.id, datetime.now().isoformat()),
    )
    con.commit()
    con.close()

    return jsonify({"url": session.url})


@app.route("/api/webhook", methods=["POST"])
def webhook():
    """Stripe llama aquí automáticamente cuando un pago termina (o caduca).
    Aquí es donde confirmamos la reserva de verdad — nunca confiamos solo en el navegador."""
    payload = request.get_data()
    firma = request.headers.get("Stripe-Signature", "")

    try:
        evento = stripe.Webhook.construct_event(payload, firma, WEBHOOK_SECRET)
    except Exception:
        return "Firma no válida", 400

    tipo = evento["type"]
    objeto = evento["data"]["object"]

    con = conexion()

    if tipo == "checkout.session.completed":
        # El pago se completó: confirmamos la reserva (pasará a ROJO en el calendario)
        con.execute(
            "UPDATE reservas SET estado = 'confirmada' WHERE stripe_session_id = ?",
            (objeto["id"],),
        )
        con.commit()
        print(f"✅ Reserva confirmada para la sesión {objeto['id']}")

    elif tipo in ("checkout.session.expired",):
        # El cliente no pagó a tiempo: liberamos el día borrando la reserva pendiente
        con.execute(
            "DELETE FROM reservas WHERE stripe_session_id = ? AND estado = 'pendiente'",
            (objeto["id"],),
        )
        con.commit()
        print(f"⏳ Reserva liberada (pago caducado) {objeto['id']}")

    con.close()
    return jsonify({"recibido": True})


@app.route("/api/reservas")
def listar_reservas():
    """Lista simple de reservas confirmadas (útil para que tu hermano vea sus días reservados)."""
    con = conexion()
    filas = con.execute(
        "SELECT fecha, tarifa, email, estado FROM reservas WHERE estado = 'confirmada' ORDER BY fecha"
    ).fetchall()
    con.close()
    return jsonify([dict(f) for f in filas])


if __name__ == "__main__":
    init_db()
    print("Servidor de reservas en http://localhost:5000")
    app.run(port=5000, debug=True)
