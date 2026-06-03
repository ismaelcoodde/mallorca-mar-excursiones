import Reveal from './Reveal';

export default function Tarifas() {
  const planes = [
    {
      id: 1, nombre: "Medio Día", duracion: "4 Horas (Mañana o Tarde)", precio: "450€", destacado: false,
      incluye: ["Patrón Profesional", "Combustible (Ruta Base)", "Refrescos y Agua", "Equipos de Snorkel", "Seguro de Pasajeros"]
    },
    {
      id: 2, nombre: "Día Completo", duracion: "8 Horas (10:00 a 18:00)", precio: "750€", destacado: true,
      incluye: ["Todo lo del Medio Día", "Paddle Surf y Donut", "Scooter Submarino", "Aperitivo Mallorquín", "Flexibilidad de Ruta"]
    },
    {
      id: 3, nombre: "Sunset Charter", duracion: "2.5 Horas (Atardecer)", precio: "300€", destacado: false,
      incluye: ["Patrón Profesional", "Paseo por la Bahía", "Botella de Cava/Vino", "Snacks Ligeros", "Baño al Atardecer"]
    }
  ];

  return (
    <section className="py-24 bg-slate-900" id="tarifas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-wide">
              Nuestras Tarifas
            </h2>
            <p className="mt-4 text-xl text-slate-400 max-w-2xl mx-auto">
              Elige la experiencia que mejor se adapte a tu grupo. Precios transparentes, sin sorpresas de última hora.
            </p>
          </div>
        </Reveal>

        {/* Las 3 tarjetas escalonadas: izquierda, centro, derecha */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {planes.map((plan, index) => (
            <Reveal key={plan.id} delay={index * 120}>
              <div className={`rounded-2xl p-8 border transition-all duration-300 relative h-full ${
                plan.destacado
                  ? 'bg-slate-800 border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.15)] md:-translate-y-4'
                  : 'bg-slate-900 border-slate-700 hover:border-slate-500'
              }`}>
                {plan.destacado && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-500 text-slate-900 font-bold px-4 py-1 rounded-full text-sm">
                    Más Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-slate-100 mb-2">{plan.nombre}</h3>
                <p className="text-cyan-400 text-sm font-medium mb-6">{plan.duracion}</p>
                <div className="mb-6">
                  <span className="text-5xl font-extrabold text-white">{plan.precio}</span>
                  <span className="text-slate-400 ml-2">/ barco</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.incluye.map((item, i) => (
                    <li key={i} className="flex items-center text-slate-300">
                      <span className="text-cyan-500 mr-3">✓</span>{item}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 px-6 rounded-lg font-bold transition-all ${
                  plan.destacado
                    ? 'bg-cyan-500 hover:bg-cyan-600 text-slate-900'
                    : 'bg-slate-800 border border-cyan-500 hover:bg-cyan-500/10 text-cyan-500'
                }`}>
                  Reservar {plan.nombre}
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="text-center text-slate-500 mt-10 text-sm">
            * Capacidad máxima de 8 pasajeros. Contacta con nosotros para necesidades especiales o eventos personalizados.
          </p>
        </Reveal>

      </div>
    </section>
  );
}
