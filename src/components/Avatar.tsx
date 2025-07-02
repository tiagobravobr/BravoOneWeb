import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useAvatarContext } from '../contexts/AvatarRefreshContext'
import { supabase } from '../lib/supabase'

// Cache de memória para evitar flash entre navegações
const avatarCache = new Map<string, string | null>()

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showName?: boolean
  className?: string
  onClick?: () => void
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
  onClick
}: AvatarProps) {
  const { user } = useAuth()
  const { avatarTimestamp } = useAvatarContext()
  
  // Inicializar com valor do cache se disponível
  const getCacheKey = () => user ? `${user.id}_${avatarTimestamp}` : null
  const cacheKey = getCacheKey()
  const cachedValue = cacheKey ? avatarCache.get(cacheKey) : undefined
  
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    cachedValue !== undefined ? cachedValue : null
  )

  // Função para carregar avatar de forma simples e eficiente
  const loadAvatar = async () => {
    if (!user) {
      setAvatarUrl(null)
      return
    }

    const currentCacheKey = getCacheKey()
    
    // Se já tem no cache para esta versão, usar
    if (currentCacheKey && avatarCache.has(currentCacheKey)) {
      const cached = avatarCache.get(currentCacheKey)
      setAvatarUrl(cached!)
      return
    }

    try {
      // Tentar buscar o avatar (.webp primeiro, depois .jpg)
      const extensions = ['webp', 'jpg']
      let foundUrl = null

      for (const ext of extensions) {
        const { data } = await supabase.storage
          .from('avatars')
          .getPublicUrl(`${user.id}.${ext}`)
        
        if (data?.publicUrl) {
          // Usar o timestamp apenas quando há mudança real (upload/remoção)
          const urlWithVersion = avatarTimestamp > 0 ? 
            `${data.publicUrl}?v=${avatarTimestamp}` : 
            data.publicUrl
          
          // Verificar se existe de forma simples
          try {
            const response = await fetch(urlWithVersion, { method: 'HEAD' })
            if (response.ok) {
              foundUrl = urlWithVersion
              break
            }
          } catch {
            // Continua para próxima extensão
          }
        }
      }

      // Salvar no cache e atualizar estado
      if (currentCacheKey) {
        avatarCache.set(currentCacheKey, foundUrl)
        
        // Limpar cache de versões antigas para este usuário
        for (const [key] of avatarCache) {
          if (key.startsWith(`${user.id}_`) && key !== currentCacheKey) {
            avatarCache.delete(key)
          }
        }
      }
      
      setAvatarUrl(foundUrl)
    } catch (error) {
      console.error('Erro ao carregar avatar:', error)
      const fallback = null
      if (currentCacheKey) {
        avatarCache.set(currentCacheKey, fallback)
      }
      setAvatarUrl(fallback)
    }
  }

  // Carregar avatar quando usuário ou timestamp mudam
  useEffect(() => {
    // Se não tem no cache para esta versão, carregar
    const currentCacheKey = getCacheKey()
    if (currentCacheKey && !avatarCache.has(currentCacheKey)) {
      loadAvatar()
    }
  }, [user, avatarTimestamp])

  // Quando usuário muda, limpar estado se não tem cache
  useEffect(() => {
    if (!user) {
      setAvatarUrl(null)
    } else {
      const currentCacheKey = getCacheKey()
      if (currentCacheKey && avatarCache.has(currentCacheKey)) {
        setAvatarUrl(avatarCache.get(currentCacheKey)!)
      } else {
        loadAvatar()
      }
    }
  }, [user])

  // Função para gerar iniciais
  const getInitials = () => {
    if (!user) return '?'
    
    const displayName = user.user_metadata?.display_name || user.email || ''
    const names = displayName.split(' ').filter(Boolean)
    
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase()
    } else if (names.length === 1) {
      return names[0].slice(0, 2).toUpperCase()
    } else {
      return displayName.slice(0, 2).toUpperCase()
    }
  }

  const displayName = user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'Usuário'

  return (
    <div className="flex items-center gap-3">
      <div 
        className={`
          ${sizeClasses[size]} 
          rounded-full 
          overflow-hidden 
          flex-shrink-0 
          relative
          ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}
          ${className}
        `}
        onClick={onClick}
      >
        {avatarUrl ? (
          <img 
            src={avatarUrl} 
            alt="Avatar"
            className="w-full h-full object-cover"
            onError={() => {
              console.log('Image failed to load, falling back to initials')
              setAvatarUrl(null)
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-300 font-medium">
            {getInitials()}
          </div>
        )}
      </div>
      
      {showName && (
        <span className="text-gray-200 font-medium truncate">
          {displayName}
        </span>
      )}
    </div>
  )
}
