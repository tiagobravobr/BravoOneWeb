import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BlockEditor from './components/BlockEditor'

const ContentEditor: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const isEditMode = !!id

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1)
    } else {
      navigate('/admin/contents')
    }
  }

  return (
    <div className="h-screen bg-gray-900 flex overflow-hidden">
      {/* Editor Central com Navegação Integrada */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <BlockEditor isEditMode={isEditMode} onBack={handleBack} />
      </div>
    </div>
  )
}

export default ContentEditor
