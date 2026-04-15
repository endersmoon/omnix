import Container from './Container'
import { pillars } from './pillarData'

export default function PillarsScroll() {
  return (
    <section id="capabilities" className="relative bg-neutral-50 py-12 sm:py-24 md:py-32 scroll-mt-24">
      <Container>
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-16">
          <div>
            <div className="md:sticky md:top-[calc(50vh-9rem)]">
              <span className="block text-xs md:text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-3 md:mb-6">
                How Omni helps
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-900 leading-[1.05]">
                Everything you need to accelerate your career growth
              </h2>
              <p className="mt-4 text-lg text-neutral-500 max-w-md md:mt-6 md:text-lg">
                Scroll through every pillar — from first search to signed offer.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {pillars.map((p, i) => (
              <article
                key={p.title}
                className="group relative md:sticky md:top-[var(--card-top)] overflow-hidden rounded-3xl bg-white border border-black/[0.06] p-8 sm:p-10 md:p-12 flex flex-col gap-10 sm:gap-0 sm:justify-between sm:min-h-[380px]  transition-transform duration-500 hover:-translate-y-0.5"
                style={{ '--card-top': `calc(50vh - 11rem + ${i * 1.25}rem)` }}
              >
                {/* Big faded pillar numeral */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-6 -right-4 select-none text-[11rem] sm:text-[14rem] font-black leading-none text-neutral-100/90 tracking-tighter"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Header */}
                <div className="relative flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.06] px-3 py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Pillar {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                    {String(i + 1).padStart(2, '0')} / {String(pillars.length).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="relative flex flex-col items-stretch gap-8 text-left sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                  <div className="w-full">
                    <h3 className="text-4xl sm:text-4xl md:text-5xl font-bold text-neutral-900 leading-[1.05] whitespace-normal sm:whitespace-pre-line tracking-[-0.02em]">
                      {p.title}
                    </h3>
                    <p className="mt-4 text-lg text-neutral-500 max-w-lg sm:mt-6 sm:text-lg leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                  {p.img && (
                    <img
                      src={p.img}
                      alt=""
                      className="w-44 h-44 sm:w-32 sm:h-32 md:w-48 md:h-48 object-contain shrink-0 sm:self-end transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-2deg]"
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
