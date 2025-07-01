import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useUserProfile } from '../hooks/useUserProfile'

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
  const { user } = useAuth()
  const { profile, uploadAvatar } = useUserProfile()
  const [isUploading, setIsUploading] = useState(false)
  const [avatarKey, setAvatarKey] = useState(0) // Para forçar re-render
  
  // Atualizar chave quando avatar URL mudar
  useEffect(() => {
    setAvatarKey(prev => prev + 1)
  }, [profile?.avatar_url])
  
  // Função para obter URL do avatar
  const getAvatarUrl = () => {
    return profile?.avatar_url || null
  }

  // Função para obter nome de exibição
  const getDisplayName = () => {
    // Prioridade: display_name do auth -> nome_completo do profile -> primeiro nome do email
    return user?.user_metadata?.display_name || 
           profile?.nome_completo || 
           user?.email?.split('@')[0] || 
           'Usuário'
  }

  // Função para obter iniciais
  const getInitials = () => {
    const name = getDisplayName()
    
    if (name === 'Usuário') {
      return 'US'
    }
    
    // Dividir em palavras e filtrar palavras vazias
    const words = name.split(/\s+/).filter((word: string) => word.length > 0)
    
    if (words.length >= 2) {
      // Se tem 2 ou mais palavras, usar primeira letra de cada uma das 2 primeiras
      return (words[0][0] + words[1][0]).toUpperCase()
    } else if (words.length === 1) {
      // Se só tem uma palavra, usar as 2 primeiras letras
      return words[0].substring(0, 2).toUpperCase()
    }
    
    // Fallback
    return 'US'
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    
    try {
      const result = await uploadAvatar(file)
      if (result.error) {
        console.error('Erro ao fazer upload:', result.error)
      } else {
        onImageChange?.(file)
      }
    } catch (error) {
      console.error('Erro no upload:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const avatarUrl = getAvatarUrl()
  const initials = getInitials()
  const displayName = getDisplayName()

  const AvatarContent = () => (
    <div className={`${sizeClasses[size]} bg-gray-600 rounded-full flex items-center justify-center relative overflow-hidden ${className} group transition-all duration-200 ${editable ? 'cursor-pointer ring-2 ring-transparent hover:ring-primary-500/50 hover:ring-opacity-75' : ''}`}>
      {avatarUrl ? (
        <img 
          key={`${avatarUrl}-${avatarKey}`} // Force re-render when URL or key changes
          src={avatarUrl} 
          alt={displayName}
          className="w-full h-full object-cover"
          onLoad={() => {
            // Force a re-render to ensure the image is displayed
            console.log('Avatar carregado:', avatarUrl)
          }}
          onError={() => {
            console.error('Erro ao carregar avatar:', avatarUrl)
          }}
        />
      ) : (
        <span className="text-white font-medium">
          {initials}
        </span>
      )}
      
      {isUploading && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mb-1"></div>
            <span className="text-xs text-white">Upload...</span>
          </div>
        </div>
      )}
      
      {/* Overlay com ícone de câmera sempre visível */}
      {editable && !isUploading && (
        <div className="absolute inset-0 bg-black/0 hover:bg-black/60 transition-all duration-200 flex items-center justify-center opacity-100">
          <div className="flex flex-col items-center">
            <svg className="w-6 h-6 text-white mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs text-white font-medium">Alterar</span>
          </div>
        </div>
      )}
      {/* Indicador visual permanente - mais discreto */}
      {editable && !isUploading && (
        <div className="absolute -bottom-1 -right-1 bg-primary-600 hover:bg-primary-700 transition-all duration-200 rounded-full p-1 border-2 border-gray-900 shadow-lg group-hover:scale-110 transform">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
      )}
    </div>
  )

  if (editable) {
    return (
      <label className="cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={isUploading}
        />
        <AvatarContent />
      </label>
    )
  }

  if (onClick) {
    return (
      <button onClick={onClick} className="focus:outline-none">
        <AvatarContent />
      </button>
    )
  }

  const avatar = <AvatarContent />

  if (showName) {
    return (
      <div className="flex items-center space-x-3">
        {avatar}
        <span className="text-white font-medium">{displayName}</span>
      </div>
    )
  }

  return avatar
}
