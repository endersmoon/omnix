import Container from './Container'

export default function CtaBanner() {
  return (
    <section id="get-started" className="bg-white py-12 sm:py-16 md:py-24 scroll-mt-24">
      <Container>
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-neutral-200 bg-neutral-50 px-6 py-10 sm:px-8 sm:py-12 md:px-14 md:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
          />
          <div className="relative flex flex-col items-center text-center">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-[-0.025em] text-neutral-900 leading-[1.1]">
              Your career, handled.
            </h2>
            <p className="mt-3 sm:mt-4 text-neutral-500 md:text-lg">
              Tell Omni what you&apos;re looking for — it handles the rest.
            </p>
            <button
              type="button"
              className="mt-6 sm:mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/25 hover:bg-primary-hover transition-colors"
            >
              Get started
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <p className="mt-5 sm:mt-6 text-sm text-neutral-400">
              Free to use · No credit card · Works on Web, WhatsApp and Email
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
