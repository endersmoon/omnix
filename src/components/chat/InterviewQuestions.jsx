import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function InterviewQuestions({ data }) {
  const { company, questions = [] } = data
  const [idx, setIdx] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  if (!questions.length) return null
  const q = questions[idx]

  const go = (next) => {
    setIdx(next)
    setShowAnswer(false)
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#ececf3] bg-white shadow-[0_8px_24px_rgba(11,11,20,0.04)]">
      <div className="flex items-center justify-between border-b border-[#ececf3] bg-gradient-to-r from-primary/[0.06] to-primary/[0.02] px-4 py-3">
        <span className="text-sm font-semibold text-[#0b0b14]">Interview Questions</span>
        <span className="rounded-full border border-primary/15 bg-white px-2 py-0.5 text-[11px] font-semibold text-primary">
          {company}
        </span>
      </div>

      <div className="flex items-center justify-center gap-1.5 pt-3">
        {questions.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => go(i)}
            aria-label={`Question ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === idx ? 'w-6 bg-primary' : 'w-1.5 bg-[#ececf3] hover:bg-[#d4d4df]'
            }`}
          />
        ))}
      </div>

      <div className="px-4 pb-4 pt-3">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9a9aae]">
          Q{idx + 1} of {questions.length} · {q.tag ?? 'Behavioral'}
        </span>
        <p className="mt-2 text-sm font-medium leading-relaxed text-[#0b0b14]">{q.question}</p>

        <button
          type="button"
          onClick={() => setShowAnswer((v) => !v)}
          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover"
        >
          <ChevronRight
            className={`h-3 w-3 transition-transform ${showAnswer ? 'rotate-90' : ''}`}
          />
          {showAnswer ? 'Hide sample answer' : 'Show sample answer'}
        </button>

        {showAnswer && (
          <div className="mt-2 rounded-xl border border-[#ececf3] bg-[#fafafc] p-3 text-[12px] leading-relaxed text-[#5b5b6e]">
            {q.answer}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-[#ececf3] bg-[#fafafc] px-3 py-2">
        <button
          type="button"
          onClick={() => idx > 0 && go(idx - 1)}
          disabled={idx === 0}
          className="inline-flex items-center gap-1 rounded-full border border-[#ececf3] bg-white px-3 py-1 text-[11px] font-medium text-[#5b5b6e] transition-colors hover:text-[#0b0b14] disabled:opacity-30"
        >
          <ChevronLeft className="h-3 w-3" />
          Prev
        </button>
        <span className="text-[11px] text-[#9a9aae]">
          {idx + 1} / {questions.length}
        </span>
        <button
          type="button"
          onClick={() => idx < questions.length - 1 && go(idx + 1)}
          disabled={idx === questions.length - 1}
          className="inline-flex items-center gap-1 rounded-full border border-[#ececf3] bg-white px-3 py-1 text-[11px] font-medium text-[#5b5b6e] transition-colors hover:text-[#0b0b14] disabled:opacity-30"
        >
          Next
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}
