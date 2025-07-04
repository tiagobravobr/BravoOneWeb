import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import Strike from '@tiptap/extension-strike'
import Code from '@tiptap/extension-code'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import TextAlign from '@tiptap/extension-text-align'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Image as ImageIcon,
  Link as LinkIcon,
} from 'lucide-react'

interface TiptapEditorProps {
  placeholder?: string
}

interface EditorToolbarProps {
  editor: any
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ editor }) => {
  if (!editor) {
    return null
  }

  const addImage = () => {
    const url = window.prompt('URL da imagem:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const addLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL do link:', previousUrl)
    
    if (url === null) {
      return
    }
    
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  const ButtonGroup = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center space-x-1 px-2 py-1 bg-gray-800 rounded-md">
      {children}
    </div>
  )

  const ToolbarButton = ({ 
    onClick, 
    isActive = false, 
    disabled = false, 
    title, 
    children 
  }: {
    onClick: () => void
    isActive?: boolean
    disabled?: boolean
    title?: string
    children: React.ReactNode
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        p-2 rounded-md transition-colors duration-200 
        ${isActive 
          ? 'bg-blue-600 text-white' 
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {children}
    </button>
  )

  return (
    <div className="flex items-center space-x-2 p-3 bg-gray-900 border-b border-gray-700 rounded-t-lg overflow-x-auto">
      {/* Formatação de Texto */}
      <ButtonGroup>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="Negrito (Ctrl+B)"
        >
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="Itálico (Ctrl+I)"
        >
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          title="Sublinhado (Ctrl+U)"
        >
          <UnderlineIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          title="Riscado"
        >
          <Strikethrough className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive('code')}
          title="Código"
        >
          <Code2 className="w-4 h-4" />
        </ToolbarButton>
      </ButtonGroup>

      {/* Títulos */}
      <ButtonGroup>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
          title="Título 1"
        >
          <Heading1 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          title="Título 2"
        >
          <Heading2 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          title="Título 3"
        >
          <Heading3 className="w-4 h-4" />
        </ToolbarButton>
      </ButtonGroup>

      {/* Listas */}
      <ButtonGroup>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="Lista com marcadores"
        >
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="Lista numerada"
        >
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>
      </ButtonGroup>

      {/* Alinhamento */}
      <ButtonGroup>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          isActive={editor.isActive({ textAlign: 'left' })}
          title="Alinhar à esquerda"
        >
          <AlignLeft className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={editor.isActive({ textAlign: 'center' })}
          title="Centralizar"
        >
          <AlignCenter className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          isActive={editor.isActive({ textAlign: 'right' })}
          title="Alinhar à direita"
        >
          <AlignRight className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          isActive={editor.isActive({ textAlign: 'justify' })}
          title="Justificar"
        >
          <AlignJustify className="w-4 h-4" />
        </ToolbarButton>
      </ButtonGroup>

      {/* Elementos */}
      <ButtonGroup>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          title="Citação"
        >
          <Quote className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Linha horizontal"
        >
          <Minus className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={addImage}
          title="Inserir imagem"
        >
          <ImageIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={addLink}
          isActive={editor.isActive('link')}
          title="Inserir link"
        >
          <LinkIcon className="w-4 h-4" />
        </ToolbarButton>
      </ButtonGroup>

      {/* Undo/Redo */}
      <ButtonGroup>
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          title="Desfazer (Ctrl+Z)"
        >
          <Undo className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          title="Refazer (Ctrl+Y)"
        >
          <Redo className="w-4 h-4" />
        </ToolbarButton>
      </ButtonGroup>
    </div>
  )
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ placeholder }) => {
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
        // Desabilitar as extensões padrão que vamos substituir
        strike: false,
        code: false,
      }),
      Placeholder.configure({
        placeholder: placeholder || 'Comece a escrever seu conteúdo...',
        showOnlyWhenEditable: true,
        showOnlyCurrent: false,
      }),
      Underline,
      Strike,
      Code,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-400 hover:text-blue-300 underline',
        },
      }),
      TextStyle,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: `
      <h1>Título do Conteúdo</h1>
      <p>Comece a escrever seu conteúdo aqui. Você pode usar a barra de ferramentas acima para formatação.</p>
      <p>Experimente as seguintes funcionalidades:</p>
      <ul>
        <li><strong>Negrito</strong> com Ctrl+B</li>
        <li><em>Itálico</em> com Ctrl+I</li>
        <li><u>Sublinhado</u> com Ctrl+U</li>
        <li><s>Riscado</s> e <code>código</code></li>
      </ul>
      <p style="text-align: center">Você também pode alinhar o texto ao centro</p>
      <p style="text-align: right">Ou à direita</p>
      <blockquote>
        <p>Use a barra de ferramentas para inserir citações, links, imagens e muito mais!</p>
      </blockquote>
      <p>Digite <code>#</code> seguido de espaço para criar títulos rapidamente.</p>
    `,
    autofocus: true,
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-lg max-w-none focus:outline-none min-h-[500px] p-6',
      },
    },
  })

  return (
    <div className="w-full bg-gray-900 rounded-lg border border-gray-700 focus-within:border-blue-500 transition-colors">
      <EditorToolbar editor={editor} />
      <EditorContent 
        editor={editor} 
        className="text-gray-100 [&_.ProseMirror]:min-h-[500px] [&_.ProseMirror]:p-6 [&_.ProseMirror]:focus:outline-none [&_.ProseMirror_h1]:text-3xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:text-white [&_.ProseMirror_h2]:text-2xl [&_.ProseMirror_h2]:font-semibold [&_.ProseMirror_h2]:text-white [&_.ProseMirror_h3]:text-xl [&_.ProseMirror_h3]:font-medium [&_.ProseMirror_h3]:text-white [&_.ProseMirror_p]:text-gray-300 [&_.ProseMirror_p]:leading-relaxed [&_.ProseMirror_strong]:text-white [&_.ProseMirror_em]:text-gray-200 [&_.ProseMirror_u]:text-gray-200 [&_.ProseMirror_s]:text-gray-400 [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:ml-6 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:ml-6 [&_.ProseMirror_li]:text-gray-300 [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-blue-500 [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_blockquote]:text-gray-400 [&_.ProseMirror_code]:bg-gray-800 [&_.ProseMirror_code]:px-2 [&_.ProseMirror_code]:py-1 [&_.ProseMirror_code]:rounded [&_.ProseMirror_code]:text-blue-300 [&_.ProseMirror_img]:rounded-lg [&_.ProseMirror_img]:max-w-full [&_.ProseMirror_img]:h-auto [&_.ProseMirror_a]:text-blue-400 [&_.ProseMirror_a]:hover:text-blue-300 [&_.ProseMirror_hr]:border-gray-600 [&_.ProseMirror_hr]:my-6"
      />
    </div>
  )
}

export default TiptapEditor
