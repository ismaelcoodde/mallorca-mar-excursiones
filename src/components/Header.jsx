import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // 1. Para movernos entre páginas

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();   // 2. Función para cambiar de página
  const location = useLocation();   // 3. Para saber en qué página estamos

  // Detecta si el usuario ha hecho scroll para añadir backdrop blur al header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detecta qué sección está en pantalla para resaltar el enlace activo
  useEffect(() => {
    const sectionIds = ['experiencias', 'embarcacion', 'tarifas', 'faq', 'resenas', 'contacto'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]); // se vuelve a montar al cambiar de página

  // Scroll suave a una sección. Si NO estamos en la home, primero vamos a "/" y luego bajamos.
  const scrollTo = (id) => {
    setIsOpen(false);
    if (id === 'nosotros') { navigate('/nosotros'); return; }
    if (location.pathname !== '/') {
      navigate('/');
      // esperamos un instante a que la home se monte y luego hacemos scroll
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // 4. Esta es la función nueva: lleva a la página de reservas
  const irAReservar = () => {
    setIsOpen(false);
    navigate('/reservar');
    window.scrollTo({ top: 0 }); // empezamos arriba del todo
  };

  const navLinks = [
    { label: 'Experiencias', id: 'experiencias' },
    { label: 'Embarcación', id: 'embarcacion' },
    { label: 'Preguntas', id: 'faq' },
    { label: 'Reseñas', id: 'resenas' },
    { label: 'Contacto', id: 'contacto' },
    { label: 'Nosotros', id: 'nosotros' },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-slate-900/80 backdrop-blur-md shadow-lg shadow-slate-950/30 border-b border-slate-700/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo — clic lleva al inicio */}
          <button
            onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3 group cursor-pointer"
          >
        
            <div className="flex flex-col leading-tight">
              <span className="font-extrabold text-lg md:text-xl tracking-tight text-white">MALLORCA MAR</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">Excursiones</span>
            </div>
          </button>

          {/* Menú Escritorio */}
          <nav className="hidden md:flex items-center space-x-1 font-medium">
            {navLinks.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`relative px-4 py-2 text-sm rounded-lg transition-colors duration-200 group ${
                  activeSection === id
                    ? 'text-cyan-400'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {label}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-cyan-400 rounded-full transition-all duration-300 ${
                    activeSection === id ? 'w-4/5' : 'w-0 group-hover:w-4/5'
                  }`}
                />
              </button>
            ))}

            {/* CTA destacado -> ahora lleva a la página de reservas */}
            <button
              onClick={irAReservar}
              className="ml-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold text-sm px-5 py-2.5 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_25px_rgba(6,182,212,0.45)] hover:-translate-y-0.5"
            >
              Reservar ahora
            </button>
          </nav>

          {/* Botón Hamburguesa Móvil */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={irAReservar}
              className="bg-transparent hover:bg-cyan-500/10 text-cyan-400 hover:text-cyan-300 font-bold text-sm px-4 py-2 rounded-lg border border-cyan-500 transition-all duration-300 mr-4"
            >
              Reservar
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-cyan-400 focus:outline-none transition-colors p-1"
              aria-label="Abrir menú"
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil desplegable */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-slate-900/95 backdrop-blur-md border-t border-slate-700/50 px-4 pt-3 pb-5 space-y-1">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                activeSection === id
                  ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400 pl-5'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={irAReservar}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 px-6 rounded-lg transition-all duration-300"
            >
              Reservar ahora
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
