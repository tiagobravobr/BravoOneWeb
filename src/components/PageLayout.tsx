import { ReactNode } from 'react'

interface PageLayoutProps {
  children: ReactNode
  className?: string
  fullHeight?: boolean
  centered?: boolean
}

export default function PageLayout({ 
  children, 
  className = "", 
  fullHeight = true,
  centered = false
}: PageLayoutProps) {
  const baseClasses = `bg-gray-950 ${fullHeight ? 'min-h-dvh' : ''} ${centered ? 'flex items-center justify-center' : 'flex flex-col'}`
  
  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  )
}
