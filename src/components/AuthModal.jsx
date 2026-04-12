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

function NaukriIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="naukri-swoosh" x1="24.23" y1="30.22" x2="12.80" y2="17.02" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#265DF5" />
        </linearGradient>
      </defs>
      <path d="M20.3633 39.5C31.1329 39.5 39.8633 30.7696 39.8633 20C39.8633 9.23045 31.1329 0.5 20.3633 0.5C9.59376 0.5 0.863312 9.23045 0.863312 20C0.863312 30.7696 9.59376 39.5 20.3633 39.5Z" fill="#265DF5" />
      <path d="M26.2273 27.2235L26.1838 29.2001L26.0576 34.907V35.1273C16.4142 26.7816 14.7714 24.746 14.4867 24.1273L14.4768 24.1063C14.4425 23.9898 14.4344 23.8672 14.453 23.7471C14.4598 23.7027 14.4692 23.6587 14.481 23.6153C14.4909 23.5802 14.5007 23.5465 14.5133 23.5101C14.6172 23.2371 14.7646 22.9827 14.9496 22.7567C15.0821 22.5855 15.2265 22.4238 15.3817 22.2727C15.7135 21.9446 16.0689 21.6412 16.4451 21.3651C16.6317 21.2248 16.8267 21.0845 17.0329 20.9442C17.4313 20.672 17.862 20.3999 18.3081 20.1347C21.7732 23.367 26.1712 27.1716 26.2273 27.2235Z" fill="url(#naukri-swoosh)" />
      <path d="M26.355 8.47672L26.3115 10.4604L26.2891 11.4424L26.2442 13.4163L26.2217 14.4067L26.1782 16.3819C26.1095 16.41 21.7115 18.1159 18.3221 20.1318C17.876 20.397 17.4467 20.6691 17.0469 20.9413C16.8421 21.0816 16.6457 21.2219 16.4591 21.3622C16.0835 21.6391 15.7282 21.9424 15.3957 22.2698C15.2409 22.4212 15.0966 22.5829 14.9636 22.7538C14.6578 23.1438 14.474 23.5268 14.4474 23.8873L14.4838 22.239V22.2277L14.4909 21.9724V21.8798L14.5203 20.8403L14.5764 18.7794L14.6031 17.7722L14.6592 15.7296C15.3564 12.8705 25.2032 8.92984 26.355 8.47672Z" fill="#fff" />
      <circle cx="17.277" cy="7.768" r="2.894" fill="#fff" />
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

