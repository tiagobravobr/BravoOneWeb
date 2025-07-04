import React, { useState, useRef, useEffect } from 'react'
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import Dropcursor from '@tiptap/extension-dropcursor'
import Gapcursor from '@tiptap/extension-gapcursor'
import { Bold, Italic, Strikethrough, Code, List, ListOrdered, Quote, Copy, Scissors, Clipboard, AlignLeft, AlignCenter, AlignRight, AlignJustify, Underline as UnderlineIcon, Highlighter } from 'lucide-react'

interface TiptapContextEditorProps {
  placeholder?: string
}

interface ContextMenuProps {
  x: number
  y: number
  isVisible: boolean
  onClose: () => void
  onCopy: () => void
  onCut: () => void
  onPaste: () => void
  onBold: () => void
  onItalic: () => void
  onStrike: () => void
  onCode: () => void
  hasSelection: boolean
}

const ContextMenu: React.FC<ContextMenuProps> = ({ 
  x, 
  y, 
  isVisible, 
  onClose, 
  onCopy, 
  onCut, 
  onPaste, 
  onBold, 
  onItalic, 
  onStrike,
  onCode,
  hasSelection 
}) => {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div
      ref={menuRef}
      className="absolute z-50 bg-gray-800 border border-gray-600 rounded-lg shadow-lg py-2 min-w-[200px]"
      style={{ left: x, top: y }}
    >
      <div className="px-3 py-2 text-xs text-gray-400 uppercase tracking-wider font-medium border-b border-gray-700 mb-1">
        Ações
      </div>
      
      {hasSelection && (
        <>
          <button
            onClick={onCopy}
            className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
          >
            <Copy className="w-4 h-4" />
            Copiar
            <span className="ml-auto text-xs text-gray-500">Cmd+C</span>
          </button>
          
          <button
            onClick={onCut}
            className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
          >
            <Scissors className="w-4 h-4" />
            Recortar
            <span className="ml-auto text-xs text-gray-500">Cmd+X</span>
          </button>
        </>
      )}
      
      <button
        onClick={onPaste}
        className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
      >
        <Clipboard className="w-4 h-4" />
        Colar
        <span className="ml-auto text-xs text-gray-500">Cmd+V</span>
      </button>
      
      {hasSelection && (
        <>
          <div className="h-px bg-gray-700 my-1" />
          <div className="px-3 py-2 text-xs text-gray-400 uppercase tracking-wider font-medium">
            Formatação
          </div>
          
          <button
            onClick={onBold}
            className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
          >
            <Bold className="w-4 h-4" />
            Negrito
            <span className="ml-auto text-xs text-gray-500">Cmd+B</span>
          </button>
          
          <button
            onClick={onItalic}
            className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
          >
            <Italic className="w-4 h-4" />
            Itálico
            <span className="ml-auto text-xs text-gray-500">Cmd+I</span>
          </button>
          
          <button
            onClick={onStrike}
            className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
          >
            <Strikethrough className="w-4 h-4" />
            Riscado
          </button>
          
          <button
            onClick={onCode}
            className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
          >
            <Code className="w-4 h-4" />
            Código
          </button>
        </>
      )}
    </div>
  )
}

