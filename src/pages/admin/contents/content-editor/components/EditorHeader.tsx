import React from 'react'
import { ArrowLeft, User } from 'lucide-react'

interface EditorHeaderProps {
  onBack: () => void
}

const EditorHeader: React.FC<EditorHeaderProps> = ({ onBack }) => {
  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo e Voltar */}
        <div className="flex items-center gap-6">
          <img
            src="/bravo-logo-dark.svg"
            alt="Bravo One"
            className="h-8 w-auto"
          />
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
        </div>

        {/* Avatar */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-gray-300" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default EditorHeader
