import { MessagePrimitive } from '@assistant-ui/react'
import WidgetText from './WidgetText'

export function UserMessage() {
  return (
    <MessagePrimitive.Root className="flex justify-end">
      <div className="max-w-[80%] rounded-2xl bg-primary px-4 py-2.5 text-sm text-white shadow-[0_8px_24px_rgba(74,79,253,0.18)]">
        <MessagePrimitive.Parts />
      </div>
    </MessagePrimitive.Root>
  )
}

export function AssistantMessage() {
  return (
    <MessagePrimitive.Root className="flex items-start gap-3">
      <img src="/logo.png" alt="Omni" className="mt-0.5 h-8 w-8 shrink-0 object-contain" />
      <div className="min-w-0 max-w-[92%] rounded-2xl border border-[#ececf3] bg-white px-4 py-3 text-sm leading-relaxed text-[#0b0b14]">
        <MessagePrimitive.Parts components={{ Text: WidgetText }} />
      </div>
    </MessagePrimitive.Root>
  )
}
