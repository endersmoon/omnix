import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  AssistantRuntimeProvider,
  useExternalStoreRuntime,
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
import { MOCK_CHAT_BY_ID } from './mockChats'
import {
  ArrowUp,
  Briefcase,
  Building2,
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
import JobCard from '../components/chat/JobCard'
import CompanyInsights from '../components/chat/CompanyInsights'
import InterviewQuestions from '../components/chat/InterviewQuestions'
import { SAMPLE_COMPANY, SAMPLE_INTERVIEW, SAMPLE_JOBS } from '../components/chat/widgetFixtures'

const WIDGET_RE = /::widget:(\w+)::([\s\S]*?)::end::/

const CANNED_REPLIES = [
  "Here's a solid starting point — tell me the role or company you're targeting and I'll tailor the plan.",
  "Good question. For a prototype answer: I'd break this into three moves — research, resume tailoring, and interview rehearsal. Which do you want to start with?",
  "I can help draft that. Share a job description or a rough outline and I'll turn it into a crisp bullet list.",
  "Great — let's prep for that interview. I'll role-play the interviewer; reply with the first question you want to practice.",
]

function widgetReply(kind, payload, intro) {
  return `${intro}\n\n::widget:${kind}::${JSON.stringify(payload)}::end::`
}

function resolveWidgetReply(text) {
  const t = text.toLowerCase()
  if (/\b(job|role|opening|hiring|position)s?\b/.test(t)) {
    return widgetReply(
      'jobs',
      SAMPLE_JOBS,
      "Here are three roles that match your profile — I sorted them by match score.",
    )
  }
  if (/\b(company|culture|review|glassdoor|ambitionbox)\b/.test(t)) {
    return widgetReply(
      'company',
      SAMPLE_COMPANY,
      `Here's a snapshot of ${SAMPLE_COMPANY.company} based on recent employee reviews.`,
    )
  }
  if (/\b(interview|mock|behavioral|system design)\b/.test(t)) {
    return widgetReply(
      'interview',
      SAMPLE_INTERVIEW,
      `I pulled ${SAMPLE_INTERVIEW.questions.length} recent ${SAMPLE_INTERVIEW.company} interview questions. Flip through and tap "Show sample answer" when you want a hint.`,
    )
  }
  return null
}

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

function appendMessageText(msg) {
  if (typeof msg.content === 'string') return msg.content
  return (msg.content ?? [])
    .map((p) => (p.type === 'text' ? p.text : ''))
    .filter(Boolean)
    .join(' ')
}

async function* streamReply(userText, turnIndex) {
  const widget = resolveWidgetReply(userText)
  const full = widget ?? CANNED_REPLIES[turnIndex % CANNED_REPLIES.length]
  const [prefix, marker] = widget ? full.split('\n\n') : [full, null]
  const words = prefix.split(' ')
  let text = ''
  for (const word of words) {
    await new Promise((r) => setTimeout(r, widget ? 25 : 35))
    text += (text ? ' ' : '') + word
    yield text
  }
  if (marker) yield `${prefix}\n\n${marker}`
}

function WidgetText({ text }) {
  const match = text.match(WIDGET_RE)
  if (!match) {
    return <span className="whitespace-pre-wrap">{text}</span>
  }

  const prefix = text.slice(0, match.index).trimEnd()
  let payload
  try {
    payload = JSON.parse(match[2])
  } catch {
    return <span className="whitespace-pre-wrap">{prefix}</span>
  }
  const kind = match[1]

  return (
    <div className="flex flex-col gap-3">
      {prefix && <span className="whitespace-pre-wrap">{prefix}</span>}
      {kind === 'jobs' && (
        <div className="-mx-1 mt-1 flex flex-col gap-2.5">
          {payload.map((job) => (
            <JobCard key={job.title} job={job} />
          ))}
        </div>
      )}
      {kind === 'company' && <CompanyInsights data={payload} />}
      {kind === 'interview' && <InterviewQuestions data={payload} />}
    </div>
  )
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
      <div className="min-w-0 max-w-[92%] rounded-2xl border border-[#ececf3] bg-white px-4 py-3 text-sm leading-relaxed text-[#0b0b14]">
        <MessagePrimitive.Parts components={{ Text: WidgetText }} />
      </div>
    </MessagePrimitive.Root>
  )
}

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
    icon: Building2,
    title: 'Company deep-dive',
    subtitle: 'Reviews, ratings, pros & cons',
    prompt: 'Give me a company review and ratings breakdown for Linear.',
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
        {SUGGESTION_CARDS.map((card) => {
          const Icon = card.icon
          return (
            <ThreadPrimitive.Suggestion
              key={card.title}
              prompt={card.prompt}
              send
              className="group flex flex-col items-start gap-2 rounded-2xl border border-[#ececf3] bg-white p-4 text-left transition-all hover:-translate-y-[1px] hover:border-primary/40 hover:bg-primary/[0.03] hover:shadow-[0_8px_24px_rgba(74,79,253,0.08)]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-sm font-semibold text-[#0b0b14]">{card.title}</span>
              <span className="text-xs leading-relaxed text-[#5b5b6e]">{card.subtitle}</span>
            </ThreadPrimitive.Suggestion>
          )
        })}
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
      <AuiIf condition={(s) => s.thread.isEmpty}>
        <div className="flex flex-1 flex-col overflow-y-auto">
          <Welcome />
        </div>
      </AuiIf>

      <AuiIf condition={(s) => !s.thread.isEmpty}>
        <ThreadPrimitive.Viewport className="flex flex-1 flex-col overflow-y-auto">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6">
            <ThreadPrimitive.Messages
              components={{ UserMessage, AssistantMessage }}
            />
          </div>
        </ThreadPrimitive.Viewport>
      </AuiIf>

      <div className="shrink-0 bg-gradient-to-t from-white via-white to-white/0 px-4 pb-8 pt-3 sm:pb-6">
        <Composer />
        <p className="mt-2 text-center text-[11px] text-[#9a9aae]">
          Prototype — responses are dummy replies.
        </p>
      </div>
    </ThreadPrimitive.Root>
  )
}

