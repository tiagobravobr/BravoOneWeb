import React from 'react'
import { PanelRightClose, Settings } from 'lucide-react'

interface SettingsSidebarProps {
  academyId?: string
  collapsed: boolean
  onToggleCollapse: () => void
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ academyId, collapsed, onToggleCollapse }) => {
  const academies = [
    { id: '1', name: 'Academia de Vendas', color: '#3B82F6' },
    { id: '2', name: 'Academia de Marketing', color: '#10B981' },
    { id: '3', name: 'Academia de Liderança', color: '#F59E0B' },
    { id: '4', name: 'Academia de Operações', color: '#EF4444' },
  ]

  return (
    <div className={`${collapsed ? 'w-16' : 'w-80'} bg-gray-800/50 border-l border-gray-700 overflow-y-auto transition-all duration-300`}>
      {collapsed ? (
        <div className="p-4 border-b border-gray-700">
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={onToggleCollapse}
              className="p-2 hover:bg-gray-700 rounded"
            >
              <PanelRightClose className="w-4 h-4 text-gray-400 rotate-180" />
            </button>
            <Settings className="w-6 h-6 text-gray-400" />
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={onToggleCollapse}
              className="p-1 hover:bg-gray-700 rounded"
            >
              <PanelRightClose className="w-4 h-4 text-gray-400" />
            </button>
            <h3 className="text-lg font-semibold text-white">Configurações</h3>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Academia
            </label>
            <select 
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={academyId || ''}
            >
              <option value="">Selecione uma academia</option>
              {academies.map(academy => (
                <option key={academy.id} value={academy.id}>
                  {academy.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Status
            </label>
            <select className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
              <option value="archived">Arquivado</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Categoria
            </label>
            <select className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Selecione uma categoria</option>
              <option value="curso">Curso</option>
              <option value="workshop">Workshop</option>
              <option value="webinar">Webinar</option>
              <option value="ebook">E-book</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tags
            </label>
            <input
              type="text"
              placeholder="Adicionar tags (separadas por vírgula)"
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Linha divisória e informações de status */}
          <div className="border-t border-gray-700 pt-4">
            <div className="flex flex-col gap-2 text-xs text-gray-400">
              <div className="flex items-center justify-between">
                <span>Palavras</span>
                <span>245</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Blocos</span>
                <span>8</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Status</span>
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Salvo
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SettingsSidebar
