import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Reveal from './Reveal';

// 20 imágenes de Unsplash de momento. Cuando tengas las tuyas,
// cámbialas por '/galeria-1.jpg', '/galeria-2.jpg', etc. (en la carpeta public).
const imagenes = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
  "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=80",
  "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
  "https://images.unsplash.com/photo-1530053969600-caed2596d242?w=800&q=80",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
  "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80",
  "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&q=80",
  "https://images.unsplash.com/photo-1468413253725-0d5181091126?w=800&q=80",
  "https://images.unsplash.com/photo-1437846972679-9e6e537be46e?w=800&q=80",
  "https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=800&q=80",
  "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=800&q=80",
  "https://images.unsplash.com/photo-1502933691298-84fc14542831?w=800&q=80",
  "https://images.unsplash.com/photo-1561211919-1947abc2dd28?w=800&q=80",
  "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800&q=80",
  "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=800&q=80",
  "https://images.unsplash.com/photo-1583244532610-2a234e7c3aff?w=800&q=80",
  "https://images.unsplash.com/photo-1599582909646-8f4a8c8b4c9a?w=800&q=80",
  "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&q=80",
];

export default function Galeria() {
  const [ampliada, setAmpliada] = useState(null); // índice de la imagen abierta
  const navigate = useNavigate();

  const cerrar = () => setAmpliada(null);
  const anterior = (e) => { e.stopPropagation(); setAmpliada((p) => (p === 0 ? imagenes.length - 1 : p - 1)); };
  const siguiente = (e) => { e.stopPropagation(); setAmpliada((p) => (p === imagenes.length - 1 ? 0 : p + 1)); };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Cabecera */}
        <Reveal>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-wide">
              Galería
            </h1>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
              Momentos reales a bordo. Calas, atardeceres y aventuras en el Mediterráneo.
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-6 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              Volver al inicio
            </button>
          </div>
        </Reveal>

        {/* Grid masonry tipo Pinterest */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {imagenes.map((img, i) => (
            <Reveal key={i} delay={(i % 4) * 80}>
              <button
                onClick={() => setAmpliada(i)}
                className="block w-full mb-4 rounded-xl overflow-hidden group relative break-inside-avoid"
              >
                <img
                  src={img}
                  alt={`Galería ${i + 1}`}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/15 transition-all duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-3xl">🔍</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox: imagen ampliada */}
      {ampliada !== null && (
        <div
          onClick={cerrar}
          className="fixed inset-0 z-50 bg-slate-950/95 flex items-center justify-center p-4 backdrop-blur-sm"
        >
          {/* Cerrar */}
          <button
            onClick={cerrar}
            className="absolute top-6 right-6 text-white/70 hover:text-white text-4xl transition-colors"
          >
            &times;
          </button>

          {/* Flecha anterior */}
          <button
            onClick={anterior}
            className="absolute left-4 md:left-8 text-white/70 hover:text-cyan-400 text-5xl transition-colors"
          >
            &#10094;
          </button>

          {/* Imagen */}
          <img
            src={imagenes[ampliada]}
            alt={`Imagen ${ampliada + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[90vw] rounded-xl shadow-2xl object-contain"
          />

          {/* Flecha siguiente */}
          <button
            onClick={siguiente}
            className="absolute right-4 md:right-8 text-white/70 hover:text-cyan-400 text-5xl transition-colors"
          >
            &#10095;
          </button>

          {/* Contador */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {ampliada + 1} / {imagenes.length}
          </div>
        </div>
      )}
    </main>
  );
}
