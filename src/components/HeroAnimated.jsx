import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUp, Mic, Paperclip, Sparkles } from 'lucide-react'
import { heroLines, heroScenes, blobColors, blobPositions } from '../data/heroContent'

export default function HeroAnimated() {
  const navigate = useNavigate()
  const [navigating, setNavigating] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const [prevIdx, setPrevIdx] = useState(-1)
  const [isBlack, setIsBlack] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const cmdTextRef = useRef(null)
  const cmdCardsRef = useRef(null)
  const blob1 = useRef(null)
  const blob2 = useRef(null)
  const blob3 = useRef(null)
  const typingRef = useRef(null)
  const inputRef = useRef(null)
  const isActiveRef = useRef(false)
  const isFirstCycle = useRef(true)

  // Position rise — fires with text animation
  const flashBgPosition = useCallback((idx) => {
    const p = blobPositions[idx]
    ;[blob1, blob2, blob3].forEach((ref, i) => {
      if (!ref.current) return
      const target = [p.b1, p.b2, p.b3][i]
      ref.current.style.transition = 'none'
      ref.current.style.transform = target + ' translateY(32px)'
      void ref.current.offsetHeight
      ref.current.style.transition = 'transform 1.1s cubic-bezier(.16,1,.3,1)'
      ref.current.style.transform = target
    })
  }, [])

  // Color fade — duration matches text enter animation (0.52s)
  const flashBgColor = useCallback((idx) => {
    const c = blobColors[idx]
    ;[blob1, blob2, blob3].forEach((ref, i) => {
      if (!ref.current) return
      ref.current.style.transition = 'background 0.52s ease'
      ref.current.style.background = c[i]
    })
  }, [])

  // Initial load — set both immediately (no cycling yet)
  const flashBg = useCallback((idx) => {
    flashBgPosition(idx)
    flashBgColor(idx)
  }, [flashBgPosition, flashBgColor])

  // Fires after React commits text DOM — perfectly synced with new text appearing
  useEffect(() => {
    if (isFirstCycle.current) { isFirstCycle.current = false; return }
    if (isActiveRef.current) return
    flashBgPosition(activeIdx)
    flashBgColor(activeIdx)
  }, [activeIdx]) // eslint-disable-line react-hooks/exhaustive-deps

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

  const handleActivate = useCallback(() => {
    if (navigating || isActiveRef.current) return
    clearInterval(typingRef.current)
    // Clear cards before React reconciles — they were injected via innerHTML
    // outside React's virtual DOM, so we must flush them before the branch switch
    if (cmdCardsRef.current) {
      cmdCardsRef.current.classList.remove('visible')
      cmdCardsRef.current.innerHTML = ''
    }
    isActiveRef.current = true
    setIsActive(true)
    setInputValue('')
    // Freeze blobs in place
    ;[blob1, blob2, blob3].forEach(ref => {
      if (ref.current) ref.current.style.transition = 'none'
    })
    requestAnimationFrame(() => inputRef.current?.focus())
  }, [navigating])

  const handleSubmit = useCallback(() => {
    const text = inputValue.trim()
    if (!text || navigating) return
    setNavigating(true)
    const q = encodeURIComponent(text)
    setTimeout(() => navigate(`/dashboard?guest=true&q=${q}`), 320)
  }, [inputValue, navigating, navigate])

  useEffect(() => {
    flashBg(0)
    showScene(0)
    setTimeout(() => setIsBlack(true), 600)

    let cur = 0
    function cycle() {
      const ni = (cur + 1) % heroLines.length

      const advance = () => {
        setIsBlack(false)
        setPrevIdx(cur)
        setActiveIdx(ni)
        setTimeout(() => setIsBlack(true), 600)
        setTimeout(() => setPrevIdx(-1), 500)
        cur = ni
        setTimeout(cycle, heroScenes[ni].hold + 1200)
      }

      if (!isActiveRef.current) {
        if (cmdCardsRef.current) cmdCardsRef.current.classList.remove('visible')
        clearText(() => {
          if (!isActiveRef.current) showScene(ni)
          setTimeout(advance, 580)
        })
      } else {
        // input active — keep h1 cycling, skip cmdText/blob updates
        setTimeout(advance, 580)
      }
    }
    const timer = setTimeout(cycle, heroScenes[0].hold + 1200)
    return () => { clearTimeout(timer); clearInterval(typingRef.current) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 relative overflow-hidden">
      {/* Page-exit overlay */}
      <div
        className="fixed inset-0 z-[100] bg-white pointer-events-none"
        style={{
          opacity: navigating ? 1 : 0,
          transition: navigating ? 'opacity 0.28s ease-in' : 'none',
        }}
      />
      {/* Blobs */}
      <div ref={blob1} className="absolute rounded-full pointer-events-none" style={{ width: 520, height: 420, top: '4%', left: '3%', filter: 'blur(80px)', background: 'rgba(186,218,255,.35)' }} />
      <div ref={blob2} className="absolute rounded-full pointer-events-none" style={{ width: 420, height: 360, top: '6%', right: '3%', filter: 'blur(80px)', background: 'rgba(255,210,180,.3)' }} />
      <div ref={blob3} className="absolute rounded-full pointer-events-none" style={{ width: 320, height: 320, bottom: '12%', left: '50%', transform: 'translateX(-50%)', filter: 'blur(80px)', background: 'rgba(200,230,200,.25)' }} />

      <div className="relative z-[1] flex flex-col items-center w-full max-w-[720px]">
        {/* Logo mark */}
        <img src="/logo.png" alt="Omni" className="sr w-20 sm:w-24 h-auto mb-5" />

        {/* Eyebrow badge */}
        <p className="sr inline-flex items-center gap-1.5 rounded-full px-3.5 py-[5px] text-[12.5px] font-medium tracking-wide mb-1" style={{ background: 'rgba(65,65,252,0.07)', color: 'var(--mid)' }}>
          Meet Omni — Your AI career agent
        </p>

        {/* H1 cycling */}
        <div className="sr relative w-full flex items-center justify-center mb-5" style={{ height: 'clamp(80px, 10vw, 96px)' }}>
          {heroLines.map((line, i) => {
            const isEntering = activeIdx === i
            const isExiting = prevIdx === i
            return (
            <span
              key={i}
              className="absolute w-full text-center sm:whitespace-nowrap"
              style={{
                fontSize: 'clamp(30px, 5.5vw, 72px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                opacity: isEntering || isExiting ? undefined : 0,
                animation: isEntering
                  ? 'heroLineEnter 0.52s cubic-bezier(.16,1,.3,1) forwards'
                  : isExiting
                  ? 'heroLineExit 0.38s ease forwards'
                  : 'none',
                ...(isEntering && isBlack
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
            )
          })}
        </div>

        {/* CTA */}
        <button className="sr relative z-[2] inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold text-white shadow-lg hover:opacity-90 transition-all mb-5 border-none cursor-pointer" style={{ backgroundColor: '#4141fc', opacity: 1 }}>
          Get started for free
          
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

        {/* Command card wrap */}
        <div className="sr relative w-full max-w-[620px] mb-4">
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
          <div
            className="relative z-[2] w-full rounded-[18px] overflow-hidden"
            style={{
              background: isActive ? 'rgba(255,255,255,.97)' : 'rgba(255,255,255,.88)',
              border: isActive ? '1px solid rgba(74,79,253,0.35)' : '1px solid var(--border)',
              boxShadow: isActive
                ? '0 4px 24px rgba(0,0,0,.08), 0 0 0 4px rgba(74,79,253,0.08)'
                : navigating ? '0 12px 48px rgba(0,0,0,.14)' : '0 4px 24px rgba(0,0,0,.06)',
              transform: navigating ? 'scale(1.025)' : 'scale(1)',
              transition: 'transform 0.28s cubic-bezier(.16,1,.3,1), box-shadow 0.28s ease, border-color 0.2s ease',
              cursor: isActive ? 'default' : 'text',
              minHeight: 168,
              height: 168,
            }}
            onClick={!isActive ? handleActivate : undefined}
          >
            {isActive ? (
              /* ── Active / interactive state ── */
              <div key="active" className="flex flex-col h-full">
                <div className="flex items-start gap-2.5 pt-4 px-[18px]">
                  <svg className="w-[17px] h-[17px] flex-shrink-0 mt-[3px]" viewBox="0 0 24 24" fill="none" stroke="var(--light)" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit() }
                    }}
                    rows={2}
                    placeholder="Ask Omni anything about your job search…"
                    className="text-[14.5px] leading-[1.5] flex-1 text-left bg-transparent outline-none resize-none placeholder:text-[color:var(--light)]"
                    style={{ color: 'var(--black)', height: 44, overflowY: 'hidden' }}
                  />
                </div>
                <div className="mt-auto flex items-center justify-between pb-2.5 pr-2.5 pl-[18px] pt-1">
                  <div className="flex items-center gap-0.5">
                    <button type="button" className="w-9 h-9 flex items-center justify-center rounded-full transition-colors hover:bg-black/[0.04]" style={{ color: 'var(--mid)' }}>
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <button type="button" className="w-9 h-9 flex items-center justify-center rounded-full transition-colors hover:bg-black/[0.04]" style={{ color: 'var(--mid)' }}>
                      <Mic className="w-4 h-4" />
                    </button>
                    <button type="button" className="w-9 h-9 flex items-center justify-center rounded-full transition-colors hover:bg-black/[0.04]" style={{ color: 'var(--mid)' }}>
                      <Sparkles className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!inputValue.trim()}
                    className="w-8 h-8 rounded-full border-none flex items-center justify-center transition-all hover:scale-105 disabled:opacity-30"
                    style={{ background: 'var(--black)', cursor: inputValue.trim() ? 'pointer' : 'default' }}
                  >
                    <ArrowUp className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>
            ) : (
              /* ── Animated / teaser state ── */
              <div key="animated" className="flex flex-col h-full">
                <div className="flex items-start gap-2.5 pt-4 px-[18px]">
                  <svg className="w-[17px] h-[17px] flex-shrink-0 mt-[3px]" viewBox="0 0 24 24" fill="none" stroke="var(--light)" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                  <div ref={cmdTextRef} className="text-[14.5px] leading-[1.5] flex-1 text-left" style={{ color: 'var(--black)', height: 44, overflow: 'hidden' }}>
                    <span style={{ display: 'inline-block', width: '1.5px', height: 16, background: 'var(--mid)', verticalAlign: 'text-bottom', marginLeft: 1, animation: 'blink .8s steps(1) infinite' }} />
                  </div>
                </div>
                <div ref={cmdCardsRef} className="px-[18px] pt-3 flex gap-2 flex-wrap overflow-hidden" style={{ opacity: 0, transform: 'translateY(6px)', transition: 'opacity .4s ease, transform .4s ease', height: 44 }} />
                <div className="mt-auto flex items-center justify-between pb-2.5 pr-2.5 pl-[18px] pt-1">
                  <div className="flex items-center gap-0.5">
                    <button type="button" className="w-9 h-9 flex items-center justify-center rounded-full transition-colors hover:bg-black/[0.04]" style={{ color: 'var(--mid)' }}>
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <button type="button" className="w-9 h-9 flex items-center justify-center rounded-full transition-colors hover:bg-black/[0.04]" style={{ color: 'var(--mid)' }}>
                      <Mic className="w-4 h-4" />
                    </button>
                    <button type="button" className="w-9 h-9 flex items-center justify-center rounded-full transition-colors hover:bg-black/[0.04]" style={{ color: 'var(--mid)' }}>
                      <Sparkles className="w-4 h-4" />
                    </button>
                  </div>
                  <button className="w-8 h-8 rounded-full border-none flex items-center justify-center cursor-pointer transition-transform hover:scale-105" style={{ background: 'var(--black)' }}>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="var(--white)" strokeWidth="2.5"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
                  </button>
                </div>
              </div>
            )}
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
