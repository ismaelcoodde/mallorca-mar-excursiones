import Reveal from './Reveal';

export default function Experiencias() {
  const listaExperiencias = [
    { id: 1, titulo: "Calas Escondidas", descripcion: "Descubre las calas más secretas de Mallorca. Aguas turquesas y arenas blancas accesibles solo por mar.", icono: "🏝️" },
    { id: 2, titulo: "Cuevas Vírgenes", descripcion: "Explora cuevas marinas cristalinas y rincones mágicos de la costa balear.", icono: "🌊" },
    { id: 3, titulo: "Deportes de Acción", descripcion: "Sube la adrenalina con nuestras sesiones de Wakesurf y el divertidísimo Donut acuático.", icono: "🏄‍♂️" },
    { id: 4, titulo: "Scooter Submarino", descripcion: "Deslízate bajo el agua como un pez con nuestro propulsor submarino de alto rendimiento.", icono: "🤿" },
    { id: 5, titulo: "Paddle Surf", descripcion: "Relájate y rema a tu propio ritmo disfrutando de la brisa y el paisaje mediterráneo.", icono: "🏄‍♀️" },
    { id: 6, titulo: "Catering a Bordo", descripcion: "No te preocupes por nada. Incluimos comida, snacks y refrescos bien fríos durante la travesía.", icono: "🥂" }
  ];

  return (
    <section className="py-24 bg-slate-900" id="experiencias">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* El título entra desde abajo */}
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-wide">
              Experiencias Inolvidables
            </h2>
            <p className="mt-4 text-xl text-slate-400 max-w-2xl mx-auto">
              Mucho más que un simple paseo en barco. Diseñamos aventuras a medida para que disfrutes de Mallorca al máximo.
            </p>
          </div>
        </Reveal>

        {/* Cada tarjeta entra escalonada: 0ms, 100ms, 200ms... */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listaExperiencias.map((exp, index) => (
            <Reveal key={exp.id} delay={index * 100}>
              <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20 h-full">
                <div className="text-4xl mb-4">{exp.icono}</div>
                <h3 className="text-2xl font-bold text-slate-100 mb-3">{exp.titulo}</h3>
                <p className="text-slate-400 leading-relaxed">{exp.descripcion}</p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
