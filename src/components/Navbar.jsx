import { useEffect, useState } from 'react'

const nav = {
  brand: 'Omni',
  tag: 'AI Career Agent',
  links: [
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Channels', href: '#channels' },
  ],
  signIn: 'Sign in',
  cta: 'Get started free',
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

export default function Navbar({ onOpenAuth }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 transition-all duration-300 ${
          scrolled
            ? 'mt-3 rounded-full border border-[#ececf3] bg-white/80 backdrop-blur-md shadow-[0_1px_2px_rgba(11,11,20,0.04),0_8px_24px_rgba(11,11,20,0.04)]'
            : 'mt-0 border border-transparent'
        }`}
      >
        <a href="#" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Omni" className="h-12 w-12 object-contain" />
          <span className="text-[15px] font-semibold tracking-tight text-[#0b0b14]">
            {nav.brand}
          </span>
          <span className="hidden text-[13px] font-medium text-[#9a9aae] md:inline">
            {nav.tag}
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[#5b5b6e] transition-colors hover:text-[#0b0b14]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenAuth?.('signin')}
            className="hidden text-sm font-medium text-[#5b5b6e] transition-colors hover:text-[#0b0b14] md:inline"
          >
            {nav.signIn}
          </button>
          <button
            type="button"
            onClick={() => onOpenAuth?.('signup')}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-primary px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium text-white shadow-[0_8px_24px_rgba(74,79,253,0.25)] transition-all duration-200 hover:bg-primary-hover hover:-translate-y-[1px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
          >
            {nav.cta}
            <ArrowRight />
          </button>
        </div>
      </div>
    </header>
  )
}
