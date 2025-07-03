import React, { useState, useRef, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Trash2, BarChart3, LayoutPanelTop } from 'lucide-react'
import { supabase } from '../../../lib/supabase'
import { useToast } from '../../../contexts/ToastContext'
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal'

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
  
  const [academyName, setAcademyName] = useState('')
  const [academy, setAcademy] = useState<Academy | null>(null)
  const [isEditing, setIsEditing] = useState(false) // Será controlado pelos useEffects
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [hasFocus, setHasFocus] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const inputRef = useRef<HTMLInputElement>(null)

  // Abas do menu da academia
  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
    { id: 'content', label: 'Conteúdos', icon: LayoutPanelTop },
  ]

  // Detectar mudanças na URL e atualizar estado
  useEffect(() => {
    if (id) {
      // Modo edição: carregar academia existente
      loadAcademy(id)
    } else {
      // Modo criação: limpar estado e iniciar editando
      setAcademy(null)
      setAcademyName('')
      setIsLoading(false)
      setIsEditing(true) // Iniciar em modo de edição para criar
    }
  }, [id]) // Reagir sempre que o ID na URL mudar

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
      navigate('/admin/contents')
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

    // Prevenir múltiplas execuções
    if (isSaving) {
      return
    }

    setIsSaving(true)
    
    try {
      if (academy) {
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
        
        // Parar edição e remover foco antes de navegar
        setIsEditing(false)
        inputRef.current?.blur()
        
        // Navegar para o modo de edição
        navigate(`/admin/contents/edit-academy/${data.id}`, { replace: true })
        return
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
    if (academy || academyName.trim()) {
      // Se é edição ou já tem nome, apenas para de editar
      setIsEditing(false)
      // Reverte para o nome original se estiver editando
      if (academy) {
        setAcademyName(academy.title)
      }
    } else {
      // Se não há nome e é criação, pergunta se quer sair
      if (confirm('Deseja sair sem criar a academia?')) {
        navigate('/admin/contents')
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault() // Prevenir comportamentos padrão
      if (!isSaving) { // Só executar se não estiver salvando
        handleSave()
      }
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  const handleBlur = () => {
    // Não fazer nada se já estiver salvando
    if (isSaving) return
    
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
      navigate('/admin/contents')
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
      <div className="mb-6">
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
                  onKeyDown={handleKeyDown}
                  onFocus={() => setHasFocus(true)}
                  onBlur={() => {
                    setHasFocus(false)
                    handleBlur()
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
                onClick={handleEditClick}
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
              onClick={handleOpenDeleteModal}
              disabled={isSaving || isDeleting}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Menu de navegação - só aparece quando há uma academia carregada */}
      {academy && (
        <div className="mb-8">
          <div className="border-b border-gray-700">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-1 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Conteúdo das abas */}
      {academy && (
        <div className="mb-8">
          {activeTab === 'overview' && (
            <div className="bg-gray-900/30 border border-gray-800 rounded p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <LayoutPanelTop className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Total de Conteúdos</p>
                    <p className="text-2xl font-bold text-white">0</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Progresso Médio</p>
                    <p className="text-2xl font-bold text-white">0%</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary-500/20 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Alunos Ativos</p>
                    <p className="text-2xl font-bold text-white">0</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg border border-gray-600">
                  <div>
                    <p className="text-white font-medium">Visibilidade</p>
                    <p className="text-sm text-gray-400">Controle quem pode ver esta academia</p>
                  </div>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Pública</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg border border-gray-600">
                  <div>
                    <p className="text-white font-medium">Status</p>
                    <p className="text-sm text-gray-400">Estado atual da academia</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">Ativa</span>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'content' && (
            <div className="bg-gray-900/30 border border-gray-800 rounded p-8">
              <div className="text-center py-12">
                <LayoutPanelTop className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-white mb-2">Em breve</h4>
                <p className="text-gray-400">
                  A funcionalidade de gerenciamento de conteúdos estará disponível em breve.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal de confirmação de exclusão */}
      <ConfirmDeleteModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteAcademy}
        title={academy?.title || ''}
        loading={isDeleting}
      />
    </div>
  )
}

export default AcademyForm
