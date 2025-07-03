import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EditorHeader from './components/EditorHeader'
import ModulesSidebar from './components/ModulesSidebar'
import BlockEditor from './components/BlockEditor'
import SettingsSidebar from './components/SettingsSidebar'
import EditorFooter from './components/EditorFooter'

const ContentEditor: React.FC = () => {
  const navigate = useNavigate()
  const { academyId, contentId } = useParams()
  
  const isEditMode = !!contentId
  
  const handleBack = () => {
    navigate(`/admin/contents/${academyId}/content`)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header Minimalista */}
      <EditorHeader onBack={handleBack} />
      
      {/* Conteúdo Principal */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Esquerda - Módulos e Páginas */}
        <ModulesSidebar />
        
        {/* Editor Central - Estilo Notion */}
        <div className="flex-1 flex flex-col">
          <BlockEditor isEditMode={isEditMode} />
        </div>
        
        {/* Sidebar Direita - Configurações */}
        <SettingsSidebar />
      </div>
      
      {/* Footer */}
      <EditorFooter />
    </div>
  )
}

export default ContentEditor
