import Reveal from './Reveal';

const stats = [
  { valor: '2017', label: 'Año de fundación' },
  { valor: '7+', label: 'Años de experiencia' },
  { valor: '1000+', label: 'Familias a bordo' },
  { valor: '5★', label: 'Valoración media' },
];

export default function SobreNosotros() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 pt-24 pb-20">

      {/* Hero con fondo parallax */}
      <section
        className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80')",
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-slate-900/70" />
        <Reveal>
          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-wide">
              Nuestra Historia
            </h1>
            <p className="mt-3 text-slate-300 text-lg">Nativos del mar. Apasionados de Mallorca.</p>
          </div>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-slate-800 border border-slate-700 rounded-2xl p-5 text-center shadow-xl">
                <span className="block text-3xl font-extrabold text-cyan-400">{s.valor}</span>
                <span className="block text-sm text-slate-400 mt-1">{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Historia + foto Daniel */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="flex flex-col lg:flex-row gap-12 items-center">

          {/* Foto Daniel */}
          <Reveal direction="left" className="lg:w-2/5 w-full">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                <img
                  src="/capitan.png"
                  alt="Daniel — Capitán de Mallorca Mar Excursiones"
                  className="w-full h-[450px] object-cover object-top"
                />
              </div>
              {/* Tarjeta flotante */}
              <div className="absolute -bottom-5 -right-4 bg-cyan-500 text-slate-900 rounded-xl px-5 py-3 shadow-xl">
                <span className="block font-extrabold text-lg">Capitán Daniel Cruz</span>
                <span className="block text-sm font-medium">Desde 2017 en el mar</span>
              </div>
            </div>
          </Reveal>

          {/* Texto */}
          <Reveal direction="right" delay={150} className="lg:w-3/5 w-full">
            <div className="space-y-6 pt-6 lg:pt-0">

              <div>
                <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
                  El mar es nuestra casa
                </h2>
                <p className="text-slate-300 leading-relaxed text-lg">
                  Somos nativos de Mallorca, criados entre calas, acantilados y cuevas escondidas. Desde niños exploramos cada rincón de esta costa mágica, no con mapas, sino con curiosidad, pasión y respeto por el mar.
                </p>
              </div>

              <p className="text-slate-400 leading-relaxed">
                Cada ruta que ofrecemos, cada cueva que visitamos, ha sido descubierta y vivida por nosotros. No seguimos un guion turístico: te llevamos a lugares que muy pocos conocen, porque los encontramos a lo largo de nuestra propia historia.
              </p>

              <div className="bg-slate-800 border-l-4 border-cyan-500 rounded-r-xl px-6 py-4">
                <p className="text-slate-300 leading-relaxed italic">
                  "Detrás del timón está el capitán Daniel, quien ha dedicado su vida al mar y ha convertido su experiencia en un viaje inolvidable para cada visitante."
                </p>
              </div>

              <p className="text-slate-400 leading-relaxed">
                Nuestras excursiones no son estándar: las adaptamos a tus gustos y ritmo, buscando siempre tu comodidad, seguridad y tranquilidad. Desde que nacimos como empresa en 2017, hemos compartido este pedacito de paraíso con miles de personas, acumulando reseñas y valoraciones que reflejan lo que somos: auténticos, exclusivos y apasionados.
              </p>

              <p className="text-xl font-bold text-cyan-400">
                Bienvenido a bordo. Aquí no solo ves la isla… la vives.
              </p>

            </div>
          </Reveal>

        </div>
      </section>

      {/* Valores */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <Reveal>
          <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-12">
            Lo que nos define
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icono: '🧭', titulo: 'Autenticidad', texto: 'Cada ruta es real, vivida y descubierta por nosotros. Sin guiones turísticos.' },
            { icono: '🛟', titulo: 'Seguridad', texto: 'Tu tranquilidad es lo primero. Embarcación homologada y capitán profesional.' },
            { icono: '✨', titulo: 'Exclusividad', texto: 'Grupos privados, rutas personalizadas y atención dedicada al 100%.' },
          ].map((v, i) => (
            <Reveal key={v.titulo} delay={i * 120}>
              <div className="bg-slate-800 border border-slate-700 hover:border-cyan-500/50 rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1">
                <span className="text-4xl block mb-4">{v.icono}</span>
                <h3 className="text-xl font-bold text-slate-100 mb-3">{v.titulo}</h3>
                <p className="text-slate-400 leading-relaxed">{v.texto}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

    </main>
  );
}
