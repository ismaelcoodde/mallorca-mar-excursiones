import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Calendario from './Calendario';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Las mismas tarifas que tienes en la sección de precios.
// El precio REAL se vuelve a comprobar en el backend (nunca te fíes solo del navegador).
const TARIFAS = [
  { id: 'medio_dia', nombre: 'Medio Día', detalle: '4 horas (mañana o tarde)', precio: 450 },
  { id: 'dia_completo', nombre: 'Día Completo', detalle: '8 horas (10:00 a 18:00)', precio: 750 },
  { id: 'sunset', nombre: 'Sunset Charter', detalle: '2.5 horas (atardecer)', precio: 300 },
];

// Convierte "2026-06-15" a "15 de junio de 2026"
function fechaBonita(texto) {
  if (!texto) return '';
  const [a, m, d] = texto.split('-').map(Number);
  const fecha = new Date(a, m - 1, d);
  return fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function Reservar() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [tarifaId, setTarifaId] = useState('dia_completo');
  const [email, setEmail] = useState('');
  const [procesando, setProcesando] = useState(false);
  const [errorPago, setErrorPago] = useState(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Cuando Stripe nos devuelve a la web añade ?pago=exito o ?pago=cancelado en la URL
  const resultadoPago = searchParams.get('pago');

  useEffect(() => {
    if (resultadoPago) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [resultadoPago]);

  const tarifa = TARIFAS.find((t) => t.id === tarifaId);

  // Llama al backend para crear la sesión de pago y nos manda a Stripe
  const irAPagar = async () => {
    setProcesando(true);
    setErrorPago(null);
    try {
      const res = await fetch(`${API_URL}/api/crear-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fecha: fechaSeleccionada, tarifa: tarifaId, email }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'No se pudo iniciar el pago');

      // Stripe nos da una URL: redirigimos al usuario a su página de pago segura
      window.location.href = data.url;
    } catch (e) {
      setErrorPago(e.message);
      setProcesando(false);
    }
  };

  // ---- PANTALLA DE PAGO COMPLETADO ----
  if (resultadoPago === 'exito') {
    return (
      <main className="min-h-screen pt-28 pb-24 px-4 flex items-center justify-center">
        <div className="max-w-lg w-full bg-slate-800 border border-slate-700 rounded-2xl p-10 text-center shadow-2xl">
          <div className="w-20 h-20 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-100 mb-3">¡Reserva confirmada!</h2>
          <p className="text-slate-400 mb-8">
            Hemos recibido tu pago. Te enviaremos un correo con todos los detalles. ¡Nos vemos a bordo!
          </p>
          <button
            onClick={() => navigate('/reservar')}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 px-8 rounded-lg transition-all"
          >
            Volver al calendario
          </button>
        </div>
      </main>
    );
  }

  // ---- PANTALLA NORMAL: CALENDARIO + PAGO ----
  return (
    <main className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Título */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-wide">
            Reserva tu día
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Elige un día libre en el calendario, selecciona tu tarifa y reserva al instante con pago seguro.
          </p>
        </div>

        {resultadoPago === 'cancelado' && (
          <div className="max-w-2xl mx-auto mb-8 bg-amber-500/10 border border-amber-500/40 text-amber-300 rounded-xl px-5 py-4 text-center text-sm">
            Has cancelado el pago. No te preocupes, no se ha cobrado nada. Puedes intentarlo de nuevo cuando quieras.
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Columna izquierda: el calendario */}
          <Calendario
            fechaSeleccionada={fechaSeleccionada}
            onSeleccionar={setFechaSeleccionada}
          />

          {/* Columna derecha: resumen y pago */}
          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 md:p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-100 mb-6">Tu reserva</h3>

            {/* Día elegido */}
            <div className="mb-6">
              <span className="block text-sm font-medium text-slate-400 mb-1">Día seleccionado</span>
              {fechaSeleccionada ? (
                <span className="text-2xl font-bold text-cyan-400 capitalize">{fechaBonita(fechaSeleccionada)}</span>
              ) : (
                <span className="text-slate-500 italic">Toca un día verde del calendario…</span>
              )}
            </div>

            {/* Selección de tarifa */}
            <div className="mb-6">
              <span className="block text-sm font-medium text-slate-400 mb-3">Elige tu tarifa</span>
              <div className="space-y-3">
                {TARIFAS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTarifaId(t.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex justify-between items-center ${
                      tarifaId === t.id
                        ? 'bg-cyan-500/10 border-cyan-500'
                        : 'bg-slate-900 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <span>
                      <span className="block font-bold text-slate-100">{t.nombre}</span>
                      <span className="block text-xs text-slate-400">{t.detalle}</span>
                    </span>
                    <span className="text-xl font-extrabold text-white">{t.precio}€</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Email para enviarle la confirmación */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">
                Tu correo (para la confirmación)
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mb-6 pt-4 border-t border-slate-700">
              <span className="text-slate-300">Total</span>
              <span className="text-2xl font-extrabold text-cyan-400">{tarifa.precio}€</span>
            </div>

            {errorPago && (
              <p className="mb-4 text-sm text-red-400 text-center">{errorPago}</p>
            )}

            {/* Botón de pago */}
            <button
              onClick={irAPagar}
              disabled={!fechaSeleccionada || !email || procesando}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-4 rounded-lg transition-all duration-300 text-lg shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {procesando ? 'Redirigiendo a pago…' : 'Pagar y reservar'}
            </button>

            <p className="text-center text-xs text-slate-500 mt-4">
              Pago seguro procesado por Stripe. El día quedará reservado solo si el pago se completa.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
