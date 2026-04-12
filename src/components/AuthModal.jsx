import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 5.1 29.3 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.2-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.1l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 5.1 29.3 3 24 3 16.3 3 9.7 7.3 6.3 14.1z"/>
      <path fill="#4CAF50" d="M24 45c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.6 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 40.6 16.2 45 24 45z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.2 5.2C41.3 35.6 45 30.3 45 24c0-1.2-.1-2.3-.4-3.5z"/>
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

export default function AuthModal({ open, mode = 'signin', onClose, onModeChange }) {
  const dialogRef = useRef(null)
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const isSignUp = mode === 'signup'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onClose()
      navigate('/dashboard')
    }, 900)
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-title"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-[#0b0b14]/40 backdrop-blur-sm animate-[fadeIn_.2s_ease-out]"
      />

      <div
        ref={dialogRef}
        className="relative w-full max-w-[420px] rounded-2xl border border-[#ececf3] bg-white p-7 sm:p-8 shadow-[0_24px_64px_rgba(11,11,20,0.18)] animate-[popIn_.22s_ease-out]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[#5b5b6e] hover:bg-black/5 hover:text-[#0b0b14] transition-colors"
        >
          <CloseIcon />
        </button>

        <div className="flex flex-col items-center text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg font-semibold text-white">
            Ω
          </span>
          <h2 id="auth-title" className="mt-4 text-2xl font-semibold tracking-tight text-[#0b0b14]">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="mt-1.5 text-sm text-[#5b5b6e]">
            {isSignUp ? 'Start landing interviews with Omni.' : 'Sign in to continue with Omni.'}
          </p>
        </div>

        <button
          type="button"
          className="mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-[#ececf3] bg-white px-5 py-2.5 text-sm font-medium text-[#0b0b14] hover:bg-black/[0.03] transition-colors"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        <div className="my-5 flex items-center gap-3 text-xs font-medium text-[#9a9aae]">
          <span className="h-px flex-1 bg-[#ececf3]" />
          or
          <span className="h-px flex-1 bg-[#ececf3]" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {isSignUp && (
            <Field
              label="Full name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={(v) => setForm((f) => ({ ...f, name: v }))}
              placeholder="Ada Lovelace"
            />
          )}
          <Field
            label="Email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(v) => setForm((f) => ({ ...f, email: v }))}
            placeholder="you@example.com"
          />
          <Field
            label="Password"
            type="password"
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
            value={form.password}
            onChange={(v) => setForm((f) => ({ ...f, password: v }))}
            placeholder="••••••••"
            trailing={
              !isSignUp ? (
                <a href="#forgot" className="text-xs font-medium text-primary hover:text-primary-hover">
                  Forgot?
                </a>
              ) : null
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(74,79,253,0.25)] hover:bg-primary-hover hover:-translate-y-[1px] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 disabled:opacity-80 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
          >
            {loading && (
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
                <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            )}
            {loading ? (isSignUp ? 'Creating account…' : 'Signing in…') : isSignUp ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-[#5b5b6e]">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => onModeChange(isSignUp ? 'signin' : 'signup')}
            className="font-semibold text-primary hover:text-primary-hover"
          >
            {isSignUp ? 'Sign in' : 'Sign up'}
          </button>
        </p>

        {isSignUp && (
          <p className="mt-4 text-center text-[11px] leading-relaxed text-[#9a9aae]">
            By continuing you agree to our{' '}
            <a href="#terms" className="underline hover:text-[#5b5b6e]">Terms</a> and{' '}
            <a href="#privacy" className="underline hover:text-[#5b5b6e]">Privacy Policy</a>.
          </p>
        )}
      </div>
    </div>
  )
}

function Field({ label, trailing, value, onChange, ...rest }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-center justify-between text-xs font-medium text-[#5b5b6e]">
        {label}
        {trailing}
      </span>
      <input
        {...rest}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-xl border border-[#ececf3] bg-white px-3.5 text-sm text-[#0b0b14] placeholder:text-[#9a9aae] outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/15"
      />
    </label>
  )
}
