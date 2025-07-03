import React, { useState } from 'react'
import { Settings, Eye, EyeOff, Save, Clock } from 'lucide-react'

const SettingsSidebar: React.FC = () => {
  const [visibility, setVisibility] = useState<'draft' | 'published' | 'private'>('draft')
  const [autoSave, setAutoSave] = useState(true)

  return (
    <div className="w-80 bg-gray-800/50 border-l border-gray-700 flex flex-col">
      {/* Header da Sidebar */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-5 h-5 text-gray-400" />
          <h3 className="text-white font-semibold">Configurações</h3>
        </div>
      </div>

      {/* Configurações */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* Status do Documento */}
        <div>
          <h4 className="text-white font-medium mb-3">Status</h4>
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="visibility"
                value="draft"
                checked={visibility === 'draft'}
                onChange={(e) => setVisibility(e.target.value as any)}
                className="form-radio"
              />
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300">Rascunho</span>
              </div>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="visibility"
                value="published"
                checked={visibility === 'published'}
                onChange={(e) => setVisibility(e.target.value as any)}
                className="form-radio"
              />
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">Publicado</span>
              </div>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="visibility"
                value="private"
                checked={visibility === 'private'}
                onChange={(e) => setVisibility(e.target.value as any)}
                className="form-radio"
              />
              <div className="flex items-center gap-2">
                <EyeOff className="w-4 h-4 text-red-400" />
                <span className="text-gray-300">Privado</span>
              </div>
            </label>
          </div>
        </div>

        {/* Configurações de Salvamento */}
        <div>
          <h4 className="text-white font-medium mb-3">Salvamento</h4>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="text-gray-300">Salvamento automático</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoSave}
                  onChange={(e) => setAutoSave(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </label>
            
            <div className="text-xs text-gray-500">
              Última alteração: há 2 minutos
            </div>
          </div>
        </div>

        {/* Metadados */}
        <div>
          <h4 className="text-white font-medium mb-3">Metadados</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Tags</label>
              <input
                type="text"
                className="form-input w-full text-sm"
                placeholder="empreendedorismo, negócios..."
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Duração estimada</label>
              <input
                type="text"
                className="form-input w-full text-sm"
                placeholder="15 minutos"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Dificuldade</label>
              <select className="form-select w-full text-sm">
                <option value="beginner">Iniciante</option>
                <option value="intermediate">Intermediário</option>
                <option value="advanced">Avançado</option>
              </select>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="space-y-3">
          <button className="btn btn-primary w-full flex items-center justify-center gap-2">
            <Save className="w-4 h-4" />
            Salvar Alterações
          </button>
          
          <button className="btn btn-secondary w-full">
            Visualizar
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsSidebar
