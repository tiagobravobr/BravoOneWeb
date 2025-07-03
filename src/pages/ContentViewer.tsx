import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { MainLayout } from '../components/layouts'
import { Play, Heart, MoreVertical, ThumbsUp, Bookmark, ChevronDown, PanelLeftClose, PanelLeft } from 'lucide-react'

interface ContentData {
  id: string
  slug: string
  type: 'course' | 'module' | 'article' | 'podcast' | 'video' | 'ebook'
  title: string
  description: string
  content?: string
  duration?: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  category: string
  author: string
  publishedDate: string
  thumbnail: string
  videoUrl?: string
  audioUrl?: string
  downloadUrl?: string
  tags: string[]
  rating?: number
  enrolledCount?: number
  isLocked?: boolean
  currentLesson?: {
    title: string
    duration: string
    content: string
  }
}

// Simulação de dados de conteúdo
const mockContentData: Record<string, ContentData> = {
  'modelo-de-negocio': {
    id: '1',
    slug: 'modelo-de-negocio',
    type: 'course',
    title: 'Método Bravo de Negócios',
    description: 'Domine os fundamentos empresariais através de metodologias práticas e estratégias comprovadas para construir e escalar negócios de sucesso.',
    content: 'O Método Bravo de Negócios é um programa completo que aborda desde a concepção do modelo de negócio até a implementação de sistemas de alta performance. Desenvolvido com base em anos de experiência prática e cases reais de empresas que alcançaram resultados extraordinários.\n\nEste curso foi estruturado para empreendedores, executivos e profissionais que desejam construir uma base sólida para seus negócios, implementar estratégias eficazes e criar sistemas sustentáveis de crescimento e lucratividade.',
    duration: '12h 45min',
    difficulty: 'intermediate',
    category: 'Negócios & Empreendedorismo',
    author: 'Tiago Bravo',
    currentLesson: {
      title: 'Introdução ao Modelo de Negócio',
      duration: '18min',
      content: 'Nesta aula introdutória, você descobrirá os elementos fundamentais que compõem um modelo de negócio sólido e escalável. Vamos explorar como identificar oportunidades de mercado, definir sua proposta de valor única e estruturar uma base empresarial que sustente o crescimento a longo prazo.\n\nAprenderemos sobre os 9 componentes essenciais do Business Model Canvas e como aplicá-los na prática para validar e refinar sua ideia de negócio. Ao final desta aula, você terá uma compreensão clara de como construir um modelo de negócio robusto e diferenciado no mercado.'
    },
    publishedDate: '2024-01-15',
    thumbnail: 'https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?q=80&w=2000&auto=format&fit=crop',
    videoUrl: '#',
    tags: ['negócios', 'empreendedorismo', 'modelo de negócio', 'estratégia', 'método bravo'],
    rating: 4.9,
    enrolledCount: 3247,
    isLocked: false
  }
}

