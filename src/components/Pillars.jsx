import { useRef } from 'react'
import Container from './Container'
import PillarCard from './PillarCard'
import { pillars } from './pillarData'

const CARD_GAP = 24

function ArrowIcon({ direction = 'right' }) {
  const d = direction === 'left' ? 'M19 12H5M12 19l-7-7 7-7' : 'M5 12h14M12 5l7 7-7 7'
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  )
}

function NavButton({ direction, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === 'left' ? 'Previous slide' : 'Next slide'}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 text-neutral-700 hover:border-primary hover:text-primary transition-colors"
    >
      <ArrowIcon direction={direction} />
    </button>
  )
}

export default function Pillars() {
  const sliderRef = useRef(null)

  const scroll = (dir) => {
    const el = sliderRef.current
    if (!el) return
    const card = el.querySelector('[data-card]')
    const step = card ? card.offsetWidth + CARD_GAP : 400
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <section className="relative left-1/2 -translate-x-1/2 w-[100vw] bg-white py-16 sm:py-24 md:py-32 overflow-x-clip">
      <Container>
        <div className="flex items-end justify-between gap-8 mb-12">
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold tracking-[-0.025em] text-neutral-900 leading-[1.05] max-w-3xl">
            Everything you need to accelerate your career growth
          </h2>
          <div className="hidden sm:flex gap-3 shrink-0">
            <NavButton direction="left" onClick={() => scroll(-1)} />
            <NavButton direction="right" onClick={() => scroll(1)} />
          </div>
        </div>

        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth py-16 px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ marginRight: 'calc(50% - 50vw)',
            marginLeft:'calc(50% - 50vw)'
           }}
        >
          {pillars.map((p) => (
            <PillarCard key={p.title} {...p} />
          ))}
          <div className="shrink-0 w-6 md:w-10" aria-hidden />
        </div>
      </Container>
    </section>
  )
}
