import { createContext, useContext, useState, ReactNode } from 'react'

interface AvatarContextType {
  avatarVersion: number
  updateAvatarVersion: () => void
}

const AvatarContext = createContext<AvatarContextType | undefined>(undefined)

export function AvatarProvider({ children }: { children: ReactNode }) {
  const [avatarVersion, setAvatarVersion] = useState(0)

  const updateAvatarVersion = () => {
    setAvatarVersion(prev => prev + 1)
  }

  return (
    <AvatarContext.Provider value={{ avatarVersion, updateAvatarVersion }}>
      {children}
    </AvatarContext.Provider>
  )
}

export function useAvatar() {
  const context = useContext(AvatarContext)
  if (context === undefined) {
    throw new Error('useAvatar must be used within an AvatarProvider')
  }
  return context
}
