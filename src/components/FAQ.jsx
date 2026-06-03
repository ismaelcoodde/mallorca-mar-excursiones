import { useState } from 'react';
import Reveal from './Reveal';

export default function FAQ() {
  const [preguntaAbierta, setPreguntaAbierta] = useState(null);

  const faq = [
    { id: 1, pregunta: "¿Qué pasa si hace mal tiempo el día de nuestra reserva?", respuesta: "Tu seguridad y comodidad son nuestra prioridad absoluta. Si el capitán determina que las condiciones del mar no son seguras o agradables, te avisaremos con antelación. Podrás elegir entre reprogramar la salida para otro día o recibir el reembolso del 100% de tu reserva sin hacer preguntas." },
    { id: 2, pregunta: "¿Podemos llevar nuestra propia comida y bebida?", respuesta: "¡Por supuesto! Aunque nosotros incluimos bebidas frías y algunos snacks en todos nuestros chárters, eres totalmente libre de traer tu comida favorita, sándwiches o bebidas extra. Disponemos de una amplia nevera con hielo a bordo para mantenerlo todo perfecto." },
    { id: 3, pregunta: "¿Necesito algún tipo de experiencia o licencia náutica?", respuesta: "Cero experiencia necesaria. Todas nuestras excursiones incluyen a nuestro Patrón Profesional, que conoce la costa de Mallorca a la perfección. Él se encargará de la navegación, de fondear en los mejores sitios y de que vosotros solo os preocupéis de relajaros y disfrutar." },
    { id: 4, pregunta: "¿Es una actividad segura para niños pequeños?", respuesta: "Totalmente. La Beneteau Flyer 7 es una embarcación sumamente estable y segura, con bordas altas. Adaptamos la velocidad de navegación y elegimos calas tranquilas para que las familias con niños disfruten al máximo. Disponemos de chalecos salvavidas homologados para todas las edades." },
    { id: 5, pregunta: "¿Desde qué puerto salimos y a qué hora hay que estar?", respuesta: "Saldremos desde nuestro puerto base (te enviaremos la ubicación exacta por WhatsApp al confirmar la reserva). Os recomendamos llegar unos 15 minutos antes de la hora acordada para poder embarcar con calma, hacer el briefing de seguridad y zarpar puntuales." }
  ];

  return (
    <section className="py-24 bg-slate-800" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-wide">
              Preguntas Frecuentes
            </h2>
            <p className="mt-4 text-xl text-slate-400">
              Resolvemos tus dudas para que embarques con total tranquilidad.
            </p>
          </div>
        </Reveal>

        {/* Cada pregunta entra escalonada */}
        <div className="space-y-4">
          {faq.map((item, index) => (
            <Reveal key={item.id} delay={index * 80}>
              <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden transition-all duration-300 hover:border-cyan-500/50">
                <button
                  onClick={() => setPreguntaAbierta(preguntaAbierta === item.id ? null : item.id)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                >
                  <span className="text-lg font-bold text-slate-200 pr-4">{item.pregunta}</span>
                  <span className="text-cyan-400 text-2xl font-light transition-transform duration-300">
                    {preguntaAbierta === item.id ? '−' : '+'}
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${preguntaAbierta === item.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-5 text-slate-400 leading-relaxed border-t border-slate-800 pt-4">
                    {item.respuesta}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
