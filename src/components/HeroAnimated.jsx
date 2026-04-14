import { useEffect, useRef, useState, useCallback } from 'react'
import { heroLines, heroScenes, blobColors, blobPositions } from '../data/heroContent'

export default function HeroAnimated() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isBlack, setIsBlack] = useState(false)
  const cmdTextRef = useRef(null)
  const cmdCardsRef = useRef(null)
  const blob1 = useRef(null)
  const blob2 = useRef(null)
  const blob3 = useRef(null)
  const typingRef = useRef(null)

  const flashBg = useCallback((idx) => {
    const c = blobColors[idx]
    const p = blobPositions[idx]
    ;[blob1, blob2, blob3].forEach((ref, i) => {
      if (!ref.current) return
      ref.current.style.transition = 'none'
      ref.current.style.background = c[i]
      void ref.current.offsetHeight
      ref.current.style.transition = 'transform 1.2s cubic-bezier(.16,1,.3,1)'
      ref.current.style.transform = [p.b1, p.b2, p.b3][i]
    })
  }, [])

  const typeText = useCallback((text, cb) => {
    const el = cmdTextRef.current
    if (!el) return
    let i = 0
    el.innerHTML = '<span style="display:inline-block;width:1.5px;height:16px;background:var(--mid);vertical-align:text-bottom;margin-left:1px;animation:blink .8s steps(1) infinite"></span>'
    clearInterval(typingRef.current)
    typingRef.current = setInterval(() => {
      el.innerHTML = text.slice(0, i + 1) + '<span style="display:inline-block;width:1.5px;height:16px;background:var(--mid);vertical-align:text-bottom;margin-left:1px;animation:blink .8s steps(1) infinite"></span>'
      i++
      if (i >= text.length) { clearInterval(typingRef.current); if (cb) cb() }
    }, 32)
  }, [])

  const clearText = useCallback((cb) => {
    const el = cmdTextRef.current
    if (!el) return
    const t = el.textContent
    let i = t.length
    clearInterval(typingRef.current)
    typingRef.current = setInterval(() => {
      i--
      el.innerHTML = t.slice(0, i) + '<span style="display:inline-block;width:1.5px;height:16px;background:var(--mid);vertical-align:text-bottom;margin-left:1px;animation:blink .8s steps(1) infinite"></span>'
      if (i <= 0) { clearInterval(typingRef.current); if (cb) cb() }
    }, 12)
  }, [])

  const showScene = useCallback((idx) => {
    const s = heroScenes[idx]
    flashBg(idx)
    if (cmdCardsRef.current) {
      cmdCardsRef.current.classList.remove('visible')
      cmdCardsRef.current.innerHTML = s.cards.map(c =>
        `<div style="display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.7);border:1px solid var(--border-light);border-radius:10px;padding:6px 12px 6px 6px"><div style="width:8px;height:8px;border-radius:50%;background:${c.c};flex-shrink:0"></div><span style="font-size:12.5px;font-weight:500;color:var(--black)">${c.t}</span><span style="font-size:11px;color:var(--mid);margin-left:2px">${c.m}</span></div>`
      ).join('')
    }
    typeText(s.text, () => {
      setTimeout(() => {
        if (cmdCardsRef.current) cmdCardsRef.current.classList.add('visible')
      }, 180)
    })
  }, [flashBg, typeText])

  useEffect(() => {
    flashBg(0)
    showScene(0)
    setTimeout(() => setIsBlack(true), 600)

    let cur = 0
    function cycle() {
      const ni = (cur + 1) % heroLines.length
      if (cmdCardsRef.current) cmdCardsRef.current.classList.remove('visible')
      clearText(() => showScene(ni))
      flashBg(ni)
      setIsBlack(false)
      setActiveIdx(-1)
      setTimeout(() => {
        setActiveIdx(ni)
        setIsBlack(false)
        setTimeout(() => setIsBlack(true), 600)
        cur = ni
        setTimeout(cycle, heroScenes[ni].hold + 1200)
      }, 580)
    }
    const timer = setTimeout(cycle, heroScenes[0].hold + 1200)
    return () => { clearTimeout(timer); clearInterval(typingRef.current) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 relative overflow-hidden">
      {/* Blobs */}
      <div ref={blob1} className="absolute rounded-full pointer-events-none" style={{ width: 520, height: 420, top: '4%', left: '3%', filter: 'blur(80px)', background: 'rgba(186,218,255,.35)' }} />
      <div ref={blob2} className="absolute rounded-full pointer-events-none" style={{ width: 420, height: 360, top: '6%', right: '3%', filter: 'blur(80px)', background: 'rgba(255,210,180,.3)' }} />
      <div ref={blob3} className="absolute rounded-full pointer-events-none" style={{ width: 320, height: 320, bottom: '12%', left: '50%', transform: 'translateX(-50%)', filter: 'blur(80px)', background: 'rgba(200,230,200,.25)' }} />

      <div className="relative z-[1] flex flex-col items-center gap-5 w-full max-w-[720px]">
        {/* H2 */}
        <p className="sr font-sans text-[clamp(14px,2vw,17px)] font-normal" style={{ color: 'var(--mid)' }}>
          Meet Omni — Your AI career agent
        </p>

        {/* H1 cycling */}
        <div className="sr relative w-full flex items-center justify-center" style={{ height: 'clamp(56px, 8vw, 96px)' }}>
          {heroLines.map((line, i) => (
            <span
              key={i}
              className="absolute whitespace-nowrap"
              style={{
                fontSize: 'clamp(36px, 5.5vw, 72px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                opacity: activeIdx === i ? 1 : 0,
                transition: 'opacity 0.55s ease',
                ...(activeIdx === i && isBlack
                  ? { color: 'var(--black)', WebkitTextFillColor: 'var(--black)' }
                  : {
                      background: line.gradient,
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }),
              }}
            >
              {line.text}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button className="sr inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/25 hover:bg-primary-hover transition-all mt-1 border-none cursor-pointer">
          Get started for free
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

        {/* Command card wrap */}
        <div className="sr relative w-full max-w-[620px] mt-2">
          {/* Ghost window */}
          <div className="absolute pointer-events-none hidden md:block" style={{ width: 480, height: 300, left: '50%', top: '50%', transform: 'translate(-50%,-52%)', border: '1px solid rgba(26,25,23,.06)', borderRadius: 12, background: 'rgba(255,255,255,.2)' }}>
            <div className="flex items-center gap-1 px-2.5" style={{ height: 26, borderBottom: '1px solid rgba(26,25,23,.04)' }}>
              <span className="w-[5px] h-[5px] rounded-full" style={{ background: 'rgba(26,25,23,.07)' }} />
              <span className="w-[5px] h-[5px] rounded-full" style={{ background: 'rgba(26,25,23,.07)' }} />
              <span className="w-[5px] h-[5px] rounded-full" style={{ background: 'rgba(26,25,23,.07)' }} />
            </div>
            <div className="p-4 flex flex-col gap-2.5">
              <div className="h-[5px] rounded-sm" style={{ width: '65%', background: 'rgba(26,25,23,.03)' }} />
              <div className="h-[5px] rounded-sm" style={{ width: '45%', background: 'rgba(26,25,23,.03)' }} />
              <div className="flex gap-2.5">
                <div className="flex-1 h-12 rounded-md" style={{ background: 'rgba(26,25,23,.02)', border: '1px solid rgba(26,25,23,.03)' }} />
                <div className="flex-1 h-12 rounded-md" style={{ background: 'rgba(26,25,23,.02)', border: '1px solid rgba(26,25,23,.03)' }} />
              </div>
              <div className="h-[5px] rounded-sm" style={{ width: '80%', background: 'rgba(26,25,23,.03)' }} />
            </div>
          </div>

          {/* CMD card */}
          <div className="relative z-[2] w-full rounded-[18px] overflow-hidden transition-shadow hover:shadow-lg" style={{ background: 'rgba(255,255,255,.88)', border: '1px solid var(--border)', boxShadow: '0 4px 24px rgba(0,0,0,.06)' }}>
            <div className="flex items-start gap-2.5 pt-4 px-[18px]">
              <svg className="w-[17px] h-[17px] flex-shrink-0 mt-[3px]" viewBox="0 0 24 24" fill="none" stroke="var(--light)" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <div ref={cmdTextRef} className="text-[14.5px] leading-[1.5] flex-1 min-h-[22px] text-left" style={{ color: 'var(--black)' }}>
                <span style={{ display: 'inline-block', width: '1.5px', height: 16, background: 'var(--mid)', verticalAlign: 'text-bottom', marginLeft: 1, animation: 'blink .8s steps(1) infinite' }} />
              </div>
            </div>
            <div ref={cmdCardsRef} className="px-[18px] pt-3 flex gap-2 flex-wrap" style={{ opacity: 0, transform: 'translateY(6px)', transition: 'opacity .4s ease, transform .4s ease' }} />
            <div className="flex items-center justify-between py-3 pr-3 pl-[18px]">
              <span className="text-[11.5px] flex items-center gap-[5px]" style={{ color: 'var(--light)' }}>
                <svg className="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="none" stroke="var(--light)" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                Upload resume or paste JD
              </span>
              <button className="w-8 h-8 rounded-full border-none flex items-center justify-center cursor-pointer transition-transform hover:scale-105" style={{ background: 'var(--black)' }}>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="var(--white)" strokeWidth="2.5"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Pills */}
        <div className="sr flex gap-2 flex-wrap justify-center">
          {[
            { icon: <><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" /><path d="M12 13h4" /><path d="M12 8h8" /></>, label: '10+ AI agents' },
            { icon: <><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></>, label: 'Web' },
            { icon: <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />, label: 'WhatsApp' },
            { icon: <><rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="22,6 12,13 2,6" /></>, label: 'Email' },
          ].map((pill, i) => (
            <span key={i} className="inline-flex items-center gap-[5px] rounded-full text-[11.5px] font-medium" style={{ background: 'rgba(255,255,255,.5)', border: '1px solid var(--border-light)', padding: '5px 12px', color: 'var(--mid)' }}>
              
              {pill.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
