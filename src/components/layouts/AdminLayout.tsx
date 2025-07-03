import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'

interface AdminLayoutProps {
  children?: ReactNode
  className?: string
}

export default function AdminLayout({ children, className = "" }: AdminLayoutProps) {
  return (
    <div className={`min-h-dvh bg-gray-950 flex flex-col ${className}`}>
      <Header />
      <main className="flex-1 pt-20">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  )
}
