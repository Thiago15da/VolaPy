import PageHeader from '../components/PageHeader';
import { Reveal } from '../motion';
import usePageMeta from '../usePageMeta';

const SECTIONS = [
  {
    title: '1. Responsable del tratamiento',
    body: [
      'VOLA (vola.com.py) es responsable del tratamiento de los datos personales que se recopilan a través de este sitio. Para cualquier consulta sobre esta política podés escribir a concierge@vola.com.py.',
    ],
  },
  {
    title: '2. Datos que recopilamos',
    body: [
      'Recopilamos únicamente los datos que ingresás voluntariamente en los formularios del sitio: nombre, correo electrónico, teléfono y los detalles del vuelo que querés cotizar (origen, destino, fechas y cantidad de pasajeros).',
      'El sitio no utiliza cookies de terceros con fines publicitarios ni realiza seguimiento entre sitios.',
    ],
  },
  {
    title: '3. Cómo usamos tus datos',
    body: [
      'Usamos tus datos exclusivamente para responder tu consulta, elaborar la cotización solicitada y coordinar el vuelo. No vendemos ni cedemos datos personales a terceros con fines comerciales.',
      'Cuando confirmás una reserva, compartimos con el operador aéreo asignado únicamente la información necesaria para ejecutar el vuelo (nombre de los pasajeros, itinerario y requerimientos especiales).',
    ],
  },
  {
    title: '4. Comunicación por WhatsApp',
    body: [
      'Los formularios del sitio abren una conversación de WhatsApp con el mensaje ya redactado. Al enviarlo, la comunicación queda sujeta también a las políticas de privacidad de WhatsApp y de su proveedor.',
    ],
  },
  {
    title: '5. Conservación',
    body: [
      'Conservamos los datos de contacto mientras exista una relación comercial vigente o hasta que solicites su eliminación. Los registros de vuelos ejecutados se conservan por el plazo que exige la normativa aeronáutica y tributaria aplicable.',
    ],
  },
  {
    title: '6. Tus derechos',
    body: [
      'Podés solicitar en cualquier momento el acceso, la rectificación o la eliminación de tus datos personales escribiendo a concierge@vola.com.py. Responderemos dentro de un plazo razonable.',
    ],
  },
  {
    title: '7. Seguridad',
    body: [
      'Aplicamos medidas técnicas y organizativas razonables para proteger los datos. Este sitio se sirve íntegramente sobre HTTPS.',
    ],
  },
  {
    title: '8. Cambios en esta política',
    body: [
      'Podemos actualizar esta política para reflejar cambios en el servicio o en la normativa. La versión vigente es siempre la publicada en esta página.',
    ],
  },
];

export default function PoliticaPrivacidad() {
  usePageMeta('Política de Privacidad', 'Cómo VOLA recopila, usa y protege tus datos personales.');

  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Política de Privacidad"
        description="Cómo recopilamos, usamos y protegemos la información que nos confiás."
      />

      <section className="section">
        <div className="shell max-w-3xl">
          <Reveal>
            <p className="mb-12 text-sm text-gray-400">
              Última actualización: agosto de 2026
            </p>
          </Reveal>

          <div className="space-y-10">
            {SECTIONS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.03}>
                <h2 className="mb-4 font-display text-lg font-bold text-ink-900">{s.title}</h2>
                <div className="space-y-4">
                  {s.body.map((p) => (
                    <p key={p} className="text-base leading-relaxed text-gray-500">
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14 rounded-2xl border border-gray-200/80 bg-cloud-100 p-6">
            <p className="text-sm leading-relaxed text-gray-500">
              Este texto es una base general y no constituye asesoramiento legal. Antes de
              publicar el sitio, conviene que un profesional lo revise para adecuarlo a la
              Ley N.º 6534/2020 de protección de datos personales crediticios y a la normativa
              paraguaya vigente que resulte aplicable.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
