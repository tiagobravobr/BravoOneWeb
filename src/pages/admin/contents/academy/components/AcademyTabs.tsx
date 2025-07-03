import React from 'react'

interface Tab {
  id: string
  label: string
  icon: React.ElementType
}

interface AcademyTabsProps {
  tabs: Tab[]
  activeTab: string
  setActiveTab: (tab: string) => void
  academy: { id: string } | null
}

const AcademyTabs: React.FC<AcademyTabsProps> = ({
  tabs,
  activeTab,
  setActiveTab,
  academy
}) => {
  // Só renderiza se há uma academia carregada
  if (!academy) return null

  return (
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
  )
}

export default AcademyTabs
