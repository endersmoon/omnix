import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '@fontsource-variable/geist'
import './index.css'
import App from './App.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Chats from './pages/Chats.jsx'
import Artifacts from './pages/Artifacts.jsx'
import Jobs from './pages/Jobs.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/chats" element={<Chats />} />
        <Route path="/dashboard/artifacts" element={<Artifacts />} />
        <Route path="/dashboard/jobs" element={<Jobs />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
