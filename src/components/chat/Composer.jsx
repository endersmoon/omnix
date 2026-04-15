import { useEffect, useMemo, useRef, useState } from 'react'
import {
  AttachmentPrimitive,
  ComposerPrimitive,
  useAui,
} from '@assistant-ui/react'
import {
  ArrowUp,
  FileText,
  Mic,
  MicOff,
  Paperclip,
  Sparkles,
  X,
} from 'lucide-react'
import Tooltip from './Tooltip'
import { SLASH_COMMANDS } from '../../data/dashboardContent'

const SpeechRecognitionCtor =
  typeof window !== 'undefined'
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : null

function useVoiceInput(onTranscript) {
  const recognitionRef = useRef(null)
  const [listening, setListening] = useState(false)
  const supported = Boolean(SpeechRecognitionCtor)

  useEffect(() => {
    if (!SpeechRecognitionCtor) return
    const rec = new SpeechRecognitionCtor()
    rec.continuous = false
    rec.interimResults = false
    rec.lang = 'en-US'
    rec.onresult = (e) => {
      const transcript = Array.from(e.results)
        .map((r) => r[0].transcript)
        .join(' ')
        .trim()
      if (transcript) onTranscript(transcript)
    }
    rec.onend = () => setListening(false)
    rec.onerror = () => setListening(false)
    recognitionRef.current = rec
    return () => {
      try {
        rec.stop()
      } catch {
        // already stopped
      }
    }
  }, [onTranscript])

  const toggle = () => {
    const rec = recognitionRef.current
    if (!rec) return
    if (listening) {
      rec.stop()
      setListening(false)
    } else {
      try {
        rec.start()
        setListening(true)
      } catch {
        // recognizer already running
      }
    }
  }

  return { listening, supported, toggle }
}

