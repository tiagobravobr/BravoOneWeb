import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Play, ArrowLeft, Heart, MoreVertical, ThumbsUp, ChevronLeft, ChevronRight } from 'lucide-react'

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
  'lideranca-transformacional': {
    id: '1',
    slug: 'lideranca-transformacional',
    type: 'course',
    title: 'Liderança Transformacional',
    description: 'Desenvolva habilidades de liderança avançada e aprenda a inspirar e motivar equipes de alta performance através de técnicas comprovadas do Método Bravo.',
    content: 'A liderança transformacional é uma abordagem revolucionária que vai além da gestão tradicional. Neste curso exclusivo da Bravo, você descobrirá como se tornar um líder que inspira, motiva e transforma não apenas resultados, mas também pessoas e organizações inteiras. Através de metodologias práticas e cases reais, desenvolvemos um programa completo que aborda desde os fundamentos neurológicos da liderança até as estratégias mais avançadas de influência e persuasão.\n\nO diferencial do Método Bravo está na combinação única entre neurociência aplicada, psicologia comportamental e estratégias empresariais comprovadas. Você aprenderá técnicas específicas para desenvolver sua presença de liderança, criar conexões autênticas com sua equipe e implementar mudanças organizacionais duradouras. Este não é apenas um curso teórico - é um sistema prático e aplicável que já transformou milhares de líderes ao redor do mundo.',
    duration: '4h 30min',
    difficulty: 'intermediate',
    category: 'Gestão & Liderança',
    author: 'Tiago Bravo',
    currentLesson: {
      title: 'Introdução à Liderança Transformacional',
      duration: '12min',
      content: 'Nesta aula introdutória, você descobrirá os fundamentos da liderança transformacional e como ela difere das abordagens tradicionais de gestão. Exploraremos os quatro pilares essenciais que todo líder transformacional deve dominar: visão inspiradora, influência intelectual, consideração individualizada e motivação inspiracional.\n\nVamos analisar casos reais de líderes que conseguiram transformar suas organizações através desta metodologia, incluindo exemplos práticos de como aplicar esses conceitos no seu dia a dia. Ao final desta aula, você terá uma compreensão clara do que significa ser um líder transformacional e estará preparado para iniciar sua jornada de desenvolvimento.'
    },
    publishedDate: '2024-01-15',
    thumbnail: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop',
    videoUrl: '#',
    tags: ['liderança', 'gestão', 'transformação', 'equipes', 'método bravo'],
    rating: 4.9,
    enrolledCount: 2547,
    isLocked: false
  }
}

