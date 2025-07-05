import React from 'react'
import { ArrowLeft } from 'lucide-react'
import TiptapContextEditor from './TiptapContextEditor'
import MinimalContentNavigation from './MinimalContentNavigation'

interface BlockEditorProps {
  isEditMode: boolean
  onBack: () => void
}

const BlockEditor: React.FC<BlockEditorProps> = ({ isEditMode, onBack }) => {
  return (
    <div className="flex-1 overflow-hidden bg-gray-950 flex flex-col">
      {/* Header com botão Voltar - Fundo mais escuro */}
      <div className="border-b border-gray-800 p-4 bg-gray-950">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>
      </div>

      {/* Container do Editor com navegação integrada */}
      <div className="flex-1 overflow-hidden flex justify-center bg-gray-950">
        <div className="max-w-6xl w-full flex overflow-hidden">
          {/* Navegação Minimalista - Fundo mais escuro, sem borda */}
          <div className="w-64 overflow-y-auto py-8 px-4 bg-gray-950">
            <MinimalContentNavigation />
          </div>

          {/* Editor Principal - Fundo escuro, apenas a área de digitação mantém o fundo */}
          <div className="flex-1 overflow-y-auto bg-gray-950">
            <div className="max-w-4xl mx-auto p-8">
              {/* Título da Página */}
              <div className="mb-8">
                <input
                  type="text"
                  className="w-full bg-transparent border-none outline-none text-4xl font-bold text-white placeholder-gray-500"
                  placeholder="Título"
                  defaultValue={isEditMode ? "Introdução ao Empreendedorismo" : ""}
                />
              </div>

              {/* Blocos de Conteúdo - Aqui o TiptapContextEditor mantém seu fundo */}
              <div className="space-y-4">
                <TiptapContextEditor placeholder="Comece a escrever seu conteúdo..." />
              </div>

              {/* Espaço extra para scroll */}
              <div className="h-32"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlockEditor
