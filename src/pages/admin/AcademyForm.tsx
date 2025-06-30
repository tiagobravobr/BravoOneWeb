import React, { useState, useRef, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useToast } from '../../contexts/ToastContext'
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal'

interface Academy {
  id: string
  title: string
  description?: string
  type: 'academia'
  created_at: string
  updated_at: string
}

const AcademyForm = () => {
  const { id } = useParams() // Para detectar se estamos editando (se há ID na URL)
  const navigate = useNavigate()
  const { showToast } = useToast()
  const isEditMode = Boolean(id)
  
  const [academyName, setAcademyName] = useState('')
  const [academy, setAcademy] = useState<Academy | null>(null)
  const [isEditing, setIsEditing] = useState(!isEditMode) // Se é novo, já inicia editando
  const [isLoading, setIsLoading] = useState(isEditMode) // Loading apenas se estivermos carregando dados existentes
  const [isSaving, setIsSaving] = useState(false)
  const [hasFocus, setHasFocus] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Se estamos em modo de edição, carregar os dados da academia
    if (isEditMode && id) {
      loadAcademy(id)
    }
  }, [id, isEditMode])

  const loadAcademy = async (academyId: string) => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('content_nodes')
        .select('*')
        .eq('id', academyId)
        .eq('type', 'academia')
        .single()

      if (error) {
        console.error('Erro ao carregar academia:', error)
        alert('Erro ao carregar dados da academia')
        navigate('/admin/content')
        return
      }

      if (data) {
        const loadedAcademy: Academy = {
          id: data.id,
          title: data.title,
          description: data.description,
          type: data.type,
          created_at: data.created_at,
          updated_at: data.updated_at
        }
        setAcademy(loadedAcademy)
        setAcademyName(data.title)
      }
    } catch (error) {
      console.error('Erro ao carregar academia:', error)
      alert('Erro ao carregar dados da academia')
      navigate('/admin/content')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Dar foco ao input quando está editando
    if (isEditing && inputRef.current && !isLoading) {
      inputRef.current.focus()
    }
  }, [isEditing, isLoading])

  const handleSave = async () => {
    if (!academyName.trim()) {
      setAcademyName(academy?.title || '') // Reverte para o nome original
      return
    }

    setIsSaving(true)
    
    try {
      if (isEditMode && academy) {
        // Atualizar academia existente
        const { error } = await supabase
          .from('content_nodes')
          .update({ 
            title: academyName.trim(),
            updated_at: new Date().toISOString()
          })
          .eq('id', academy.id)

        if (error) {
          throw error
        }

        showToast('Academia atualizada com sucesso!', 'success')
        setAcademy({ ...academy, title: academyName.trim() }) // Atualiza o valor original
        setIsEditing(false)
        return
      } else {
        // Criar nova academia
        const { data, error } = await supabase
          .from('content_nodes')
          .insert({
            title: academyName.trim(),
            type: 'academia',
            parent_id: null, // Academia é raiz
            order_index: 0,
            visibility: 'public'
          })
          .select()
          .single()

        if (error) {
          throw error
        }

        showToast('Academia criada com sucesso!', 'success')
        console.log(`Academia "${academyName}" criada com sucesso!`, data)
        
        // Após criar, atualizar o estado para modo de edição
        if (data) {
          const newAcademy: Academy = {
            id: data.id,
            title: data.title,
            description: data.description,
            type: data.type,
            created_at: data.created_at,
            updated_at: data.updated_at
          }
          setAcademy(newAcademy)
          
          // Atualizar a URL para o modo de edição sem recarregar a página
          window.history.replaceState(null, '', `/admin/content/academy/${data.id}`)
        }
      }

      setIsEditing(false)
      
    } catch (error) {
      console.error('Erro ao salvar academia:', error)
      setAcademyName(academy?.title || '') // Reverte em caso de erro
      showToast('Erro ao salvar academia. Tente novamente.', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    if (isEditMode || academyName.trim()) {
      // Se é edição ou já tem nome, apenas para de editar
      setIsEditing(false)
      // Reverte para o nome original se estiver editando
      if (academy) {
        setAcademyName(academy.title)
      }
    } else {
      // Se não há nome e é criação, pergunta se quer sair
      if (confirm('Deseja sair sem criar a academia?')) {
        navigate('/admin/content')
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  const handleBlur = () => {
    // Só salva se o nome mudou
    if (academy) {
      if (academyName.trim() && academyName.trim() !== academy.title) {
        handleSave()
      } else {
        setIsEditing(false)
      }
    } else {
      // Criação: só salva se não estiver vazio
      if (academyName.trim()) {
        handleSave()
      } else {
        setIsEditing(false)
      }
    }
  }

  const handleEditClick = () => {
    if (!isSaving) {
      setIsEditing(true)
    }
  }

  const handleOpenDeleteModal = () => setDeleteModalOpen(true)
  const handleCloseDeleteModal = () => setDeleteModalOpen(false)
  const handleDeleteAcademy = async () => {
    if (!academy) return
    setIsDeleting(true)
    try {
      const { error } = await supabase
        .from('content_nodes')
        .delete()
        .eq('id', academy.id)
      if (error) throw error
      showToast('Academia excluída com sucesso!', 'success')
      navigate('/admin/content')
    } catch (err) {
      showToast('Erro ao excluir academia.', 'error')
    } finally {
      setIsDeleting(false)
      setDeleteModalOpen(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header com link de voltar */}
      <div className="mb-4">
        <Link 
          to="/admin/content" 
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Voltar para Academias
        </Link>
      </div>

      {/* Campo Nome editável, destacado */}
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            {isEditing ? (
              <div className="relative min-h-[3rem] flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={academyName}
                  onChange={(e) => setAcademyName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setHasFocus(true)}
                  onBlur={() => {
                    setHasFocus(false)
                    handleBlur()
                  }}
                  disabled={isSaving}
                  placeholder={(!academyName && !hasFocus) ? "Digite o nome da academia..." : ""}
                  className={`w-full bg-transparent text-3xl font-bold text-white placeholder-gray-500 border-none outline-none focus:ring-0 p-0 h-12 ${
                    isSaving ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  style={{ fontSize: '2rem', lineHeight: '3rem' }}
                />
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 transform transition-all duration-200 ${
                  isSaving ? 'bg-yellow-500 scale-x-100' : 'bg-primary-500 scale-x-100'
                }`}></div>
                {isSaving && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <div className="animate-spin w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full"></div>
                  </div>
                )}
              </div>
            ) : (
              <div 
                onClick={handleEditClick}
                className={`cursor-text text-3xl font-bold text-white hover:text-gray-300 transition-colors min-h-[3rem] flex items-center h-12 ${
                  isSaving ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                style={{ fontSize: '2rem', lineHeight: '3rem' }}
              >
                {academyName || (
                  <span className="text-gray-500 font-normal">Digite o nome da academia...</span>
                )}
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
              onClick={handleOpenDeleteModal}
              disabled={isSaving || isDeleting}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Modal de confirmação de exclusão */}
      <ConfirmDeleteModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteAcademy}
        title={academy?.title || ''}
        loading={isDeleting}
      />

      {/* Área de conteúdo principal para futuras funcionalidades */}
      <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-8">
        <div className="text-gray-400 text-center py-12">
          <p className="mb-2">🏗️ Em breve: configurações avançadas, cursos, e gerenciamento de conteúdo.</p>
        </div>
      </div>
    </div>
  )
}

export default AcademyForm
