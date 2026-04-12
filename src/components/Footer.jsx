import Container from './Container'

const links = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Channels', href: '#channels' },
  { label: 'Privacy', href: '#privacy' },
  { label: 'Terms', href: '#terms' },
]

export default function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="py-12 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Omni" className="h-12 w-12 object-contain" />
            <span className="text-[15px] font-semibold tracking-tight text-neutral-900">
              Omni
            </span>
            <span className="text-[13px] font-medium text-neutral-500">
              AI Career Agent
            </span>
          </a>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <p className="text-sm text-neutral-400">
            © {new Date().getFullYear()} Omni
          </p>
        </div>
      </Container>
    </footer>
  )
}
