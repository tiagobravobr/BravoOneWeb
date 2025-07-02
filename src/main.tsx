import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { AvatarProvider } from './contexts/AvatarRefreshContext'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AvatarProvider>
          <App />
        </AvatarProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
