import { useEffect, useRef, useState } from 'react'
import Container from './Container'

const steps = [
  {
    title: 'Set your search in 30 seconds',
    desc: 'No 40-field profile, no resume to upload. Tell Omni your target role, comp, and dealbreakers in plain English — once.',
    messages: [
      { from: 'user', text: 'PM role, Bangalore or remote, ₹30L+, fintech or consumer apps.' },
      { from: 'bot', text: 'Locked in. Scanning LinkedIn, Naukri, AngelList and 40+ careers pages tonight. First digest drops at 7am.' },
    ],
    channels: ['Web', 'WhatsApp', 'Email'],
  },
  {
    title: 'Wake up to ranked matches, every day',
    desc: 'Omni scans every major job board and careers page overnight, then sends a daily digest scored by fit — so you only see roles worth applying to.',
    messages: [
      { from: 'bot', text: 'Morning. 18 new roles overnight. Top match: Senior PM at Razorpay — 94% fit. 3 more at companies on your shortlist.' },
      { from: 'user', text: 'Shortlist the top 5 and skip anything below 80%.' },
    ],
    channels: ['Automated', 'Daily digest'],
  },
  {
    title: 'Tailor every application in seconds',
    desc: 'Resumes rewritten for the JD, cover letters drafted, cold emails ready to send. What used to take an hour now takes thirty seconds.',
    messages: [
      { from: 'user', text: 'Rewrite my resume for the Razorpay PM role and draft a cold email to their talent team.' },
      { from: 'bot', text: 'Done. Resume reframed around payments and 0→1 wins. Cold email drafted to their talent lead — want me to send it?' },
    ],
    channels: ['Web', 'WhatsApp'],
  },
  {
    title: 'Auto-apply while you sleep',
    desc: 'One tap to submit. Omni fills forms, attaches tailored docs, and tracks every application — so you never lose a lead or miss a deadline.',
    messages: [
      { from: 'user', text: 'Apply to all 5 shortlisted roles and track them for me.' },
      { from: 'bot', text: 'Done. 5 job applications submitted along with custom resumes for each. I\'ll notify you when they respond.' },
    ],
    channels: ['Automated', 'Web'],
  },
  {
    title: 'Walk in knowing the company cold',
    desc: 'Culture, comp bands, interview loops, and employee sentiment — pulled from public sources into a two-minute briefing.',
    messages: [
      { from: 'user', text: 'Brief me on Razorpay before my call tomorrow.' },
      { from: 'bot', text: 'Razorpay: Series F, 4.1★ on Glassdoor. PM loop is 4 rounds — case study, product sense, metrics, leadership.' },
    ],
    channels: ['Web'],
  },
  {
    title: 'Practice until you feel ready',
    desc: 'Role-specific mock interviews with STAR-method coaching and scored feedback. Repeat as many times as you need — Omni never gets tired.',
    messages: [
      { from: 'user', text: 'Give me a mock product sense question for Razorpay and score my answer.' },
      { from: 'bot', text: "Here's one: how would you improve Razorpay's merchant onboarding for first-time sellers? Take your time — I'll score on structure, insight, and tradeoffs." },
    ],
    channels: ['Web', 'WhatsApp'],
  },
]

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-2.5 py-0.5 text-[10px] font-medium text-neutral-600">
      {children}
    </span>
  )
}

function Message({ step, animate = true }) {
  const lastIsUser = step.messages[step.messages.length - 1].from === 'user'
  return (
    <div className="flex flex-col gap-2">
      {step.messages.map((m, i) => {
        const isUser = m.from === 'user'
        return (
          <div
            key={i}
            className={`flex ${isUser ? 'justify-end' : 'justify-start'} ${
              animate ? 'animate-[msgIn_500ms_ease-out]' : ''
            }`}
            style={animate ? { animationDelay: `${i * 120}ms`, animationFillMode: 'both' } : undefined}
          >
            <div
              className={
                isUser
                  ? 'max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-white shadow-sm shadow-primary/20'
                  : 'max-w-[85%] rounded-2xl rounded-bl-sm border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-800'
              }
            >
              {m.text}
            </div>
          </div>
        )
      })}
      <div className={`flex flex-wrap gap-1.5 ${lastIsUser ? 'justify-end' : 'justify-start'}`}>
        {step.channels.map((c) => (
          <Chip key={c}>{c}</Chip>
        ))}
      </div>
    </div>
  )
}

function ChatWindow({ messages, animate = true, innerRef, heightClass = 'h-[520px] max-h-[80svh]' }) {
  return (
    <div className={`w-[520px] max-w-full rounded-3xl border border-neutral-200 bg-white shadow-2xl shadow-neutral-900/[0.06] overflow-hidden ${heightClass} flex flex-col`}>
      <div className="flex items-center gap-2 border-b border-neutral-100 bg-neutral-50 px-5 py-3.5">
        <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
        <div className="mx-auto flex items-center gap-2 text-xs font-medium text-neutral-500">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          Chat with Omni
        </div>
      </div>
      <div
        ref={innerRef}
        className="flex-1 overflow-y-auto px-5 py-5 space-y-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {messages.map((s, i) => (
          <Message key={i} step={s} animate={animate} />
        ))}
      </div>
    </div>
  )
}

