export default function Resenas() {
  return (
    <section className="py-24 bg-slate-900" id="resenas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-wide">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mt-4 text-xl text-slate-400">
            Opiniones 100% reales extraídas de nuestro perfil de Google.
          </p>
        </div>

        {/* Contenedor exacto de tu widget de Elfsight */}
        <div className="elfsight-app-6b550730-253f-4a9c-b4c0-92948e19a864" data-elfsight-app-lazy></div>

      </div>
    </section>
  );
}