let messageIdCounter = 0
const nextMessageId = () => `m-${++messageIdCounter}`

function withIds(messages) {
  return messages.map((m) => ({ id: nextMessageId(), ...m }))
}

const convertMessage = (message) => ({
  role: message.role,
  content: [{ type: 'text', text: message.content }],
  id: message.id,
})

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams()
  const chatId = searchParams.get('chat')
  const [messages, setMessages] = useState(() =>
    chatId && MOCK_CHAT_BY_ID[chatId] ? withIds(MOCK_CHAT_BY_ID[chatId].messages) : [],
  )
  const [isRunning, setIsRunning] = useState(false)
  const loadedChatIdRef = useRef(chatId ?? null)

  useEffect(() => {
    if (chatId === loadedChatIdRef.current) return
    loadedChatIdRef.current = chatId ?? null
    if (chatId && MOCK_CHAT_BY_ID[chatId]) {
      setMessages(withIds(MOCK_CHAT_BY_ID[chatId].messages))
    } else {
      setMessages([])
    }
    setIsRunning(false)
  }, [chatId])

  const onNew = useCallback(
    async (message) => {
      // When starting a brand-new conversation from an existing mock, clear the URL param
      // so we don't keep flashing the mock back in.
      if (chatId) {
        setSearchParams({}, { replace: true })
        loadedChatIdRef.current = null
      }

      const userMsg = {
        id: nextMessageId(),
        role: 'user',
        content: appendMessageText(message),
      }
      const assistantId = nextMessageId()
      setMessages((prev) => [
        ...prev,
        userMsg,
        { id: assistantId, role: 'assistant', content: '' },
      ])
      setIsRunning(true)

      try {
        for await (const chunk of streamReply(userMsg.content, messages.length)) {
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantId ? { ...m, content: chunk } : m)),
          )
        }
      } finally {
        setIsRunning(false)
      }
    },
    [chatId, messages.length, setSearchParams],
  )

  const adapter = useMemo(
    () => ({
      messages,
      isRunning,
      onNew,
      convertMessage,
      adapters: {
        attachments: new CompositeAttachmentAdapter([
          new SimpleImageAttachmentAdapter(),
          new SimpleTextAttachmentAdapter(),
          pdfAttachmentAdapter,
        ]),
      },
    }),
    [messages, isRunning, onNew],
  )

  const runtime = useExternalStoreRuntime(adapter)

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <DashboardLayout>
        <Thread />
      </DashboardLayout>
    </AssistantRuntimeProvider>
  )
}
