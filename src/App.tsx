import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Login, CreateAccount, ForgotPassword, ResetPassword } from './pages/auth'
import Home from './pages/Home'
import ContentViewer from './pages/ContentViewer'
import { AdminLayout, MainLayout } from './components/layouts'
import { AdminDashboard, AdminUsers, AdminAnalytics, AdminSettings } from './pages/admin'
import ContentsPage from './pages/admin/contents/ContentsPage'
import AcademyPage from './pages/admin/contents/AcademyPage'
import { Account, Profile, Subscriptions, Purchases, PaymentMethods, AccountSettings } from './pages/account'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
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
          <Route path="contents" element={<ContentsPage />} />
          <Route path="contents/create-academy" element={<AcademyPage />} />
          <Route path="contents/edit-academy/:id" element={<AcademyPage />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/dashboard" element={<Navigate to="/" replace />} />
        
        {/* Account Routes */}
        <Route 
          path="/account" 
          element={
            <ProtectedRoute>
              <MainLayout>
                <Account />
              </MainLayout>
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/account/profile" replace />} />
          <Route path="profile" element={<Profile />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="purchases" element={<Purchases />} />
          <Route path="payment" element={<PaymentMethods />} />
          <Route path="settings" element={<AccountSettings />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
