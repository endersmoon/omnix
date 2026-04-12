export const SAMPLE_JOBS = [
  {
    title: 'Senior Frontend Engineer',
    company: 'Linear',
    location: 'Remote · US',
    matchScore: 92,
    experience: '5–8 yrs',
    salary: '$190k–$230k',
    skills: ['React', 'TypeScript', 'GraphQL', 'Framer Motion', 'Next.js'],
  },
  {
    title: 'Staff Product Engineer',
    company: 'Vercel',
    location: 'NYC · Hybrid',
    matchScore: 86,
    experience: '7+ yrs',
    salary: '$220k–$265k',
    skills: ['Next.js', 'Edge Functions', 'React', 'Turbo'],
  },
  {
    title: 'Product Manager, Payments',
    company: 'Stripe',
    location: 'SF · Hybrid',
    matchScore: 78,
    experience: '4–6 yrs',
    salary: '$180k–$220k',
    skills: ['Fintech', 'APIs', 'Roadmap', 'Analytics'],
  },
]

export const SAMPLE_COMPANY = {
  company: 'Linear',
  rating: 4.4,
  reviewCount: 1287,
  ratings: {
    'Work-Life Balance': 4.3,
    'Company Culture': 4.6,
    Compensation: 4.1,
    'Career Growth': 4.0,
    'Skill Development': 4.4,
  },
  pros: [
    'Thoughtful product culture and high bar for craft',
    'Async-friendly, minimal meetings, trust to ship',
    'Strong design + engineering collaboration',
  ],
  cons: [
    'Small team — you wear many hats',
    'High ownership can feel intense in crunch periods',
    'Compensation slightly below FAANG top-of-band',
  ],
}

export const SAMPLE_INTERVIEW = {
  company: 'Stripe',
  questions: [
    {
      tag: 'Behavioral',
      question: 'Tell me about a time you disagreed with a senior stakeholder. How did you handle it?',
      answer:
        'Use STAR. Anchor on a concrete disagreement, explain how you gathered data, proposed an alternative, and what the outcome was. Stripe values writing — bonus points for mentioning a written doc you circulated.',
    },
    {
      tag: 'System Design',
      question: 'Design a rate limiter for our public API. Walk me through your approach.',
      answer:
        'Start with requirements (per-key vs global, latency budget, burst vs steady). Compare token bucket vs leaky bucket vs fixed window. Discuss Redis vs in-memory, failure modes, and how you’d roll it out safely.',
    },
    {
      tag: 'Product Sense',
      question: 'If you could ship one new product at Stripe next quarter, what would it be and why?',
      answer:
        'Pick a real gap (e.g., SMB billing analytics). Size the opportunity, define the MVP cut, name the metric you’d move, and explain the riskiest assumption and how you’d test it in 2 weeks.',
    },
  ],
}
