import React from 'react'
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { Bold, Italic, Strikethrough, Code, List, ListOrdered, Quote } from 'lucide-react'

interface TiptapEditorProps {
  placeholder?: string
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
      }),
      Placeholder.configure({
        placeholder: placeholder || 'Comece a escrever seu conteúdo...',
        showOnlyWhenEditable: true,
        showOnlyCurrent: false,
      })
    ],
    content: `
      <h1>Título do Conteúdo</h1>
      <p>Selecione qualquer texto para ver o menu de formatação aparecer. Você pode usar:</p>
      <ul>
        <li><strong>Negrito</strong> com Cmd/Ctrl + B</li>
        <li><em>Itálico</em> com Cmd/Ctrl + I</li>
        <li><s>Riscado</s> para texto tachado</li>
        <li><code>Código</code> para destacar código</li>
      </ul>
      <p>Digite <code>#</code> seguido de espaço para criar títulos.</p>
      <blockquote>
        <p>Use > para citações como esta.</p>
      </blockquote>
      <p>O editor suporta markdown, atalhos de teclado e muito mais!</p>
    `,
    autofocus: true,
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-lg max-w-none focus:outline-none min-h-[500px] p-6',
      },
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className="w-full bg-gray-900 rounded-lg border border-gray-700 focus-within:border-blue-500 transition-colors">
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
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-2 rounded hover:bg-gray-700 transition-colors ${
              editor.isActive('strike') ? 'bg-blue-600 text-white' : 'text-gray-300'
            }`}
            title="Riscado"
          >
            <Strikethrough className="w-4 h-4" />
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
      
      <EditorContent 
        editor={editor} 
        className="text-gray-100 [&_.ProseMirror]:min-h-[500px] [&_.ProseMirror]:p-6 [&_.ProseMirror]:focus:outline-none [&_.ProseMirror_h1]:text-3xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:text-white [&_.ProseMirror_h2]:text-2xl [&_.ProseMirror_h2]:font-semibold [&_.ProseMirror_h2]:text-white [&_.ProseMirror_h3]:text-xl [&_.ProseMirror_h3]:font-medium [&_.ProseMirror_h3]:text-white [&_.ProseMirror_p]:text-gray-300 [&_.ProseMirror_p]:leading-relaxed [&_.ProseMirror_strong]:text-white [&_.ProseMirror_em]:text-gray-200 [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:ml-6 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:ml-6 [&_.ProseMirror_li]:text-gray-300 [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-blue-500 [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_blockquote]:text-gray-400 [&_.ProseMirror_code]:bg-gray-800 [&_.ProseMirror_code]:px-2 [&_.ProseMirror_code]:py-1 [&_.ProseMirror_code]:rounded [&_.ProseMirror_code]:text-blue-300 [&_.ProseMirror_s]:text-gray-500"
      />
    </div>
  )
}

export default TiptapEditor
