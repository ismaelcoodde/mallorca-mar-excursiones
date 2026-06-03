export default function Banner() {
  return (
    // relative: nos permite posicionar cosas unas encima de otras
    // h-screen: hace que el banner ocupe el 100% de la altura de la pantalla
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      
      {/* 1. El Vídeo de Fondo */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline // Importante para que funcione bien en móviles
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
      >
        {/* Vite buscará este archivo directamente en tu carpeta public */}
        <source src="/barco.mp4" type="video/mp4" />
      </video>

      {/* 2. La Capa Oscura (Overlay) */}
      {/* bg-slate-900/60 le da un color azul muy oscuro con un 60% de opacidad */}
      <div className="absolute z-10 inset-0 bg-slate-900/60"></div>

      {/* 3. El Contenido (Texto) */}
      <div className="relative z-20 text-center px-4">
        <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-wider">
          Mallorca Mar Excursiones
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-slate-300 font-medium tracking-wide">
          Alquiler de embarcaciones
        </p>
      </div>

    </div>
  );
}