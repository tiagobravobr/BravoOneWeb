import React from 'react'
import EditorHeader from './components/EditorHeader'
import EditorSidebar from './components/EditorSidebar'
import BlockEditor from './components/BlockEditor'
import SettingsSidebar from './components/SettingsSidebar'
import EditorFooter from './components/EditorFooter'

const ContentEditor: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <EditorHeader />
      
      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Sidebar - Modules */}
        <EditorSidebar />
        
        {/* Center - Block Editor */}
        <BlockEditor />
        
        {/* Right Sidebar - Settings */}
        <SettingsSidebar />
      </div>
      
      {/* Footer */}
      <EditorFooter />
    </div>
  )
}

export default ContentEditor
