import React from 'react'
import { LayoutPanelTop } from 'lucide-react'

const AcademyShowcase: React.FC = () => {
  return (
    <div className="bg-gray-900/30 border border-gray-800 rounded p-8">
      <div className="text-center py-12">
        <LayoutPanelTop className="w-16 h-16 text-gray-500 mx-auto mb-4" />
        <h4 className="text-lg font-medium text-white mb-2">Vitrine da Academia</h4>
        <p className="text-gray-400">
          Configure como sua academia será exibida na vitrine principal.
        </p>
      </div>
    </div>
  )
}

export default AcademyShowcase
