import { Plus, BookOpen, Users, Clock } from 'lucide-react'

const AdminContent = () => {
  const handleCreateAcademy = () => {
    // TODO: Implementar criação de academia
    console.log('Criar nova academia')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header da página */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Gerenciamento de Conteúdo</h2>
        <p className="text-gray-400">Crie e gerencie academias, cursos e todo o conteúdo educacional da plataforma</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-600/20 rounded-xl">
              <BookOpen className="w-6 h-6 text-primary-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">0</p>
              <p className="text-gray-400 text-sm">Academias Criadas</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600/20 rounded-xl">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">0</p>
              <p className="text-gray-400 text-sm">Alunos Matriculados</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-600/20 rounded-xl">
              <Clock className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">0h</p>
              <p className="text-gray-400 text-sm">Conteúdo Total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Academias Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Academias</h3>
          <button
            onClick={handleCreateAcademy}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nova Academia
          </button>
        </div>

        {/* Empty State - Placeholder for creating academies */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create Academy Card */}
          <div
            onClick={handleCreateAcademy}
            className="group cursor-pointer bg-gray-900/30 border-2 border-dashed border-gray-700 hover:border-primary-600/50 rounded-xl p-8 transition-all duration-200 hover:bg-gray-900/50"
          >
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gray-800 group-hover:bg-primary-600/20 rounded-xl flex items-center justify-center mb-4 transition-colors">
                <Plus className="w-8 h-8 text-gray-400 group-hover:text-primary-400 transition-colors" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-300 transition-colors">
                Criar Academia
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Crie uma nova academia para organizar seus cursos e conteúdos educacionais
              </p>
            </div>
          </div>

          {/* Future academies will be rendered here */}
          {/* Example of how academy cards will look when created */}
          <div className="opacity-50 pointer-events-none bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-gray-600" />
            </div>
            <div className="p-6">
              <h4 className="text-lg font-semibold text-gray-500 mb-2">Academia Exemplo</h4>
              <p className="text-gray-600 text-sm mb-4">Descrição da academia aparecerá aqui...</p>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>0 cursos</span>
                <span>0 alunos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 bg-gray-800/50 hover:bg-gray-800 rounded-lg text-left transition-colors group">
            <BookOpen className="w-5 h-5 text-primary-400 mb-2" />
            <p className="text-white font-medium mb-1">Criar Curso</p>
            <p className="text-gray-400 text-sm">Adicionar novo curso</p>
          </button>

          <button className="p-4 bg-gray-800/50 hover:bg-gray-800 rounded-lg text-left transition-colors group">
            <Users className="w-5 h-5 text-blue-400 mb-2" />
            <p className="text-white font-medium mb-1">Gerenciar Alunos</p>
            <p className="text-gray-400 text-sm">Ver e editar usuários</p>
          </button>

          <button className="p-4 bg-gray-800/50 hover:bg-gray-800 rounded-lg text-left transition-colors group">
            <Clock className="w-5 h-5 text-green-400 mb-2" />
            <p className="text-white font-medium mb-1">Relatórios</p>
            <p className="text-gray-400 text-sm">Ver estatísticas</p>
          </button>

          <button className="p-4 bg-gray-800/50 hover:bg-gray-800 rounded-lg text-left transition-colors group">
            <Plus className="w-5 h-5 text-yellow-400 mb-2" />
            <p className="text-white font-medium mb-1">Configurações</p>
            <p className="text-gray-400 text-sm">Ajustes da plataforma</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminContent
