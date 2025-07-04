import React from 'react'
import TiptapContextEditor from './TiptapContextEditor'

interface BlockEditorProps {
  isEditMode: boolean
}

const BlockEditor: React.FC<BlockEditorProps> = ({ isEditMode }) => {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-900">
      <div className="max-w-4xl mx-auto p-8">
        {/* Título da Página */}
        <div className="mb-8">
          <input
            type="text"
            className="w-full bg-transparent border-none outline-none text-4xl font-bold text-white placeholder-gray-500"
            placeholder="Título da Página"
            defaultValue={isEditMode ? "Introdução ao Empreendedorismo" : ""}
          />
        </div>

        {/* Blocos de Conteúdo */}
        <div className="space-y-4">
          <TiptapContextEditor placeholder="Comece a escrever seu conteúdo..." />
        </div>

        {/* Espaço extra para scroll */}
        <div className="h-32"></div>
      </div>
    </div>
  )
}

export default BlockEditor
