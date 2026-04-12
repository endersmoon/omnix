import { useMemo, useState } from 'react'
import {
  Bookmark,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin,
  Sparkles,
  Wallet,
} from 'lucide-react'
import DashboardLayout from './DashboardLayout'

const RECOMMENDED = [
  {
    id: 'r1',
    company: 'Razorpay',
    logoColor: 'bg-[#0C2451]',
    logoInitial: 'R',
    title: 'Senior Frontend Engineer',
    location: 'Bengaluru · Hybrid',
    salary: '₹45L – ₹70L',
    type: 'Full-time',
    postedDaysAgo: 2,
    tags: ['React', 'TypeScript', 'Design systems'],
    match: 94,
    summary:
      'Build merchant-facing dashboards used by lakhs of Indian businesses. Work closely with design on performance-critical UI.',
  },
  {
    id: 'r2',
    company: 'Zerodha',
    logoColor: 'bg-[#387ED1]',
    logoInitial: 'Z',
    title: 'Product Manager, Kite',
    location: 'Bengaluru · On-site',
    salary: '₹50L – ₹80L',
    type: 'Full-time',
    postedDaysAgo: 4,
    tags: ['Fintech', 'Trading', '0→1'],
    match: 89,
    summary:
      "Lead product on Kite, India's largest retail trading platform serving over a crore investors.",
  },
  {
    id: 'r3',
    company: 'Swiggy',
    logoColor: 'bg-[#FC8019]',
    logoInitial: 'S',
    title: 'Staff Software Engineer, Platform',
    location: 'Remote · India',
    salary: '₹60L – ₹95L',
    type: 'Full-time',
    postedDaysAgo: 1,
    tags: ['Distributed systems', 'Scale', 'Go'],
    match: 87,
    summary:
      'Own core platform services powering food, Instamart, and Dineout across every Indian city.',
  },
  {
    id: 'r4',
    company: 'CRED',
    logoColor: 'bg-[#0b0b14]',
    logoInitial: 'C',
    title: 'Senior Design Engineer',
    location: 'Bengaluru · Hybrid',
    salary: '₹40L – ₹65L',
    type: 'Full-time',
    postedDaysAgo: 6,
    tags: ['React Native', 'Prototyping', 'UI'],
    match: 83,
    summary:
      'Bridge design and engineering to ship beautiful, thoughtful features to premium Indian credit card users.',
  },
  {
    id: 'r5',
    company: 'Postman',
    logoColor: 'bg-[#FF6C37]',
    logoInitial: 'P',
    title: 'Product Designer, AI',
    location: 'Bengaluru · Hybrid',
    salary: '₹38L – ₹60L',
    type: 'Full-time',
    postedDaysAgo: 3,
    tags: ['AI/UX', 'Systems', 'Research'],
    match: 81,
    summary:
      'Design intelligent, approachable AI features inside the Postman API platform used worldwide.',
  },
  {
    id: 'r6',
    company: 'Groww',
    logoColor: 'bg-[#00D09C]',
    logoInitial: 'G',
    title: 'Frontend Engineer, Growth',
    location: 'Bengaluru · On-site',
    salary: '₹35L – ₹55L',
    type: 'Full-time',
    postedDaysAgo: 5,
    tags: ['React', 'Next.js', 'Performance'],
    match: 96,
    summary:
      'Help millions of first-time Indian investors discover, invest, and track mutual funds and stocks.',
  },
]

const APPLIED = [
  {
    id: 'a1',
    company: 'Razorpay',
    logoColor: 'bg-[#0C2451]',
    logoInitial: 'R',
    title: 'Senior Frontend Engineer',
    location: 'Bengaluru · Hybrid',
    salary: '₹45L – ₹70L',
    status: 'Interviewing',
    statusTint: 'bg-[#DCFCE7] text-[#15803D]',
    stage: 'Round 2 of 4 · Technical screen',
    appliedDaysAgo: 5,
  },
  {
    id: 'a2',
    company: 'Swiggy',
    logoColor: 'bg-[#FC8019]',
    logoInitial: 'S',
    title: 'Staff Software Engineer, Platform',
    location: 'Remote · India',
    salary: '₹60L – ₹95L',
    status: 'In review',
    statusTint: 'bg-[#FEF3C7] text-[#A16207]',
    stage: 'Application under review',
    appliedDaysAgo: 2,
  },
  {
    id: 'a3',
    company: 'Zomato',
    logoColor: 'bg-[#E23744]',
    logoInitial: 'Z',
    title: 'Senior Product Engineer',
    location: 'Gurugram · On-site',
    salary: '₹48L – ₹72L',
    status: 'Offer',
    statusTint: 'bg-[#E0E7FF] text-[#4338CA]',
    stage: 'Offer extended · Negotiating',
    appliedDaysAgo: 14,
  },
  {
    id: 'a4',
    company: 'Meesho',
    logoColor: 'bg-[#F43397]',
    logoInitial: 'M',
    title: 'Frontend Platform Engineer',
    location: 'Remote · India',
    salary: '₹38L – ₹58L',
    status: 'Rejected',
    statusTint: 'bg-[#FEE2E2] text-[#B91C1C]',
    stage: 'Not moving forward',
    appliedDaysAgo: 21,
  },
]

const TABS = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'applied', label: 'Applied' },
]

