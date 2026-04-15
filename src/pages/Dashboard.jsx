import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useOutletContext, useSearchParams } from 'react-router-dom'
import {
  AssistantRuntimeProvider,
  AuiIf,
  CompositeAttachmentAdapter,
  SimpleImageAttachmentAdapter,
  SimpleTextAttachmentAdapter,
  ThreadPrimitive,
  useExternalStoreRuntime,
} from '@assistant-ui/react'
import { MOCK_CHAT_BY_ID } from './mockChats'
import SignupModal from '../components/SignupModal'
import Composer from '../components/chat/Composer'
import Welcome from '../components/chat/Welcome'
import { AssistantMessage, UserMessage } from '../components/chat/ChatMessages'
import { SAMPLE_COMPANY, SAMPLE_INTERVIEW, SAMPLE_JOBS } from '../components/chat/widgetFixtures'
import { CANNED_REPLIES } from '../data/dashboardContent'

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
  const ctx = useOutletContext() ?? {}
  const isGuest = ctx.isGuest ?? false
  const [searchParams, setSearchParams] = useSearchParams()
  const chatId = searchParams.get('chat')
  const [messages, setMessages] = useState(() =>
    chatId && MOCK_CHAT_BY_ID[chatId] ? withIds(MOCK_CHAT_BY_ID[chatId].messages) : [],
  )
  const [isRunning, setIsRunning] = useState(false)
  const loadedChatIdRef = useRef(chatId ?? null)
  const userMsgCountRef = useRef(0)
  const [showSignup, setShowSignup] = useState(false)
  const onNewRef = useRef(null)
  const heroQueryRef = useRef(new URLSearchParams(window.location.search).get('q') ?? '')

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

      if (isGuest && !message.fromHero) {
        userMsgCountRef.current += 1
        if (userMsgCountRef.current === 2) setShowSignup(true)
      }

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
    [chatId, isGuest, messages.length, setSearchParams],
  )

  // Keep ref current so the auto-send effect always calls latest version
  useEffect(() => { onNewRef.current = onNew }, [onNew])

  // Auto-send initial query from landing-page hero input (?q=...)
  // heroQueryRef guards against Strict Mode double-invocation (timer-based approaches
  // are unreliable because cleanup cancels timers before they fire in dev Strict Mode).
  useEffect(() => {
    const q = heroQueryRef.current
    if (!q) return
    heroQueryRef.current = '' // consume so second Strict Mode invocation is a no-op
    setSearchParams(p => { const n = new URLSearchParams(p); n.delete('q'); return n }, { replace: true })
    onNewRef.current?.({ content: [{ type: 'text', text: q }], fromHero: true })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
      <Thread />
      {showSignup && <SignupModal onDismiss={() => setShowSignup(false)} />}
    </AssistantRuntimeProvider>
  )
}
