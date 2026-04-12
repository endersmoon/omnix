import Container from './Container'

const channels = [
  {
    title: 'Web dashboard',
    desc: 'Full-featured home base. Deep research, resume downloads, application tracking, and rich job cards.',
    accent: 'bg-primary/10 text-primary',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    title: 'WhatsApp',
    desc: 'Ask for job matches, get interview tips, or check application status — on the go, no app needed.',
    accent: 'bg-emerald-100 text-emerald-600',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2.5" />
        <path d="M12 18h.01" />
      </svg>
    ),
  },
  {
    title: 'Email digest',
    desc: 'Daily briefing with new job matches, pending follow-ups, and one interview question to practice.',
    accent: 'bg-violet-100 text-violet-600',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2.5" y="5" width="19" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    ),
  },
]

export default function Channels() {
  return (
    <section id="channels" className="bg-white py-16 sm:py-24 md:py-32 scroll-mt-24">
      <Container>
        <span className="block text-xs md:text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-6">
          Channels
        </span>
        <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold tracking-[-0.025em] text-neutral-900 leading-[1.05] max-w-3xl">
          Use it wherever you already are
        </h2>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {channels.map((c) => (
            <article
              key={c.title}
              className="rounded-2xl sm:rounded-3xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8 transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-neutral-900/[0.04] hover:-translate-y-1"
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${c.accent}`}>
                {c.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight text-neutral-900">{c.title}</h3>
              <p className="mt-2 text-neutral-500 leading-relaxed">{c.desc}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
