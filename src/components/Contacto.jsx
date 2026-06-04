import { useState } from 'react';
import Reveal from './Reveal';

export default function Contacto() {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <section className="py-24 bg-slate-800" id="contacto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-wide">
              Solicita tu Reserva
            </h2>
            <p className="mt-4 text-xl text-slate-400">
              Escríbenos para consultar disponibilidad o cualquier duda que tengas.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Formulario */}
          <Reveal direction="left">
            <div className="bg-slate-900 p-8 md:p-10 rounded-2xl border border-slate-700 shadow-2xl">
              {enviado ? (
                <div className="text-center py-10">
                  <div className="w-20 h-20 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-100 mb-2">¡Solicitud Enviada!</h3>
                  <p className="text-slate-400">Nos pondremos en contacto contigo lo antes posible.</p>
                  <button onClick={() => setEnviado(false)} className="mt-8 text-cyan-400 hover:text-cyan-300 underline">
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-medium text-slate-300 mb-2">Nombre completo</label>
                      <input type="text" id="nombre" required className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all" placeholder="Ej: Carlos Martínez" />
                    </div>
                    <div>
                      <label htmlFor="telefono" className="block text-sm font-medium text-slate-300 mb-2">Teléfono</label>
                      <input type="tel" id="telefono" required className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all" placeholder="Ej: +34 600 000 000" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Correo electrónico</label>
                      <input type="email" id="email" required className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all" placeholder="tu@email.com" />
                    </div>
                    <div>
                      <label htmlFor="fecha" className="block text-sm font-medium text-slate-300 mb-2">Fecha deseada</label>
                      <input type="date" id="fecha" className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all" style={{ colorScheme: 'dark' }} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="mensaje" className="block text-sm font-medium text-slate-300 mb-2">¿Qué experiencia buscas?</label>
                    <textarea id="mensaje" rows="4" required className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all" placeholder="Cuéntanos cuántos sois, qué tarifa te interesa..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-4 rounded-lg transition-all duration-300 text-lg shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                    Enviar Solicitud
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* Mapa + info */}
          <Reveal direction="right" delay={150}>
            <div className="space-y-4">

              {/* Mapa de Google Maps */}
              <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                <iframe
                  title="Ubicación Mallorca Mar Excursiones"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3074.8!2d2.6089!3d39.5518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1297f15e3b3b3b3b%3A0x0!2sAvinguda+de+Joan+Mir%C3%B3%2C+327%2C+07015+Palma%2C+Illes+Balears!5e0!3m2!1ses!2ses!4v1620000000000!5m2!1ses!2ses"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Info de ubicación */}
              <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-xl">📍</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-100">Punto de salida</p>
                    <p className="text-slate-400 text-sm mt-0.5">Avinguda de Joan Miró, 327<br />07015 Sant Agustí, Palma de Mallorca</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-xl">🕐</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-100">Presentarse 15 min antes</p>
                    <p className="text-slate-400 text-sm mt-0.5">Para el briefing de seguridad y embarque con calma</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-xl">🚗</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-100">Aparcamiento disponible</p>
                    <p className="text-slate-400 text-sm mt-0.5">Zona de aparcamiento cerca del punto de salida</p>
                  </div>
                </div>

                {/* Botón abrir en Google Maps */}
                <a
                  href="https://maps.google.com/?q=Avinguda+de+Joan+Miró,+327,+07015+Palma,+Mallorca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-cyan-500/10 border border-slate-600 hover:border-cyan-500 text-slate-300 hover:text-cyan-400 font-medium py-3 rounded-xl transition-all duration-300 mt-2"
                >
                  <span>🗺️</span>
                  Abrir en Google Maps
                </a>
              </div>

            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
