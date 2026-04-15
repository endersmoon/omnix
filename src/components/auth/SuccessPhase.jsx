import { CheckIcon } from './icons'

export default function SuccessPhase() {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#DCFCE7] text-[#15803D] animate-[popIn_.3s_ease-out]">
        <CheckIcon />
      </span>
      <h2 className="mt-5 text-xl font-semibold tracking-tight text-[#0b0b14]">
        You're all set!
      </h2>
      <p className="mt-1.5 max-w-[280px] text-sm text-[#5b5b6e]">
        Profile ready. Taking you to your dashboard…
      </p>
    </div>
  )
}
