import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArticlePage from './components/ArticlePage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'
import AdminLogin from './components/AdminLogin.jsx'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/adminLogin" element={<AdminLogin />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
          </Routes>
        </Router>
      </ClerkProvider>
  </StrictMode>,
)
