export function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 5.1 29.3 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.2-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.1l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 5.1 29.3 3 24 3 16.3 3 9.7 7.3 6.3 14.1z"/>
      <path fill="#4CAF50" d="M24 45c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.6 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 40.6 16.2 45 24 45z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.2 5.2C41.3 35.6 45 30.3 45 24c0-1.2-.1-2.3-.4-3.5z"/>
    </svg>
  )
}

export function NaukriIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="naukri-swoosh" x1="24.23" y1="30.22" x2="12.80" y2="17.02" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#265DF5" />
        </linearGradient>
      </defs>
      <path d="M20.3633 39.5C31.1329 39.5 39.8633 30.7696 39.8633 20C39.8633 9.23045 31.1329 0.5 20.3633 0.5C9.59376 0.5 0.863312 9.23045 0.863312 20C0.863312 30.7696 9.59376 39.5 20.3633 39.5Z" fill="#265DF5" />
      <path d="M26.2273 27.2235L26.1838 29.2001L26.0576 34.907V35.1273C16.4142 26.7816 14.7714 24.746 14.4867 24.1273L14.4768 24.1063C14.4425 23.9898 14.4344 23.8672 14.453 23.7471C14.4598 23.7027 14.4692 23.6587 14.481 23.6153C14.4909 23.5802 14.5007 23.5465 14.5133 23.5101C14.6172 23.2371 14.7646 22.9827 14.9496 22.7567C15.0821 22.5855 15.2265 22.4238 15.3817 22.2727C15.7135 21.9446 16.0689 21.6412 16.4451 21.3651C16.6317 21.2248 16.8267 21.0845 17.0329 20.9442C17.4313 20.672 17.862 20.3999 18.3081 20.1347C21.7732 23.367 26.1712 27.1716 26.2273 27.2235Z" fill="url(#naukri-swoosh)" />
      <path d="M26.355 8.47672L26.3115 10.4604L26.2891 11.4424L26.2442 13.4163L26.2217 14.4067L26.1782 16.3819C26.1095 16.41 21.7115 18.1159 18.3221 20.1318C17.876 20.397 17.4467 20.6691 17.0469 20.9413C16.8421 21.0816 16.6457 21.2219 16.4591 21.3622C16.0835 21.6391 15.7282 21.9424 15.3957 22.2698C15.2409 22.4212 15.0966 22.5829 14.9636 22.7538C14.6578 23.1438 14.474 23.5268 14.4474 23.8873L14.4838 22.239V22.2277L14.4909 21.9724V21.8798L14.5203 20.8403L14.5764 18.7794L14.6031 17.7722L14.6592 15.7296C15.3564 12.8705 25.2032 8.92984 26.355 8.47672Z" fill="#fff" />
      <circle cx="17.277" cy="7.768" r="2.894" fill="#fff" />
    </svg>
  )
}

export function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

export function Spinner({ className = 'h-5 w-5' }) {
  return (
    <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function UploadIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
    </svg>
  )
}

export function CheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
