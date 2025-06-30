import { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
  className?: string
}

export default function AuthLayout({ children, className = "" }: AuthLayoutProps) {
  return (
    <div className={`min-h-dvh bg-gray-950 ${className}`}>
      {children}
    </div>
  )
}
