import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { MOCK_CHAT_GROUPS } from './mockChats'
import SettingsModal from '../components/SettingsModal'
import {
  Briefcase,
  ChevronsUpDown,
  Layers,
  LogOut,
  MessageSquare,
  PanelLeft,
  Plus,
  Settings,
  Share2,
  User,
} from 'lucide-react'

function AccountMenuItem({ icon, label, trailing, onClick }) {
  const Icon = icon
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm text-[#0b0b14] hover:bg-black/[0.04] transition-colors"
    >
      <Icon className="h-4 w-4 shrink-0 text-[#5b5b6e]" />
      <span className="flex-1 truncate">{label}</span>
      {trailing && <span className="shrink-0 text-[11px] text-[#9a9aae]">{trailing}</span>}
    </button>
  )
}

function AccountMenu({ user, onSignOut, onOpenSettings }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDocClick = (e) => {
      if (!containerRef.current?.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={containerRef} className="relative">
      {open && (
        <div
          role="menu"
          className="absolute bottom-[calc(100%+8px)] left-0 right-0 z-50 rounded-2xl border border-[#ececf3] bg-white p-2 shadow-[0_24px_64px_rgba(11,11,20,0.18)] animate-[popIn_.18s_ease-out]"
        >
          <p className="truncate px-2.5 pb-2 pt-1.5 text-xs text-[#9a9aae]">{user.email}</p>
          <div className="flex flex-col gap-0.5">
            <AccountMenuItem
              icon={Settings}
              label="Settings"
              trailing="⇧⌘,"
              onClick={() => {
                setOpen(false)
                onOpenSettings?.()
              }}
            />
            <AccountMenuItem icon={Share2} label="Share Omni" />
          </div>
          <div className="my-1 h-px bg-[#ececf3]" />
          <AccountMenuItem icon={LogOut} label="Log out" onClick={onSignOut} />
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex w-full items-center gap-3 rounded-xl border border-transparent px-2 py-2 text-left hover:bg-black/[0.04] transition-colors"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0b0b14] text-xs font-semibold text-white">
          {user.initials}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-[#0b0b14]">{user.name}</span>
          <span className="block truncate text-xs text-[#5b5b6e]">{user.plan}</span>
        </span>
        <ChevronsUpDown className="h-4 w-4 shrink-0 text-[#9a9aae]" />
      </button>
    </div>
  )
}

const NAV_ITEMS = [
  { icon: MessageSquare, label: 'Chats', to: '/dashboard/chats' },
  { icon: Briefcase, label: 'Jobs', to: '/dashboard/jobs' },
  { icon: User, label: 'Profile', to: '/dashboard/profile' },
  { icon: Layers, label: 'Artifacts', to: '/dashboard/artifacts' },
]

function GuestSidebarFooter() {
  const navigate = useNavigate()
  return (
    <div className="border-t border-[#ececf3] p-3 flex flex-col gap-2">
      <button
        type="button"
        onClick={() => navigate('/')}
        className="flex w-full items-center justify-center rounded-xl border border-[#ececf3] bg-white px-3 py-2 text-sm font-medium text-[#0b0b14] hover:bg-black/[0.03] transition-colors"
      >
        Log in
      </button>
      <button
        type="button"
        onClick={() => navigate('/')}
        className="flex w-full items-center justify-center rounded-xl bg-[#0b0b14] px-3 py-2 text-sm font-semibold text-white hover:bg-[#1e1e2e] transition-colors"
      >
        Get started free
      </button>
    </div>
  )
}

function Sidebar({ open, onToggle, onClose, onSignOut, onOpenSettings, isGuest }) {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const activeChatId =
    location.pathname === '/dashboard' ? searchParams.get('chat') : null
  return (
    <>
      <button
        type="button"
        aria-label="Close sidebar"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-[#0b0b14]/40 backdrop-blur-sm transition-opacity md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 shrink-0 overflow-hidden border-r border-[#ececf3] bg-[#fafafc] transition-transform duration-300 ease-out md:static md:z-auto md:translate-x-0 md:transition-[width] ${
          open ? 'translate-x-0 md:w-64' : '-translate-x-full md:translate-x-0 md:w-0 md:border-r-0'
        }`}
      >
        <div className="flex h-full w-64 flex-col">
          <div className="flex items-center justify-between px-4 py-4">
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Omni" className="h-12 w-12 object-contain" />
              <span className="text-[15px] font-semibold tracking-tight text-[#0b0b14]">Omni</span>
            </Link>
            {!isGuest && (
              <button
                type="button"
                onClick={onToggle}
                aria-label="Hide sidebar"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#5b5b6e] hover:bg-black/[0.04] hover:text-[#0b0b14] transition-colors"
              >
                <PanelLeft className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="px-3">
            <Link
              to="/dashboard"
              className="flex w-full items-center gap-2 rounded-xl border border-[#ececf3] bg-white px-3 py-2.5 text-sm font-medium text-[#0b0b14] hover:bg-black/[0.03] transition-colors"
            >
              <Plus className="h-4 w-4" />
              New chat
            </Link>
          </div>

          <nav className="mt-4 flex flex-col gap-0.5 px-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-black/[0.06] text-[#0b0b14]'
                        : 'text-[#5b5b6e] hover:bg-black/[0.04] hover:text-[#0b0b14]'
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              )
            })}
          </nav>

          <div className="mt-4 flex-1 overflow-y-auto px-2 pb-2">
            {isGuest && (
              <div className="px-2 py-3 text-center">
                <p className="text-xs text-[#9a9aae]">Log in to see your chats</p>
              </div>
            )}
            {!isGuest && MOCK_CHAT_GROUPS.map((group) => (
              <div key={group.label} className="mb-3 last:mb-0">
                <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-[#9a9aae]">
                  {group.label}
                </p>
                <ul className="flex flex-col gap-0.5">
                  {group.chats.map((c) => {
                    const isActive = c.id === activeChatId
                    return (
                      <li key={c.id}>
                        <Link
                          to={`/dashboard?chat=${c.id}`}
                          className={`block w-full truncate rounded-lg px-2.5 py-2 text-left text-sm transition-colors ${
                            isActive
                              ? 'bg-primary/[0.08] text-[#0b0b14] font-medium'
                              : 'text-[#5b5b6e] hover:bg-black/[0.04] hover:text-[#0b0b14]'
                          }`}
                        >
                          {c.title}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>

          {isGuest ? (
            <GuestSidebarFooter />
          ) : (
            <div className="border-t border-[#ececf3] p-2">
              <AccountMenu
                user={{
                  name: 'Tushar Debnath',
                  email: 'tushar@omni.ai',
                  plan: 'Principal Product Designer',
                  initials: 'TD',
                }}
                onSignOut={onSignOut}
                onOpenSettings={onOpenSettings}
              />
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

export default function DashboardLayout({ children }) {
  const navigate = useNavigate()
  useLocation() // ensure re-render on route change for NavLink active state
  const [searchParams] = useSearchParams()
  const isGuest = searchParams.get('guest') === 'true'
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <div className="flex h-svh w-full bg-white text-[#0b0b14]">
      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((v) => !v)}
        onClose={() => setSidebarOpen(false)}
        onSignOut={() => navigate('/')}
        onOpenSettings={() => setSettingsOpen(true)}
        isGuest={isGuest}
      />
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <main className="relative flex h-full flex-1 flex-col overflow-hidden" style={{ animation: 'slideUpFade 0.38s cubic-bezier(.16,1,.3,1) both' }}>
        <header className="relative flex h-14 shrink-0 items-center justify-center border-b border-[#ececf3] bg-white/90 px-4 backdrop-blur-md md:hidden">
          {!isGuest && (
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Show sidebar"
              className="absolute left-3 flex h-9 w-9 items-center justify-center rounded-lg text-[#5b5b6e] hover:bg-black/[0.04] hover:text-[#0b0b14] transition-colors"
            >
              <PanelLeft className="h-4 w-4" />
            </button>
          )}
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Omni" className="h-12 w-12 object-contain" />
            <span className="text-[15px] font-semibold tracking-tight text-[#0b0b14]">Omni</span>
          </Link>
        </header>

        {!sidebarOpen && !isGuest && (
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Show sidebar"
            className="absolute left-4 top-4 z-10 hidden h-9 w-9 items-center justify-center rounded-lg border border-[#ececf3] bg-white text-[#5b5b6e] shadow-[0_1px_2px_rgba(11,11,20,0.04)] hover:text-[#0b0b14] hover:bg-black/[0.03] transition-colors md:flex"
          >
            <PanelLeft className="h-4 w-4" />
          </button>
        )}

        {isGuest && (
          <div className="shrink-0 flex flex-col gap-3 border-b border-[#ececf3] bg-[#fafafc] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-2.5">
            <p className="text-sm text-[#5b5b6e] text-center sm:text-left">
              Sign up to save your chats and unlock all features.
            </p>
            <div className="flex items-center justify-center gap-2.5 shrink-0">
              <Link
                to="/"
                className="rounded-lg border border-[#ececf3] bg-white px-4 py-2 text-sm font-medium text-[#0b0b14] hover:bg-black/[0.03] transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/"
                className="rounded-lg bg-[#0b0b14] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1e1e2e] transition-colors"
              >
                Get started
              </Link>
            </div>
          </div>
        )}
        {children ?? <Outlet context={{ isGuest }} />}
      </main>
    </div>
  )
}
