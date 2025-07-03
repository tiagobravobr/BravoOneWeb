import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Trash2 } from 'lucide-react'

interface AcademyHeaderProps {
  academyName: string
  setAcademyName: (name: string) => void
  isEditing: boolean
  isLoading: boolean
  isSaving: boolean
  hasFocus: boolean
  setHasFocus: (focus: boolean) => void
  academy: { id: string } | null
  inputRef: React.RefObject<HTMLInputElement>
  onEditClick: () => void
  onKeyDown: (e: React.KeyboardEvent) => void
  onBlur: () => void
  onDeleteClick: () => void
  isDeleting: boolean
}

const AcademyHeader: React.FC<AcademyHeaderProps> = ({
  academyName,
  setAcademyName,
  isEditing,
  isLoading,
  isSaving,
  hasFocus,
  setHasFocus,
  academy,
  inputRef,
  onEditClick,
  onKeyDown,
  onBlur,
  onDeleteClick,
  isDeleting
}) => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="mb-4">
        <Link 
          to="/admin/contents" 
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Voltar para Academias
        </Link>
      </div>

      {/* Campo Nome editável, destacado */}
      <div className="mb-6">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="h-12 w-64 bg-gray-800/60 rounded animate-pulse" />
            ) : isEditing ? (
              <div className={`form-inline-container relative min-h-[3rem] flex items-center ${
                isSaving ? 'saving' : ''
              }`}>
                <input
                  ref={inputRef}
                  type="text"
                  value={academyName}
                  onChange={(e) => setAcademyName(e.target.value)}
                  onKeyDown={onKeyDown}
                  onFocus={() => setHasFocus(true)}
                  onBlur={() => {
                    setHasFocus(false)
                    onBlur()
                  }}
                  disabled={isSaving}
                  placeholder={(!academyName && !hasFocus) ? "Digite o nome da academia..." : ""}
                  className={`form-inline-editor text-3xl font-bold h-12 ${
                    isSaving ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  style={{ fontSize: '2rem', lineHeight: '3rem' }}
                />
                {isSaving && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <div className="animate-spin w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full"></div>
                  </div>
                )}
              </div>
            ) : (
              <div 
                onClick={onEditClick}
                className={`cursor-text text-3xl font-bold text-white hover:text-gray-300 transition-colors min-h-[3rem] flex items-center h-12 ${
                  isSaving ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                style={{ fontSize: '2rem', lineHeight: '3rem' }}
                title={academyName && academyName.length > 50 ? academyName : undefined}
              >
                <span className="truncate">{academyName || (
                  <span className="text-gray-500 font-normal">Digite o nome da academia...</span>
                )}</span>
                {isSaving && (
                  <div className="ml-3">
                    <div className="animate-spin w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full"></div>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* Ícone de exclusão, aparece sempre que academy.id existir */}
          {academy && academy.id && (
            <button
              className="ml-2 flex items-center justify-center w-8 h-8 rounded-full text-red-400 hover:bg-red-900/60 hover:text-red-300 transition-all"
              title="Excluir academia"
              onClick={onDeleteClick}
              disabled={isSaving || isDeleting}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default AcademyHeader
