import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useUserProfile } from '../hooks/useUserProfile'
import { useAvatar } from '../contexts/AvatarContext'

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showName?: boolean
  className?: string
  onClick?: () => void
  editable?: boolean
  onImageChange?: (file: File) => void
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm', 
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg'
}

export default function Avatar({ 
  size = 'md', 
  showName = false, 
  className = '', 
  onClick, 
  editable = false,
  onImageChange 
}: AvatarProps) {
  const { profile, uploadAvatar } = useUserProfile()
  const { avatarVersion } = useAvatar()
  const [isUploading, setIsUploading] = useState(false)
  const [avatarError, setAvatarError] = useState(false)
  const { user } = useAuth()

  // Função para montar a URL do avatar
  const getAvatarUrl = () => {
    if (!user) return null
    const baseUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${user.id}.jpg`
    return `${baseUrl}?v=${avatarVersion}`
  }

  // Função para obter nome de exibição
  const getDisplayName = () => {
    return user?.user_metadata?.display_name || 
           profile?.nome_completo || 
           user?.email?.split('@')[0] || 
           'Usuário'
  }

  // Função para obter iniciais
  const getInitials = () => {
    const name = getDisplayName()
    const words = name.split(/\s+/).filter((word: string) => word.length > 0)
    
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase()
    } else if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase()
    }
    return 'US'
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setAvatarError(false)
    
    try {
      const result = await uploadAvatar(file)
      if (result.error) {
        console.error('Erro ao fazer upload:', result.error)
      } else {
        onImageChange?.(file)
        // Força re-render após upload
        setAvatarError(false)
        // Força reload da imagem
        setTimeout(() => setAvatarError(false), 100)
      }
    } catch (error) {
      console.error('Erro no upload:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleClick = () => {
    if (editable) {
      document.getElementById('avatar-upload')?.click()
    }
    onClick?.()
  }

  const avatarUrl = getAvatarUrl()
  const initials = getInitials()
  const displayName = getDisplayName()

  return (
    <div className="flex items-center gap-3">
      <div 
        className={`${sizeClasses[size]} bg-gray-600 rounded-full flex items-center justify-center relative overflow-hidden ${className} group transition-all duration-200 ${editable ? 'cursor-pointer hover:ring-2 hover:ring-primary-500/50' : ''}`}
        onClick={handleClick}
      >
        {!avatarError && avatarUrl ? (
          <img 
            src={avatarUrl}
            alt={displayName}
            className="w-full h-full object-cover"
            onError={() => setAvatarError(true)}
            onLoad={() => setAvatarError(false)}
          />
        ) : (
          <span className="text-white font-medium">
            {initials}
          </span>
        )}
        
        {isUploading && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Câmera no hover */}
        {editable && !isUploading && (
          <div className="absolute inset-0 bg-black/0 hover:bg-black/60 transition-all duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        )}
      </div>
      
      {showName && (
        <span className="text-white font-medium">{displayName}</span>
      )}
      
      {editable && (
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      )}
    </div>
  )
}
