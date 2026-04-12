import { useEffect, useRef, useState } from 'react'
import {
  AssistantRuntimeProvider,
  useLocalRuntime,
  useAui,
  AuiIf,
  ThreadPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
  AttachmentPrimitive,
  CompositeAttachmentAdapter,
  SimpleImageAttachmentAdapter,
  SimpleTextAttachmentAdapter,
} from '@assistant-ui/react'
import {
  ArrowUp,
  Briefcase,
  FileText,
  MessageSquare,
  Mic,
  MicOff,
  Paperclip,
  Search,
  Send,
  Sparkles,
  Target,
  X,
} from 'lucide-react'
import DashboardLayout from './DashboardLayout'

const CANNED_REPLIES = [
  "Here's a solid starting point — tell me the role or company you're targeting and I'll tailor the plan.",
  "Good question. For a prototype answer: I'd break this into three moves — research, resume tailoring, and interview rehearsal. Which do you want to start with?",
  "I can help draft that. Share a job description or a rough outline and I'll turn it into a crisp bullet list.",
  "Great — let's prep for that interview. I'll role-play the interviewer; reply with the first question you want to practice.",
]

const pdfAttachmentAdapter = {
  accept: 'application/pdf,.pdf',
  async add({ file }) {
    return {
      id: crypto.randomUUID(),
      type: 'document',
      name: file.name,
      contentType: file.type,
      file,
      status: { type: 'requires-action', reason: 'composer-send' },
    }
  },
  async send(attachment) {
    return {
      ...attachment,
      status: { type: 'complete' },
      content: [{ type: 'text', text: `[PDF Document: ${attachment.name}]` }],
    }
  },
  async remove() {},
}

const dummyAdapter = {
  async *run({ messages, abortSignal }) {
    const reply = CANNED_REPLIES[messages.length % CANNED_REPLIES.length]
    const words = reply.split(' ')
    let text = ''
    for (const word of words) {
      if (abortSignal.aborted) return
      await new Promise((r) => setTimeout(r, 40))
      text += (text ? ' ' : '') + word
      yield { content: [{ type: 'text', text }] }
    }
  },
}

function UserMessage() {
  return (
    <MessagePrimitive.Root className="flex justify-end">
      <div className="max-w-[80%] rounded-2xl bg-primary px-4 py-2.5 text-sm text-white shadow-[0_8px_24px_rgba(74,79,253,0.18)]">
        <MessagePrimitive.Parts />
      </div>
    </MessagePrimitive.Root>
  )
}

function AssistantMessage() {
  return (
    <MessagePrimitive.Root className="flex items-start gap-3">
      <img src="/logo.png" alt="Omni" className="mt-0.5 h-8 w-8 shrink-0 object-contain" />
      <div className="max-w-[80%] rounded-2xl border border-[#ececf3] bg-white px-4 py-2.5 text-sm leading-relaxed text-[#0b0b14]">
        <MessagePrimitive.Parts />
      </div>
    </MessagePrimitive.Root>
  )
}

