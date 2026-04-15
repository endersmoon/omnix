export default function Tooltip({ label, children }) {
  return (
    <span className="group relative inline-flex">
      {children}
      <span className="pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#0b0b14] px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-[0_8px_24px_rgba(11,11,20,0.2)] transition-opacity group-hover:opacity-100">
        {label}
      </span>
    </span>
  )
}
