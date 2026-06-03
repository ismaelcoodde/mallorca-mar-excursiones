import { useState, useEffect, useRef } from 'react';
import Reveal from './Reveal';

const listaExperiencias = [
  {
    id: 1,
    titulo: "Calas Escondidas",
    descripcion: "Descubre las calas más secretas de Mallorca. Aguas turquesas y arenas blancas accesibles solo por mar.",
    icono: "🏝️",
    imagenes: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
    ],
  },
  {
    id: 2,
    titulo: "Cuevas Vírgenes",
    descripcion: "Explora cuevas marinas cristalinas y rincones mágicos de la costa balear.",
    icono: "🌊",
    imagenes: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80",
    ],
  },
  {
    id: 3,
    titulo: "Deportes de Acción",
    descripcion: "Sube la adrenalina con nuestras sesiones de Wakesurf y el divertidísimo Donut acuático.",
    icono: "🏄‍♂️",
    imagenes: [
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=80",
      "https://images.unsplash.com/photo-1531722569936-825d4eea6ae3?w=800&q=80",
    ],
  },
  {
    id: 4,
    titulo: "Scooter Submarino",
    descripcion: "Deslízate bajo el agua como un pez con nuestro propulsor submarino de alto rendimiento.",
    icono: "🤿",
    imagenes: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
      "https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=800&q=80",
    ],
  },
  {
    id: 5,
    titulo: "Paddle Surf",
    descripcion: "Relájate y rema a tu propio ritmo disfrutando de la brisa y el paisaje mediterráneo.",
    icono: "🏄‍♀️",
    imagenes: [
      "https://images.unsplash.com/photo-1530053969600-caed2596d242?w=800&q=80",
      "https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?w=800&q=80",
    ],
  },
  {
    id: 6,
    titulo: "Catering a Bordo",
    descripcion: "No te preocupes por nada. Incluimos comida, snacks y refrescos bien fríos durante la travesía.",
    icono: "🥂",
    imagenes: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
    ],
  },
];

// Aplanamos todas las imágenes en una lista ordenada: exp0-img0, exp0-img1, exp1-img0, exp1-img1...
const todasLasImagenes = listaExperiencias.flatMap((e, ei) =>
  e.imagenes.map((img, ii) => ({ img, ei, ii }))
);

export default function Experiencias() {
  const [paso, setPaso] = useState(0); // índice en todasLasImagenes
  const timerRef = useRef(null);

  const iniciarTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setPaso((prev) => (prev + 1) % todasLasImagenes.length);
    }, 3000);
  };

  useEffect(() => {
    iniciarTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const actual = todasLasImagenes[paso];
  const expActiva = actual.ei;
  const imgActiva = actual.ii;
  const exp = listaExperiencias[expActiva];

  // Al pulsar una experiencia saltamos a su primera imagen
  const seleccionarExp = (ei) => {
    const nuevoPaso = todasLasImagenes.findIndex((t) => t.ei === ei && t.ii === 0);
    setPaso(nuevoPaso);
    iniciarTimer();
  };

  // Al pulsar un puntito saltamos a esa imagen de la experiencia activa
  const seleccionarImg = (ii) => {
    const nuevoPaso = todasLasImagenes.findIndex((t) => t.ei === expActiva && t.ii === ii);
    setPaso(nuevoPaso);
    iniciarTimer();
  };

  return (
    <section className="py-24 bg-slate-900" id="experiencias">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-wide">
              Experiencias Inolvidables
            </h2>
            <p className="mt-4 text-xl text-slate-400 max-w-2xl mx-auto">
              Mucho más que un simple paseo en barco. Diseñamos aventuras a medida para que disfrutes de Mallorca al máximo.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          {/* Imagen grande */}
          <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-6 shadow-2xl">
            {todasLasImagenes.map((item, i) => (
              <div
                key={i}
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
                style={{
                  backgroundImage: `url('${item.img}')`,
                  opacity: i === paso ? 1 : 0,
                }}
              />
            ))}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent" />

            {/* Texto */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-3xl mb-1">{exp.icono}</p>
              <h3 className="text-2xl font-bold text-white mb-1">{exp.titulo}</h3>
              <p className="text-slate-300 text-sm">{exp.descripcion}</p>
            </div>

            {/* Puntitos de las imágenes de la experiencia activa */}
            <div className="absolute top-4 right-4 flex gap-1.5">
              {exp.imagenes.map((_, ii) => (
                <button
                  key={ii}
                  onClick={() => seleccionarImg(ii)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    ii === imgActiva ? 'bg-cyan-400 w-5' : 'bg-white/40 w-1.5'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Botones de experiencias */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {listaExperiencias.map((e, i) => (
              <button
                key={e.id}
                onClick={() => seleccionarExp(i)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-200 ${
                  i === expActiva
                    ? 'bg-cyan-500/10 border-cyan-500/60 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                    : 'bg-slate-800 border-slate-700 hover:border-slate-500'
                }`}
              >
                <span className="text-xl">{e.icono}</span>
                <span className={`text-sm font-semibold leading-tight ${
                  i === expActiva ? 'text-cyan-300' : 'text-slate-300'
                }`}>
                  {e.titulo}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  );
}
