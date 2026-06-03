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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

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

        <Reveal delay={100}>
          <div className="bg-slate-900 p-8 md:p-10 rounded-2xl border border-slate-700 shadow-2xl">
            {enviado ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-100 mb-2">¡Solicitud Enviada!</h3>
                <p className="text-slate-400">Nos pondremos en contacto contigo lo antes posible para confirmar tu reserva.</p>
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

      </div>
    </section>
  );
}