function ComposerAttachment({ attachment }) {
  const isImage = attachment?.type === 'image'
  return (
    <AttachmentPrimitive.Root className="relative">
      <AttachmentPrimitive.unstable_Thumb
        className={`flex size-16 items-center justify-center overflow-hidden rounded-2xl border ${
          isImage
            ? 'border-primary/20 bg-primary/10 text-primary'
            : 'border-[#ececf3] bg-white text-[#5b5b6e]'
        }`}
      >
        {!isImage && <FileText className="h-6 w-6" />}
      </AttachmentPrimitive.unstable_Thumb>
      <AttachmentPrimitive.Remove
        aria-label="Remove attachment"
        className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-[#ececf3] bg-white text-[#5b5b6e] shadow-[0_1px_2px_rgba(11,11,20,0.08)] hover:text-[#0b0b14]"
      >
        <X className="h-3 w-3" />
      </AttachmentPrimitive.Remove>
    </AttachmentPrimitive.Root>
  )
}

export default function Composer() {
  const aui = useAui()
  const inputRef = useRef(null)
  const [slashOpen, setSlashOpen] = useState(false)
  const [slashQuery, setSlashQuery] = useState('')
  const [slashIdx, setSlashIdx] = useState(0)

  const filteredCommands = useMemo(() => {
    const q = slashQuery.toLowerCase()
    if (!q) return SLASH_COMMANDS
    return SLASH_COMMANDS.filter(
      (c) => c.slug.slice(1).startsWith(q) || c.label.toLowerCase().includes(q),
    )
  }, [slashQuery])

  const safeIdx = filteredCommands.length
    ? Math.min(slashIdx, filteredCommands.length - 1)
    : 0

  const closeSlash = () => {
    setSlashOpen(false)
    setSlashQuery('')
    setSlashIdx(0)
  }

  const { listening, supported, toggle } = useVoiceInput((transcript) => {
    const current = aui.composer().getState().text ?? ''
    const next = current ? `${current} ${transcript}` : transcript
    aui.composer().setText(next)
  })

  const selectCommand = (cmd) => {
    if (!cmd) return
    aui.composer().setText(cmd.prompt ?? '')
    closeSlash()
    requestAnimationFrame(() => {
      inputRef.current?.focus()
    })
  }

  const handleKeyDown = (e) => {
    if (slashOpen) {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeSlash()
        return
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSlashIdx((i) => (filteredCommands.length ? (i + 1) % filteredCommands.length : 0))
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSlashIdx((i) =>
          filteredCommands.length
            ? (i - 1 + filteredCommands.length) % filteredCommands.length
            : 0,
        )
        return
      }
      if (e.key === 'Enter' && !e.shiftKey) {
        if (filteredCommands.length) {
          e.preventDefault()
          e.stopPropagation()
          selectCommand(filteredCommands[safeIdx])
        }
        return
      }
    }
    if (e.key === '/' && !slashOpen) {
      const text = aui.composer().getState().text ?? ''
      if (text.trim() === '') {
        setSlashOpen(true)
        setSlashQuery('')
        setSlashIdx(0)
      }
    }
  }

  const handleInput = (e) => {
    const text = e.currentTarget.value
    if (slashOpen) {
      if (text.startsWith('/')) {
        setSlashQuery(text.slice(1).toLowerCase())
        setSlashIdx(0)
      } else {
        closeSlash()
      }
    }
  }

  return (
    <div
      className="relative mx-auto w-full max-w-3xl"
      onKeyDownCapture={handleKeyDown}
      onInputCapture={handleInput}
    >
      {slashOpen && filteredCommands.length > 0 && (
        <div className="absolute bottom-full left-0 right-0 mb-2 overflow-hidden rounded-2xl border border-[#ececf3] bg-white shadow-[0_20px_48px_rgba(11,11,20,0.12)]">
          <div className="flex items-center gap-2 border-b border-[#ececf3] px-4 py-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9a9aae]">
              Quick Actions
            </span>
            <span className="rounded-md border border-[#ececf3] bg-[#f5f5fa] px-1.5 py-0.5 font-mono text-[11px] text-[#5b5b6e]">
              /
            </span>
          </div>
          <ul className="max-h-80 overflow-y-auto py-1">
            {filteredCommands.map((cmd, i) => {
              const Icon = cmd.icon
              const active = i === safeIdx
              return (
                <li key={cmd.slug}>
                  <button
                    type="button"
                    onMouseEnter={() => setSlashIdx(i)}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      selectCommand(cmd)
                    }}
                    className={`flex w-full items-start gap-3 px-4 py-2.5 text-left transition-colors ${
                      active ? 'bg-[#f5f5fa]' : 'bg-white'
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white ${cmd.tint}`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[#0b0b14]">{cmd.label}</span>
                        <span className="font-mono text-[11px] text-[#9a9aae]">{cmd.slug}</span>
                      </span>
                      <span className="mt-0.5 block text-xs text-[#5b5b6e]">{cmd.desc}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      <ComposerPrimitive.Root className="flex w-full flex-col rounded-3xl border border-[#ececf3] bg-white shadow-[0_8px_24px_rgba(11,11,20,0.06)] focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/10 transition-all">
        <div className="flex flex-wrap gap-2 empty:hidden px-4 pt-3">
          <ComposerPrimitive.Attachments>
            {({ attachment }) => <ComposerAttachment attachment={attachment} />}
          </ComposerPrimitive.Attachments>
        </div>

      <ComposerPrimitive.Input
        ref={inputRef}
        placeholder={listening ? 'Listening…' : 'Ask Omni anything about your job search… (press / for quick actions)'}
        rows={1}
        onBlur={() => closeSlash()}
        className="max-h-40 min-h-12 w-full resize-none bg-transparent px-5 pt-3.5 pb-1 text-sm text-[#0b0b14] outline-none placeholder:text-[#9a9aae]"
      />

      <div className="flex items-center justify-between pl-2.5 pr-3 pb-2.5">
        <div className="flex items-center gap-1">
          <Tooltip label="Attach files">
            <ComposerPrimitive.AddAttachment
              aria-label="Attach files"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#5b5b6e] hover:bg-black/[0.04] hover:text-[#0b0b14] transition-colors"
            >
              <Paperclip className="h-4 w-4" />
            </ComposerPrimitive.AddAttachment>
          </Tooltip>
          {supported && (
            <Tooltip label={listening ? 'Stop voice input' : 'Voice input'}>
              <button
                type="button"
                onClick={toggle}
                aria-label={listening ? 'Stop voice input' : 'Start voice input'}
                aria-pressed={listening}
                className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                  listening
                    ? 'bg-primary/10 text-primary animate-pulse'
                    : 'text-[#5b5b6e] hover:bg-black/[0.04] hover:text-[#0b0b14]'
                }`}
              >
                {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>
            </Tooltip>
          )}
          <Tooltip label="Quick actions (/)">
            <button
              type="button"
              aria-label="Quick actions"
              aria-pressed={slashOpen}
              onMouseDown={(e) => {
                e.preventDefault()
                if (slashOpen) {
                  closeSlash()
                  return
                }
                aui.composer().setText('/')
                setSlashOpen(true)
                setSlashQuery('')
                setSlashIdx(0)
                requestAnimationFrame(() => inputRef.current?.focus())
              }}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                slashOpen
                  ? 'bg-primary/10 text-primary'
                  : 'text-[#5b5b6e] hover:bg-black/[0.04] hover:text-[#0b0b14]'
              }`}
            >
              <Sparkles className="h-4 w-4" />
            </button>
          </Tooltip>
        </div>

        <Tooltip label="Send message">
          <ComposerPrimitive.Send
            aria-label="Send message"
            className="flex size-9 items-center justify-center rounded-full bg-primary text-white shadow-[0_8px_24px_rgba(74,79,253,0.25)] transition-opacity hover:bg-primary-hover disabled:cursor-default"
          >
            <ArrowUp className="h-4 w-4" />
          </ComposerPrimitive.Send>
        </Tooltip>
      </div>

    </ComposerPrimitive.Root>
    </div>
  )
}
