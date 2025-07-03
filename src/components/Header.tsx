import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { Settings, Users, BarChart3, TrendingUp, Monitor, Shield, Menu, LayoutGrid } from 'lucide-react'
import Avatar from './Avatar'

export default function Header() {
    const { signOut } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    // Verificar se está na área admin
    const isAdminArea = location.pathname.startsWith('/admin')

    // Menu items para área admin
    const adminMenuItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: BarChart3,
            path: '/admin',
            description: 'Visão geral da plataforma'
        },
        {
            id: 'content',
            label: 'Conteúdos',
            icon: LayoutGrid,
            path: '/admin/contents',
            description: 'Gerenciar academias, cursos e aulas'
        },
        {
            id: 'users',
            label: 'Usuários',
            icon: Users,
            path: '/admin/users',
            description: 'Gerenciar usuários e permissões'
        },
        {
            id: 'analytics',
            label: 'Analytics',
            icon: TrendingUp,
            path: '/admin/analytics',
            description: 'Relatórios e métricas'
        },
        {
            id: 'settings',
            label: 'Configurações',
            icon: Settings,
            path: '/admin/settings',
            description: 'Configurações gerais do sistema'
        }
    ]

    const isActiveRoute = (path: string) => {
        if (path === '/admin') {
            // Dashboard deve estar ativo apenas quando está exatamente em /admin
            return location.pathname === '/admin'
        }
        // Para outras rotas, usar startsWith
        return location.pathname.startsWith(path)
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
            const target = event.target as Node

            // Não fechar se o clique foi no menu mobile ou seus filhos
            const mobileMenu = document.querySelector('[data-mobile-menu]')
            if (mobileMenu && mobileMenu.contains(target)) {
                return
            }

            if (menuRef.current && !menuRef.current.contains(target)) {
                setIsMenuOpen(false)
                setIsMobileMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Fechar menu mobile quando a rota mudar
    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [location.pathname])

    const handleSignOut = async () => {
        const { error } = await signOut()
        if (error) {
            console.error('Erro ao fazer logout:', error)
        }
    }

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-gray-950/50 backdrop-blur-md shadow-md'
                : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center hover:opacity-80 transition-opacity"
                    >
                        <img
                            src="/bravo-logo-dark.svg"
                            alt="Bravo One"
                            className="h-6 w-auto"
                        />
                    </button>

                    {/* Menu Central de Navegação (só aparece no admin) */}
                    {isAdminArea && (
                        <>
                            <nav className="hidden md:flex items-center space-x-8">
                                {adminMenuItems.map((item) => {
                                    const Icon = item.icon
                                    const isActive = isActiveRoute(item.path)
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => navigate(item.path)}
                                            className={`relative flex items-center gap-2 px-1 py-2 transition-all duration-200 group ${isActive
                                                ? 'text-primary-300'
                                                : 'text-gray-400 hover:text-gray-200'
                                                }`}
                                            title={item.description}
                                        >
                                            <Icon className="w-4 h-4" />
                                            <span className="font-medium text-sm">{item.label}</span>
                                            {isActive && (
                                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full"></div>
                                            )}
                                            {!isActive && (
                                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                                            )}
                                        </button>
                                    )
                                })}
                            </nav>
                            {/* Botão de menu mobile */}
                            <button
                                className="md:hidden p-2 rounded-lg hover:bg-gray-800/50 transition-colors ml-2"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label="Menu"
                            >
                                <Menu className="w-6 h-6 text-gray-400" />
                            </button>
                            {/* Menu suspenso mobile */}
                            {isMobileMenuOpen && (
                                <div className="fixed inset-0 z-50 md:hidden" data-mobile-menu>
                                    <div
                                        className="absolute inset-0 bg-black/50"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    />
                                    <div className="absolute top-16 left-0 right-0 bg-gray-900 border-t border-gray-800 shadow-xl">
                                        {adminMenuItems.map((item) => {
                                            const Icon = item.icon
                                            const isActive = isActiveRoute(item.path)
                                            return (
                                                <button
                                                    key={item.id}
                                                    onClick={() => navigate(item.path)}
                                                    className={`w-full flex items-center gap-3 px-6 py-4 text-left border-b border-gray-800 last:border-b-0 transition-colors ${isActive
                                                        ? 'text-primary-300 bg-gray-800'
                                                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                                                        }`}
                                                >
                                                    <Icon className="w-5 h-5" />
                                                    <span className="font-medium">{item.label}</span>
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* Ações e Avatar */}
                    <div className="flex items-center space-x-3">
                        {/* Ícone de Pesquisa */}
                        <button className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors">
                            <svg className="w-5 h-5 text-gray-400 hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>

                        {/* Ícone de Notificações */}
                        <button className="relative p-2 hover:bg-gray-800/50 rounded-lg transition-colors">
                            <svg className="w-5 h-5 text-gray-400 hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            {/* Badge de notificações */}
                            <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                                2
                            </div>
                        </button>

                        {/* Botão Toggle Admin/Home */}
                        <button
                            onClick={() => navigate(isAdminArea ? '/' : '/admin')}
                            className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors group"
                            title={isAdminArea ? 'Área de Membros' : 'Administração'}
                        >
                            {isAdminArea ? (
                                <Monitor className="w-5 h-5 text-gray-400 group-hover:text-gray-300" />
                            ) : (
                                <Shield className="w-5 h-5 text-gray-400 group-hover:text-primary-400" />
                            )}
                        </button>

                        {/* Avatar com Menu */}
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="flex items-center space-x-2 hover:bg-gray-800/50 rounded-lg p-2 transition-colors"
                            >
                                {/* Avatar */}
                                <Avatar size="sm" />

                                {/* Seta */}
                                <svg
                                    className={`w-4 h-4 text-gray-400 transition-transform ${isMenuOpen ? 'rotate-180' : ''
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
                                            navigate('/account')
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
            </div>
        </header>
    )
}
