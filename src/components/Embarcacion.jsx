import { useState, useEffect } from 'react';
import Reveal from './Reveal';

export default function Embarcacion() {
  const fotos = [
    '/1.jpg', '/2.jpeg', '/3.jpg', '/4.jpg',
    '/5.jpg', '/6.jpeg', '/7.jpeg', '/8.jpg',
    '/9.jpg', '/10.jpg', '/11.jpeg', '/12.jpeg'
  ];

  const [fotoActual, setFotoActual] = useState(0);
  const fotoSiguiente = () => setFotoActual((prev) => (prev === fotos.length - 1 ? 0 : prev + 1));
  const fotoAnterior = () => setFotoActual((prev) => (prev === 0 ? fotos.length - 1 : prev - 1));

  useEffect(() => {
    const intervalo = setInterval(fotoSiguiente, 5000);
    return () => clearInterval(intervalo);
  }, [fotoActual]);

  return (
    <section className="py-24 bg-slate-800" id="embarcacion">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">

          {/* Carrusel entra desde la izquierda */}
          <Reveal direction="left" className="lg:w-1/2 w-full">
            <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-slate-700 group">
              {fotos.map((foto, index) => (
                <img key={index} src={foto} alt={`Beneteau Flyer 7 - Vista ${index + 1}`}
                  className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === fotoActual ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                />
              ))}
              <button onClick={fotoAnterior} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-slate-900/60 hover:bg-cyan-500 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all opacity-70 group-hover:opacity-100">&#10094;</button>
              <button onClick={fotoSiguiente} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-slate-900/60 hover:bg-cyan-500 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all opacity-70 group-hover:opacity-100">&#10095;</button>
              <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
                {fotos.map((_, index) => (
                  <button key={index} onClick={() => setFotoActual(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === fotoActual ? 'bg-cyan-400 w-6' : 'bg-white/50 hover:bg-white'}`}
                  />
                ))}
              </div>
              <div className="absolute top-4 right-4 z-20 bg-cyan-500 text-slate-900 font-bold px-4 py-1 rounded-full text-sm shadow-lg">Flota 2024</div>
            </div>
          </Reveal>

          {/* Texto entra desde la derecha, con un pequeño retraso */}
          <Reveal direction="right" delay={150} className="lg:w-1/2 w-full">
            <div>
              <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-wide mb-4">
                Nuestra Embarcación
              </h2>
              <h3 className="text-3xl text-slate-100 font-bold mb-6">Beneteau Flyer 7 SPACEdeck</h3>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                Disfruta de la máxima comodidad y seguridad a bordo de nuestra moderna Beneteau Flyer 7. Su diseño vanguardista de cubierta abierta y su potente motor garantizan una navegación ágil y emocionante.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  { icono: '📏', titulo: 'Eslora', detalle: '6.41 m (7.2m total)' },
                  { icono: '⚡', titulo: 'Motorización', detalle: 'Suzuki 200 CV' },
                  { icono: '👥', titulo: 'Capacidad', detalle: '8 Pasajeros + Patrón' },
                  { icono: '✨', titulo: 'Equipamiento', detalle: 'Solárium, Toldo, Ducha' },
                ].map((item) => (
                  <div key={item.titulo} className="bg-slate-900 p-5 rounded-xl border border-slate-700">
                    <span className="block text-2xl mb-2">{item.icono}</span>
                    <span className="block font-bold text-slate-200">{item.titulo}</span>
                    <span className="block text-sm text-slate-400">{item.detalle}</span>
                  </div>
                ))}
              </div>
              <button className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-4 px-10 rounded-lg transition-all duration-300 text-lg shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                Consultar Disponibilidad
              </button>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
