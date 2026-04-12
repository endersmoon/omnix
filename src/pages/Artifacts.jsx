import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Code,
  FileText,
  Image as ImageIcon,
  Mail,
  PieChart,
  Plus,
  Search,
  Sparkles,
} from 'lucide-react'
import DashboardLayout from './DashboardLayout'

const ARTIFACTS = [
  {
    title: 'Senior Frontend Resume — 2026',
    kind: 'Document',
    icon: FileText,
    tint: 'bg-primary/10 text-primary',
    subtitle: 'Tailored for staff frontend roles at product companies.',
    updatedMinutes: 42,
  },
  {
    title: 'Stripe PM Cover Letter',
    kind: 'Letter',
    icon: Mail,
    tint: 'bg-[#FFEDD5] text-[#C2410C]',
    subtitle: 'Drafted after researching Stripe’s product org.',
    updatedMinutes: 3 * 60,
  },
  {
    title: 'Mock Interview Notes — Staff Eng',
    kind: 'Notes',
    icon: Sparkles,
    tint: 'bg-[#DCFCE7] text-[#15803D]',
    subtitle: 'Behavioral answers using STAR, with follow-ups.',
    updatedMinutes: 26 * 60,
  },
  {
    title: 'Linear Company Brief',
    kind: 'Research',
    icon: PieChart,
    tint: 'bg-[#FEF3C7] text-[#A16207]',
    subtitle: 'Culture, product, recent news, interview style.',
    updatedMinutes: 2 * 24 * 60,
  },
  {
    title: 'LinkedIn Headline Variants',
    kind: 'Copy',
    icon: FileText,
    tint: 'bg-primary/10 text-primary',
    subtitle: 'Ten concise options targeting senior design roles.',
    updatedMinutes: 3 * 24 * 60,
  },
  {
    title: 'Portfolio Hero — Sketch',
    kind: 'Image',
    icon: ImageIcon,
    tint: 'bg-[#FCE7F3] text-[#BE185D]',
    subtitle: 'Rough mock for landing page above-the-fold.',
    updatedMinutes: 4 * 24 * 60,
  },
  {
    title: 'Resume Bullet Rewriter',
    kind: 'Snippet',
    icon: Code,
    tint: 'bg-[#E0E7FF] text-[#4338CA]',
    subtitle: 'Prompt + output format for tailoring bullets.',
    updatedMinutes: 5 * 24 * 60,
  },
  {
    title: '7-day Job Search Plan',
    kind: 'Document',
    icon: FileText,
    tint: 'bg-primary/10 text-primary',
    subtitle: 'Daily checklist: applications, outreach, prep.',
    updatedMinutes: 7 * 24 * 60,
  },
]

function formatRelative(minutes) {
  if (minutes < 60) return `${minutes}m ago`
  if (minutes < 60 * 24) {
    const h = Math.round(minutes / 60)
    return `${h}h ago`
  }
  const d = Math.round(minutes / (60 * 24))
  return `${d}d ago`
}

export default function Artifacts() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ARTIFACTS
    return ARTIFACTS.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.subtitle.toLowerCase().includes(q) ||
        a.kind.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <DashboardLayout>
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-3xl font-semibold tracking-tight text-[#0b0b14] sm:text-4xl">
              Artifacts
            </h1>
            <Link
              to="/dashboard"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0b0b14] px-4 py-2 text-sm font-medium text-white shadow-[0_8px_24px_rgba(11,11,20,0.18)] hover:bg-black transition-colors"
            >
              <Plus className="h-4 w-4" />
              New artifact
            </Link>
          </div>

          <p className="mt-2 text-sm text-[#5b5b6e]">
            Documents, notes, and assets Omni has created for you.
          </p>

          <label className="mt-7 flex items-center gap-2.5 rounded-2xl border border-[#ececf3] bg-white px-4 py-3 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all">
            <Search className="h-5 w-5 text-[#5b5b6e]" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search artifacts..."
              className="w-full bg-transparent text-base text-[#0b0b14] outline-none placeholder:text-[#9a9aae]"
            />
          </label>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a) => {
              const Icon = a.icon
              return (
              <button
                key={a.title}
                type="button"
                className="group flex flex-col items-start gap-3 rounded-2xl border border-[#ececf3] bg-white p-4 text-left transition-all hover:-translate-y-[1px] hover:border-primary/40 hover:shadow-[0_8px_24px_rgba(11,11,20,0.06)]"
              >
                <div className="flex w-full items-start justify-between">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${a.tint}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-[#ececf3] bg-[#fafafc] px-2 py-0.5 text-[11px] font-medium text-[#5b5b6e]">
                    {a.kind}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-semibold text-[#0b0b14]">{a.title}</p>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#5b5b6e]">
                    {a.subtitle}
                  </p>
                </div>
                <span className="mt-auto text-[11px] text-[#9a9aae]">
                  Updated {formatRelative(a.updatedMinutes)}
                </span>
              </button>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <p className="mt-12 text-center text-sm text-[#9a9aae]">
              No artifacts match "{query}".
            </p>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
