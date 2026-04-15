export default function Field({ label, trailing, value, onChange, ...rest }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-center justify-between text-xs font-medium text-[#5b5b6e]">
        {label}
        {trailing}
      </span>
      <input
        {...rest}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-xl border border-[#ececf3] bg-white px-3.5 text-sm text-[#0b0b14] placeholder:text-[#9a9aae] outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/15"
      />
    </label>
  )
}
