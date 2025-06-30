import { Users, BookOpen, BarChart3, TrendingUp } from 'lucide-react'

export default function AdminDashboard() {
    const stats = [
        { name: 'Total de Usuários', value: '2,847', icon: Users, color: 'text-blue-500' },
        { name: 'Cursos Ativos', value: '12', icon: BookOpen, color: 'text-green-500' },
        { name: 'Acessos Hoje', value: '1,235', icon: BarChart3, color: 'text-purple-500' },
        { name: 'Taxa de Conclusão', value: '87%', icon: TrendingUp, color: 'text-yellow-500' }
    ]

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-2">Dashboard Admin</h2>
                <p className="text-gray-400">Visão geral da plataforma</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded p-6 transition-all duration-200 hover:bg-gray-900/70">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">{stat.name}</p>
                                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                            </div>
                            <stat.icon className={`h-8 w-8 ${stat.color}`} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded">
                <div className="p-6 border-b border-gray-700">
                    <h3 className="text-lg font-semibold text-white">Atividade Recente</h3>
                </div>
                <div className="p-6">
                    <p className="text-gray-400">Dados de atividade serão exibidos aqui...</p>
                </div>
            </div>
        </div>
    )
}