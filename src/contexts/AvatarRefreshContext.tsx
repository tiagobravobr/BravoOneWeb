import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AvatarContextType {
  avatarTimestamp: number
  refreshAvatar: () => void
}

const AvatarContext = createContext<AvatarContextType | undefined>(undefined)

export function AvatarProvider({ children }: { children: ReactNode }) {
  const [avatarTimestamp, setAvatarTimestamp] = useState(Date.now())

  const refreshAvatar = () => {
    const newTimestamp = Date.now()
    setAvatarTimestamp(newTimestamp)
    console.log('Avatar refresh triggered:', newTimestamp)
  }

  // Expor função globalmente para outros componentes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).refreshAvatar = refreshAvatar
    }
  }, [])

  return (
    <AvatarContext.Provider value={{ avatarTimestamp, refreshAvatar }}>
      {children}
    </AvatarContext.Provider>
  )
}

export function useAvatarContext() {
  const context = useContext(AvatarContext)
  if (context === undefined) {
    throw new Error('useAvatarContext must be used within an AvatarProvider')
  }
  return context
}