const TiptapContextEditor: React.FC<TiptapContextEditorProps> = ({ placeholder }) => {
  const [contextMenu, setContextMenu] = useState({
    x: 0,
    y: 0,
    isVisible: false,
    hasSelection: false
  })
  
  const editorRef = useRef<HTMLDivElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Placeholder.configure({
        placeholder: placeholder || 'Comece a escrever seu conteúdo...',
        showOnlyWhenEditable: true,
        showOnlyCurrent: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      Underline,
      Highlight.configure({
        HTMLAttributes: {
          class: 'highlight',
        },
      }),
      Dropcursor,
      Gapcursor,
    ],
    content: `
      <h1>Título do Conteúdo</h1>
      <p>Selecione qualquer texto para ver o <strong>menu de formatação</strong> aparecer automaticamente. Você também pode clicar com o <em>botão direito</em> para abrir o menu contextual.</p>
      <p style="text-align: center">Este parágrafo está centralizado usando as opções de alinhamento.</p>
      <p style="text-align: right">Este parágrafo está alinhado à direita.</p>
      <ul>
        <li><strong>Negrito</strong> com Cmd/Ctrl + B</li>
        <li><em>Itálico</em> com Cmd/Ctrl + I</li>
        <li><u>Sublinhado</u> com Cmd/Ctrl + U</li>
        <li><s>Riscado</s> para texto tachado</li>
        <li><mark>Texto destacado</mark> para marcar conteúdo importante</li>
        <li><code>Código</code> para destacar código</li>
      </ul>
      <p>Digite <code>#</code> seguido de espaço para criar títulos.</p>
      <blockquote>
        <p>Use > para citações como esta.</p>
      </blockquote>
      <p>O editor suporta markdown, atalhos de teclado e muito mais! Experimente clicar com o botão direito em qualquer lugar do texto.</p>
      <p style="text-align: justify">Este parágrafo está justificado, o que significa que o texto é alinhado tanto à esquerda quanto à direita, criando margens uniformes em ambos os lados.</p>
    `,
    autofocus: true,
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-lg max-w-none focus:outline-none min-h-[500px] p-6',
      },
      handleDOMEvents: {
        contextmenu: (view, event) => {
          event.preventDefault()
          
          const { state } = view
          const { from, to } = state.selection
          const hasSelection = from !== to
          
          // Calcular posição relativa ao editor
          const editorElement = editorRef.current
          if (editorElement) {
            const rect = editorElement.getBoundingClientRect()
            const x = event.clientX - rect.left
            const y = event.clientY - rect.top
            
            setContextMenu({
              x: Math.max(0, Math.min(x, rect.width - 200)), // Prevenir overflow horizontal
              y: Math.max(0, Math.min(y, rect.height - 200)), // Prevenir overflow vertical
              isVisible: true,
              hasSelection
            })
          } else {
            setContextMenu({
              x: event.clientX,
              y: event.clientY,
              isVisible: true,
              hasSelection
            })
          }
          
          return true
        },
      },
    },
  })

  const handleContextMenuClose = () => {
    setContextMenu(prev => ({ ...prev, isVisible: false }))
  }

  const handleCopy = () => {
    if (editor) {
      document.execCommand('copy')
      handleContextMenuClose()
    }
  }

  const handleCut = () => {
    if (editor) {
      document.execCommand('cut')
      handleContextMenuClose()
    }
  }

  const handlePaste = () => {
    if (editor) {
      document.execCommand('paste')
      handleContextMenuClose()
    }
  }

  const handleBold = () => {
    if (editor) {
      editor.chain().focus().toggleBold().run()
      handleContextMenuClose()
    }
  }

  const handleItalic = () => {
    if (editor) {
      editor.chain().focus().toggleItalic().run()
      handleContextMenuClose()
    }
  }

  const handleStrike = () => {
    if (editor) {
      editor.chain().focus().toggleStrike().run()
      handleContextMenuClose()
    }
  }

  const handleCode = () => {
    if (editor) {
      editor.chain().focus().toggleCode().run()
      handleContextMenuClose()
    }
  }

  if (!editor) {
    return null
  }

  return (
    <div ref={editorRef} className="w-full bg-gray-900 rounded-lg border border-gray-700 focus-within:border-blue-500 transition-colors relative">
      {/* Bubble Menu - aparece ao selecionar texto */}
      {editor && (
        <BubbleMenu 
          editor={editor} 
          tippyOptions={{ duration: 100 }}
          className="flex items-center gap-1 p-2 bg-gray-800 border border-gray-600 rounded-lg shadow-lg"
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-gray-700 transition-colors ${
              editor.isActive('bold') ? 'bg-blue-600 text-white' : 'text-gray-300'
            }`}
            title="Negrito (Cmd/Ctrl + B)"
          >
            <Bold className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-gray-700 transition-colors ${
              editor.isActive('italic') ? 'bg-blue-600 text-white' : 'text-gray-300'
            }`}
            title="Itálico (Cmd/Ctrl + I)"
          >
            <Italic className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded hover:bg-gray-700 transition-colors ${
              editor.isActive('underline') ? 'bg-blue-600 text-white' : 'text-gray-300'
            }`}
            title="Sublinhado (Cmd/Ctrl + U)"
          >
            <UnderlineIcon className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-2 rounded hover:bg-gray-700 transition-colors ${
              editor.isActive('strike') ? 'bg-blue-600 text-white' : 'text-gray-300'
            }`}
            title="Riscado"
          >
            <Strikethrough className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={`p-2 rounded hover:bg-gray-700 transition-colors ${
              editor.isActive('highlight') ? 'bg-blue-600 text-white' : 'text-gray-300'
            }`}
            title="Destacar"
          >
            <Highlighter className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`p-2 rounded hover:bg-gray-700 transition-colors ${
              editor.isActive('code') ? 'bg-blue-600 text-white' : 'text-gray-300'
            }`}
            title="Código"
          >
            <Code className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-gray-600 mx-1" />
          
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-2 rounded hover:bg-gray-700 transition-colors ${
              editor.isActive({ textAlign: 'left' }) ? 'bg-blue-600 text-white' : 'text-gray-300'
            }`}
            title="Alinhar à esquerda"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-2 rounded hover:bg-gray-700 transition-colors ${
              editor.isActive({ textAlign: 'center' }) ? 'bg-blue-600 text-white' : 'text-gray-300'
            }`}
            title="Centralizar"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-2 rounded hover:bg-gray-700 transition-colors ${
              editor.isActive({ textAlign: 'right' }) ? 'bg-blue-600 text-white' : 'text-gray-300'
            }`}
            title="Alinhar à direita"
          >
            <AlignRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`p-2 rounded hover:bg-gray-700 transition-colors ${
              editor.isActive({ textAlign: 'justify' }) ? 'bg-blue-600 text-white' : 'text-gray-300'
            }`}
            title="Justificar"
          >
            <AlignJustify className="w-4 h-4" />
          </button>

          <div className="w-px h-6 bg-gray-600 mx-1" />
          
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-gray-700 transition-colors ${
              editor.isActive('bulletList') ? 'bg-blue-600 text-white' : 'text-gray-300'
            }`}
            title="Lista com marcadores"
          >
            <List className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-gray-700 transition-colors ${
              editor.isActive('orderedList') ? 'bg-blue-600 text-white' : 'text-gray-300'
            }`}
            title="Lista numerada"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 rounded hover:bg-gray-700 transition-colors ${
              editor.isActive('blockquote') ? 'bg-blue-600 text-white' : 'text-gray-300'
            }`}
            title="Citação"
          >
            <Quote className="w-4 h-4" />
          </button>
        </BubbleMenu>
      )}
      
      {/* Context Menu - aparece ao clicar com botão direito */}
      <ContextMenu
        x={contextMenu.x}
        y={contextMenu.y}
        isVisible={contextMenu.isVisible}
        hasSelection={contextMenu.hasSelection}
        onClose={handleContextMenuClose}
        onCopy={handleCopy}
        onCut={handleCut}
        onPaste={handlePaste}
        onBold={handleBold}
        onItalic={handleItalic}
        onStrike={handleStrike}
        onCode={handleCode}
      />
      
      <EditorContent 
        editor={editor} 
        className="text-gray-100 [&_.ProseMirror]:min-h-[500px] [&_.ProseMirror]:p-6 [&_.ProseMirror]:focus:outline-none [&_.ProseMirror_h1]:text-3xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:text-white [&_.ProseMirror_h2]:text-2xl [&_.ProseMirror_h2]:font-semibold [&_.ProseMirror_h2]:text-white [&_.ProseMirror_h3]:text-xl [&_.ProseMirror_h3]:font-medium [&_.ProseMirror_h3]:text-white [&_.ProseMirror_p]:text-gray-300 [&_.ProseMirror_p]:leading-relaxed [&_.ProseMirror_strong]:text-white [&_.ProseMirror_em]:text-gray-200 [&_.ProseMirror_u]:text-gray-200 [&_.ProseMirror_u]:underline [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:ml-6 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:ml-6 [&_.ProseMirror_li]:text-gray-300 [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-blue-500 [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_blockquote]:text-gray-400 [&_.ProseMirror_code]:bg-gray-800 [&_.ProseMirror_code]:px-2 [&_.ProseMirror_code]:py-1 [&_.ProseMirror_code]:rounded [&_.ProseMirror_code]:text-blue-300 [&_.ProseMirror_s]:text-gray-500 [&_.ProseMirror_mark]:bg-yellow-500 [&_.ProseMirror_mark]:text-black [&_.ProseMirror_mark]:px-1 [&_.ProseMirror_mark]:rounded [&_.highlight]:bg-yellow-500 [&_.highlight]:text-black [&_.highlight]:px-1 [&_.highlight]:rounded"
      />
    </div>
  )
}

export default TiptapContextEditor
