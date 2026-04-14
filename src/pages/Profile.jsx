import {
  Briefcase,
  Clock,
  DollarSign,
  GraduationCap,
  MapPin,
  Pencil,
  Settings2,
  Sparkles,
  User,
  Zap,
} from 'lucide-react'

const PROFILE = {
  fullName: 'Tushar Debnath',
  email: 'tushar@omni.ai',
  headline: 'Principal Product Designer · ex-Figma, ex-Razorpay',
  location: 'Bengaluru, IN',
  completionPct: 82,
  skills: [
    { name: 'Product Design', proficiency: 'EXPERT', years: 9 },
    { name: 'Design Systems', proficiency: 'EXPERT', years: 7 },
    { name: 'Prototyping', proficiency: 'ADVANCED', years: 8 },
    { name: 'Figma', proficiency: 'EXPERT', years: 6 },
    { name: 'React', proficiency: 'INTERMEDIATE', years: 4 },
    { name: 'User Research', proficiency: 'ADVANCED', years: 5 },
    { name: 'Motion Design', proficiency: 'INTERMEDIATE', years: 3 },
    { name: 'Accessibility', proficiency: 'ADVANCED', years: 4 },
  ],
  experience: [
    {
      title: 'Principal Product Designer',
      company: 'Razorpay',
      location: 'Bengaluru',
      period: '2023 — Present',
      summary:
        'Leading design for the Payments Platform pod. Shipped a unified checkout that lifted conversion 11% QoQ.',
    },
    {
      title: 'Senior Product Designer',
      company: 'Figma',
      location: 'Remote',
      period: '2020 — 2023',
      summary:
        'Design system contributor. Owned tokens & theming; rolled out dark mode across the editor.',
    },
    {
      title: 'Product Designer',
      company: 'Swiggy',
      location: 'Bengaluru',
      period: '2018 — 2020',
      summary:
        'Redesigned the restaurant onboarding flow; reduced time-to-first-order from 9 days to 2.',
    },
  ],
  education: [
    {
      degree: 'B.Des — Interaction Design',
      institution: 'IIT Guwahati',
      period: '2014 — 2018',
      grade: '8.4 CGPA',
    },
  ],
  preferences: {
    mode: 'PASSIVE',
    roles: ['Principal Designer', 'Design Lead', 'Head of Design'],
    locations: ['Remote', 'Bengaluru', 'NYC'],
    jobTypes: ['Full-time'],
    industries: ['Fintech', 'Developer Tools', 'AI'],
    salaryMin: 60,
    salaryMax: 95,
    salaryCurrency: 'L',
    noticeDays: 60,
    totalExperience: 9,
  },
}

const PROFICIENCY_TONE = {
  BEGINNER: 'bg-[#f1f1f7] text-[#5b5b6e]',
  INTERMEDIATE: 'bg-primary/[0.08] text-primary',
  ADVANCED: 'bg-[#ede9fe] text-[#7c3aed]',
  EXPERT: 'bg-[#f0fdf4] text-[#16a34a]',
}

function CompletionRing({ pct }) {
  const size = 88
  const r = 36
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ

  return (
    <div className="relative flex h-[88px] w-[88px] shrink-0 items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#ececf3" strokeWidth="6" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          style={{ transition: 'stroke-dasharray 0.6s ease' }}
        />
      </svg>
      <div className="flex flex-col items-center">
        <span className="text-lg font-semibold text-[#0b0b14]">{pct}%</span>
        <span className="text-[9px] font-semibold uppercase tracking-wider text-[#9a9aae]">
          complete
        </span>
      </div>
    </div>
  )
}

function SectionCard({ title, action, children }) {
  return (
    <section className="rounded-2xl border border-[#ececf3] bg-white shadow-[0_8px_24px_rgba(11,11,20,0.04)]">
      <header className="flex items-center justify-between border-b border-[#ececf3] px-5 py-3.5">
        <h2 className="text-sm font-semibold text-[#0b0b14]">{title}</h2>
        {action}
      </header>
      <div className="px-5 py-4">{children}</div>
    </section>
  )
}

function EditButton({ label = 'Edit' }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1 rounded-full border border-[#ececf3] bg-white px-2.5 py-1 text-[11px] font-medium text-[#5b5b6e] transition-colors hover:border-primary/30 hover:text-[#0b0b14]"
    >
      <Pencil className="h-3 w-3" />
      {label}
    </button>
  )
}

