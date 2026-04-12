export const pillars = [
  {
    title: 'Job\nSearch',
    desc: 'AI-matched openings pulled from every major board in real time',
    img: '/pillars/job-search.png',
  },
  {
    title: 'Resume\nBuilder',
    desc: 'Tailored, ATS-friendly resumes for every role you apply to',
    img: '/pillars/resume-builder.png',
  },
  {
    title: 'Interview\nPrep',
    desc: 'Practice with role-specific questions and instant feedback',
    img: '/pillars/interview-prep.png',
  },
  {
    title: 'Company\nResearch',
    desc: 'Deep insights on culture, salary, and hiring managers before you apply',
    img: '/pillars/company-research.png',
  },
  {
    title: 'Application\nTracking',
    desc: 'One dashboard for every application, interview, and follow-up',
    img: '/pillars/application-tracking.png',
  },
  {
    title: 'Email Job\nScanner',
    desc: 'Forward recruiter emails to Omni. It extracts job leads, detects interview invites, and tracks application status updates automatically',
    img: '/pillars/email-scanner.png',
  },
]

export default function PillarCard({ title, desc, img }) {
  return (
    <div
      data-card
      className="group relative shrink-0 snap-start w-[280px] sm:w-[320px] md:w-[400px] h-[420px] sm:h-[460px] transition-transform duration-500 hover:-translate-y-1"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-2 rounded-[2rem] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60"
        style={{
          background:
            'conic-gradient(from 180deg at 50% 50%, #ffd6a5 0deg, #fdaac0 90deg, #d4b8ff 180deg, #b8d0ff 270deg, #ffd6a5 360deg)',
        }}
      />
      <article className="relative h-full w-full rounded-3xl overflow-hidden bg-white border border-black/5 p-6 sm:p-8 flex flex-col justify-between transition-shadow duration-500 group-hover:shadow-2xl group-hover:shadow-black/5">
        <div className="relative">
          <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-[-0.025em] text-neutral-900 leading-[1.05] whitespace-pre-line">
            {title}
          </h3>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-neutral-500 max-w-[260px]">{desc}</p>
        </div>
        {img && (
          <img
            src={img}
            alt=""
            className="mt-4 w-24 h-24 sm:w-32 sm:h-32 object-contain self-end"
          />
        )}
      </article>
    </div>
  )
}