function CompanyLogo({ color, initial }) {
  return (
    <span
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-base font-semibold text-white ${color}`}
    >
      {initial}
    </span>
  )
}

function MatchRing({ value }) {
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference
  return (
    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center">
      <svg className="h-11 w-11 -rotate-90" viewBox="0 0 44 44" aria-hidden="true">
        <circle cx="22" cy="22" r={radius} fill="none" stroke="#ececf3" strokeWidth="3" />
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-primary transition-[stroke-dashoffset]"
        />
      </svg>
      <span className="absolute text-[10px] font-semibold text-[#0b0b14]">{value}</span>
    </div>
  )
}

function RecommendedCard({ job }) {
  return (
    <article className="group flex flex-col gap-4 rounded-2xl border border-[#ececf3] bg-white p-5 transition-all hover:-translate-y-[1px] hover:border-primary/30 hover:shadow-[0_8px_24px_rgba(11,11,20,0.06)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <CompanyLogo color={job.logoColor} initial={job.logoInitial} />
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-[#9a9aae]">
              {job.company}
            </p>
            <h3 className="truncate text-base font-semibold text-[#0b0b14]">{job.title}</h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-[11px] font-semibold text-primary sm:flex">
            <Sparkles className="h-3 w-3" />
            {job.match}% match
          </div>
          <MatchRing value={job.match} />
        </div>
      </div>

      <p className="line-clamp-2 text-sm leading-relaxed text-[#5b5b6e]">{job.summary}</p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#5b5b6e]">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          {job.location}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Wallet className="h-3.5 w-3.5" />
          {job.salary}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <BriefcaseBusiness className="h-3.5 w-3.5" />
          {job.type}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {job.postedDaysAgo}d ago
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {job.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-[#ececf3] bg-[#fafafc] px-2.5 py-1 text-[11px] font-medium text-[#5b5b6e]"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-1 flex items-center gap-2">
        <button
          type="button"
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(74,79,253,0.2)] hover:bg-primary-hover transition-colors"
        >
          Apply with Omni
          <ExternalLink className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          aria-label="Save job"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#ececf3] text-[#5b5b6e] hover:border-primary/40 hover:text-primary transition-colors"
        >
          <Bookmark className="h-4 w-4" />
        </button>
      </div>
    </article>
  )
}

function AppliedRow({ job }) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-[#ececf3] bg-white p-5 sm:flex-row sm:items-center sm:gap-5">
      <div className="flex items-start gap-3 min-w-0 flex-1">
        <CompanyLogo color={job.logoColor} initial={job.logoInitial} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-base font-semibold text-[#0b0b14]">{job.title}</h3>
            <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${job.statusTint}`}>
              {job.status}
            </span>
          </div>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-[#5b5b6e]">
            <Building2 className="h-3.5 w-3.5" />
            {job.company}
            <span className="text-[#dcdce3]">·</span>
            <MapPin className="h-3.5 w-3.5" />
            {job.location}
            <span className="text-[#dcdce3]">·</span>
            <Wallet className="h-3.5 w-3.5" />
            {job.salary}
          </p>
          <p className="mt-1.5 text-xs text-[#5b5b6e]">
            <CheckCircle2 className="mr-1 inline h-3 w-3 text-primary" />
            {job.stage}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-start gap-1 sm:items-end">
        <span className="text-[11px] text-[#9a9aae]">Applied {job.appliedDaysAgo}d ago</span>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-full border border-[#ececf3] px-3 py-1.5 text-xs font-medium text-[#0b0b14] hover:border-primary/40 hover:text-primary transition-colors"
        >
          View
          <ExternalLink className="h-3 w-3" />
        </button>
      </div>
    </article>
  )
}

export default function Jobs() {
  const [tab, setTab] = useState('recommended')

  const counts = useMemo(
    () => ({ recommended: RECOMMENDED.length, applied: APPLIED.length }),
    [],
  )

  return (
    <DashboardLayout>
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-[#0b0b14] sm:text-4xl">
                Jobs
              </h1>
              <p className="mt-2 text-sm text-[#5b5b6e]">
                Curated matches and everything you've applied to, in one place.
              </p>
            </div>
          </div>

          <div className="mt-7 flex items-center gap-1 rounded-full border border-[#ececf3] bg-[#fafafc] p-1 w-fit">
            {TABS.map((t) => {
              const active = tab === t.id
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                    active
                      ? 'bg-white text-[#0b0b14] shadow-[0_1px_2px_rgba(11,11,20,0.06)]'
                      : 'text-[#5b5b6e] hover:text-[#0b0b14]'
                  }`}
                >
                  {t.label}
                  <span
                    className={`rounded-full px-1.5 text-[11px] font-semibold ${
                      active ? 'bg-primary/10 text-primary' : 'bg-[#ececf3] text-[#5b5b6e]'
                    }`}
                  >
                    {counts[t.id]}
                  </span>
                </button>
              )
            })}
          </div>

          {tab === 'recommended' && (
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {RECOMMENDED.map((job) => (
                <RecommendedCard key={job.id} job={job} />
              ))}
            </div>
          )}

          {tab === 'applied' && (
            <div className="mt-6 flex flex-col gap-3">
              {APPLIED.map((job) => (
                <AppliedRow key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