function SkillChip({ skill }) {
  const tone = PROFICIENCY_TONE[skill.proficiency] ?? PROFICIENCY_TONE.BEGINNER
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ececf3] bg-[#fafafc] px-2.5 py-1">
      <span className="text-xs font-medium text-[#0b0b14]">{skill.name}</span>
      <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase ${tone}`}>
        {skill.proficiency.toLowerCase()}
      </span>
      <span className="text-[10px] text-[#9a9aae]">{skill.years}y</span>
    </span>
  )
}

function TimelineItem({ icon, title, subtitle, period, summary, meta }) {
  const Icon = icon
  return (
    <div className="relative flex gap-3 py-3 first:pt-0 last:pb-0">
      <div className="flex shrink-0 flex-col items-center">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-[#0b0b14]">{title}</p>
        <p className="text-xs text-[#5b5b6e]">{subtitle}</p>
        <p className="mt-0.5 text-[11px] text-[#9a9aae]">{period}</p>
        {summary && (
          <p className="mt-1.5 text-xs leading-relaxed text-[#5b5b6e]">{summary}</p>
        )}
        {meta && <p className="mt-0.5 text-[11px] text-[#9a9aae]">{meta}</p>}
      </div>
    </div>
  )
}

function PreferenceRow({ icon, label, value }) {
  const Icon = icon
  return (
    <div className="flex items-start gap-2.5 py-1.5">
      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#9a9aae]" />
      <div className="min-w-0 flex-1">
        <span className="text-[11px] font-medium uppercase tracking-wider text-[#9a9aae]">
          {label}
        </span>
        <p className="mt-0.5 text-sm text-[#0b0b14]">{value}</p>
      </div>
    </div>
  )
}

export default function Profile() {
  const prefs = PROFILE.preferences
  const salaryRange =
    prefs.salaryMin && prefs.salaryMax
      ? `₹${prefs.salaryMin}${prefs.salaryCurrency} – ₹${prefs.salaryMax}${prefs.salaryCurrency}`
      : '—'

  return (
    <div className="flex-1 overflow-y-auto bg-white">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-5 py-10 sm:px-8 sm:py-14">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold tracking-tight text-[#0b0b14] sm:text-4xl">
              Profile
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ececf3] bg-white px-3 py-1.5 text-[11px] font-medium text-[#5b5b6e]">
              <Sparkles className="h-3 w-3 text-primary" />
              Managed via chat with Omni
            </span>
          </div>

          {/* Header card */}
          <section className="rounded-2xl border border-[#ececf3] bg-white p-5 shadow-[0_8px_24px_rgba(11,11,20,0.04)]">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[#8b5cf6] text-xl font-semibold text-white shadow-[0_12px_24px_rgba(65,65,252,0.25)]">
                {PROFILE.fullName
                  .split(' ')
                  .map((w) => w[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-lg font-semibold text-[#0b0b14]">
                  {PROFILE.fullName}
                </h2>
                <p className="truncate text-sm text-[#5b5b6e]">{PROFILE.headline}</p>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-[#9a9aae]">
                  <span>{PROFILE.email}</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {PROFILE.location}
                  </span>
                </div>
              </div>
              <CompletionRing pct={PROFILE.completionPct} />
            </div>
          </section>

          {/* Completion nudge */}
          {PROFILE.completionPct < 100 && (
            <div className="flex items-start gap-2 rounded-2xl border border-primary/15 bg-primary/[0.04] px-4 py-3">
              <Zap className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <p className="text-[13px] leading-relaxed text-[#0b0b14]">
                <span className="font-medium">Almost there.</span>{' '}
                <span className="text-[#5b5b6e]">
                  Ask Omni to fill in your remaining details — portfolio links and a 1-line bio — to
                  unlock sharper job matches.
                </span>
              </p>
            </div>
          )}

          {/* Skills */}
          <SectionCard icon={Zap} title="Skills" action={<EditButton />}>
            <div className="flex flex-wrap gap-1.5">
              {PROFILE.skills.map((s) => (
                <SkillChip key={s.name} skill={s} />
              ))}
            </div>
          </SectionCard>

          {/* Experience */}
          <SectionCard icon={Briefcase} title="Work experience" action={<EditButton />}>
            <div className="divide-y divide-[#ececf3]">
              {PROFILE.experience.map((exp) => (
                <TimelineItem
                  key={`${exp.company}-${exp.title}`}
                  icon={Briefcase}
                  title={exp.title}
                  subtitle={`${exp.company}${exp.location ? ` · ${exp.location}` : ''}`}
                  period={exp.period}
                  summary={exp.summary}
                />
              ))}
            </div>
          </SectionCard>

          {/* Education */}
          <SectionCard icon={GraduationCap} title="Education" action={<EditButton />}>
            <div className="divide-y divide-[#ececf3]">
              {PROFILE.education.map((edu) => (
                <TimelineItem
                  key={edu.degree}
                  icon={GraduationCap}
                  title={edu.degree}
                  subtitle={edu.institution}
                  period={edu.period}
                  meta={edu.grade ? `Grade: ${edu.grade}` : null}
                />
              ))}
            </div>
          </SectionCard>

          {/* Preferences */}
          <SectionCard icon={Settings2} title="Job preferences" action={<EditButton />}>
            <div className="mb-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  prefs.mode === 'ACTIVE'
                    ? 'bg-[#f0fdf4] text-[#16a34a]'
                    : 'bg-[#f1f1f7] text-[#5b5b6e]'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    prefs.mode === 'ACTIVE' ? 'bg-[#16a34a]' : 'bg-[#9a9aae]'
                  }`}
                />
                {prefs.mode === 'ACTIVE' ? 'Actively looking' : 'Passively browsing'}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2">
              <PreferenceRow icon={User} label="Roles" value={prefs.roles.join(', ')} />
              <PreferenceRow icon={MapPin} label="Locations" value={prefs.locations.join(', ')} />
              <PreferenceRow icon={Briefcase} label="Job types" value={prefs.jobTypes.join(', ')} />
              <PreferenceRow
                icon={Settings2}
                label="Industries"
                value={prefs.industries.join(', ')}
              />
              <PreferenceRow icon={DollarSign} label="Salary" value={salaryRange} />
              <PreferenceRow icon={Clock} label="Notice period" value={`${prefs.noticeDays} days`} />
              <PreferenceRow
                icon={Briefcase}
                label="Total experience"
                value={`${prefs.totalExperience} years`}
              />
            </div>
          </SectionCard>

          <p className="pb-4 text-center text-[11px] text-[#9a9aae]">
            Update your profile by chatting with Omni — it edits these sections for you.
          </p>
      </div>
    </div>
  )
}
