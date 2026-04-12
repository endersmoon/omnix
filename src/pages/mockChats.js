import { SAMPLE_COMPANY, SAMPLE_INTERVIEW, SAMPLE_JOBS } from '../components/chat/widgetFixtures'

const widgetReply = (kind, payload, intro) =>
  `${intro}\n\n::widget:${kind}::${JSON.stringify(payload)}::end::`

export const MOCK_CHATS = [
  {
    id: 'frontend-nyc',
    title: 'Senior frontend roles in NYC',
    group: 'Today',
    messages: [
      {
        role: 'user',
        content: 'Find me senior frontend engineer roles in NYC that are remote-friendly and pay above $180k.',
      },
      {
        role: 'assistant',
        content: widgetReply(
          'jobs',
          SAMPLE_JOBS,
          'I pulled three roles that match — Linear is the strongest fit at 92%. All three are remote-friendly or hybrid NYC and above your salary floor.',
        ),
      },
      {
        role: 'user',
        content: 'Nice, what do people actually say about working at Linear?',
      },
      {
        role: 'assistant',
        content: widgetReply(
          'company',
          SAMPLE_COMPANY,
          "Here's a snapshot of Linear based on 1,287 recent employee reviews — strong culture signal, slightly below FAANG on comp.",
        ),
      },
    ],
  },
  {
    id: 'linear-deep-dive',
    title: 'Linear — company deep-dive',
    group: 'Today',
    messages: [
      {
        role: 'user',
        content: 'Give me a company review and ratings breakdown for Linear.',
      },
      {
        role: 'assistant',
        content: widgetReply(
          'company',
          SAMPLE_COMPANY,
          "Here's what I found on Linear — thoughtful product culture, async-first, small team so ownership runs high.",
        ),
      },
      {
        role: 'user',
        content: 'What are recent employees warning newcomers about?',
      },
      {
        role: 'assistant',
        content:
          "The recurring themes in cons: (1) high ownership can tip into intensity during crunch periods, (2) small team means you'll wear multiple hats — less specialization than a FAANG, (3) total comp is solid but sits ~10–15% below FAANG top-of-band. None of these are dealbreakers, but worth raising in your recruiter conversation.",
      },
    ],
  },
  {
    id: 'stripe-pm-mock',
    title: 'Mock interview for Stripe PM',
    group: 'Today',
    messages: [
      {
        role: 'user',
        content: 'Run a mock behavioral interview for a Stripe PM role. Start with the first question.',
      },
      {
        role: 'assistant',
        content: widgetReply(
          'interview',
          SAMPLE_INTERVIEW,
          "I loaded three recent Stripe PM questions — behavioral, system design, and product sense. Flip through and tap \"Show sample answer\" when you want a hint.",
        ),
      },
      {
        role: 'user',
        content: 'The system design one on rate limiting scares me. Any tips?',
      },
      {
        role: 'assistant',
        content:
          "Three things keep most candidates on track:\n\n1. **Clarify first.** Per-key vs global? What's the latency budget? Is this for a public API or internal service? Spending 60 seconds here earns real points.\n2. **Name a concrete algorithm.** Token bucket is the safe default — explain why you'd pick it over leaky bucket (burst tolerance) and fixed window (edge-case fairness).\n3. **Talk about failure.** What happens if Redis is down? Fail-open vs fail-closed. Senior candidates always get asked this.",
      },
    ],
  },
  {
    id: 'ramp-resume',
    title: 'Rewrite resume bullets for Ramp',
    group: 'Yesterday',
    messages: [
      {
        role: 'user',
        content: "Rewrite my resume bullets to target a senior PM role at Ramp. I'll paste them in a sec.",
      },
      {
        role: 'assistant',
        content:
          "Happy to. Before you paste them, two things that'll make the rewrite sharper:\n\n1. Share the JD (or the link) so I can mirror Ramp's language — they lean heavy on ownership and velocity.\n2. Let me know which 2–3 metrics you're proudest of. Strong bullets lead with a number.",
      },
      {
        role: 'user',
        content: 'Here they are: "Led roadmap for billing platform. Worked with eng to ship invoicing v2. Improved customer retention."',
      },
      {
        role: 'assistant',
        content:
          "Those are passive and metric-free. Here's a tighter rewrite in Ramp's voice:\n\n• **Owned billing platform roadmap end-to-end**, shipping invoicing v2 in 11 weeks and unblocking $4.2M in at-risk ARR.\n• **Ran a 6-person cross-functional pod** (eng, design, CX) through weekly ship cycles; cut billing-related support tickets 38% QoQ.\n• **Drove retention lift from 87% → 92%** by partnering with growth on dunning flow experiments — three winning variants, shipped in 6 weeks.\n\nEach one leads with a verb, has a number, and names the lever you pulled.",
      },
    ],
  },
  {
    id: 'vercel-outreach',
    title: 'Recruiter outreach — Vercel',
    group: 'Yesterday',
    messages: [
      {
        role: 'user',
        content: "Draft a short LinkedIn message to a recruiter at Vercel. I'm interested in their staff product eng role.",
      },
      {
        role: 'assistant',
        content:
          "Here's a version that's short enough to actually get read:\n\n> Hi [name] — I saw Vercel is hiring a Staff Product Engineer. I've been shipping Next.js at scale for the last 3 years (most recently migrated a 200-page marketing site to app router + edge functions, cut p95 TTFB by 60%). Would love 15 minutes to learn what the team is prioritizing this half. Happy to send a short loom if that's easier than a call.\n\nThe loom offer is the trick — it turns the cold ask into something lower-effort for them.",
      },
    ],
  },
  {
    id: 'offer-neg',
    title: 'Negotiating a $210k offer',
    group: 'Yesterday',
    messages: [
      {
        role: 'user',
        content: "I got an offer at $210k base, $40k sign-on, $80k annual equity. How hard should I push back?",
      },
      {
        role: 'assistant',
        content:
          "Push, but be specific. Three levers you have:\n\n1. **Base** — hardest to move, usually capped by band. Ask for $225k citing market data (Levels.fyi L5 median for your city).\n2. **Sign-on** — easiest to move. $40k → $60k is a normal ask and often gets approved same-day.\n3. **Equity** — bring a competing offer or cite your current unvested to justify a bump.\n\nScript: *\"I'm excited about the role. To make this an easy yes, I'd want to see base at $225k and sign-on at $60k. Is there flexibility there?\"* — then stop talking. Silence is your strongest tool in this conversation.",
      },
    ],
  },
  {
    id: 'rate-limiter-sysdes',
    title: 'System design — rate limiter',
    group: 'Previous 7 days',
    messages: [
      {
        role: 'user',
        content: 'Walk me through a rate limiter for a public API.',
      },
      {
        role: 'assistant',
        content:
          "Start with requirements — this is where most candidates lose points:\n\n**1. Scope the problem (2 min)**\n- Per-user or global? Per-endpoint?\n- Hard limit or soft (429 vs degrade)?\n- Latency budget (usually <5ms)?\n\n**2. Pick an algorithm**\n- **Token bucket** — my default. Allows bursts, smooth steady-state.\n- **Leaky bucket** — stricter, better for downstream protection.\n- **Fixed/sliding window** — simple but edge-case unfair.\n\n**3. Storage**\n- Redis with Lua for atomic decrement. Single round-trip, ~1ms.\n- Local in-memory cache as L1 for hot keys (eventual consistency is fine).\n\n**4. Failure modes** — the question that separates senior candidates:\n- Redis down → fail open or fail closed? Depends on whether you're protecting revenue or infra.\n- Clock skew across regions → use Redis server time, not app time.",
      },
    ],
  },
  {
    id: 'figma-cover',
    title: 'Cover letter for Figma',
    group: 'Previous 7 days',
    messages: [
      {
        role: 'user',
        content: 'Write a short cover letter for a Senior Product Designer role at Figma.',
      },
      {
        role: 'assistant',
        content:
          "Here's a one-screen version — hiring managers won't read more:\n\n> Dear Figma team,\n>\n> I've been using Figma daily for the last five years, and the thing I've always admired is how the product respects the craft — every shipped feature feels like it came from someone who actually uses it.\n>\n> I'm applying because I want to build at that bar. In my current role I lead the design system for a 40-person product org; most recently I rebuilt our token pipeline so designers and engineers share one source of truth, cutting handoff time roughly in half.\n>\n> I'd love 20 minutes to talk about what the team is exploring in multiplayer editing. Portfolio and case studies below.\n>\n> — [name]\n\nThe 'respects the craft' line is specific enough to prove you actually use the product. That's the whole game in the first paragraph.",
      },
    ],
  },
]

export const MOCK_CHAT_GROUPS = (() => {
  const map = new Map()
  for (const chat of MOCK_CHATS) {
    if (!map.has(chat.group)) map.set(chat.group, [])
    map.get(chat.group).push(chat)
  }
  return Array.from(map, ([label, chats]) => ({ label, chats }))
})()

export const MOCK_CHAT_BY_ID = Object.fromEntries(MOCK_CHATS.map((c) => [c.id, c]))
