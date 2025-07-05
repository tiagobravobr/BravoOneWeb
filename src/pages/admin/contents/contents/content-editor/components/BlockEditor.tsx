import React, { useState } from "react";
import {
  ArrowLeft,
  FileText,
  Upload,
  PanelLeftClose,
  PanelRightClose,
} from "lucide-react";
import TiptapContextEditor from "./TiptapContextEditor";
import ContentSidebar from "./ContentSidebar";
import PublicationSidebar from "./PublicationSidebar";

interface BlockEditorProps {
  isEditMode: boolean;
  onBack: () => void;
}

const BlockEditor: React.FC<BlockEditorProps> = ({ isEditMode, onBack }) => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [collectionTitle, setCollectionTitle] = useState(
    isEditMode ? "Introdução ao Empreendedorismo" : "",
  );

  const toggleLeftSidebar = () => setLeftSidebarOpen(!leftSidebarOpen);
  const toggleRightSidebar = () => setRightSidebarOpen(!rightSidebarOpen);

  return (
    <div className="flex-1 overflow-hidden bg-gray-950 flex flex-col">
      {/* Header com botão Voltar e título da coleção centralizado */}
      <div className="border-b border-gray-800 p-4 bg-gray-950">
        <div className="flex items-center justify-between">
          {/* Botão Voltar à esquerda */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>

          {/* Título centralizado */}
          <div className="flex-1 flex justify-center px-4">
            <input
              type="text"
              value={collectionTitle}
              onChange={(e) => setCollectionTitle(e.target.value)}
              className="bg-transparent border-none outline-none text-lg font-semibold text-white placeholder-gray-500 text-center max-w-md w-full"
              placeholder="Nome da Coleção"
            />
          </div>

          {/* Espaçador à direita para manter o título centralizado */}
          <div className="flex-shrink-0 w-16"></div>
        </div>
      </div>

      {/* Container Principal - Layout centralizado */}
      <div className="flex-1 overflow-hidden bg-gray-950 flex justify-center items-start">
        <div className="flex h-full">
          {/* Sidebar Esquerda - Conteúdo */}
          <div className="w-64 flex-shrink-0 transition-all duration-300 ease-in-out">
            <div
              className={`w-64 h-full bg-gray-950 border-r border-gray-800/50 ${leftSidebarOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
            >
              <div className="p-4 border-b border-gray-800/50">
                <h3 className="text-sm font-medium text-gray-300">Conteúdo</h3>
              </div>
              <div className="overflow-y-auto h-full">
                <ContentSidebar />
              </div>
            </div>
          </div>

          {/* Ícone para sidebar esquerda */}
          <div className="w-12 flex-shrink-0 flex items-center justify-center">
            <button
              onClick={toggleLeftSidebar}
              className="p-2 bg-gray-800/90 hover:bg-gray-700/90 text-gray-400 hover:text-white transition-all duration-200 rounded-md shadow-lg backdrop-blur-sm border border-gray-700/50"
              title={
                leftSidebarOpen
                  ? "Fechar sidebar de conteúdo"
                  : "Abrir sidebar de conteúdo"
              }
            >
              {leftSidebarOpen ? (
                <PanelLeftClose className="w-4 h-4" />
              ) : (
                <FileText className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Editor Central */}
          <div className="w-[800px] flex-shrink-0 h-full overflow-y-auto bg-gray-950">
            <div className="max-w-4xl mx-auto p-8">
              {/* Blocos de Conteúdo */}
              <div className="space-y-4">
                <TiptapContextEditor placeholder="Comece a escrever seu conteúdo..." />
              </div>

              {/* Espaço extra para scroll */}
              <div className="h-32"></div>
            </div>
          </div>

          {/* Ícone para sidebar direita */}
          <div className="w-12 flex-shrink-0 flex items-center justify-center">
            <button
              onClick={toggleRightSidebar}
              className="p-2 bg-gray-800/90 hover:bg-gray-700/90 text-gray-400 hover:text-white transition-all duration-200 rounded-md shadow-lg backdrop-blur-sm border border-gray-700/50"
              title={
                rightSidebarOpen
                  ? "Fechar sidebar de publicação"
                  : "Abrir sidebar de publicação"
              }
            >
              {rightSidebarOpen ? (
                <PanelRightClose className="w-4 h-4" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Sidebar Direita - Publicação */}
          <div className="w-64 flex-shrink-0 transition-all duration-300 ease-in-out">
            <div
              className={`w-64 h-full bg-gray-950 border-l border-gray-800/50 ${rightSidebarOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
            >
              <PublicationSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockEditor;
