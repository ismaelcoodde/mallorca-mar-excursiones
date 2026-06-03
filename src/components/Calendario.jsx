import { useState, useEffect } from 'react';

// URL de tu backend en Python. En local es localhost:5000.
// Cuando lo subas a un servidor, cambia esto (o usa una variable de entorno VITE_API_URL).
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const DIAS_SEMANA = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

// Convierte un año/mes/día a texto "2026-06-15" sin líos de zona horaria
function aTexto(anio, mes, dia) {
  const mm = String(mes + 1).padStart(2, '0');
  const dd = String(dia).padStart(2, '0');
  return `${anio}-${mm}-${dd}`;
}

export default function Calendario({ fechaSeleccionada, onSeleccionar }) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  // Mes que se está mostrando (empezamos en el mes actual)
  const [verAnio, setVerAnio] = useState(hoy.getFullYear());
  const [verMes, setVerMes] = useState(hoy.getMonth());

  const [diasOcupados, setDiasOcupados] = useState([]); // ej: ['2026-06-10', '2026-06-12']
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // Cada vez que cambiamos de mes, le preguntamos al backend qué días están ocupados
  useEffect(() => {
    const mesTexto = `${verAnio}-${String(verMes + 1).padStart(2, '0')}`;
    setCargando(true);
    setError(null);

    fetch(`${API_URL}/api/dias-ocupados?mes=${mesTexto}`)
      .then((res) => {
        if (!res.ok) throw new Error('No se pudo conectar con el servidor');
        return res.json();
      })
      .then((data) => setDiasOcupados(data.ocupados || []))
      .catch(() => setError('No se pudieron cargar los días. ¿Está encendido el servidor de Python?'))
      .finally(() => setCargando(false));
  }, [verAnio, verMes]);

  // Construimos la cuadrícula de días del mes
  const primerDia = new Date(verAnio, verMes, 1);
  const diasEnMes = new Date(verAnio, verMes + 1, 0).getDate();
  // getDay() devuelve 0=Domingo..6=Sábado; lo convertimos a 0=Lunes..6=Domingo
  let huecoInicial = primerDia.getDay() - 1;
  if (huecoInicial < 0) huecoInicial = 6;

  const celdas = [];
  for (let i = 0; i < huecoInicial; i++) celdas.push(null); // huecos vacíos al inicio
  for (let d = 1; d <= diasEnMes; d++) celdas.push(d);

  const cambiarMes = (delta) => {
    let nuevoMes = verMes + delta;
    let nuevoAnio = verAnio;
    if (nuevoMes < 0) { nuevoMes = 11; nuevoAnio--; }
    if (nuevoMes > 11) { nuevoMes = 0; nuevoAnio++; }
    setVerMes(nuevoMes);
    setVerAnio(nuevoAnio);
  };

  // No dejamos retroceder a meses ya pasados
  const esMesActualOAnterior = verAnio < hoy.getFullYear() ||
    (verAnio === hoy.getFullYear() && verMes <= hoy.getMonth());

  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 md:p-8 shadow-2xl">
      {/* Cabecera con el nombre del mes y las flechas */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => cambiarMes(-1)}
          disabled={esMesActualOAnterior}
          className="w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all disabled:opacity-20 disabled:cursor-not-allowed bg-slate-900/60 hover:bg-cyan-500 hover:text-slate-900 text-slate-200"
        >
          &#10094;
        </button>

        <h3 className="text-xl md:text-2xl font-bold text-slate-100">
          {MESES[verMes]} <span className="text-cyan-400">{verAnio}</span>
        </h3>

        <button
          onClick={() => cambiarMes(1)}
          className="w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all bg-slate-900/60 hover:bg-cyan-500 hover:text-slate-900 text-slate-200"
        >
          &#10095;
        </button>
      </div>

      {/* Nombres de los días de la semana */}
      <div className="grid grid-cols-7 gap-1.5 md:gap-2 mb-2">
        {DIAS_SEMANA.map((d) => (
          <div key={d} className="text-center text-xs font-bold text-slate-500 uppercase py-1">
            {d}
          </div>
        ))}
      </div>

      {/* La cuadrícula de días */}
      <div className="grid grid-cols-7 gap-1.5 md:gap-2 relative">
        {cargando && (
          <div className="absolute inset-0 bg-slate-800/70 flex items-center justify-center rounded-lg z-10">
            <span className="text-cyan-400 text-sm animate-pulse">Cargando disponibilidad…</span>
          </div>
        )}

        {celdas.map((dia, i) => {
          if (dia === null) return <div key={`hueco-${i}`} />;

          const fechaTexto = aTexto(verAnio, verMes, dia);
          const fechaObj = new Date(verAnio, verMes, dia);
          fechaObj.setHours(0, 0, 0, 0);

          const esPasado = fechaObj < hoy;
          const estaOcupado = diasOcupados.includes(fechaTexto);
          const estaSeleccionado = fechaSeleccionada === fechaTexto;
          const disponible = !esPasado && !estaOcupado;

          // Estilos según el estado del día
          let clases = 'aspect-square rounded-lg flex items-center justify-center text-sm md:text-base font-semibold transition-all duration-200 relative ';

          if (esPasado) {
            clases += 'text-slate-600 cursor-not-allowed';            // día pasado: apagado
          } else if (estaOcupado) {
            clases += 'bg-red-500/20 text-red-400 border border-red-500/40 cursor-not-allowed line-through'; // OCUPADO: rojo
          } else if (estaSeleccionado) {
            clases += 'bg-cyan-500 text-slate-900 ring-2 ring-cyan-300 scale-105 cursor-pointer'; // seleccionado
          } else {
            clases += 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 hover:scale-105 cursor-pointer'; // LIBRE: verde
          }

          return (
            <button
              key={fechaTexto}
              disabled={!disponible}
              onClick={() => onSeleccionar(fechaTexto)}
              className={clases}
            >
              {dia}
            </button>
          );
        })}
      </div>

      {/* Aviso de error si el backend no responde */}
      {error && (
        <p className="mt-4 text-sm text-red-400 text-center">{error}</p>
      )}

      {/* Leyenda de colores */}
      <div className="flex flex-wrap justify-center gap-4 mt-6 pt-6 border-t border-slate-700 text-sm">
        <span className="flex items-center gap-2 text-slate-300">
          <span className="w-4 h-4 rounded bg-emerald-500/30 border border-emerald-500/40"></span> Libre
        </span>
        <span className="flex items-center gap-2 text-slate-300">
          <span className="w-4 h-4 rounded bg-red-500/30 border border-red-500/40"></span> Ocupado
        </span>
        <span className="flex items-center gap-2 text-slate-300">
          <span className="w-4 h-4 rounded bg-cyan-500"></span> Seleccionado
        </span>
      </div>
    </div>
  );
}