const ContentViewer = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [content, setContent] = useState<ContentData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

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
  }, [slug])

  const handleGoBack = () => {
    navigate('/dashboard')
  }

  if (isLoading) {
    return (
      <div className="page-layout bg-gray-950">
        <Header />
        <div className="flex items-center justify-center flex-1">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!content) {
    return (
      <div className="page-layout bg-gray-950">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Conteúdo não encontrado</h1>
          <p className="text-gray-400 mb-8">O conteúdo que você está procurando não existe.</p>
          <button
            onClick={handleGoBack}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            Voltar ao Dashboard
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="page-layout bg-gray-950">
      <Header />
      
      <main className="pt-20 pb-16">
        {/* Removido breadcrumb e botão voltar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* Sidebar - Menu Lateral Sticky */}
            <div className={`sticky top-20 transition-all duration-300 ${
              isSidebarCollapsed ? 'w-16' : 'w-80'
            } flex-shrink-0 self-start`}>
              <div>
                <div className={`relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl transition-all duration-300 ${
                  isSidebarCollapsed ? 'w-16' : 'w-full'
              }`}>
                <div className="card-glow"></div>
                
                {isSidebarCollapsed ? (
                  /* Modo Colapsado - Apenas botão toggle */
                  <div className="p-4 flex items-center justify-center">
                    <button
                      onClick={() => setIsSidebarCollapsed(false)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
                      title="Expandir menu"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  /* Modo Expandido - Conteúdo completo */
                  <>
                    {/* Header da Sidebar com Toggle Button */}
                    <div className="relative p-6 border-b border-gray-800">
                      {/* Toggle Button - Canto superior direito */}
                      <button
                        onClick={() => setIsSidebarCollapsed(true)}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors z-10"
                        title="Recolher menu"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      
                      <h3 className="text-lg font-semibold text-white mb-2 pr-10">Conteúdo do Curso</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                        <span>4 módulos</span>
                        <span>•</span>
                        <span>16 aulas</span>
                        <span>•</span>
                        <span>4h 30min</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Progresso</span>
                          <span className="text-primary-400 font-medium">6%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-500" style={{ width: '6%' }}></div>
                        </div>
                        <p className="text-xs text-gray-400">1 de 16 aulas concluídas</p>
                      </div>
                    </div>

                    {/* Lista de Módulos */}
                    <div>
                      {/* Módulo 1 */}
                      <div className="border-b border-gray-800">
                        <div className="p-4 hover:bg-gray-800/30 transition-colors cursor-pointer">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-white">Módulo 1: Fundamentos</h4>
                            <span className="text-xs text-gray-400">45min</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary-600/20 border border-primary-500/30 group">
                              <div className="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0">
                                <Play className="w-3 h-3 text-white" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm text-primary-300 font-medium truncate">
                                  Introdução à Liderança Transformacional
                                </p>
                                <p className="text-xs text-gray-400">12min • Assistindo agora</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/30 transition-colors cursor-pointer group">
                              <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                <Play className="w-3 h-3 text-white" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                                  Os 4 Pilares da Liderança
                                </p>
                                <p className="text-xs text-gray-400">15min</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/30 transition-colors cursor-pointer group">
                              <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                <Play className="w-3 h-3 text-white" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                                  Autoconhecimento do Líder
                                </p>
                                <p className="text-xs text-gray-400">18min</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Módulo 2 */}
                      <div className="border-b border-gray-800">
                        <div className="p-4 hover:bg-gray-800/30 transition-colors cursor-pointer">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-white">Módulo 2: Comunicação</h4>
                            <span className="text-xs text-gray-400">1h 15min</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/30 transition-colors cursor-pointer group">
                              <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                <Play className="w-3 h-3 text-white" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                                  Comunicação Assertiva
                                </p>
                                <p className="text-xs text-gray-400">20min</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/30 transition-colors cursor-pointer group">
                              <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                <Play className="w-3 h-3 text-white" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                                  Escuta Ativa e Empatia
                                </p>
                                <p className="text-xs text-gray-400">25min</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/30 transition-colors cursor-pointer group">
                              <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                <Play className="w-3 h-3 text-white" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                                  Feedback Construtivo
                                </p>
                                <p className="text-xs text-gray-400">30min</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Módulo 3 */}
                      <div className="border-b border-gray-800">
                        <div className="p-4 hover:bg-gray-800/30 transition-colors cursor-pointer">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-white">Módulo 3: Motivação</h4>
                            <span className="text-xs text-gray-400">1h 30min</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/30 transition-colors cursor-pointer group">
                              <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                <Play className="w-3 h-3 text-white" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                                  Teorias da Motivação
                                </p>
                                <p className="text-xs text-gray-400">22min</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/30 transition-colors cursor-pointer group">
                              <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                <Play className="w-3 h-3 text-white" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                                  Engajamento de Equipes
                                </p>
                                <p className="text-xs text-gray-400">28min</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/30 transition-colors cursor-pointer group">
                              <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                <Play className="w-3 h-3 text-white" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                                  Reconhecimento e Recompensas
                                </p>
                                <p className="text-xs text-gray-400">24min</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/30 transition-colors cursor-pointer group">
                              <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                <Play className="w-3 h-3 text-white" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                                  Criando uma Cultura de Alto Desempenho
                                </p>
                                <p className="text-xs text-gray-400">16min</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Módulo 4 */}
                      <div>
                        <div className="p-4 hover:bg-gray-800/30 transition-colors cursor-pointer">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-white">Módulo 4: Implementação</h4>
                            <span className="text-xs text-gray-400">1h 20min</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/30 transition-colors cursor-pointer group">
                              <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                <Play className="w-3 h-3 text-white" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                                  Plano de Ação Pessoal
                                </p>
                                <p className="text-xs text-gray-400">25min</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/30 transition-colors cursor-pointer group">
                              <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                <Play className="w-3 h-3 text-white" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                                  Mudança Organizacional
                                </p>
                                <p className="text-xs text-gray-400">30min</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/30 transition-colors cursor-pointer group">
                              <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                <Play className="w-3 h-3 text-white" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                                  Casos Práticos e Estudos
                                </p>
                                <p className="text-xs text-gray-400">25min</p>
                              </div>
                            </div>
                          </div>
                        </div>
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
              <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
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
                      <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800/50 rounded-lg transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors">
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
            <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 mb-8">
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
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-primary-500 transition-colors"
                      rows={3}
                    />
                    <div className="flex justify-end mt-3">
                      <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors">
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
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
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
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
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
            <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <div className="card-glow"></div>
              
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-1">Próxima aula</p>
                  <h4 className="text-lg font-semibold text-white mb-2">Os 4 Pilares da Liderança</h4>
                  <p className="text-sm text-gray-400">15 minutos</p>
                </div>
                
                <button className="flex items-center gap-3 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors font-medium group">
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

      <Footer />
    </div>
  )
}

export default ContentViewer