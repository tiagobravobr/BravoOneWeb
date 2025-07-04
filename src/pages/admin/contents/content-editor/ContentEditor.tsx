import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ModulesSidebar from './components/ModulesSidebar'
import BlockEditor from './components/BlockEditor'
import SettingsSidebar from './components/SettingsSidebar'

const ContentEditor: React.FC = () => {
  const navigate = useNavigate()
  const { academyId, contentId } = useParams()
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false)
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(false)
  
  const isEditMode = !!contentId
  
  const handleBack = () => {
    navigate(`/admin/contents/${academyId}/content`)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar Esquerda - Módulos e Páginas */}
      <ModulesSidebar 
        collapsed={leftSidebarCollapsed}
        onToggleCollapse={() => setLeftSidebarCollapsed(!leftSidebarCollapsed)}
        onBack={handleBack}
      />
      
      {/* Editor Central - Estilo Notion */}
      <div className="flex-1 flex flex-col">
        <BlockEditor isEditMode={isEditMode} />
      </div>
      
      {/* Sidebar Direita - Configurações */}
      <SettingsSidebar 
        academyId={academyId}
        collapsed={rightSidebarCollapsed}
        onToggleCollapse={() => setRightSidebarCollapsed(!rightSidebarCollapsed)}
      />
    </div>
  )
}

export default ContentEditor
