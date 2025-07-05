import React, { useState } from 'react'
import { Plus, FileText, Video, ChevronDown, ChevronRight, ArrowLeft, PanelLeftClose } from 'lucide-react'

interface ContentNavigationProps {
  collapsed: boolean
  onToggleCollapse: () => void
  onBack: () => void
}

const ContentNavigation: React.FC<ContentNavigationProps> = ({ collapsed, onToggleCollapse, onBack }) => {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(['module-1']))

  const mockModules = [
    {
      id: 'module-1',
      title: 'Introdução',
      pages: [
        { id: 'page-1', title: 'Bem-vindo', type: 'text' },
        { id: 'page-2', title: 'Visão Geral', type: 'video' },
        { id: 'page-3', title: 'Objetivos do Curso', type: 'text' },
        { id: 'page-4', title: 'Metodologia', type: 'text' }
      ]
    },
    {
      id: 'module-2',
      title: 'Fundamentos',
      pages: [
        { id: 'page-5', title: 'Conceitos Básicos', type: 'text' },
        { id: 'page-6', title: 'Exercício Prático', type: 'text' },
        { id: 'page-7', title: 'Anatomia Humana', type: 'video' },
        { id: 'page-8', title: 'Fisiologia do Exercício', type: 'text' },
        { id: 'page-9', title: 'Biomecânica', type: 'video' }
      ]
    },
    {
      id: 'module-3',
      title: 'Treino de Força',
      pages: [
        { id: 'page-10', title: 'Princípios Básicos', type: 'text' },
        { id: 'page-11', title: 'Técnicas de Execução', type: 'video' },
        { id: 'page-12', title: 'Progressão de Cargas', type: 'text' },
        { id: 'page-13', title: 'Exercícios Compostos', type: 'video' },
        { id: 'page-14', title: 'Exercícios Isolados', type: 'video' },
        { id: 'page-15', title: 'Planejamento Semanal', type: 'text' }
      ]
    },
    {
      id: 'module-4',
      title: 'Treino Cardiovascular',
      pages: [
        { id: 'page-16', title: 'Tipos de Cardio', type: 'text' },
        { id: 'page-17', title: 'HIIT vs LISS', type: 'video' },
        { id: 'page-18', title: 'Frequência Cardíaca', type: 'text' },
        { id: 'page-19', title: 'Periodização Cardiovascular', type: 'text' }
      ]
    },
    {
      id: 'module-5',
      title: 'Nutrição Esportiva',
      pages: [
        { id: 'page-20', title: 'Macronutrientes', type: 'text' },
        { id: 'page-21', title: 'Micronutrientes', type: 'text' },
        { id: 'page-22', title: 'Hidratação', type: 'video' },
        { id: 'page-23', title: 'Suplementação', type: 'text' },
        { id: 'page-24', title: 'Timing Nutricional', type: 'video' },
        { id: 'page-25', title: 'Dieta para Hipertrofia', type: 'text' },
        { id: 'page-26', title: 'Dieta para Definição', type: 'text' }
      ]
    },
    {
      id: 'module-6',
      title: 'Recuperação e Descanso',
      pages: [
        { id: 'page-27', title: 'Importância do Sono', type: 'text' },
        { id: 'page-28', title: 'Técnicas de Relaxamento', type: 'video' },
        { id: 'page-29', title: 'Massagem e Automassagem', type: 'video' },
        { id: 'page-30', title: 'Gestão do Estresse', type: 'text' }
      ]
    },
    {
      id: 'module-7',
      title: 'Lesões e Prevenção',
      pages: [
        { id: 'page-31', title: 'Lesões Comuns', type: 'text' },
        { id: 'page-32', title: 'Aquecimento Dinâmico', type: 'video' },
        { id: 'page-33', title: 'Alongamento', type: 'video' },
        { id: 'page-34', title: 'Fortalecimento Preventivo', type: 'text' },
        { id: 'page-35', title: 'Quando Procurar Ajuda', type: 'text' }
      ]
    },
    {
      id: 'module-8',
      title: 'Psicologia do Esporte',
      pages: [
        { id: 'page-36', title: 'Motivação', type: 'text' },
        { id: 'page-37', title: 'Estabelecimento de Metas', type: 'video' },
        { id: 'page-38', title: 'Autoconfiança', type: 'text' },
        { id: 'page-39', title: 'Lidando com Fracassos', type: 'video' }
      ]
    },
    {
      id: 'module-9',
      title: 'Avaliação e Testes',
      pages: [
        { id: 'page-40', title: 'Avaliação Postural', type: 'text' },
        { id: 'page-41', title: 'Testes de Força', type: 'video' },
        { id: 'page-42', title: 'Testes de Flexibilidade', type: 'video' },
        { id: 'page-43', title: 'Composição Corporal', type: 'text' },
        { id: 'page-44', title: 'Acompanhamento de Progresso', type: 'text' }
      ]
    },
    {
      id: 'module-10',
      title: 'Conclusão e Certificação',
      pages: [
        { id: 'page-45', title: 'Revisão Geral', type: 'text' },
        { id: 'page-46', title: 'Prova Final', type: 'text' },
        { id: 'page-47', title: 'Certificado de Conclusão', type: 'text' },
        { id: 'page-48', title: 'Próximos Passos', type: 'video' }
      ]
    }
  ]

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules)
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId)
    } else {
      newExpanded.add(moduleId)
    }
    setExpandedModules(newExpanded)
  }

  const getPageIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4 text-blue-400" />
      default:
        return <FileText className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className={`${collapsed ? 'w-12' : 'w-80'} bg-gray-800/50 border-r border-gray-700 flex flex-col transition-all duration-300`}>
      {collapsed ? (
        /* Versão Colapsada */
        <div className="p-3 border-b border-gray-700 flex flex-col items-center gap-4">
          <button
            onClick={onToggleCollapse}
            className="p-2 hover:bg-gray-700 rounded"
            title="Expandir navegação"
          >
            <PanelLeftClose className="w-4 h-4 text-gray-400 rotate-180" />
          </button>
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-700 rounded"
            title="Voltar"
          >
            <ArrowLeft className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      ) : (
        <>
          {/* Cabeçalho */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-semibold text-lg">Conteúdo</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={onToggleCollapse}
                  className="p-1 hover:bg-gray-700 rounded"
                  title="Recolher navegação"
                >
                  <PanelLeftClose className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Lista de Módulos */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {mockModules.map((module) => (
                <div key={module.id} className="space-y-1">
                  {/* Cabeçalho do Módulo */}
                  <div
                    className="flex items-center gap-2 p-3 hover:bg-gray-700/50 rounded cursor-pointer group"
                    onClick={() => toggleModule(module.id)}
                  >
                    {expandedModules.has(module.id) ? (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                    <span className="text-white font-medium flex-1">{module.title}</span>
                    <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-600 rounded">
                      <Plus className="w-3 h-3 text-gray-400" />
                    </button>
                  </div>

                  {/* Páginas do Módulo */}
                  {expandedModules.has(module.id) && (
                    <div className="ml-6 space-y-1">
                      {module.pages.map((page) => (
                        <div
                          key={page.id}
                          className="flex items-center gap-2 p-2 hover:bg-gray-700/30 rounded cursor-pointer group"
                        >
                          {getPageIcon(page.type)}
                          <span className="text-gray-300 text-sm flex-1">{page.title}</span>
                        </div>
                      ))}
                      {/* Botão Adicionar Página */}
                      <button className="flex items-center gap-2 p-2 text-gray-500 hover:text-gray-300 hover:bg-gray-700/30 rounded w-full text-left">
                        <Plus className="w-4 h-4" />
                        <span className="text-sm">Adicionar Página</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {/* Botão Adicionar Módulo */}
              <button className="flex items-center gap-2 p-3 text-gray-500 hover:text-gray-300 hover:bg-gray-700/50 rounded w-full text-left mt-4 border border-dashed border-gray-600">
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Adicionar Módulo</span>
              </button>
            </div>
          </div>

          {/* Rodapé */}
          <div className="border-t border-gray-700 p-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-400 hover:text-white text-sm w-full"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default ContentNavigation
