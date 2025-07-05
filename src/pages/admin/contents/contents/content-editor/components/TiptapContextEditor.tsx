import React, { useState, useRef, useEffect } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Dropcursor from "@tiptap/extension-dropcursor";
import Gapcursor from "@tiptap/extension-gapcursor";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Copy,
  Scissors,
  Clipboard,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Underline as UnderlineIcon,
  Highlighter,
  ChevronDown,
  Type,
  ImageIcon,
  Youtube as YoutubeIcon,
} from "lucide-react";

interface TiptapContextEditorProps {
  placeholder?: string;
}

interface ContextMenuProps {
  x: number;
  y: number;
  isVisible: boolean;
  onClose: () => void;
  onCopy: () => void;
  onCut: () => void;
  onPaste: () => void;
  onBold: () => void;
  onItalic: () => void;
  onStrike: () => void;
  onCode: () => void;
  hasSelection: boolean;
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
  hasSelection,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

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
  );
};

interface HeadingDropdownProps {
  editor: any;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const HeadingDropdown: React.FC<HeadingDropdownProps> = ({
  editor,
  isOpen,
  onToggle,
  onClose,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const getCurrentHeading = () => {
    if (editor.isActive("heading", { level: 1 })) return "Título 1";
    if (editor.isActive("heading", { level: 2 })) return "Título 2";
    if (editor.isActive("heading", { level: 3 })) return "Título 3";
    if (editor.isActive("heading", { level: 4 })) return "Título 4";
    if (editor.isActive("heading", { level: 5 })) return "Título 5";
    if (editor.isActive("heading", { level: 6 })) return "Título 6";
    return "Parágrafo";
  };

  const headingOptions = [
    {
      label: "Parágrafo",
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: editor.isActive("paragraph"),
      className: "text-base font-normal",
    },
    {
      label: "Título 1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive("heading", { level: 1 }),
      className: "text-2xl font-bold",
    },
    {
      label: "Título 2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
      className: "text-xl font-semibold",
    },
    {
      label: "Título 3",
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive("heading", { level: 3 }),
      className: "text-lg font-medium",
    },
    {
      label: "Título 4",
      action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      isActive: editor.isActive("heading", { level: 4 }),
      className: "text-base font-medium",
    },
    {
      label: "Título 5",
      action: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
      isActive: editor.isActive("heading", { level: 5 }),
      className: "text-sm font-medium",
    },
    {
      label: "Título 6",
      action: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
      isActive: editor.isActive("heading", { level: 6 }),
      className: "text-xs font-medium",
    },
  ];

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 transition-colors text-gray-300 text-sm min-w-[120px] whitespace-nowrap"
        title="Selecionar tipo de texto"
      >
        <Type className="w-4 h-4" />
        <span className="truncate">{getCurrentHeading()}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg py-1 min-w-[140px] z-10">
          {headingOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                option.action();
                onClose();
              }}
              className={`w-full text-left px-3 py-2 hover:bg-gray-700 transition-colors ${option.isActive ? "bg-blue-600 text-white" : "text-gray-300"
                }`}
            >
              <span className={option.className}>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const TiptapContextEditor: React.FC<TiptapContextEditorProps> = ({
  placeholder,
}) => {
  const [contextMenu, setContextMenu] = useState({
    x: 0,
    y: 0,
    isVisible: false,
    hasSelection: false,
  });

  const [isHeadingDropdownOpen, setIsHeadingDropdownOpen] = useState(false);

  const editorRef = useRef<HTMLDivElement>(null);

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
        placeholder: placeholder || "Comece a escrever seu conteúdo...",
        showOnlyWhenEditable: true,
        showOnlyCurrent: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
      Underline,
      Highlight.configure({
        HTMLAttributes: {
          class: "highlight",
        },
      }),
      Dropcursor,
      Gapcursor,
      Image.configure({
        inline: false,
        HTMLAttributes: {
          class: "editor-image",
        },
      }),
      Youtube.configure({
        inline: false,
        HTMLAttributes: {
          class: "editor-youtube",
        },
      }),
    ],
    content: `
      <h1>Título Principal (H1)</h1>
      <p>Selecione qualquer texto para ver o <strong>menu de formatação</strong> aparecer automaticamente. Agora você pode <strong>escolher diferentes tipos de texto</strong> usando o dropdown no bubble menu e <strong>inserir imagens e vídeos</strong> com os novos botões!</p>
      
      <h2>Título Secundário (H2)</h2>
      <p>Este é um subtítulo que você pode selecionar usando o dropdown de tipos de texto.</p>
      
      <h3>Inserindo Mídia</h3>
      <p>Use os botões de imagem e YouTube no bubble menu para inserir conteúdo visual:</p>
      
      <ul>
        <li>📸 <strong>Imagem</strong>: Clique no ícone de imagem para inserir uma foto</li>
        <li>🎥 <strong>YouTube</strong>: Clique no ícone do YouTube para inserir um vídeo</li>
      </ul>
      
      <h4>Exemplo de Imagem</h4>
      <p>Aqui está um exemplo de como as imagens aparecem no editor:</p>
      <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80" alt="Exemplo de imagem - Computador com código" />
      
      <h4>Formatação de Texto</h4>
      <p>Todos os níveis de cabeçalho estão disponíveis no dropdown.</p>
      
      <h5>Título Quinário (H5)</h5>
      <p>O dropdown mostra o tipo atual do texto selecionado.</p>
      
      <h6>Título Sextário (H6)</h6>
      <p>O menor tamanho de cabeçalho disponível.</p>
      
      <p>Parágrafo normal com texto em tamanho padrão. Você também pode clicar com o <em>botão direito</em> para abrir o menu contextual.</p>
      
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
        <p>Use > para citações como esta com a cor personalizada #bd1616.</p>
      </blockquote>
      
      <p>O editor suporta markdown, atalhos de teclado e muito mais! Experimente selecionar texto e usar o dropdown para mudar o tipo.</p>
      
      <p style="text-align: justify">Este parágrafo está justificado, o que significa que o texto é alinhado tanto à esquerda quanto à direita, criando margens uniformes em ambos os lados.</p>
    `,
    autofocus: true,
    editorProps: {
      attributes: {
        class:
          "prose prose-invert prose-lg max-w-none focus:outline-none min-h-[500px] p-6",
      },
      handleDOMEvents: {
        contextmenu: (view, event) => {
          event.preventDefault();

          const { state } = view;
          const { from, to } = state.selection;
          const hasSelection = from !== to;

          // Calcular posição relativa ao editor
          const editorElement = editorRef.current;
          if (editorElement) {
            const rect = editorElement.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            setContextMenu({
              x: Math.max(0, Math.min(x, rect.width - 200)), // Prevenir overflow horizontal
              y: Math.max(0, Math.min(y, rect.height - 200)), // Prevenir overflow vertical
              isVisible: true,
              hasSelection,
            });
          } else {
            setContextMenu({
              x: event.clientX,
              y: event.clientY,
              isVisible: true,
              hasSelection,
            });
          }

          return true;
        },
      },
    },
  });

  const handleContextMenuClose = () => {
    setContextMenu((prev) => ({ ...prev, isVisible: false }));
  };

  const handleCopy = () => {
    if (editor) {
      document.execCommand("copy");
      handleContextMenuClose();
    }
  };

  const handleCut = () => {
    if (editor) {
      document.execCommand("cut");
      handleContextMenuClose();
    }
  };

  const handlePaste = () => {
    if (editor) {
      document.execCommand("paste");
      handleContextMenuClose();
    }
  };

  const handleBold = () => {
    if (editor) {
      editor.chain().focus().toggleBold().run();
      handleContextMenuClose();
    }
  };

  const handleItalic = () => {
    if (editor) {
      editor.chain().focus().toggleItalic().run();
      handleContextMenuClose();
    }
  };

  const handleStrike = () => {
    if (editor) {
      editor.chain().focus().toggleStrike().run();
      handleContextMenuClose();
    }
  };

  const handleCode = () => {
    if (editor) {
      editor.chain().focus().toggleCode().run();
      handleContextMenuClose();
    }
  };

  const handleImageInsert = () => {
    if (editor) {
      const url = prompt("Digite a URL da imagem:");
      if (url) {
        // Validar se é uma URL válida
        try {
          new URL(url);
          editor.chain().focus().setImage({ src: url }).run();
        } catch (error) {
          alert("Por favor, insira uma URL válida para a imagem.");
        }
      }
    }
  };

  const handleYoutubeInsert = () => {
    if (editor) {
      const url = prompt("Digite a URL do vídeo do YouTube:");
      if (url) {
        // Validar se é uma URL válida do YouTube
        const youtubeRegex =
          /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
        if (youtubeRegex.test(url)) {
          try {
            editor.chain().focus().setYoutubeVideo({ src: url }).run();
          } catch (error) {
            alert("Erro ao inserir vídeo do YouTube. Verifique a URL.");
          }
        } else {
          alert("Por favor, insira uma URL válida do YouTube.");
        }
      }
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div
      ref={editorRef}
      className="w-full bg-gray-900 rounded-lg border border-gray-700/30 transition-colors relative"
    >
      {/* Bubble Menu - aparece ao selecionar texto */}
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="flex flex-col gap-2 p-3 bg-gray-800 border border-gray-600 rounded-lg shadow-lg w-max max-w-screen-md"
        >
          {/* Primeira linha: Dropdown de cabeçalho e formatação básica */}
          <div className="flex items-center gap-2 flex-wrap">
            <HeadingDropdown
              editor={editor}
              isOpen={isHeadingDropdownOpen}
              onToggle={() => setIsHeadingDropdownOpen(!isHeadingDropdownOpen)}
              onClose={() => setIsHeadingDropdownOpen(false)}
            />

            <div className="w-px h-6 bg-gray-600 mx-1" />

            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive("bold")
                  ? "bg-blue-600 text-white"
                  : "text-gray-300"
                }`}
              title="Negrito (Cmd/Ctrl + B)"
            >
              <Bold className="w-4 h-4" />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive("italic")
                  ? "bg-blue-600 text-white"
                  : "text-gray-300"
                }`}
              title="Itálico (Cmd/Ctrl + I)"
            >
              <Italic className="w-4 h-4" />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive("underline")
                  ? "bg-blue-600 text-white"
                  : "text-gray-300"
                }`}
              title="Sublinhado (Cmd/Ctrl + U)"
            >
              <UnderlineIcon className="w-4 h-4" />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive("strike")
                  ? "bg-blue-600 text-white"
                  : "text-gray-300"
                }`}
              title="Riscado"
            >
              <Strikethrough className="w-4 h-4" />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive("highlight")
                  ? "bg-blue-600 text-white"
                  : "text-gray-300"
                }`}
              title="Destacar"
            >
              <Highlighter className="w-4 h-4" />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive("code")
                  ? "bg-blue-600 text-white"
                  : "text-gray-300"
                }`}
              title="Código"
            >
              <Code className="w-4 h-4" />
            </button>
          </div>

          {/* Segunda linha: Alinhamento e estrutura */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive({ textAlign: "left" })
                  ? "bg-blue-600 text-white"
                  : "text-gray-300"
                }`}
              title="Alinhar à esquerda"
            >
              <AlignLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive({ textAlign: "center" })
                  ? "bg-blue-600 text-white"
                  : "text-gray-300"
                }`}
              title="Centralizar"
            >
              <AlignCenter className="w-4 h-4" />
            </button>

            <button
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive({ textAlign: "right" })
                  ? "bg-blue-600 text-white"
                  : "text-gray-300"
                }`}
              title="Alinhar à direita"
            >
              <AlignRight className="w-4 h-4" />
            </button>

            <button
              onClick={() =>
                editor.chain().focus().setTextAlign("justify").run()
              }
              className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive({ textAlign: "justify" })
                  ? "bg-blue-600 text-white"
                  : "text-gray-300"
                }`}
              title="Justificar"
            >
              <AlignJustify className="w-4 h-4" />
            </button>

            <div className="w-px h-6 bg-gray-600 mx-1" />

            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive("bulletList")
                  ? "bg-blue-600 text-white"
                  : "text-gray-300"
                }`}
              title="Lista com marcadores"
            >
              <List className="w-4 h-4" />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive("orderedList")
                  ? "bg-blue-600 text-white"
                  : "text-gray-300"
                }`}
              title="Lista numerada"
            >
              <ListOrdered className="w-4 h-4" />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive("blockquote")
                  ? "bg-blue-600 text-white"
                  : "text-gray-300"
                }`}
              title="Citação"
            >
              <Quote className="w-4 h-4" />
            </button>

            <div className="w-px h-6 bg-gray-600 mx-1" />

            <button
              onClick={handleImageInsert}
              className="p-2 rounded hover:bg-gray-700 transition-colors text-gray-300"
              title="Inserir imagem"
            >
              <ImageIcon className="w-4 h-4" />
            </button>

            <button
              onClick={handleYoutubeInsert}
              className="p-2 rounded hover:bg-gray-700 transition-colors text-gray-300"
              title="Inserir vídeo do YouTube"
            >
              <YoutubeIcon className="w-4 h-4" />
            </button>
          </div>
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
        className="text-gray-100 [&_.ProseMirror]:min-h-[500px] [&_.ProseMirror]:px-16 [&_.ProseMirror]:py-12 [&_.ProseMirror]:focus:outline-none [&_.ProseMirror_h1]:text-4xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:text-white [&_.ProseMirror_h1]:mb-4 [&_.ProseMirror_h1]:mt-6 [&_.ProseMirror_h2]:text-3xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:text-white [&_.ProseMirror_h2]:mb-3 [&_.ProseMirror_h2]:mt-5 [&_.ProseMirror_h3]:text-2xl [&_.ProseMirror_h3]:font-semibold [&_.ProseMirror_h3]:text-white [&_.ProseMirror_h3]:mb-3 [&_.ProseMirror_h3]:mt-4 [&_.ProseMirror_h4]:text-xl [&_.ProseMirror_h4]:font-semibold [&_.ProseMirror_h4]:text-white [&_.ProseMirror_h4]:mb-2 [&_.ProseMirror_h4]:mt-3 [&_.ProseMirror_h5]:text-lg [&_.ProseMirror_h5]:font-medium [&_.ProseMirror_h5]:text-white [&_.ProseMirror_h5]:mb-2 [&_.ProseMirror_h5]:mt-3 [&_.ProseMirror_h6]:text-base [&_.ProseMirror_h6]:font-medium [&_.ProseMirror_h6]:text-white [&_.ProseMirror_h6]:mb-2 [&_.ProseMirror_h6]:mt-2 [&_.ProseMirror_p]:text-gray-300 [&_.ProseMirror_p]:leading-relaxed [&_.ProseMirror_p]:mb-3 [&_.ProseMirror_strong]:text-white [&_.ProseMirror_em]:text-gray-200 [&_.ProseMirror_u]:text-gray-200 [&_.ProseMirror_u]:underline [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:ml-6 [&_.ProseMirror_ul]:mb-3 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:ml-6 [&_.ProseMirror_ol]:mb-3 [&_.ProseMirror_li]:text-gray-300 [&_.ProseMirror_li]:mb-1 [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-gray-500 [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_blockquote]:text-gray-400 [&_.ProseMirror_blockquote]:mb-3 [&_.ProseMirror_code]:bg-gray-800 [&_.ProseMirror_code]:px-2 [&_.ProseMirror_code]:py-1 [&_.ProseMirror_code]:rounded [&_.ProseMirror_code]:text-gray-300 [&_.ProseMirror_s]:text-gray-500 [&_.ProseMirror_mark]:bg-yellow-500 [&_.ProseMirror_mark]:text-black [&_.ProseMirror_mark]:px-1 [&_.ProseMirror_mark]:rounded [&_.highlight]:bg-yellow-500 [&_.highlight]:text-black [&_.highlight]:px-1 [&_.highlight]:rounded [&_.editor-image]:max-w-full [&_.editor-image]:h-auto [&_.editor-image]:rounded-lg [&_.editor-image]:mb-4 [&_.editor-image]:mt-4 [&_.editor-image]:shadow-lg [&_.editor-youtube]:max-w-full [&_.editor-youtube]:mb-4 [&_.editor-youtube]:mt-4 [&_.editor-youtube]:rounded-lg [&_.editor-youtube]:shadow-lg [&_.ProseMirror_img]:max-w-full [&_.ProseMirror_img]:h-auto [&_.ProseMirror_img]:rounded-lg [&_.ProseMirror_img]:mb-4 [&_.ProseMirror_img]:mt-4 [&_.ProseMirror_img]:shadow-lg [&_.ProseMirror_iframe]:max-w-full [&_.ProseMirror_iframe]:mb-4 [&_.ProseMirror_iframe]:mt-4 [&_.ProseMirror_iframe]:rounded-lg [&_.ProseMirror_iframe]:shadow-lg"
      />
    </div>
  );
};

export default TiptapContextEditor;
