import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Pillars from './components/Pillars'
import PillarsScroll from './components/PillarsScroll'
import HowItWorks from './components/HowItWorks'
import Channels from './components/Channels'
import CtaBanner from './components/CtaBanner'
import Footer from './components/Footer'
import AuthModal from './components/AuthModal'

function App() {
  const [auth, setAuth] = useState({ open: false, mode: 'signin' })
  const openAuth = (mode = 'signin') => setAuth({ open: true, mode })
  const closeAuth = () => setAuth((a) => ({ ...a, open: false }))
  const setMode = (mode) => setAuth((a) => ({ ...a, mode }))

  return (
    <>
      <Navbar onOpenAuth={openAuth} />
      <Hero onOpenAuth={openAuth} />

      <PillarsScroll />
      <HowItWorks />
      <Channels />
      <CtaBanner />
      <Footer />
      <AuthModal
        open={auth.open}
        mode={auth.mode}
        onClose={closeAuth}
        onModeChange={setMode}
      />
    </>
  )
}

export default App
