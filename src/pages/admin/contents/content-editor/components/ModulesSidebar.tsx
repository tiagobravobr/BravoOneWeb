import React, { useState } from 'react'
import { Plus, FileText, Video, ChevronDown, ChevronRight, PanelLeftClose, ArrowLeft } from 'lucide-react'

interface ModulesSidebarProps {
  collapsed: boolean
  onToggleCollapse: () => void
  onBack: () => void
}

const ModulesSidebar: React.FC<ModulesSidebarProps> = ({ collapsed, onToggleCollapse, onBack }) => {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(['module-1']))
  const [openAccordion, setOpenAccordion] = useState<'conteudo' | 'config' | null>('conteudo')

  const mockModules = [
    {
      id: 'module-1',
      title: 'Introdução',
      pages: [
        { id: 'page-1', title: 'Bem-vindo', type: 'text' },
        { id: 'page-2', title: 'Visão Geral', type: 'video' }
      ]
    },
    {
      id: 'module-2',
      title: 'Fundamentos',
      pages: [
        { id: 'page-3', title: 'Conceitos Básicos', type: 'text' },
        { id: 'page-4', title: 'Exercício Prático', type: 'text' }
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
    <div className={`${collapsed ? 'w-16' : 'w-80'} bg-gray-800/50 border-r border-gray-700 flex flex-col transition-all duration-300`}>
      {collapsed ? (
        /* Versão Colapsada - Apenas Favicon */
        <div className="p-4 border-b border-gray-700">
          <div className="flex flex-col items-center gap-4">
            <img
              src="/favicon.png"
              alt="Bravo One Favicon"
              className="w-6 h-6"
            />
            <button
              onClick={onToggleCollapse}
              className="p-2 hover:bg-gray-700 rounded"
            >
              <PanelLeftClose className="w-4 h-4 text-gray-400 rotate-180" />
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Logo e Controles */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="/bravo-logo-dark.svg"
                  alt="Bravo One"
                  className="w-28 h-auto"
                />
              </div>
              <button
                onClick={onToggleCollapse}
                className="p-1 hover:bg-gray-700 rounded"
              >
                <PanelLeftClose className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Accordion padrão - agora ocupa toda a altura disponível */}
          <div className="flex-1 flex flex-col min-h-0 h-full overflow-hidden">
            {/* Seção Conteúdo */}
            <button
              className={`w-full flex items-center justify-between px-4 py-2 text-left text-sm font-medium border-b border-gray-700 bg-gray-800/70 hover:bg-gray-700/30 transition ${openAccordion === 'conteudo' ? 'text-white' : 'text-gray-400'}`}
              onClick={() => setOpenAccordion(openAccordion === 'conteudo' ? null : 'conteudo')}
              aria-expanded={openAccordion === 'conteudo'}
            >
              Conteúdo
              {openAccordion === 'conteudo' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {openAccordion === 'conteudo' && (
              <div className="flex-1 min-h-0 px-4 py-2 overflow-y-auto">
                <div className="space-y-2">
                  {mockModules.map((module) => (
                    <div key={module.id} className="space-y-1">
                      {/* Cabeçalho do Módulo */}
                      <div
                        className="flex items-center gap-2 p-2 hover:bg-gray-700/50 rounded cursor-pointer group"
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
                  <button className="flex items-center gap-2 p-2 text-gray-500 hover:text-gray-300 hover:bg-gray-700/30 rounded w-full text-left mt-4">
                    <Plus className="w-4 h-4" />
                    <span className="text-sm font-medium">Adicionar Módulo</span>
                  </button>
                </div>
              </div>
            )}
            {/* Seção Configurações */}
            <button
              className={`w-full flex items-center justify-between px-4 py-2 text-left text-sm font-medium border-b border-gray-700 bg-gray-800/70 hover:bg-gray-700/30 transition ${openAccordion === 'config' ? 'text-white' : 'text-gray-400'}`}
              onClick={() => setOpenAccordion(openAccordion === 'config' ? null : 'config')}
              aria-expanded={openAccordion === 'config'}
            >
              Configurações
              {openAccordion === 'config' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {openAccordion === 'config' && (
              <div className="flex-1 min-h-0 px-4 py-2 text-gray-400 overflow-y-auto">
                <span className="text-xs">Nenhuma configuração disponível.</span>
              </div>
            )}
          </div>

          {/* Rodapé: botão Voltar */}
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

export default ModulesSidebar
