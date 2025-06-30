import { Plus, BookOpen, Calendar, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

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
    navigate('/admin/content/create-academy')
  }

  const handleEditAcademy = (academyId: string) => {
    navigate(`/admin/content/edit-academy/${academyId}`)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Create Academy Card - Formato 9:16 */}
        <div
          onClick={handleCreateAcademy}
          className="group cursor-pointer bg-gray-900/30 border-2 border-dashed border-gray-700 hover:border-primary-500 rounded-xl transition-all duration-300 hover:bg-gray-900/50 hover:scale-105"
          style={{ aspectRatio: '9/16' }}
        >
          <div className="h-full flex flex-col items-center justify-center p-6 text-center">
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
                className="bg-gray-900/30 border border-gray-800 rounded-xl overflow-hidden animate-pulse"
                style={{ aspectRatio: '9/16' }}
              >
                <div className="h-2/3 bg-gray-800"></div>
                <div className="h-1/3 p-4 space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                  <div className="flex justify-between mt-3">
                    <div className="h-3 bg-gray-700 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-700 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Academias Reais */}
        {!isLoading && academies.map((academy) => (
          <div 
            key={academy.id}
            onClick={() => handleEditAcademy(academy.id)}
            className="group cursor-pointer bg-gray-900/50 border border-gray-800 hover:border-primary-500 rounded-xl overflow-hidden transition-all duration-300 hover:bg-gray-900/70 hover:scale-105"
            style={{ aspectRatio: '9/16' }}
          >
            <div className="h-2/3 bg-gradient-to-br from-primary-900/30 to-gray-900 flex items-center justify-center group-hover:from-primary-800/40 group-hover:to-gray-800 transition-all duration-300">
              <BookOpen className="w-12 h-12 text-primary-400 group-hover:text-primary-300 transition-colors" />
            </div>
            <div className="h-1/3 p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-white font-semibold mb-1 text-sm group-hover:text-primary-300 transition-colors line-clamp-2">
                  {academy.title}
                </h3>
                {academy.description && (
                  <p className="text-gray-400 text-xs mb-2 line-clamp-2">
                    {academy.description}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatDate(academy.created_at)}
                </span>
                <span className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  0 cursos
                </span>
              </div>
            </div>
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
              className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Criar Primera Academia
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminContent
