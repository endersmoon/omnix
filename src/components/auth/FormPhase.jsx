import Field from './Field'
import { GoogleIcon, NaukriIcon, Spinner } from './icons'

export default function FormPhase({
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
