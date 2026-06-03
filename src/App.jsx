import { Routes, Route } from 'react-router-dom'; // 1. Importamos las rutas

import Header from './components/Header';
import Banner from './components/Banner';
import Experiencias from './components/Experiencias';
import Embarcacion from './components/Embarcacion';
import Tarifas from './components/Tarifas';
import FAQ from './components/FAQ'
import Resenas from './components/Resenas';
import Contacto from './components/Contacto';
import WhatsAppButton from './components/WhatsAppButton';
import Footer from './components/Footer';
import Reservar from './components/Reservar'; // 2. Importamos la nueva página

// La página de inicio es todo lo que tenías antes, junto en un componente "Home"
function Home() {
  return (
    <>
      <Banner />
      <Experiencias />
      <Embarcacion />
      <Tarifas />
      <FAQ />
      <Resenas />
      <Contacto />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* El Header y el botón de WhatsApp aparecen en TODAS las páginas */}
      <Header />
      <WhatsAppButton />

      {/* 3. Aquí React decide qué mostrar según la URL */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservar" element={<Reservar />} />
      </Routes>
    </div>
  );
}