function useVoiceInput(onTranscript) {
  const recognitionRef = useRef(null)
  const [listening, setListening] = useState(false)
  const [supported, setSupported] = useState(false)

  useEffect(() => {
    const SR =
      typeof window !== 'undefined' &&
      (window.SpeechRecognition || window.webkitSpeechRecognition)
    if (!SR) return
    setSupported(true)
    const rec = new SR()
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
      } catch {}
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
      } catch {}
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

function Composer() {
  const aui = useAui()

  const { listening, supported, toggle } = useVoiceInput((transcript) => {
    const current = aui.composer().getState().text ?? ''
    const next = current ? `${current} ${transcript}` : transcript
    aui.composer().setText(next)
  })

  return (
    <ComposerPrimitive.Root className="mx-auto flex w-full max-w-3xl flex-col rounded-3xl border border-[#ececf3] bg-white shadow-[0_8px_24px_rgba(11,11,20,0.06)] focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/10 transition-all">
        <div className="flex flex-wrap gap-2 empty:hidden px-4 pt-3">
          <ComposerPrimitive.Attachments>
            {({ attachment }) => <ComposerAttachment attachment={attachment} />}
          </ComposerPrimitive.Attachments>
        </div>

      <ComposerPrimitive.Input
        placeholder={listening ? 'Listening…' : 'Ask Omni anything about your job search…'}
        rows={1}
        className="max-h-40 min-h-12 w-full resize-none bg-transparent px-5 pt-3.5 pb-1 text-sm text-[#0b0b14] outline-none placeholder:text-[#9a9aae]"
      />

      <div className="flex items-center justify-between px-2.5 pb-2.5">
        <div className="flex items-center gap-1">
          <ComposerPrimitive.AddAttachment
            aria-label="Attach files"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#5b5b6e] hover:bg-black/[0.04] hover:text-[#0b0b14] transition-colors"
          >
            <Paperclip className="h-4 w-4" />
          </ComposerPrimitive.AddAttachment>
          {supported && (
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
          )}
        </div>

        <ComposerPrimitive.Send className="flex size-9 items-center justify-center rounded-full bg-primary text-white shadow-[0_8px_24px_rgba(74,79,253,0.25)] transition-opacity hover:bg-primary-hover disabled:opacity-30">
          <ArrowUp className="h-4 w-4" />
        </ComposerPrimitive.Send>
      </div>
    </ComposerPrimitive.Root>
  )
}

const SUGGESTION_CARDS = [
  {
    icon: Search,
    title: 'Find matching roles',
    subtitle: 'Senior frontend jobs in NYC, remote-friendly',
    prompt: 'Find senior frontend engineer roles in NYC that are remote-friendly and pay above $180k.',
  },
  {
    icon: FileText,
    title: 'Tailor my resume',
    subtitle: 'Rewrite bullets for a Stripe PM role',
    prompt: 'Rewrite my resume bullets to target a Product Manager role at Stripe.',
  },
  {
    icon: MessageSquare,
    title: 'Mock interview',
    subtitle: 'Behavioral round for a staff engineer',
    prompt: 'Run a mock behavioral interview for a staff engineer role. Start with the first question.',
  },
  {
    icon: Briefcase,
    title: 'Research a company',
    subtitle: 'Culture, recent news, and interview style',
    prompt: 'Give me a briefing on Linear — culture, recent news, and what interviews there are like.',
  },
  {
    icon: Send,
    title: 'Cold outreach',
    subtitle: 'Message a recruiter on LinkedIn',
    prompt: 'Draft a short, friendly LinkedIn message to a recruiter at Vercel introducing myself.',
  },
  {
    icon: Target,
    title: 'Plan my week',
    subtitle: 'Daily job-search checklist',
    prompt: 'Build me a 7-day job search plan with daily tasks — applications, networking, and prep.',
  },
]

const QUICK_CHIPS = [
  'Summarize this JD',
  'Improve this bullet',
  'Negotiate an offer',
  'Prep system design',
]

function Welcome() {
  return (
    <div className="flex grow flex-col items-center justify-center px-4 py-16 text-center">
      <img src="/logo-wink.gif" alt="Omni" className="h-40 w-40 object-contain" />
      <h1 className="mt-5 text-3xl font-semibold tracking-tight text-[#0b0b14]">
        How can I help you get hired?
      </h1>
      <p className="mt-2 flex items-center gap-1.5 text-sm text-[#5b5b6e]">
        <Sparkles className="h-4 w-4 text-primary" />
        Ask about roles, resumes, interviews, or companies.
      </p>

      <div className="mt-8 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SUGGESTION_CARDS.map(({ icon: Icon, title, subtitle, prompt }) => (
          <ThreadPrimitive.Suggestion
            key={title}
            prompt={prompt}
            send
            className="group flex flex-col items-start gap-2 rounded-2xl border border-[#ececf3] bg-white p-4 text-left transition-all hover:-translate-y-[1px] hover:border-primary/40 hover:bg-primary/[0.03] hover:shadow-[0_8px_24px_rgba(74,79,253,0.08)]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <Icon className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-[#0b0b14]">{title}</span>
            <span className="text-xs leading-relaxed text-[#5b5b6e]">{subtitle}</span>
          </ThreadPrimitive.Suggestion>
        ))}
      </div>

      <div className="mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-2">
        {QUICK_CHIPS.map((c) => (
          <ThreadPrimitive.Suggestion
            key={c}
            prompt={c}
            send
            className="rounded-full border border-[#ececf3] bg-white px-3.5 py-1.5 text-xs font-medium text-[#5b5b6e] transition-colors hover:border-primary/40 hover:bg-primary/[0.03] hover:text-[#0b0b14]"
          >
            {c}
          </ThreadPrimitive.Suggestion>
        ))}
      </div>
    </div>
  )
}

function Thread() {
  return (
    <ThreadPrimitive.Root className="flex h-full flex-col bg-white">
      <ThreadPrimitive.Viewport className="flex flex-1 flex-col overflow-y-auto">
        <AuiIf condition={(s) => s.thread.isEmpty}>
          <Welcome />
        </AuiIf>

        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6">
          <ThreadPrimitive.Messages
            components={{ UserMessage, AssistantMessage }}
          />
        </div>

        <ThreadPrimitive.ViewportFooter className="sticky bottom-0 mt-auto bg-gradient-to-t from-white via-white to-white/0 px-4 pb-5 pt-3">
          <Composer />
          <p className="mt-2 text-center text-[11px] text-[#9a9aae]">
            Prototype — responses are dummy replies.
          </p>
        </ThreadPrimitive.ViewportFooter>
      </ThreadPrimitive.Viewport>
    </ThreadPrimitive.Root>
  )
}

export default function Dashboard() {
  const runtime = useLocalRuntime(dummyAdapter, {
    adapters: {
      attachments: new CompositeAttachmentAdapter([
        new SimpleImageAttachmentAdapter(),
        new SimpleTextAttachmentAdapter(),
        pdfAttachmentAdapter,
      ]),
    },
  })

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <DashboardLayout>
        <Thread />
      </DashboardLayout>
    </AssistantRuntimeProvider>
  )
}
