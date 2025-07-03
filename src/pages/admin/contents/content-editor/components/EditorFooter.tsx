import React from 'react'
import { ArrowLeft } from 'lucide-react'

interface EditorFooterProps {
  onBack: () => void
}

const EditorFooter: React.FC<EditorFooterProps> = ({ onBack }) => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 px-6 py-3">
      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <span>Palavras: 245</span>
          <span>•</span>
          <span>Blocos: 8</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            Salvo automaticamente
          </span>
        </div>
      </div>
    </footer>
  )
}

export default EditorFooter
