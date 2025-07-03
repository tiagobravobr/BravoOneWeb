import { Plus, BookOpen, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal'
import { useToast } from '../../../contexts/ToastContext'

interface Academy {
  id: string
  title: string
  description?: string
  type: 'academia'
  created_at: string
  updated_at: string
  metadata?: any
}

const AdminContent = () => {
  const navigate = useNavigate()
  const [academies, setAcademies] = useState<Academy[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [academyToDelete, setAcademyToDelete] = useState<Academy | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const { showToast } = useToast()

  useEffect(() => {
    loadAcademies()
  }, [])

  const loadAcademies = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const { data, error: supabaseError } = await supabase
        .from('content_nodes')
        .select('*')
        .eq('type', 'academia')
        .order('created_at', { ascending: false })

      if (supabaseError) {
        throw supabaseError
      }

      setAcademies(data || [])
    } catch (err) {
      console.error('Erro ao carregar academias:', err)
      setError('Erro ao carregar academias. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateAcademy = () => {
    navigate('/admin/contents/create-academy')
  }

  const handleEditAcademy = (academyId: string) => {
    navigate(`/admin/contents/edit-academy/${academyId}`)
  }


  const handleOpenDeleteModal = (academy: Academy) => {
    setAcademyToDelete(academy)
    setDeleteModalOpen(true)
  }

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false)
    setAcademyToDelete(null)
  }

  const handleDeleteAcademy = async () => {
    if (!academyToDelete) return
    setIsDeleting(true)
    try {
      const { error } = await supabase
        .from('content_nodes')
        .delete()
        .eq('id', academyToDelete.id)
      if (error) throw error
      showToast('Academia excluída com sucesso!', 'success')
      setAcademies((prev) => prev.filter(a => a.id !== academyToDelete.id))
      handleCloseDeleteModal()
    } catch (err) {
      showToast('Erro ao excluir academia.', 'error')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      {/* Header da página */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Academias</h2>
        <p className="text-gray-400">
          Crie e gerencie suas academias educacionais
          {!isLoading && academies.length > 0 && (
            <span className="ml-2">• {academies.length} academia{academies.length !== 1 ? 's' : ''}</span>
          )}
        </p>
      </div>

      {/* Estado de erro */}
      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg">
          <p className="text-red-400">{error}</p>
          <button
            onClick={loadAcademies}
            className="mt-2 text-sm text-red-300 hover:text-red-200 underline"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {/* Grid de Academias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
        {/* Create Academy Card - Formato 9:16 */}
        <div
          onClick={handleCreateAcademy}
          className="group cursor-pointer bg-gray-900/30 border-2 border-dashed border-gray-700 rounded transition-all duration-200 hover:bg-gray-900/50 hover:-translate-y-2 hover:shadow-2xl h-full w-full flex items-center justify-center"
          style={{ aspectRatio: '9/16', minHeight: 220 }}
        >
          <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 bg-gray-800 group-hover:bg-primary-600/20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300">
              <Plus className="w-8 h-8 text-gray-400 group-hover:text-primary-400 transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-primary-300 transition-colors">
              Criar Academia
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Crie uma nova academia para organizar seus cursos
            </p>
          </div>
        </div>

        {/* Loading Cards */}
        {isLoading && (
          <>
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-900/30 border border-gray-800 rounded overflow-hidden animate-pulse h-full w-full flex items-center justify-center"
                style={{ aspectRatio: '9/16', minHeight: 220 }}
              >
                <div className="w-2/3 h-6 bg-gray-700 rounded mx-auto" />
              </div>
            ))}
          </>
        )}

        {/* Academias Reais */}
        {!isLoading && academies.map((academy) => (
          <div
            key={academy.id}
            className="group relative cursor-pointer bg-neutral-900 border border-gray-800 rounded flex items-center justify-center shadow-md mx-auto transition-all duration-200 hover:-translate-y-2 hover:shadow-2xl h-full w-full"
            style={{ aspectRatio: '9/16', minHeight: 220 }}
            onClick={() => handleEditAcademy(academy.id)}
          >
            {/* Botão de excluir, só aparece no hover */}
            <button
              className="absolute top-3 right-3 z-10 p-1 rounded-full bg-neutral-900/80 text-red-400 opacity-0 group-hover:opacity-100 hover:bg-red-900/60 hover:text-red-300 transition-all"
              title="Excluir academia"
              onClick={e => { e.stopPropagation(); handleOpenDeleteModal(academy) }}
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <span className="text-center text-2xl font-bold text-white tracking-tight select-none px-4 w-full break-words">
              {academy.title}
            </span>
          </div>
        ))}

        {/* Estado vazio */}
        {!isLoading && !error && academies.length === 0 && (
          <div className="col-span-full text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Nenhuma academia encontrada</h3>
            <p className="text-gray-500 mb-6">Comece criando sua primeira academia educacional</p>
            <button
              onClick={handleCreateAcademy}
              className="btn btn-primary inline-flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Criar Primera Academia
            </button>
          </div>
        )}
      </div>

      {/* Modal de confirmação de exclusão */}
      <ConfirmDeleteModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteAcademy}
        title={academyToDelete?.title || ''}
        loading={isDeleting}
      />
    </div>
  )
}

export default AdminContent
