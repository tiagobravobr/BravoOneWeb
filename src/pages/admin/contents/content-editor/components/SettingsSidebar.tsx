import React, { useState } from 'react'
import { PanelRightClose } from 'lucide-react'

interface SettingsSidebarProps {
  academyId?: string
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ academyId }) => {
  const [collapsed, setCollapsed] = useState(false)
  
  const academies = [
    { id: '1', name: 'Academia de Vendas', color: '#3B82F6' },
    { id: '2', name: 'Academia de Marketing', color: '#10B981' },
    { id: '3', name: 'Academia de Liderança', color: '#F59E0B' },
    { id: '4', name: 'Academia de Operações', color: '#EF4444' },
  ]

  return (
    <div className="w-80 bg-gray-800/50 border-l border-gray-700 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Configurações</h3>
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 hover:bg-gray-700 rounded"
          >
            <PanelRightClose className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        
        {/* Seleção de Academia */}
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

        {/* Status de Publicação */}
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

        {/* Categoria */}
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

        {/* Tags */}
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
      </div>
    </div>
  )
}

export default SettingsSidebar
