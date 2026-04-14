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
import Profile from './pages/Profile.jsx'
import DashboardLayout from './pages/DashboardLayout.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="chats" element={<Chats />} />
          <Route path="artifacts" element={<Artifacts />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
