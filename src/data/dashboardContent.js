import {
  Building2,
  Eraser,
  FileText,
  MessageCircle,
  MessageSquare,
  Search,
  Send,
  Settings as SettingsIcon,
  Target,
} from 'lucide-react'

export const CANNED_REPLIES = [
  "Here's a solid starting point — tell me the role or company you're targeting and I'll tailor the plan.",
  "Good question. For a prototype answer: I'd break this into three moves — research, resume tailoring, and interview rehearsal. Which do you want to start with?",
  "I can help draft that. Share a job description or a rough outline and I'll turn it into a crisp bullet list.",
  "Great — let's prep for that interview. I'll role-play the interviewer; reply with the first question you want to practice.",
]

export const SLASH_COMMANDS = [
  {
    slug: '/companies',
    label: 'Company Research',
    desc: 'Get reviews, ratings, salary info, and culture insights',
    icon: Building2,
    tint: 'bg-orange-500',
    prompt: 'Give me a company review and ratings breakdown for ',
  },
  {
    slug: '/settings',
    label: 'Settings',
    desc: 'Manage notifications, account linking, and preferences',
    icon: SettingsIcon,
    tint: 'bg-sky-500',
    prompt: 'Open my settings for notifications and account linking.',
  },
  {
    slug: '/interview',
    label: 'Interview Prep',
    desc: 'Practice company-specific interview questions with AI feedback',
    icon: MessageSquare,
    tint: 'bg-fuchsia-500',
    prompt: 'Start an interview prep session with company-specific questions for ',
  },
  {
    slug: '/fresh',
    label: 'Start Fresh',
    desc: 'Clear conversation memory and start with a blank slate',
    icon: Eraser,
    tint: 'bg-emerald-500',
    prompt: '',
  },
  {
    slug: '/chat',
    label: 'General Chat',
    desc: 'Ask general career questions or get advice',
    icon: MessageCircle,
    tint: 'bg-indigo-500',
    prompt: '',
  },
]

export const SUGGESTION_CARDS = [
  {
    icon: Search,
    title: 'Find matching roles',
    subtitle: 'Senior frontend jobs in NYC, remote-friendly',
    prompt: 'Find senior frontend engineer roles in NYC that are remote-friendly and pay above $180k.',
  },
  {
    icon: FileText,
    title: 'Tailor my resume',
    subtitle: 'Rewrite bullets for a Stripe PM role',
    prompt: 'Rewrite my resume bullets to target a Product Manager role at Stripe.',
  },
  {
    icon: MessageSquare,
    title: 'Mock interview',
    subtitle: 'Behavioral round for a staff engineer',
    prompt: 'Run a mock behavioral interview for a staff engineer role. Start with the first question.',
  },
  {
    icon: Building2,
    title: 'Company deep-dive',
    subtitle: 'Reviews, ratings, pros & cons',
    prompt: 'Give me a company review and ratings breakdown for Linear.',
  },
  {
    icon: Send,
    title: 'Cold outreach',
    subtitle: 'Message a recruiter on LinkedIn',
    prompt: 'Draft a short, friendly LinkedIn message to a recruiter at Vercel introducing myself.',
  },
  {
    icon: Target,
    title: 'Plan my week',
    subtitle: 'Daily job-search checklist',
    prompt: 'Build me a 7-day job search plan with daily tasks — applications, networking, and prep.',
  },
]

export const QUICK_CHIPS = [
  'Summarize this JD',
  'Improve this bullet',
  'Negotiate an offer',
  'Prep system design',
]
