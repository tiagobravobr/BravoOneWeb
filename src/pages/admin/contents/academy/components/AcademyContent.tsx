import React from 'react'
import { Plus, Play, FileText, Video, Headphones } from 'lucide-react'

const AcademyContent: React.FC = () => {
  // Simulando 20 conteúdos para o grid
  const mockContents = [
    { id: 1, title: "Introdução ao Empreendedorismo", type: "video", duration: "15:30", image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=600&fit=crop" },
    { id: 2, title: "Validação de Ideia de Negócio", type: "video", duration: "22:45", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop" },
    { id: 3, title: "Plano de Negócios Essencial", type: "document", duration: "8 páginas", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=600&fit=crop" },
    { id: 4, title: "Estratégias de Marketing Digital", type: "video", duration: "18:20", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=600&fit=crop" },
    { id: 5, title: "Gestão Financeira para Startups", type: "audio", duration: "25:10", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=600&fit=crop" },
    { id: 6, title: "Liderança e Gestão de Equipes", type: "video", duration: "32:15", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=600&fit=crop" },
    { id: 7, title: "Vendas e Negociação", type: "video", duration: "27:30", image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=400&h=600&fit=crop" },
    { id: 8, title: "Análise de Concorrência", type: "document", duration: "12 páginas", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=600&fit=crop" },
    { id: 9, title: "Branding e Identidade Visual", type: "video", duration: "20:45", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=600&fit=crop" },
    { id: 10, title: "Métricas e KPIs", type: "audio", duration: "15:55", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=600&fit=crop" },
    { id: 11, title: "Captação de Investimentos", type: "video", duration: "35:20", image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=600&fit=crop" },
    { id: 12, title: "Networking Estratégico", type: "document", duration: "6 páginas", image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=600&fit=crop" },
    { id: 13, title: "Inovação e Tecnologia", type: "video", duration: "28:10", image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop" },
    { id: 14, title: "Sustentabilidade nos Negócios", type: "audio", duration: "22:30", image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=600&fit=crop" },
    { id: 15, title: "Expansão Internacional", type: "video", duration: "24:40", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=600&fit=crop" },
    { id: 16, title: "E-commerce e Vendas Online", type: "document", duration: "15 páginas", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=600&fit=crop" },
    { id: 17, title: "Gestão de Crise", type: "video", duration: "19:25", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop" },
    { id: 18, title: "Automatização de Processos", type: "audio", duration: "17:45", image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=600&fit=crop" },
    { id: 19, title: "Cultura Organizacional", type: "video", duration: "26:15", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=600&fit=crop" },
    { id: 20, title: "Análise de Dados e BI", type: "document", duration: "10 páginas", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=600&fit=crop" }
  ]

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />
      case 'audio':
        return <Headphones className="w-4 h-4" />
      case 'document':
        return <FileText className="w-4 h-4" />
      default:
        return <Play className="w-4 h-4" />
    }
  }

  const getContentTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'text-blue-400'
      case 'audio':
        return 'text-purple-400'
      case 'document':
        return 'text-green-400'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-2">Conteúdos da Academia</h3>
        <p className="text-gray-400">
          Gerencie os conteúdos, aulas e materiais da sua academia
        </p>
      </div>

      {/* Grid de conteúdos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {/* Card de Adicionar Conteúdo */}
        <div
          className="group cursor-pointer bg-gray-900/30 border-2 border-dashed border-gray-700 rounded transition-all duration-200 hover:bg-gray-900/50 hover:-translate-y-2 hover:shadow-2xl"
          style={{ aspectRatio: '10/16' }}
        >
          <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center">
            <div className="w-12 h-12 bg-gray-800 group-hover:bg-primary-600/20 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300">
              <Plus className="w-6 h-6 text-gray-400 group-hover:text-primary-400 transition-colors" />
            </div>
            <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-primary-300 transition-colors">
              Adicionar Conteúdo
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Crie um novo conteúdo para sua academia
            </p>
          </div>
        </div>

        {/* Cards de conteúdo */}
        {mockContents.map((content) => (
          <div key={content.id} className="group cursor-pointer">
            <div className="relative aspect-[10/16]">
              <div className="w-full h-full rounded-xl overflow-hidden bg-gray-900 transition-all duration-200 hover:-translate-y-2 hover:shadow-2xl">
                <img
                  src={content.image}
                  alt={content.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay preto sutil */}
                <div className="absolute inset-0 bg-black/20" />
                
                {/* Gradiente na parte inferior */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
                
                {/* Ícone do tipo de conteúdo */}
                <div className="absolute top-3 right-3 bg-gray-900/80 rounded-full p-2">
                  <div className={getContentTypeColor(content.type)}>
                    {getContentIcon(content.type)}
                  </div>
                </div>

                {/* Conteúdo do card */}
                <div className="absolute inset-0 px-4 pt-4 pb-6 flex flex-col justify-end">
                  <div>
                    <h4 className="text-white font-bold text-sm lg:text-base mb-1 leading-tight">
                      {content.title}
                    </h4>
                    <p className="text-gray-300 text-xs font-medium">
                      {content.duration}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AcademyContent
