import React from 'react'
import { Settings, PanelRightClose } from 'lucide-react'

interface ConfigurationSidebarProps {
  collapsed: boolean
  onToggleCollapse: () => void
}

const ConfigurationSidebar: React.FC<ConfigurationSidebarProps> = ({ collapsed, onToggleCollapse }) => {
  return (
    <div className={`${collapsed ? 'w-12' : 'w-80'} bg-gray-800/50 border-l border-gray-700 flex flex-col transition-all duration-300`}>
      {collapsed ? (
        /* Versão Colapsada */
        <div className="p-3 border-b border-gray-700 flex flex-col items-center gap-4">
          <button
            onClick={onToggleCollapse}
            className="p-2 hover:bg-gray-700 rounded"
            title="Expandir configurações"
          >
            <PanelRightClose className="w-4 h-4 text-gray-400 rotate-180" />
          </button>
        </div>
      ) : (
        <>
          {/* Cabeçalho */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-gray-400" />
                <h2 className="text-white font-semibold text-lg">Configurações</h2>
              </div>
              <button
                onClick={onToggleCollapse}
                className="p-1 hover:bg-gray-700 rounded"
                title="Recolher configurações"
              >
                <PanelRightClose className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Configurações */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              {/* Capa do Conteúdo */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Capa do Conteúdo</label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center bg-gray-800/50 hover:bg-gray-700/30 transition-colors cursor-pointer">
                  <div className="w-full aspect-[10/16] max-w-24 mx-auto bg-gray-700/50 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-500">10:16</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Clique para fazer upload</p>
                </div>
              </div>

              {/* Academia */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Academia</label>
                <select className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Selecionar academia</option>
                  <option value="academia-1">Academia Central</option>
                  <option value="academia-2">Academia Norte</option>
                  <option value="academia-3">Academia Sul</option>
                </select>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Status</label>
                <select className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="draft">Rascunho</option>
                  <option value="published">Publicado</option>
                  <option value="archived">Arquivado</option>
                </select>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs">
                    Iniciante
                    <button className="hover:text-blue-300">×</button>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-600/20 text-green-400 rounded-full text-xs">
                    Musculação
                    <button className="hover:text-green-300">×</button>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-600/20 text-purple-400 rounded-full text-xs">
                    Treino A
                    <button className="hover:text-purple-300">×</button>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Digite e pressione Enter"
                  className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Categoria */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Categoria</label>
                <select className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Selecionar categoria</option>
                  <option value="treino">Treino</option>
                  <option value="nutricao">Nutrição</option>
                  <option value="teoria">Teoria</option>
                  <option value="pratica">Prática</option>
                </select>
              </div>

              {/* Dificuldade */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Dificuldade</label>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 px-3 rounded text-xs bg-green-600/20 text-green-400 border border-green-600/30">
                    Fácil
                  </button>
                  <button className="flex-1 py-2 px-3 rounded text-xs bg-gray-700 text-gray-400 border border-gray-600 hover:bg-gray-600">
                    Médio
                  </button>
                  <button className="flex-1 py-2 px-3 rounded text-xs bg-gray-700 text-gray-400 border border-gray-600 hover:bg-gray-600">
                    Difícil
                  </button>
                </div>
              </div>

              {/* Duração Estimada */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Duração Estimada</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="45"
                    className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <span className="flex items-center text-sm text-gray-500 px-2">min</span>
                </div>
              </div>

              {/* Descrição */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Descrição</label>
                <textarea
                  rows={3}
                  placeholder="Breve descrição do conteúdo..."
                  className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Pré-requisitos */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Pré-requisitos</label>
                <textarea
                  rows={2}
                  placeholder="Ex: Conhecimento básico de anatomia..."
                  className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ConfigurationSidebar
