import React, { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { BarChart3, LayoutPanelTop, Settings, Layers } from 'lucide-react'
import { supabase } from '../../../../lib/supabase'
import { useToast } from '../../../../contexts/ToastContext'
import ConfirmDeleteModal from '../../../../components/ConfirmDeleteModal'
import AcademyHeader from './components/AcademyHeader'
import AcademyTabs from './components/AcademyTabs'
import AcademyOverview from './components/AcademyOverview'
import AcademyShowcase from './components/AcademyShowcase'
import AcademyContent from './components/AcademyContent'
import AcademySettings from './components/AcademySettings'

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
  const [activeTab, setActiveTab] = useState('content') // Sempre abrir na aba Conteúdos
  const inputRef = useRef<HTMLInputElement>(null)

  // Abas do menu da academia
  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
    { id: 'vitrine', label: 'Vitrine', icon: LayoutPanelTop },
    { id: 'content', label: 'Conteúdos', icon: Layers },
    { id: 'settings', label: 'Configurações', icon: Settings },
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
        navigate('/admin/academies')
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
      navigate('/admin/academies')
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
        navigate(`/admin/academy/${data.id}`, { replace: true })
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
        navigate('/admin/academies')
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
      navigate('/admin/academies')
    } catch (err) {
      showToast('Erro ao excluir academia.', 'error')
    } finally {
      setIsDeleting(false)
      setDeleteModalOpen(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AcademyHeader
        academyName={academyName}
        setAcademyName={setAcademyName}
        isEditing={isEditing}
        isLoading={isLoading}
        isSaving={isSaving}
        hasFocus={hasFocus}
        setHasFocus={setHasFocus}
        academy={academy}
        inputRef={inputRef}
        onEditClick={handleEditClick}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onDeleteClick={handleOpenDeleteModal}
        isDeleting={isDeleting}
      />

      <AcademyTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        academy={academy}
      />

      {/* Conteúdo das abas */}
      {academy && (
        <div className="mb-8">
          {activeTab === 'overview' && (
            <AcademyOverview />
          )}
          {activeTab === 'vitrine' && (
            <AcademyShowcase />
          )}
          {activeTab === 'content' && (
            <AcademyContent />
          )}
          {activeTab === 'settings' && (
            <AcademySettings />
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
