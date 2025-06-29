import { BarChart3, Users, BookOpen, TrendingUp, Clock, Star } from 'lucide-react'

const AdminDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Dashboard Administrativo</h2>
        <p className="text-gray-400">Visão geral da plataforma Bravo One</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary-600/20 rounded-xl">
              <BookOpen className="w-6 h-6 text-primary-400" />
            </div>
            <span className="text-green-400 text-sm font-medium">+0%</span>
          </div>
          <p className="text-2xl font-bold text-white mb-1">0</p>
          <p className="text-gray-400 text-sm">Academias Ativas</p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-600/20 rounded-xl">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-green-400 text-sm font-medium">+0%</span>
          </div>
          <p className="text-2xl font-bold text-white mb-1">0</p>
          <p className="text-gray-400 text-sm">Usuários Totais</p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-600/20 rounded-xl">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-green-400 text-sm font-medium">+0%</span>
          </div>
          <p className="text-2xl font-bold text-white mb-1">0</p>
          <p className="text-gray-400 text-sm">Aulas Assistidas</p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-600/20 rounded-xl">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
            <span className="text-green-400 text-sm font-medium">+0%</span>
          </div>
          <p className="text-2xl font-bold text-white mb-1">0h</p>
          <p className="text-gray-400 text-sm">Tempo Total de Estudo</p>
        </div>
      </div>

      {/* Content Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Activity */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary-400" />
            Atividade Recente
          </h3>
          <div className="space-y-4">
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">Nenhuma atividade recente</p>
              <p className="text-gray-500 text-sm mt-1">As atividades aparecerão aqui quando os usuários começarem a interagir</p>
            </div>
          </div>
        </div>

        {/* Top Content */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            Conteúdo Popular
          </h3>
          <div className="space-y-4">
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">Nenhum conteúdo criado</p>
              <p className="text-gray-500 text-sm mt-1">Crie academias e cursos para ver as estatísticas aqui</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={() => window.location.href = '/admin/content'}
            className="p-4 bg-gray-800/50 hover:bg-gray-800 rounded-lg text-left transition-colors group"
          >
            <BookOpen className="w-5 h-5 text-primary-400 mb-2" />
            <p className="text-white font-medium mb-1">Criar Academia</p>
            <p className="text-gray-400 text-sm">Começar nova academia</p>
          </button>

          <button 
            onClick={() => window.location.href = '/admin/users'}
            className="p-4 bg-gray-800/50 hover:bg-gray-800 rounded-lg text-left transition-colors group"
          >
            <Users className="w-5 h-5 text-blue-400 mb-2" />
            <p className="text-white font-medium mb-1">Gerenciar Usuários</p>
            <p className="text-gray-400 text-sm">Ver todos os usuários</p>
          </button>

          <button 
            onClick={() => window.location.href = '/admin/analytics'}
            className="p-4 bg-gray-800/50 hover:bg-gray-800 rounded-lg text-left transition-colors group"
          >
            <BarChart3 className="w-5 h-5 text-green-400 mb-2" />
            <p className="text-white font-medium mb-1">Ver Relatórios</p>
            <p className="text-gray-400 text-sm">Analytics detalhados</p>
          </button>

          <button 
            onClick={() => window.location.href = '/admin/settings'}
            className="p-4 bg-gray-800/50 hover:bg-gray-800 rounded-lg text-left transition-colors group"
          >
            <TrendingUp className="w-5 h-5 text-yellow-400 mb-2" />
            <p className="text-white font-medium mb-1">Configurações</p>
            <p className="text-gray-400 text-sm">Ajustes da plataforma</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
