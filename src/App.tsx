import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Login, CreateAccount, ForgotPassword, ResetPassword } from './pages/auth'
import Teste from './pages/auth/Teste'
import Home from './pages/Home'
import ContentViewer from './pages/ContentViewer'
import { AdminLayout } from './components/layouts'
import { AdminDashboard, AdminContent, AdminUsers, AdminAnalytics, AdminSettings, AcademyForm } from './pages/admin'
import { ToastProvider } from './contexts/ToastContext'

function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/teste" element={<Teste />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/content/:slug" 
          element={
            <ProtectedRoute>
              <ContentViewer />
            </ProtectedRoute>
          } 
        />
        {/* Admin Routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="content/create-academy" element={<AcademyForm />} />
          <Route path="content/edit-academy/:id" element={<AcademyForm />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/dashboard" element={<Navigate to="/" replace />} />
      </Routes>
    </ToastProvider>
  )
}

export default App
