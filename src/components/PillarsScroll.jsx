import Container from './Container'
import { pillars } from './pillarData'

export default function PillarsScroll() {
  return (
    <section id="capabilities" className="relative bg-neutral-50 py-16 sm:py-24 md:py-32 scroll-mt-24">
      <Container>
        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-16">
          <div>
            <div className="md:sticky md:top-40">
              <span className="block text-xs md:text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-6">
                How Omni helps
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-neutral-900 leading-[1.05]">
                Everything you need to land your next role
              </h2>
              <p className="mt-6 text-lg text-neutral-500 max-w-md">
                Scroll through every pillar — from first search to signed offer.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {pillars.map((p, i) => (
              <article
                key={p.title}
                className="sticky rounded-2xl sm:rounded-3xl bg-white border border-black/5 shadow-xl shadow-black/[0.03] p-6 sm:p-10 md:p-12 min-h-[280px] sm:min-h-[360px] flex flex-col justify-between"
                style={{ top: `${8 + i * 1.25}rem` }}
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-widest text-neutral-400">
                  <span>Pillar {String(i + 1).padStart(2, '0')}</span>
                  <span>/ {String(pillars.length).padStart(2, '0')}</span>
                </div>
                <div className="flex items-end justify-between gap-4 sm:gap-6">
                  <div>
                    <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold text-neutral-900 leading-[1.05] whitespace-pre-line">
                      {p.title}
                    </h3>
                    <p className="mt-4 sm:mt-6 text-base sm:text-lg text-neutral-500 max-w-lg">{p.desc}</p>
                  </div>
                  {p.img && (
                    <img
                      src={p.img}
                      alt=""
                      className="hidden sm:block w-28 h-28 md:w-44 md:h-44 object-contain shrink-0"
                    />
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
