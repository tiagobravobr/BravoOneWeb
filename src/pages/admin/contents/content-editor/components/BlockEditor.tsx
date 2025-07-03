import React, { useState } from 'react'
import { Plus, Type, Image, Video, List, Quote } from 'lucide-react'

interface BlockEditorProps {
  isEditMode: boolean
}

interface Block {
  id: string
  type: 'text' | 'heading' | 'image' | 'video' | 'list' | 'quote'
  content: string
}

const BlockEditor: React.FC<BlockEditorProps> = ({ isEditMode }) => {
  const [blocks, setBlocks] = useState<Block[]>([
    { id: '1', type: 'heading', content: 'Título do Conteúdo' },
    { id: '2', type: 'text', content: 'Comece a escrever seu conteúdo aqui...' }
  ])
  
  const [showBlockMenu, setShowBlockMenu] = useState<string | null>(null)

  const blockTypes = [
    { type: 'text', icon: Type, label: 'Texto' },
    { type: 'heading', icon: Type, label: 'Título' },
    { type: 'image', icon: Image, label: 'Imagem' },
    { type: 'video', icon: Video, label: 'Vídeo' },
    { type: 'list', icon: List, label: 'Lista' },
    { type: 'quote', icon: Quote, label: 'Citação' }
  ]

  const addBlock = (afterId: string, type: Block['type']) => {
    const newBlock: Block = {
      id: Date.now().toString(),
      type,
      content: type === 'heading' ? 'Novo Título' : 'Digite aqui...'
    }
    
    const index = blocks.findIndex(b => b.id === afterId)
    const newBlocks = [...blocks]
    newBlocks.splice(index + 1, 0, newBlock)
    setBlocks(newBlocks)
    setShowBlockMenu(null)
  }

  const updateBlock = (id: string, content: string) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, content } : block
    ))
  }

  const renderBlock = (block: Block) => {
    const baseClasses = "w-full bg-transparent border-none outline-none text-white resize-none"
    
    switch (block.type) {
      case 'heading':
        return (
          <input
            type="text"
            value={block.content}
            onChange={(e) => updateBlock(block.id, e.target.value)}
            className={`${baseClasses} text-3xl font-bold mb-4`}
            placeholder="Título"
          />
        )
      case 'text':
        return (
          <textarea
            value={block.content}
            onChange={(e) => updateBlock(block.id, e.target.value)}
            className={`${baseClasses} text-base leading-relaxed min-h-[60px]`}
            placeholder="Digite seu texto aqui..."
            rows={3}
          />
        )
      case 'quote':
        return (
          <blockquote className="border-l-4 border-primary-600 pl-4 italic">
            <textarea
              value={block.content}
              onChange={(e) => updateBlock(block.id, e.target.value)}
              className={`${baseClasses} text-base leading-relaxed min-h-[60px]`}
              placeholder="Adicione uma citação..."
              rows={2}
            />
          </blockquote>
        )
      case 'list':
        return (
          <div className="flex items-start gap-2">
            <span className="text-gray-400 mt-1">•</span>
            <textarea
              value={block.content}
              onChange={(e) => updateBlock(block.id, e.target.value)}
              className={`${baseClasses} text-base leading-relaxed min-h-[40px] flex-1`}
              placeholder="Item da lista..."
              rows={1}
            />
          </div>
        )
      case 'image':
      case 'video':
        return (
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
            <div className="flex flex-col items-center gap-2">
              {block.type === 'image' ? (
                <Image className="w-8 h-8 text-gray-400" />
              ) : (
                <Video className="w-8 h-8 text-gray-400" />
              )}
              <span className="text-gray-400">
                Clique para adicionar {block.type === 'image' ? 'uma imagem' : 'um vídeo'}
              </span>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex-1 overflow-y-auto">
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
          {blocks.map((block) => (
            <div key={block.id} className="group relative">
              {/* Botão de Adicionar Bloco */}
              <div className="absolute -left-12 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setShowBlockMenu(showBlockMenu === block.id ? null : block.id)}
                  className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded flex items-center justify-center transition-colors"
                >
                  <Plus className="w-4 h-4 text-gray-300" />
                </button>
                
                {/* Menu de Tipos de Bloco */}
                {showBlockMenu === block.id && (
                  <div className="absolute left-0 top-10 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-2 z-10 min-w-[160px]">
                    {blockTypes.map((blockType) => (
                      <button
                        key={blockType.type}
                        onClick={() => addBlock(block.id, blockType.type as Block['type'])}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                      >
                        <blockType.icon className="w-4 h-4" />
                        {blockType.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Conteúdo do Bloco */}
              <div className="relative">
                {renderBlock(block)}
              </div>
            </div>
          ))}
        </div>

        {/* Espaço extra para scroll */}
        <div className="h-32"></div>
      </div>
    </div>
  )
}

export default BlockEditor
