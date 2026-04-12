import { Star } from 'lucide-react'

function initials(name = '') {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

function gradient(name = '') {
  const g = [
    'from-[#4141fc] to-[#8b5cf6]',
    'from-[#0ea5e9] to-[#4141fc]',
    'from-[#10b981] to-[#0891b2]',
    'from-[#ec4899] to-[#8b5cf6]',
  ]
  return g[(name.charCodeAt(0) || 0) % g.length]
}

function barTone(v) {
  if (v >= 4) return 'bg-[#16a34a]'
  if (v >= 3.5) return 'bg-[#d97706]'
  return 'bg-[#e11d48]'
}

function Stars({ value }) {
  const full = Math.floor(value)
  const half = value - full >= 0.3
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full || (i === full && half)
        return (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${filled ? 'fill-[#f59e0b] text-[#f59e0b]' : 'text-[#ececf3]'}`}
          />
        )
      })}
    </div>
  )
}

export default function CompanyInsights({ data }) {
  const { company, rating, reviewCount, ratings = {}, pros = [], cons = [] } = data

  return (
    <div className="rounded-2xl border border-[#ececf3] bg-white p-4 shadow-[0_8px_24px_rgba(11,11,20,0.04)]">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-semibold text-white ${gradient(company)}`}
        >
          {initials(company)}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[15px] font-semibold text-[#0b0b14]">{company}</h3>
          <div className="mt-1 flex items-center gap-2">
            <Stars value={rating} />
            <span className="text-[11px] text-[#5b5b6e]">
              {rating.toFixed(1)} · {reviewCount.toLocaleString()} reviews
            </span>
          </div>
        </div>
        <span className="rounded-full border border-primary/15 bg-primary/[0.06] px-2 py-0.5 text-[10px] font-semibold text-primary">
          Company Intel
        </span>
      </div>

      {Object.keys(ratings).length > 0 && (
        <div className="mt-4 space-y-2">
          {Object.entries(ratings).map(([label, value]) => (
            <div key={label} className="flex items-center gap-2">
              <span className="w-28 shrink-0 truncate text-[11px] text-[#5b5b6e]">{label}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#f1f1f7]">
                <div
                  className={`h-full rounded-full ${barTone(value)}`}
                  style={{ width: `${(value / 5) * 100}%` }}
                />
              </div>
              <span className="w-7 text-right text-[11px] font-semibold text-[#0b0b14]">
                {value.toFixed(1)}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#16a34a]">
            Pros
          </p>
          <ul className="space-y-1">
            {pros.slice(0, 3).map((p) => (
              <li key={p} className="text-[12px] leading-relaxed text-[#5b5b6e]">
                • {p}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#e11d48]">
            Cons
          </p>
          <ul className="space-y-1">
            {cons.slice(0, 3).map((c) => (
              <li key={c} className="text-[12px] leading-relaxed text-[#5b5b6e]">
                • {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
