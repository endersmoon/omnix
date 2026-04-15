import { NaukriIcon, Spinner } from './icons'

export default function FetchingPhase() {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#265DF5]/20" />
        <NaukriIcon size={56} />
      </div>
      <h2 className="mt-6 text-xl font-semibold tracking-tight text-[#0b0b14]">
        Fetching your profile
      </h2>
      <p className="mt-1.5 max-w-[280px] text-sm text-[#5b5b6e]">
        Pulling your experience, education, and preferences from Naukri…
      </p>
      <div className="mt-6 flex items-center gap-2 text-sm text-[#5b5b6e]">
        <Spinner className="h-4 w-4 text-primary" />
        This will only take a moment
      </div>
    </div>
  )
}
