function StartedBadge({ onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Get started for free"
      className={`group h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 transition-transform hover:scale-105 ${className}`}
    >
      <div className="relative h-full w-full">
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 h-full w-full animate-[spin_12s_linear_infinite]"
          aria-hidden="true"
        >
          <defs>
            <path
              id="started-badge-circle"
              d="M 100,100 m -74,0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0"
            />
          </defs>
          <circle cx="100" cy="100" r="96" fill="#C6F432" />
          <text
            fill="#0b0b14"
            fontSize="22"
            fontWeight="800"
            letterSpacing="2"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            <textPath href="#started-badge-circle" startOffset="0">
              GET STARTED FOR FREE • GET STARTED FOR FREE •
            </textPath>
          </text>
        </svg>
        <svg
          viewBox="0 0 48 48"
          className="absolute left-1/2 top-1/2 h-10 w-10 sm:h-12 sm:w-12 -translate-x-1/2 -translate-y-1/2 text-[#0b0b14]"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10 32 C 14 20, 22 16, 30 22 C 36 26, 34 30, 30 30 M38 18 L38 30 L26 30" />
        </svg>
      </div>
    </button>
  )
}

const SHOW_STARTED_BADGE = false

export default function Hero({ onOpenAuth }) {
  return (
    <section
      className="relative left-1/2 -translate-x-1/2 w-screen h-svh bg-white overflow-hidden
        bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)]
        bg-size-[48px_48px]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,white_80%)]" />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center text-center  px-5 sm:px-6">
        <img src="/bot.png" alt="Omni bot" className="w-[60vw] max-w-[280px] sm:w-64 md:w-80 mb-6 sm:mb-8 drop-shadow-xl" />
        <div className="relative inline-block">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] text-neutral-900 leading-[1.05] max-w-5xl">
            Get Hired Faster
            <br />
            with <span className="text-primary">Omni</span>
          </h1>
          {SHOW_STARTED_BADGE && (
            <StartedBadge
              onClick={() => onOpenAuth?.('signup')}
              className="absolute -right-8 -top-10 sm:-right-16 sm:-top-12 md:-right-24 md:-top-14 z-20"
            />
          )}
        </div>
        <p className="mt-5 sm:mt-6 text-lg sm:text-xl md:text-xl text-neutral-500 max-w-2xl leading-relaxed">
          Search jobs, build resumes, prep for interviews, and research companies.
        </p>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => onOpenAuth?.('signup')}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/25 hover:bg-primary-hover transition-all"
          >
            Get started free
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onOpenAuth?.('signin')}
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border border-black/15 bg-white px-7 py-3.5 text-base font-medium text-neutral-900 hover:bg-black/5 transition-colors"
          >
            Sign in
          </button>
        </div>
      </div>

      <a
        href="#how-it-works"
        aria-label="Scroll down"
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/70 text-neutral-700 backdrop-blur-sm shadow-sm hover:bg-white hover:text-primary transition-colors animate-bounce"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </a>
    </section>
  )
}
