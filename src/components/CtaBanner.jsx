import Container from './Container'

export default function CtaBanner() {
  return (
    <section id="get-started" className="bg-white py-12 sm:py-16 md:py-24 scroll-mt-24">
      <Container>
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-neutral-200 bg-neutral-50 px-6 py-8 sm:px-8 sm:py-10 md:px-14 md:py-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
          />
          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.025em] text-neutral-900 leading-[1.1]">
                Start your job search in 60 seconds
              </h2>
              <p className="mt-3 text-neutral-500 md:text-lg">
                No resume required. No app to download. Just tell Omni what you&apos;re looking for.
              </p>
            </div>
            <a
              href="#get-started"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/25 hover:bg-primary-hover transition-colors"
            >
              Get started for free
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
