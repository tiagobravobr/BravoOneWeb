import React from 'react'
import { LayoutPanelTop, BarChart3 } from 'lucide-react'

interface AcademyOverviewProps {
  totalContents?: number
  avgProgress?: string
  activeStudents?: number
}

const AcademyOverview: React.FC<AcademyOverviewProps> = ({
  totalContents = 0,
  avgProgress = '0%',
  activeStudents = 0
}) => {
  return (
    <div className="bg-gray-900/30 border border-gray-800 rounded p-8">
      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <LayoutPanelTop className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total de Conteúdos</p>
            <p className="text-2xl font-bold text-white">{totalContents}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <BarChart3 className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Progresso Médio</p>
            <p className="text-2xl font-bold text-white">{avgProgress}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary-500/20 rounded-lg">
            <BarChart3 className="w-5 h-5 text-primary-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Alunos Ativos</p>
            <p className="text-2xl font-bold text-white">{activeStudents}</p>
          </div>
        </div>
      </div>

      {/* Configurações da academia */}
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
  )
}

export default AcademyOverview