function Spinner({ className = 'h-5 w-5' }) {
  return (
    <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function UploadIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export default function AuthModal({ open, mode = 'signin', onClose, onModeChange }) {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [phase, setPhase] = useState('form') // 'form' | 'fetching' | 'upload' | 'success'
  const [cvFile, setCvFile] = useState(null)

  useEffect(() => {
    if (!open) {
      setPhase('form')
      setCvFile(null)
      setLoading(false)
      return
    }
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  // Auto-advance "fetching" phase
  useEffect(() => {
    if (phase !== 'fetching') return
    const t = setTimeout(() => {
      onClose()
      navigate('/dashboard')
    }, 1800)
    return () => clearTimeout(t)
  }, [phase, navigate, onClose])

  // Auto-advance "success" phase
  useEffect(() => {
    if (phase !== 'success') return
    const t = setTimeout(() => {
      onClose()
      navigate('/dashboard')
    }, 1200)
    return () => clearTimeout(t)
  }, [phase, navigate, onClose])

  if (!open) return null

  const isSignUp = mode === 'signup'

  const signInAndNavigate = () => {
    if (loading) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onClose()
      navigate('/dashboard')
    }, 900)
  }

  const onNaukriClick = () => {
    if (isSignUp) setPhase('fetching')
    else signInAndNavigate()
  }

  const onGoogleClick = () => {
    if (isSignUp) setPhase('upload')
    else signInAndNavigate()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignUp) setPhase('upload')
    else signInAndNavigate()
  }

  const onFileChosen = (e) => {
    const f = e.target.files?.[0]
    if (f) setCvFile(f)
    e.target.value = ''
  }

  const confirmUpload = () => {
    if (!cvFile) return
    setPhase('success')
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

      <div className="relative w-full max-w-[420px] rounded-2xl border border-[#ececf3] bg-white p-7 sm:p-8 shadow-[0_24px_64px_rgba(11,11,20,0.18)] animate-[popIn_.22s_ease-out]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[#5b5b6e] hover:bg-black/5 hover:text-[#0b0b14] transition-colors"
        >
          <CloseIcon />
        </button>

        {phase === 'form' && (
          <FormPhase
            isSignUp={isSignUp}
            form={form}
            setForm={setForm}
            loading={loading}
            onSubmit={handleSubmit}
            onGoogleClick={onGoogleClick}
            onNaukriClick={onNaukriClick}
            onModeChange={onModeChange}
          />
        )}

        {phase === 'fetching' && <FetchingPhase />}
        {phase === 'upload' && (
          <UploadPhase
            cvFile={cvFile}
            onPickFile={() => fileInputRef.current?.click()}
            onClear={() => setCvFile(null)}
            onConfirm={confirmUpload}
          />
        )}
        {phase === 'success' && <SuccessPhase />}

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,application/pdf"
          hidden
          onChange={onFileChosen}
        />
      </div>
    </div>
  )
}

function FormPhase({
  isSignUp,
  form,
  setForm,
  loading,
  onSubmit,
  onGoogleClick,
  onNaukriClick,
  onModeChange,
}) {
  return (
    <>
      <div className="flex flex-col items-center text-center">
        <img src="/logo.png" alt="Omni" className="h-12 w-12 object-contain" />
        <h2 id="auth-title" className="mt-4 text-2xl font-semibold tracking-tight text-[#0b0b14]">
          {isSignUp ? 'Create your account' : 'Welcome back'}
        </h2>
        <p className="mt-1.5 text-sm text-[#5b5b6e]">
          {isSignUp ? 'Start landing interviews with Omni.' : 'Sign in to continue with Omni.'}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <button
          type="button"
          onClick={onGoogleClick}
          className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-[#ececf3] bg-white px-5 py-2.5 text-sm font-medium text-[#0b0b14] hover:bg-black/[0.03] transition-colors"
        >
          <GoogleIcon />
          Continue with Google
        </button>
        <button
          type="button"
          onClick={onNaukriClick}
          className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-[#ececf3] bg-white px-5 py-2.5 text-sm font-medium text-[#0b0b14] hover:bg-black/[0.03] transition-colors"
        >
          <NaukriIcon />
          Continue with Naukri
        </button>
      </div>

      <div className="my-5 flex items-center gap-3 text-xs font-medium text-[#9a9aae]">
        <span className="h-px flex-1 bg-[#ececf3]" />
        or
        <span className="h-px flex-1 bg-[#ececf3]" />
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-3">
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
          {loading && <Spinner className="h-4 w-4" />}
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
    </>
  )
}

function FetchingPhase() {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#265DF5]/20" />
        <NaukriIcon size={56} />
      </div>
      <h2 className="mt-6 text-xl font-semibold tracking-tight text-[#0b0b14]">
        Fetching your profile
      </h2>
      <p className="mt-1.5 max-w-[280px] text-sm text-[#5b5b6e]">
        Pulling your experience, education, and preferences from Naukri…
      </p>
      <div className="mt-6 flex items-center gap-2 text-sm text-[#5b5b6e]">
        <Spinner className="h-4 w-4 text-primary" />
        This will only take a moment
      </div>
    </div>
  )
}

function UploadPhase({ cvFile, onPickFile, onClear, onConfirm }) {
  return (
    <div className="flex flex-col items-center py-2 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <UploadIcon />
      </span>
      <h2 className="mt-5 text-2xl font-semibold tracking-tight text-[#0b0b14]">
        Upload your CV
      </h2>
      <p className="mt-1.5 max-w-[300px] text-sm text-[#5b5b6e]">
        Omni will use it to personalize job matches, resume tips, and interview prep.
      </p>

      {!cvFile ? (
        <button
          type="button"
          onClick={onPickFile}
          className="mt-6 flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#ececf3] bg-[#fafafc] px-5 py-8 text-sm text-[#5b5b6e] hover:border-primary/40 hover:bg-primary/[0.03] hover:text-[#0b0b14] transition-colors"
        >
          <UploadIcon />
          <span className="font-medium">Click to choose a file</span>
          <span className="text-xs text-[#9a9aae]">PDF, DOC, or DOCX · up to 10MB</span>
        </button>
      ) : (
        <div className="mt-6 flex w-full items-center gap-3 rounded-2xl border border-[#ececf3] bg-white px-4 py-3 text-left">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <UploadIcon />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-[#0b0b14]">{cvFile.name}</p>
            <p className="text-xs text-[#9a9aae]">{(cvFile.size / 1024).toFixed(0)} KB</p>
          </div>
          <button
            type="button"
            onClick={onClear}
            aria-label="Remove file"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#9a9aae] hover:bg-black/5 hover:text-[#0b0b14]"
          >
            <CloseIcon />
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={onConfirm}
        disabled={!cvFile}
        className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(74,79,253,0.25)] hover:bg-primary-hover hover:-translate-y-[1px] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
      >
        Continue
      </button>
    </div>
  )
}

function SuccessPhase() {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#DCFCE7] text-[#15803D] animate-[popIn_.3s_ease-out]">
        <CheckIcon />
      </span>
      <h2 className="mt-5 text-xl font-semibold tracking-tight text-[#0b0b14]">
        You're all set!
      </h2>
      <p className="mt-1.5 max-w-[280px] text-sm text-[#5b5b6e]">
        Profile ready. Taking you to your dashboard…
      </p>
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
