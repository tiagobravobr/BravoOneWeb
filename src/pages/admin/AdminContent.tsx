import { Plus, BookOpen } from 'lucide-react'

const AdminContent = () => {
  const handleCreateAcademy = () => {
    // TODO: Implementar criação de academia
    console.log('Criar nova academia')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header da página */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Academias</h2>
        <p className="text-gray-400">Crie e gerencie suas academias educacionais</p>
      </div>

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

        {/* Exemplo de como ficarão as academias futuras */}
        <div 
          className="opacity-50 pointer-events-none bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden"
          style={{ aspectRatio: '9/16' }}
        >
          <div className="h-2/3 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-gray-600" />
          </div>
          <div className="h-1/3 p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-gray-500 font-semibold mb-1 text-sm">Academia Exemplo</h3>
              <p className="text-gray-600 text-xs mb-2">Descrição da academia...</p>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>0 cursos</span>
              <span>0 alunos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminContent
