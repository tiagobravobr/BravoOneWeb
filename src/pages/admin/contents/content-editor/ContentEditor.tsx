import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ModulesSidebar from './components/ModulesSidebar'
import BlockEditor from './components/BlockEditor'

const ContentEditor: React.FC = () => {
  const navigate = useNavigate()
  const { contentId } = useParams()
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false)
  
  const isEditMode = !!contentId
  
  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1)
    } else {
      navigate('/admin/contents')
    }
  }

  return (
    <div className="h-screen bg-gray-900 flex overflow-hidden">
      {/* Sidebar Esquerda - Módulos e Páginas */}
      <ModulesSidebar 
        collapsed={leftSidebarCollapsed}
        onToggleCollapse={() => setLeftSidebarCollapsed(!leftSidebarCollapsed)}
        onBack={handleBack}
      />
      
      {/* Editor Central - Estilo Notion */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <BlockEditor isEditMode={isEditMode} />
      </div>
    </div>
  )
}

export default ContentEditor
