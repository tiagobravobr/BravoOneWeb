import React, { useState } from "react";
import { List, Send, ChevronLeft, ChevronRight } from "lucide-react";
import TiptapContextEditor from "./TiptapContextEditor";
import ContentSidebar from "./ContentSidebar";
import PublicationSidebar from "./PublicationSidebar";

interface BlockEditorProps {
  isEditMode: boolean;
  onBack: () => void;
}

const BlockEditor: React.FC<BlockEditorProps> = ({ isEditMode, onBack }) => {
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);

  const toggleLeftPanel = () => setLeftPanelOpen(!leftPanelOpen);
  const toggleRightPanel = () => setRightPanelOpen(!rightPanelOpen);

  return (
    <div className="flex-1 overflow-hidden bg-gray-950 flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-800/50 bg-gray-950">
        {/* Lado esquerdo - Logo */}
        <div className="w-32 flex items-center">
          <button
            onClick={onBack}
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <img
              src="/bravo-logo-dark.svg"
              alt="Bravo One"
              className="h-4 w-auto"
              style={{ filter: "grayscale(1) brightness(0) invert(0.6)" }}
            />
          </button>
        </div>

        {/* Centro - Título centralizado */}
        <div className="flex-1 flex justify-center">
          <input
            type="text"
            defaultValue={isEditMode ? "Editar Conteúdo" : "Novo Conteúdo"}
            className="w-96 text-2xl font-bold text-white bg-transparent border-none outline-none text-center focus:ring-0 focus:border-none"
            placeholder="Digite o título do conteúdo..."
          />
        </div>

        {/* Lado direito - Botão fechar */}
        <div className="w-32 flex items-center justify-end">
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            × Fechar
          </button>
        </div>
      </div>

      {/* Container Principal - Layout centralizado */}
      <div className="flex-1 overflow-hidden bg-gray-950 flex justify-center items-start">
        <div className="flex h-full">
          {/* Panel Esquerdo - Conteúdo */}
          <div className="w-64 flex-shrink-0 transition-all duration-300 ease-in-out">
            <div
              className={`w-64 h-full bg-gray-950 ${leftPanelOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
            >
              <div className="p-4 border-b border-gray-800/50">
                <h3 className="text-sm font-medium text-gray-300">Conteúdo</h3>
              </div>
              <div className="overflow-y-auto h-full">
                <ContentSidebar />
              </div>
            </div>
          </div>

          {/* Botão para panel esquerdo - posicionado no topo */}
          <div className="w-12 flex-shrink-0 flex items-start justify-center pt-4">
            <button
              onClick={toggleLeftPanel}
              className="p-2 bg-gray-800/90 hover:bg-gray-700/90 text-gray-400 hover:text-white transition-all duration-200 rounded-md shadow-lg backdrop-blur-sm border border-gray-700/50"
              title={
                leftPanelOpen
                  ? "Fechar panel de conteúdo"
                  : "Abrir panel de conteúdo"
              }
            >
              {leftPanelOpen ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <List className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Editor Central */}
          <div className="w-[800px] flex-shrink-0 h-full overflow-y-auto bg-gray-950">
            <div className="max-w-4xl mx-auto p-4">
              {/* Blocos de Conteúdo */}
              <div className="space-y-4">
                <TiptapContextEditor placeholder="Comece a escrever seu conteúdo..." />
              </div>

              {/* Espaço extra para scroll */}
              <div className="h-32"></div>
            </div>
          </div>

          {/* Botão para panel direito - posicionado no topo */}
          <div className="w-12 flex-shrink-0 flex items-start justify-center pt-4">
            <button
              onClick={toggleRightPanel}
              className="p-2 bg-gray-800/90 hover:bg-gray-700/90 text-gray-400 hover:text-white transition-all duration-200 rounded-md shadow-lg backdrop-blur-sm border border-gray-700/50"
              title={
                rightPanelOpen
                  ? "Fechar panel de publicação"
                  : "Abrir panel de publicação"
              }
            >
              {rightPanelOpen ? (
                <ChevronLeft className="w-4 h-4" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Panel Direito - Publicação */}
          <div className="w-64 flex-shrink-0 transition-all duration-300 ease-in-out">
            <div
              className={`w-64 h-full bg-gray-950 ${rightPanelOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
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