function StaticFallback() {
  return (
    <Container>
      <div className="max-w-3xl">
        <span className="block text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-4 sm:mb-6">
          How it works
        </span>
        <h2 className="text-4xl leading-[1.1] sm:text-4xl md:text-5xl font-bold tracking-[-0.025em] text-neutral-900">
          From job hunt to offer letter, in one conversation
        </h2>
      </div>

      <div className="mt-10 sm:mt-14 md:mt-16 space-y-10 sm:space-y-14 md:space-y-16">
        {steps.map((s, i) => (
          <div key={s.title} className="grid gap-6 sm:gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,440px)] md:gap-12 items-start">
            <div>
              <span className="font-mono text-xs sm:text-sm text-primary tabular-nums">
                {String(i + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
              </span>
              <h3 className="mt-2 sm:mt-3 text-3xl sm:text-3xl md:text-4xl font-bold tracking-[-0.025em] text-neutral-900 leading-[1.15]">
                {s.title}
              </h3>
              <p className="mt-3 sm:mt-4 text-lg sm:text-lg text-neutral-500 max-w-md">{s.desc}</p>
            </div>
            <div className="justify-self-stretch md:justify-self-end w-full md:w-auto">
              <Message step={s} animate={false} />
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}

function MobileCarousel() {
  const scrollerRef = useRef(null)
  const [active, setActive] = useState(0)

  const onScroll = () => {
    const el = scrollerRef.current
    if (!el) return
    const idx = Math.round(el.scrollLeft / el.clientWidth)
    if (idx !== active) setActive(idx)
  }

  const jumpTo = (i) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
  }

  return (
    <Container>
      <div className="max-w-3xl">
        <span className="block text-[11px] sm:text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-4">
          How it works
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-neutral-900 leading-[1.1]">
          From job hunt to offer letter, in one conversation
        </h2>
      </div>

      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="mt-8 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {steps.map((s, i) => (
          <div key={s.title} className="snap-center shrink-0 w-full">
            <div className="flex flex-col">
              <span className="font-mono text-xs text-primary tabular-nums">
                {String(i + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
              </span>
              <h3 className="mt-2 text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-neutral-900 leading-[1.15]">
                {s.title}
              </h3>
              <p className="mt-3 text-base text-neutral-500">{s.desc}</p>
              <div className="mt-6">
                <ChatWindow messages={[s]} animate={false} heightClass="h-[420px]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {steps.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => jumpTo(i)}
            aria-label={`Go to step ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === active ? 'w-10 bg-primary' : 'w-6 bg-neutral-300'
            }`}
          />
        ))}
      </div>
    </Container>
  )
}

function PinnedExperience() {
  const sectionRef = useRef(null)
  const chatRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    let ticking = false
    const update = () => {
      ticking = false
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      if (scrollable <= 0) return
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable))
      const idx = Math.min(steps.length - 1, Math.floor(progress * steps.length))
      setActive(idx)
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    const el = chatRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [active])

  const jumpTo = (i) => {
    const section = sectionRef.current
    if (!section) return
    const scrollable = section.offsetHeight - window.innerHeight
    const target = section.offsetTop + (i / steps.length) * scrollable + 1
    window.scrollTo({ top: target, behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${steps.length * 55 + 30}svh` }}
    >
      <div className="sticky top-0 flex h-screen items-center">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="min-w-0">
              <span className="block text-xs md:text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-8">
                How it works
              </span>

              <div className="relative min-h-[420px] xl:min-h-[460px]">
                {steps.map((s, i) => {
                  const state = i === active ? 'active' : i < active ? 'past' : 'future'
                  return (
                    <div
                      key={s.title}
                      aria-hidden={state !== 'active'}
                      className={`absolute inset-0 transition-all duration-500 ease-out ${
                        state === 'active'
                          ? 'opacity-100 translate-y-0'
                          : state === 'past'
                          ? 'opacity-0 -translate-y-4 pointer-events-none'
                          : 'opacity-0 translate-y-4 pointer-events-none'
                      }`}
                    >
                      <span className="font-mono text-sm text-primary tabular-nums">
                        {String(i + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
                      </span>
                      <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-[-0.03em] text-neutral-900 leading-[1.02]">
                        {s.title}
                      </h2>
                      <p className="mt-6 text-lg text-neutral-500 max-w-md">{s.desc}</p>
                    </div>
                  )
                })}
              </div>

              <div className="mt-10 flex gap-2">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => jumpTo(i)}
                    aria-label={`Go to step ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-500 hover:!bg-primary ${
                      i === active
                        ? 'w-10 bg-primary'
                        : i < active
                        ? 'w-6 bg-primary/50'
                        : 'w-6 bg-neutral-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <ChatWindow
                messages={steps.slice(0, active + 1)}
                animate
                innerRef={chatRef}
              />
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

export default function HowItWorks() {
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e) => setReducedMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <section id="how-it-works" className="bg-neutral-50 py-14 sm:py-20 md:py-28 lg:py-32 scroll-mt-24">
      {reducedMotion ? (
        <StaticFallback />
      ) : (
        <>
          <div className="lg:hidden">
            <MobileCarousel />
          </div>
          <div className="hidden lg:block">
            <PinnedExperience />
          </div>
        </>
      )}
    </section>
  )
}
