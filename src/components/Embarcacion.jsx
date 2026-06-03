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

  const specs = [
    { icono: '', valor: '6.41 m', label: 'Eslora' },
    { icono: '', valor: '200 CV', label: 'Suzuki' },
    { icono: '', valor: '8 + 1', label: 'Personas' },
    { icono: '', valor: '43 nd', label: 'Vel. máx.' },
  ];

  const equipamiento = [
    { icono: '🎵', texto: 'Música Bluetooth con altavoces integrados' },
    { icono: '🧊', texto: 'Nevera a bordo para bebidas y alimentos' },
    { icono: '🚿', texto: 'Ducha de agua dulce presurizada en popa' },
    { icono: '☀️', texto: 'Solárium de proa abatible' },
    { icono: '⛱️', texto: 'Toldo Bimini de protección solar' },
    { icono: '🏄', texto: 'Mástil para ski náutico y wakeboard' },
    { icono: '⚓', texto: 'Fondeo eléctrico sube/baja ancla' },
    { icono: '🗺️', texto: 'GPS Garmin con carta náutica' },
    { icono: '💡', texto: 'Iluminación LED ambiental en bañera' },
    { icono: '🛟', texto: 'Chalecos homologados para todas las edades' },
  ];

  return (
    <section className="py-24 bg-white" id="embarcacion">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">

          {/* Carrusel */}
          <Reveal direction="left" className="lg:w-1/2 w-full">
            <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 group">
              {fotos.map((foto, index) => (
                <img key={index} src={foto} alt={`Beneteau Flyer 7 - Vista ${index + 1}`}
                  className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === fotoActual ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                />
              ))}
              <button onClick={fotoAnterior} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-cyan-500 hover:text-white text-slate-800 w-10 h-10 rounded-full flex items-center justify-center transition-all opacity-70 group-hover:opacity-100">&#10094;</button>
              <button onClick={fotoSiguiente} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-cyan-500 hover:text-white text-slate-800 w-10 h-10 rounded-full flex items-center justify-center transition-all opacity-70 group-hover:opacity-100">&#10095;</button>
              <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
                {fotos.map((_, index) => (
                  <button key={index} onClick={() => setFotoActual(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === fotoActual ? 'bg-cyan-500 w-6' : 'bg-white/70 hover:bg-white'}`}
                  />
                ))}
              </div>
              <div className="absolute top-4 right-4 z-20 bg-cyan-500 text-white font-bold px-4 py-1 rounded-full text-sm shadow-lg">Flota 2024</div>
            </div>
          </Reveal>

          {/* Info */}
          <Reveal direction="right" delay={150} className="lg:w-1/2 w-full">
            <div>
              <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 tracking-wide mb-2">
                Nuestra Embarcación
              </h2>
              <h3 className="text-2xl text-slate-900 font-bold mb-4">Beneteau Flyer 7 SPACEdeck</h3>
              <p className="text-slate-600 leading-relaxed mb-8">
                Diseño deportivo con carena Air Step®2 para un planeo rápido y estabilizado. La embarcación perfecta para disfrutar del Mediterráneo con total comodidad y seguridad.
              </p>

              {/* 4 specs en fila */}
              <div className="grid grid-cols-4 gap-3 mb-8">
                {specs.map((s) => (
                  <div key={s.label} className="bg-slate-50 rounded-xl p-3 text-center border border-slate-200 hover:border-cyan-300 transition-all">
                    <span className="block text-xl mb-1">{s.icono}</span>
                    <span className="block text-base font-extrabold text-cyan-600">{s.valor}</span>
                    <span className="block text-xs text-slate-500 mt-0.5">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Equipamiento como lista */}
              <div className="border-t border-slate-200 pt-6">
                <h4 className="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-4">Equipamiento incluido</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {equipamiento.map((item) => (
                    <div key={item.texto} className="flex items-center gap-2.5 text-base text-slate-700">
                      <span className="text-base shrink-0">{item.icono}</span>
                      <span>{item.texto}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
