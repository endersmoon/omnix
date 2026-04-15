import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormPhase from './auth/FormPhase'
import FetchingPhase from './auth/FetchingPhase'
import UploadPhase from './auth/UploadPhase'
import SuccessPhase from './auth/SuccessPhase'
import { CloseIcon } from './auth/icons'

export default function AuthModal({ open, mode = 'signin', onClose, onModeChange }) {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [phase, setPhase] = useState('form') // 'form' | 'fetching' | 'upload' | 'success'
  const [cvFile, setCvFile] = useState(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      setPhase('form')
      setCvFile(null)
      setLoading(false)
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
