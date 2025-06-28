import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function Header() {
  const { user, signOut } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Gerar iniciais do usuário
  const getInitials = (user: any) => {
    if (!user) return 'US'
    
    // Tentar usar display_name (padrão) ou full_name (compatibilidade)
    const displayName = user.user_metadata?.display_name || user.user_metadata?.full_name
    if (displayName) {
      const nameParts = displayName.trim().split(' ')
      if (nameParts.length >= 2) {
        // Se tem nome e sobrenome, usar primeira letra de cada
        return (nameParts[0][0] + nameParts[1][0]).toUpperCase()
      } else if (nameParts[0].length >= 2) {
        // Se tem apenas um nome, usar as 2 primeiras letras
        return (nameParts[0][0] + nameParts[0][1]).toUpperCase()
      }
    }
    
    // Fallback para email se não tiver nome
    const email = user.email
    if (!email) return 'US'
    
    const parts = email.split('@')[0].split('.')
    
    // Se tem 2 ou mais partes (ex: tiago.bravo), usar primeira letra de cada
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    
    // Se tem apenas 1 parte (ex: maria), usar as 2 primeiras letras
    const name = parts[0]
    if (name.length >= 2) {
      return (name[0] + name[1]).toUpperCase()
    }
    
    // Se o nome tem apenas 1 letra, duplicar
    return (name[0] + name[0]).toUpperCase()
  }

  // Detectar scroll para efeito glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/80 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/bravo-logo-dark.svg"
              alt="Bravo One"
              className="h-6 w-auto"
            />
          </div>
          
          {/* Avatar com Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-2 hover:bg-gray-800/50 rounded-lg p-2 transition-colors"
            >
              {/* Avatar */}
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {getInitials(user)}
                </span>
              </div>
              
              {/* Seta */}
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform ${
                  isMenuOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Menu Dropdown */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-md border border-gray-700/50 rounded-lg shadow-xl py-2">
                <button
                  onClick={() => {
                    setIsMenuOpen(false)
                    // Aqui você pode adicionar navegação para "Minha Conta"
                  }}
                  className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors text-sm"
                >
                  Minha Conta
                </button>
                
                <button
                  onClick={() => {
                    setIsMenuOpen(false)
                    handleSignOut()
                  }}
                  className="w-full text-left px-4 py-3 text-red-400 hover:text-red-300 hover:bg-gray-700/50 transition-colors text-sm"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
