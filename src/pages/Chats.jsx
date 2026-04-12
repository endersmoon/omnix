import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search } from 'lucide-react'
import DashboardLayout from './DashboardLayout'

const ALL_CHATS = [
  { title: 'Candidate evaluation', lastMessageMinutes: 56 },
  { title: 'Personal AI Tamagotchi concept', lastMessageMinutes: 13 * 60 },
  { title: 'Thinking through a decision', lastMessageMinutes: 2 * 24 * 60 },
  { title: 'Improving content strategy', lastMessageMinutes: 3 * 24 * 60 },
  { title: 'Lake view hotels in Nainital for April 10-12', lastMessageMinutes: 5 * 24 * 60 },
  { title: 'Convert to markdown', lastMessageMinutes: 5 * 24 * 60 },
  { title: 'Creating a UI wrapper', lastMessageMinutes: 6 * 24 * 60 },
  { title: 'Competitor product audit', lastMessageMinutes: 6 * 24 * 60 },
  { title: 'Astrology app for Gen Z', lastMessageMinutes: 8 * 24 * 60 },
  { title: 'Installing Paperclip on a VPS', lastMessageMinutes: 9 * 24 * 60 },
  { title: 'Resume bullets for a Stripe PM role', lastMessageMinutes: 11 * 24 * 60 },
  { title: 'Behavioral interview practice', lastMessageMinutes: 14 * 24 * 60 },
]

function formatRelative(minutes) {
  if (minutes < 60) return `${minutes} minutes ago`
  if (minutes < 60 * 24) {
    const h = Math.round(minutes / 60)
    return `${h} hour${h === 1 ? '' : 's'} ago`
  }
  const d = Math.round(minutes / (60 * 24))
  return `${d} day${d === 1 ? '' : 's'} ago`
}

export default function Chats() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ALL_CHATS
    return ALL_CHATS.filter((c) => c.title.toLowerCase().includes(q))
  }, [query])

  return (
    <DashboardLayout>
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-3xl font-semibold tracking-tight text-[#0b0b14] sm:text-4xl">
              Chats
            </h1>
            <Link
              to="/dashboard"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0b0b14] px-4 py-2 text-sm font-medium text-white shadow-[0_8px_24px_rgba(11,11,20,0.18)] hover:bg-black transition-colors"
            >
              <Plus className="h-4 w-4" />
              New chat
            </Link>
          </div>

          <label className="mt-7 flex items-center gap-2.5 rounded-2xl border border-primary bg-white px-4 py-3 ring-4 ring-primary/10 focus-within:border-primary focus-within:ring-primary/15 transition-all">
            <Search className="h-5 w-5 text-[#5b5b6e]" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your chats..."
              className="w-full bg-transparent text-base text-[#0b0b14] outline-none placeholder:text-[#9a9aae]"
            />
          </label>

          <ul className="mt-6 flex flex-col border-t border-[#ececf3]">
            {filtered.map((c) => (
              <li key={c.title} className="border-b border-[#ececf3]">
                <Link
                  to="/dashboard"
                  className="flex flex-col gap-1 py-4 transition-colors hover:bg-black/[0.02]"
                >
                  <span className="text-base font-medium text-[#0b0b14]">{c.title}</span>
                  <span className="text-sm text-[#9a9aae]">
                    Last message {formatRelative(c.lastMessageMinutes)}
                  </span>
                </Link>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="py-10 text-center text-sm text-[#9a9aae]">No chats match "{query}".</li>
            )}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  )
}
