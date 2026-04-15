import { CloseIcon, UploadIcon } from './icons'

export default function UploadPhase({ cvFile, onPickFile, onClear, onConfirm }) {
  return (
    <div className="flex flex-col items-center py-2 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <UploadIcon />
      </span>
      <h2 className="mt-5 text-2xl font-semibold tracking-tight text-[#0b0b14]">
        Upload your CV
      </h2>
      <p className="mt-1.5 max-w-[300px] text-sm text-[#5b5b6e]">
        Omni will use it to personalize job matches, resume tips, and interview prep.
      </p>

      {!cvFile ? (
        <button
          type="button"
          onClick={onPickFile}
          className="mt-6 flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#ececf3] bg-[#fafafc] px-5 py-8 text-sm text-[#5b5b6e] hover:border-primary/40 hover:bg-primary/[0.03] hover:text-[#0b0b14] transition-colors"
        >
          <UploadIcon />
          <span className="font-medium">Click to choose a file</span>
          <span className="text-xs text-[#9a9aae]">PDF, DOC, or DOCX · up to 10MB</span>
        </button>
      ) : (
        <div className="mt-6 flex w-full items-center gap-3 rounded-2xl border border-[#ececf3] bg-white px-4 py-3 text-left">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <UploadIcon />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-[#0b0b14]">{cvFile.name}</p>
            <p className="text-xs text-[#9a9aae]">{(cvFile.size / 1024).toFixed(0)} KB</p>
          </div>
          <button
            type="button"
            onClick={onClear}
            aria-label="Remove file"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#9a9aae] hover:bg-black/5 hover:text-[#0b0b14]"
          >
            <CloseIcon />
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={onConfirm}
        disabled={!cvFile}
        className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(74,79,253,0.25)] hover:bg-primary-hover hover:-translate-y-[1px] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
      >
        Continue
      </button>
    </div>
  )
}
