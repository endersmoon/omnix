import { ThreadPrimitive } from '@assistant-ui/react'
import { Sparkles } from 'lucide-react'
import { QUICK_CHIPS, SUGGESTION_CARDS } from '../../data/dashboardContent'

export default function Welcome() {
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
