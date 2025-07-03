import { useState, useRef, useCallback } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { X, Upload, Plus, Minus, RotateCcw } from 'lucide-react'

interface AvatarUploaderProps {
  onSave: (file: File) => void
  onCancel: () => void
}

export default function AvatarUploader({ onSave, onCancel }: AvatarUploaderProps) {
  const [image, setImage] = useState<File | null>(null)
  const [scale, setScale] = useState(1.2)
  const [rotate, setRotate] = useState(0)
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 })
  const [isProcessing, setIsProcessing] = useState(false)
  const editorRef = useRef<AvatarEditor>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Função para selecionar arquivo
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setImage(file)
      // Reset editor settings
      setScale(1.2)
      setRotate(0)
      setPosition({ x: 0.5, y: 0.5 })
    }
  }

  // Função para processar e salvar a imagem
  const handleSave = useCallback(async () => {
    if (!editorRef.current || !image) return

    setIsProcessing(true)
    try {
      // Obter canvas da imagem editada
      const canvas = editorRef.current.getImageScaledToCanvas()
      
      // Converter para WebP com qualidade 85%
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, 'image/webp', 0.85)
      })

      if (blob) {
        const file = new File([blob], 'avatar.webp', { type: 'image/webp' })
        onSave(file)
      }
    } catch (error) {
      console.error('Erro ao processar imagem:', error)
    } finally {
      setIsProcessing(false)
    }
  }, [image, onSave])

  // Função para abrir seletor de arquivo
  const openFileSelector = () => {
    fileInputRef.current?.click()
  }

  // Função para resetar posição
  const resetPosition = () => {
    setPosition({ x: 0.5, y: 0.5 })
    setScale(1.2)
    setRotate(0)
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Overlay escuro */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onCancel}
      />
      
      {/* Modal */}
      <div className="relative bg-gray-900 rounded-xl shadow-2xl p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-white">
            {image ? 'Editar Avatar' : 'Selecionar Avatar'}
          </h3>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {!image ? (
          /* Seleção de arquivo */
          <div className="space-y-6">
            <div 
              onClick={openFileSelector}
              className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition-colors cursor-pointer"
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-300 mb-2">Clique para selecionar uma imagem</p>
              <p className="text-gray-500 text-sm">JPG, PNG, WebP - Máximo 5MB</p>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={onCancel}
                className="btn btn-secondary"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          /* Editor de imagem */
          <div className="space-y-6">
            {/* Área de edição */}
            <div className="flex justify-center">
              <div className="relative">
                <AvatarEditor
                  ref={editorRef}
                  image={image}
                  width={280}
                  height={280}
                  border={20}
                  borderRadius={140}
                  color={[0, 0, 0, 0.6]}
                  scale={scale}
                  rotate={rotate}
                  position={position}
                  onPositionChange={setPosition}
                  className="cursor-move"
                />
              </div>
            </div>

            {/* Controles de escala */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setScale(Math.max(1, scale - 0.1))}
                  className="flex items-center justify-center w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50"
                  disabled={scale <= 1}
                >
                  <Minus className="w-4 h-4 text-white" />
                </button>
                
                <span className="text-gray-300 text-sm min-w-[80px] text-center font-medium">
                  {Math.round(scale * 100)}%
                </span>
                
                <button
                  onClick={() => setScale(Math.min(3, scale + 0.1))}
                  className="flex items-center justify-center w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50"
                  disabled={scale >= 3}
                >
                  <Plus className="w-4 h-4 text-white" />
                </button>
              </div>
              
              {/* Slider de escala */}
              <div className="px-4">
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>100%</span>
                  <span>300%</span>
                </div>
              </div>
            </div>

            {/* Controles adicionais */}
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setRotate(rotate - 90)}
                className="btn btn-secondary btn-sm"
              >
                <RotateCcw className="w-4 h-4" />
                Girar
              </button>
              
              <button
                onClick={resetPosition}
                className="btn btn-secondary btn-sm"
              >
                Resetar
              </button>
              
              <button
                onClick={openFileSelector}
                className="btn btn-secondary btn-sm"
              >
                Trocar Imagem
              </button>
            </div>

            {/* Dica */}
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                Arraste a imagem para reposicionar e use os controles para ajustar
              </p>
            </div>

            {/* Ações */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
              <button
                onClick={onCancel}
                className="btn btn-secondary"
                disabled={isProcessing}
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="btn btn-primary"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processando...' : 'Salvar'}
              </button>
            </div>
          </div>
        )}

        {/* Input file oculto */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  )
}
