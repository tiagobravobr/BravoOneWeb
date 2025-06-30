import { ReactNode } from 'react'
import Header from '../Header'
import Footer from '../Footer'

interface MainLayoutProps {
  children: ReactNode
  className?: string
}

export default function MainLayout({ children, className = "" }: MainLayoutProps) {
  return (
    <div className={`min-h-dvh bg-gray-950 flex flex-col ${className}`}>
      <Header />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
    </div>
  )
}
