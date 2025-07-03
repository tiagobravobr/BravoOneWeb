import React, { useState } from 'react'
import { Plus, FileText, Video, ChevronDown, ChevronRight, PanelLeftClose } from 'lucide-react'

interface ModulesSidebarProps {
  // onBack será usado no footer
}

const ModulesSidebar: React.FC<ModulesSidebarProps> = () => {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(['module-1']))
  const [collapsed, setCollapsed] = useState(false)

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
    <div className="w-80 bg-gray-800/50 border-r border-gray-700 flex flex-col">
      {/* Logo e Controles */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <img
              src="/bravo-logo-dark.svg"
              alt="Bravo One"
              className="w-28 h-auto"
            />
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 hover:bg-gray-700 rounded"
          >
            <PanelLeftClose className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Lista de Módulos */}
      <div className="flex-1 overflow-y-auto p-4">
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
    </div>
  )
}

export default ModulesSidebar
