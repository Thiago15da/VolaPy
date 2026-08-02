import { Clock, Users, ArrowRight, Plane } from 'lucide-react';
import { PANORAMIC_TOURS, buildWhatsAppUrl, formatTourMessage } from '../data';
import PageHeader from '../components/PageHeader';
import { Reveal } from '../motion';
import usePageMeta from '../usePageMeta';

export default function VuelosPanoramicos() {
  usePageMeta(
    'Vuelos Panorámicos',
    'Sobrevuelos en helicóptero por Asunción, San Bernardino y el Río Paraguay. Tours de 20 a 45 minutos.'
  );

  return (
    <>
      <PageHeader
        eyebrow="Vuelos panorámicos"
        title="Paraguay desde el aire"
        description="Sobrevuelos en helicóptero de 20 a 45 minutos sobre Asunción, el Lago Ypacaraí y el Río Paraguay. Ideal para regalos, aniversarios y visitas corporativas."
        image={PANORAMIC_TOURS[0].image}
      />

      <section className="section">
        <div className="shell space-y-6">
          {PANORAMIC_TOURS.map((tour, i) => (
            <Reveal key={tour.id} delay={i * 0.06}>
              <article className="card-clean card-clean-hover group grid overflow-hidden md:grid-cols-[1fr_1.15fr]">
                <div className="relative h-56 overflow-hidden bg-cloud-200 md:h-full md:min-h-[19rem]">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-ink-900 backdrop-blur-sm">
                    {tour.duration}
                  </span>
                </div>

                <div className="flex flex-col p-7 md:p-9">
                  <h2 className="font-display text-2xl font-bold text-ink-900">{tour.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500">{tour.desc}</p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {tour.highlights.map((h) => (
                      <li
                        key={h}
                        className="rounded-full bg-cloud-100 px-3 py-1 text-xs text-gray-600"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>

                  <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-gray-200/70 pt-5">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-gray-400" />
                      <dt className="sr-only">Duración</dt>
                      <dd className="text-sm text-gray-600">{tour.duration}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-gray-400" />
                      <dt className="sr-only">Capacidad</dt>
                      <dd className="text-sm text-gray-600">{tour.passengers}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <Plane size={14} className="text-gray-400" />
                      <dt className="sr-only">Aeronave</dt>
                      <dd className="text-sm text-gray-600">{tour.aircraft}</dd>
                    </div>
                  </dl>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-[0.625rem] uppercase tracking-[0.1em] text-gray-400">
                        Desde
                      </p>
                      <p className="font-display text-2xl font-bold text-ink-900">
                        ${tour.price.toLocaleString('en-US')} USD
                      </p>
                    </div>
                    <a
                      href={buildWhatsAppUrl(formatTourMessage(tour))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      Consultar disponibilidad
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal>
            <p className="text-xs leading-relaxed text-gray-400">
              Tarifas de referencia por vuelo (no por pasajero), sujetas a disponibilidad de
              aeronave, condiciones meteorológicas y autorización de la torre. El precio final
              lo confirma el concierge.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
