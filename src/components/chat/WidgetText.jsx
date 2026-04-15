import JobCard from './JobCard'
import CompanyInsights from './CompanyInsights'
import InterviewQuestions from './InterviewQuestions'

const WIDGET_RE = /::widget:(\w+)::([\s\S]*?)::end::/

export default function WidgetText({ text }) {
  const match = text.match(WIDGET_RE)
  if (!match) {
    return <span className="whitespace-pre-wrap">{text}</span>
  }

  const prefix = text.slice(0, match.index).trimEnd()
  let payload
  try {
    payload = JSON.parse(match[2])
  } catch {
    return <span className="whitespace-pre-wrap">{prefix}</span>
  }
  const kind = match[1]

  return (
    <div className="flex flex-col gap-3">
      {prefix && <span className="whitespace-pre-wrap">{prefix}</span>}
      {kind === 'jobs' && (
        <div className="-mx-1 mt-1 flex flex-col gap-2.5">
          {payload.map((job) => (
            <JobCard key={job.title} job={job} />
          ))}
        </div>
      )}
      {kind === 'company' && <CompanyInsights data={payload} />}
      {kind === 'interview' && <InterviewQuestions data={payload} />}
    </div>
  )
}