const ContentViewer = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [content, setContent] = useState<ContentData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [expandedModule, setExpandedModule] = useState<number>(1) // Módulo 1 aberto por padrão
  
  // Calcula o módulo ativo baseado no slug da URL
  const getActiveModule = (slug: string | undefined): number => {
    if (!slug) return 1
    // Mapeia slugs para módulos específicos
    const moduleMap: Record<string, number> = {
      'modelo-de-negocio': 1,
      'fundamentacao': 2,
      'visao-planejamento': 3,
      'lideranca-empresarial': 4,
      'maquina-de-valor': 5,
      'performance': 6
    }
    return moduleMap[slug] || 1
  }
  
  const activeModule = getActiveModule(slug)

  useEffect(() => {
    // Simula carregamento de dados
    const loadContent = () => {
      setIsLoading(true)
      setTimeout(() => {
        if (slug && mockContentData[slug]) {
          setContent(mockContentData[slug])
        }
        setIsLoading(false)
      }, 500)
    }

    loadContent()
    
    // Abre automaticamente o módulo ativo baseado no slug
    const activeModuleFromSlug = getActiveModule(slug)
    setExpandedModule(activeModuleFromSlug)
  }, [slug])

  const handleGoBack = () => {
    navigate('/dashboard')
  }

  const toggleModule = (moduleId: number) => {
    setExpandedModule(expandedModule === moduleId ? 0 : moduleId)
  }

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center flex-1">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </MainLayout>
    )
  }

  if (!content) {
    return (
      <MainLayout>
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Conteúdo não encontrado</h1>
          <p className="text-gray-400 mb-8">O conteúdo que você está procurando não existe.</p>
          <button
            onClick={handleGoBack}
            className="btn btn-primary btn-lg"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <main className="flex-1 pb-16">
        {/* Botão Voltar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar ao Home
          </button>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* Sidebar - Menu Lateral Sticky */}
            <div className={`sticky top-20 transition-all duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-80'
              } flex-shrink-0 self-start`}>
              <div>
                <div className={`relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded transition-all duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-full'
                  }`}>

                  {isSidebarCollapsed ? (
                    /* Modo Colapsado - Apenas botão toggle */
                    <div className="p-4 flex items-center justify-center">
                      <button
                        onClick={() => setIsSidebarCollapsed(false)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded transition-colors"
                        title="Expandir menu"
                      >
                        <PanelLeft className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    /* Modo Expandido - Conteúdo completo */
                    <>
                      {/* Header da Sidebar com Toggle Button */}
                      <div className="sidebar-header">
                        {/* Toggle Button - Canto superior direito */}
                        <button
                          onClick={() => setIsSidebarCollapsed(true)}
                          className="menu-toggle"
                          title="Recolher menu"
                        >
                          <PanelLeftClose className="w-5 h-5" />
                        </button>

                        <h3 className="collection-title">Método Bravo de Negócios</h3>
                        <div className="collection-info">
                          <span>6 módulos</span>
                          <span>•</span>
                          <span>24 aulas</span>
                          <span>•</span>
                          <span>12h 45min</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: '4%' }}></div>
                          </div>
                          <div className="progress-info">
                            <p className="progress-text">1 de 24 aulas concluídas</p>
                            <span className="progress-percentage">4%</span>
                          </div>
                        </div>
                      </div>

                      {/* Lista de Módulos */}
                      <div>
                        {/* Módulo 1 - Modelo de Negócio */}
                        <div className="border-b border-gray-800">
                          <div
                            className={`p-4 transition-colors cursor-pointer hover:bg-gray-800/30 ${
                              activeModule === 1 ? 'module-active' : ''
                            }`}
                            onClick={() => toggleModule(1)}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="module-title">Módulo 1: Modelo de Negócio</h4>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400">2h 15min</span>
                                <ChevronDown
                                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${expandedModule === 1 ? 'rotate-180' : ''
                                    }`}
                                />
                              </div>
                            </div>
                          </div>
                          {expandedModule === 1 && (
                            <div className="module-content">
                              <div className="lesson-active">
                                <div className="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0">
                                  <Play className="w-3 h-3 text-white" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm text-primary-300 font-medium truncate">
                                    Introdução ao Modelo de Negócio
                                  </p>
                                  <p className="text-xs text-gray-400">18min • Assistindo agora</p>
                                </div>
                              </div>
                              <div className="lesson-item group">
                                <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                  <Play className="w-3 h-3 text-white" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                                    Business Model Canvas
                                  </p>
                                  <p className="text-xs text-gray-400">25min</p>
                                </div>
                              </div>
                              <div className="lesson-item group">
                                <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                  <Play className="w-3 h-3 text-white" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                                    Proposta de Valor Única
                                  </p>
                                  <p className="text-xs text-gray-400">22min</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800/50 transition-colors cursor-pointer group">
                                <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                  <Play className="w-3 h-3 text-white" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                                    Validação de Mercado
                                  </p>
                                  <p className="text-xs text-gray-400">30min</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Módulo 2 - Fundamentação */}
                        <div className="border-b border-gray-800">
                          <div
                            className={`p-4 transition-colors cursor-pointer hover:bg-gray-800/30 ${
                              activeModule === 2 ? 'module-active' : ''
                            }`}
                            onClick={() => toggleModule(2)}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="module-title">Módulo 2: Fundamentação</h4>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400">2h 30min</span>
                                <ChevronDown
                                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${expandedModule === 2 ? 'rotate-180' : ''
                                    }`}
                                />
                              </div>
                            </div>
                          </div>
                          {expandedModule === 2 && (
                            <div className="module-content">
                              <div className="lesson-item group">
                                <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                  <Play className="w-3 h-3 text-white" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                                    Estrutura Jurídica e Legal
                                  </p>
                                  <p className="text-xs text-gray-400">35min</p>
                                </div>
                              </div>
                              <div className="lesson-item group">
                                <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                  <Play className="w-3 h-3 text-white" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                                    Planejamento Financeiro
                                  </p>
                                  <p className="text-xs text-gray-400">40min</p>
                                </div>
                              </div>
                              <div className="lesson-item group">
                                <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                  <Play className="w-3 h-3 text-white" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                                    Sistemas e Processos
                                  </p>
                                  <p className="text-xs text-gray-400">35min</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Módulo 3 - Visão & Planejamento */}
                        <div className="border-b border-gray-800">
                          <div
                            className={`p-4 transition-colors cursor-pointer hover:bg-gray-800/30 ${
                              activeModule === 3 ? 'module-active' : ''
                            }`}
                            onClick={() => toggleModule(3)}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="module-title">Módulo 3: Visão & Planejamento</h4>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400">2h 0min</span>
                                <ChevronDown
                                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${expandedModule === 3 ? 'rotate-180' : ''
                                    }`}
                                />
                              </div>
                            </div>
                          </div>
                          {expandedModule === 3 && (
                            <div className="module-content">
                              <div className="lesson-item group">
                                <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                  <Play className="w-3 h-3 text-white" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                                    Definindo Visão e Missão
                                  </p>
                                  <p className="text-xs text-gray-400">30min</p>
                                </div>
                              </div>
                              <div className="lesson-item group">
                                <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                  <Play className="w-3 h-3 text-white" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                                    Planejamento Estratégico
                                  </p>
                                  <p className="text-xs text-gray-400">45min</p>
                                </div>
                              </div>
                              <div className="lesson-item group">
                                <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                  <Play className="w-3 h-3 text-white" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                                    Metas e KPIs
                                  </p>
                                  <p className="text-xs text-gray-400">25min</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Módulo 4 - Liderança Empresarial */}
                        <div className="border-b border-gray-800">
                          <div
                            className={`p-4 transition-colors cursor-pointer hover:bg-gray-800/30 ${
                              activeModule === 4 ? 'module-active' : ''
                            }`}
                            onClick={() => toggleModule(4)}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="module-title">Módulo 4: Liderança Empresarial</h4>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400">2h 20min</span>
                                <ChevronDown
                                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${expandedModule === 4 ? 'rotate-180' : ''
                                    }`}
                                />
                              </div>
                            </div>
                          </div>
                          {expandedModule === 4 && (
                            <div className="module-content">
                              <div className="lesson-item group">
                                <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                  <Play className="w-3 h-3 text-white" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                                    Liderança Transformacional
                                  </p>
                                  <p className="text-xs text-gray-400">35min</p>
                                </div>
                              </div>
                              <div className="lesson-item group">
                                <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                  <Play className="w-3 h-3 text-white" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                                    Gestão de Equipes
                                  </p>
                                  <p className="text-xs text-gray-400">40min</p>
                                </div>
                              </div>
                              <div className="lesson-item group">
                                <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                  <Play className="w-3 h-3 text-white" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                                    Cultura Organizacional
                                  </p>
                                  <p className="text-xs text-gray-400">25min</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Módulo 5 - Máquina de Valor */}
                        <div className="border-b border-gray-800">
                          <div
                            className={`p-4 transition-colors cursor-pointer hover:bg-gray-800/30 ${
                              activeModule === 5 ? 'module-active' : ''
                            }`}
                            onClick={() => toggleModule(5)}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="module-title">Módulo 5: Máquina de Valor</h4>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400">2h 15min</span>
                                <ChevronDown
                                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${expandedModule === 5 ? 'rotate-180' : ''
                                    }`}
                                />
                              </div>
                            </div>
                          </div>
                          {expandedModule === 5 && (
                            <div className="module-content">
                              <div className="lesson-item group">
                                <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                  <Play className="w-3 h-3 text-white" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                                    Sistemas de Vendas
                                  </p>
                                  <p className="text-xs text-gray-400">35min</p>
                                </div>
                              </div>
                              <div className="lesson-item group">
                                <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                  <Play className="w-3 h-3 text-white" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                                    Marketing Digital
                                  </p>
                                  <p className="text-xs text-gray-400">40min</p>
                                </div>
                              </div>
                              <div className="lesson-item group">
                                <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                  <Play className="w-3 h-3 text-white" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                                    Automação de Processos
                                  </p>
                                  <p className="text-xs text-gray-400">20min</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Módulo 6 - Performance */}
                        <div>
                          <div
                            className={`p-4 transition-colors cursor-pointer hover:bg-gray-800/30 ${
                              activeModule === 6 ? 'module-active' : ''
                            }`}
                            onClick={() => toggleModule(6)}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="module-title">Módulo 6: Performance</h4>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400">1h 45min</span>
                                <ChevronDown
                                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${expandedModule === 6 ? 'rotate-180' : ''
                                    }`}
                                />
                              </div>
                            </div>
                          </div>
                          {expandedModule === 6 && (
                            <div className="module-content">
                              <div className="lesson-item group">
                                <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                  <Play className="w-3 h-3 text-white" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                                    Métricas e Análise
                                  </p>
                                  <p className="text-xs text-gray-400">30min</p>
                                </div>
                              </div>
                              <div className="lesson-item group">
                                <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                  <Play className="w-3 h-3 text-white" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                                    Otimização Contínua
                                  </p>
                                  <p className="text-xs text-gray-400">35min</p>
                                </div>
                              </div>
                              <div className="lesson-item group">
                                <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                  <Play className="w-3 h-3 text-white" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                                    Escalabilidade
                                  </p>
                                  <p className="text-xs text-gray-400">20min</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Conteúdo Principal - Video */}
            <div className="flex-1 min-w-0">
              {/* Thumbnail/Video Player */}
              <div className="relative mb-8">
                <div className="aspect-video bg-gray-900 rounded overflow-hidden border border-gray-800">
                  {content.type === 'video' || content.type === 'course' ? (
                    <div className="relative w-full h-full group">
                      <img
                        src={content.thumbnail}
                        alt={content.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-center justify-center">
                        <button className="group/play">
                          <div className="w-16 h-16 bg-primary-600 hover:bg-primary-700 rounded-full flex items-center justify-center transition-all duration-300 group-hover/play:scale-110 shadow-2xl">
                            <Play className="w-6 h-6 text-white ml-0.5" fill="currentColor" />
                          </div>
                        </button>
                      </div>

                      {/* Progress indicator */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
                        <div className="h-full bg-primary-500 transition-all duration-300" style={{ width: '8%' }}></div>
                      </div>

                      {/* Time overlay */}
                      <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        1:02 / 12:00
                      </div>
                    </div>
                  ) : (
                    <img
                      src={content.thumbnail}
                      alt={content.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              {/* Informações da Aula */}
              {content.currentLesson && (
                <div className="mb-8">
                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                          {content.currentLesson.title}
                        </h1>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>Por {content.author}</span>
                          <span>•</span>
                          <span>{content.currentLesson.duration}</span>
                          <span>•</span>
                          <span>{content.category}</span>
                        </div>
                      </div>

                      {/* Ações da Aula */}
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800/50 rounded transition-colors">
                          <Heart className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-gray-800/50 rounded transition-colors">
                          <Bookmark className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Conteúdo da Aula */}
                  <div className="prose prose-lg prose-invert max-w-none mb-8">
                    <div className="text-gray-300 leading-relaxed space-y-4">
                      {content.currentLesson.content.split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Seção de Comentários */}
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded p-6 mb-8">
                <div className="card-glow"></div>

                {/* Header dos Comentários */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">Comentários</h3>
                  <span className="text-sm text-gray-400">3 comentários</span>
                </div>

                {/* Form para novo comentário */}
                <div className="mb-8">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      TB
                    </div>
                    <div className="flex-1">
                      <textarea
                        placeholder="Adicione um comentário sobre esta aula..."
                        className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-3 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-primary-500 transition-colors"
                        rows={3}
                      />
                      <div className="flex justify-end mt-3">
                        <button className="btn btn-primary btn-sm">
                          Comentar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lista de Comentários */}
                <div className="space-y-6">
                  {/* Comentário 1 */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      MS
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-white">Maria Silva</span>
                        <span className="text-xs text-gray-400">há 2 dias</span>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Excelente introdução! Consegui entender claramente a diferença entre liderança tradicional e transformacional. Os exemplos práticos ajudaram muito na compreensão.
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-primary-300 transition-colors">
                          <ThumbsUp className="w-3 h-3" />
                          <span>12</span>
                        </button>
                        <button className="text-xs text-gray-400 hover:text-white transition-colors">
                          Responder
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Comentário 2 */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      RC
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-white">Roberto Costa</span>
                        <span className="text-xs text-gray-400">há 1 dia</span>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Tiago, parabéns pelo conteúdo! Já estou aplicando alguns conceitos com minha equipe e os resultados são visíveis. Ansioso pelas próximas aulas.
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-primary-300 transition-colors">
                          <ThumbsUp className="w-3 h-3" />
                          <span>8</span>
                        </button>
                        <button className="text-xs text-gray-400 hover:text-white transition-colors">
                          Responder
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Comentário 3 */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      AF
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-white">Ana Fernandes</span>
                        <span className="text-xs text-gray-400">há 5 horas</span>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Muito didático! A forma como você explica os 4 pilares da liderança transformacional é muito clara. Recomendo para todos os gestores da minha empresa.
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-primary-300 transition-colors">
                          <ThumbsUp className="w-3 h-3" />
                          <span>5</span>
                        </button>
                        <button className="text-xs text-gray-400 hover:text-white transition-colors">
                          Responder
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navegação - Próxima Aula */}
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded p-6">

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-1">Próxima aula</p>
                    <h4 className="text-lg font-semibold text-white mb-2">Business Model Canvas</h4>
                    <p className="text-sm text-gray-400">25 minutos</p>
                  </div>

                  <button className="flex items-center gap-3 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded transition-colors font-medium group">
                    <span>Continuar</span>
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <Play className="w-3 h-3 text-white ml-0.5" fill="currentColor" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  )
}

export default ContentViewer