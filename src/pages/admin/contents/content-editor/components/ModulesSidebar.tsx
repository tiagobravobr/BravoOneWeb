import React, { useState } from 'react'
import { Plus, FileText, Video, ChevronDown, ChevronRight, PanelLeftClose, ArrowLeft } from 'lucide-react'

interface ModulesSidebarProps {
  collapsed: boolean
  onToggleCollapse: () => void
  onBack: () => void
}

const ModulesSidebar: React.FC<ModulesSidebarProps> = ({ collapsed, onToggleCollapse, onBack }) => {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(['module-1']))
  const [openAccordion, setOpenAccordion] = useState<'conteudo' | 'config' | null>('conteudo')

  const mockModules = [
    {
      id: 'module-1',
      title: 'Introdução',
      pages: [
        { id: 'page-1', title: 'Bem-vindo', type: 'text' },
        { id: 'page-2', title: 'Visão Geral', type: 'video' },
        { id: 'page-3', title: 'Objetivos do Curso', type: 'text' },
        { id: 'page-4', title: 'Metodologia', type: 'text' }
      ]
    },
    {
      id: 'module-2',
      title: 'Fundamentos',
      pages: [
        { id: 'page-5', title: 'Conceitos Básicos', type: 'text' },
        { id: 'page-6', title: 'Exercício Prático', type: 'text' },
        { id: 'page-7', title: 'Anatomia Humana', type: 'video' },
        { id: 'page-8', title: 'Fisiologia do Exercício', type: 'text' },
        { id: 'page-9', title: 'Biomecânica', type: 'video' }
      ]
    },
    {
      id: 'module-3',
      title: 'Treino de Força',
      pages: [
        { id: 'page-10', title: 'Princípios Básicos', type: 'text' },
        { id: 'page-11', title: 'Técnicas de Execução', type: 'video' },
        { id: 'page-12', title: 'Progressão de Cargas', type: 'text' },
        { id: 'page-13', title: 'Exercícios Compostos', type: 'video' },
        { id: 'page-14', title: 'Exercícios Isolados', type: 'video' },
        { id: 'page-15', title: 'Planejamento Semanal', type: 'text' }
      ]
    },
    {
      id: 'module-4',
      title: 'Treino Cardiovascular',
      pages: [
        { id: 'page-16', title: 'Tipos de Cardio', type: 'text' },
        { id: 'page-17', title: 'HIIT vs LISS', type: 'video' },
        { id: 'page-18', title: 'Frequência Cardíaca', type: 'text' },
        { id: 'page-19', title: 'Periodização Cardiovascular', type: 'text' }
      ]
    },
    {
      id: 'module-5',
      title: 'Nutrição Esportiva',
      pages: [
        { id: 'page-20', title: 'Macronutrientes', type: 'text' },
        { id: 'page-21', title: 'Micronutrientes', type: 'text' },
        { id: 'page-22', title: 'Hidratação', type: 'video' },
        { id: 'page-23', title: 'Suplementação', type: 'text' },
        { id: 'page-24', title: 'Timing Nutricional', type: 'video' },
        { id: 'page-25', title: 'Dieta para Hipertrofia', type: 'text' },
        { id: 'page-26', title: 'Dieta para Definição', type: 'text' }
      ]
    },
    {
      id: 'module-6',
      title: 'Recuperação e Descanso',
      pages: [
        { id: 'page-27', title: 'Importância do Sono', type: 'text' },
        { id: 'page-28', title: 'Técnicas de Relaxamento', type: 'video' },
        { id: 'page-29', title: 'Massagem e Automassagem', type: 'video' },
        { id: 'page-30', title: 'Gestão do Estresse', type: 'text' }
      ]
    },
    {
      id: 'module-7',
      title: 'Lesões e Prevenção',
      pages: [
        { id: 'page-31', title: 'Lesões Comuns', type: 'text' },
        { id: 'page-32', title: 'Aquecimento Dinâmico', type: 'video' },
        { id: 'page-33', title: 'Alongamento', type: 'video' },
        { id: 'page-34', title: 'Fortalecimento Preventivo', type: 'text' },
        { id: 'page-35', title: 'Quando Procurar Ajuda', type: 'text' }
      ]
    },
    {
      id: 'module-8',
      title: 'Psicologia do Esporte',
      pages: [
        { id: 'page-36', title: 'Motivação', type: 'text' },
        { id: 'page-37', title: 'Estabelecimento de Metas', type: 'video' },
        { id: 'page-38', title: 'Autoconfiança', type: 'text' },
        { id: 'page-39', title: 'Lidando com Fracassos', type: 'video' }
      ]
    },
    {
      id: 'module-9',
      title: 'Avaliação e Testes',
      pages: [
        { id: 'page-40', title: 'Avaliação Postural', type: 'text' },
        { id: 'page-41', title: 'Testes de Força', type: 'video' },
        { id: 'page-42', title: 'Testes de Flexibilidade', type: 'video' },
        { id: 'page-43', title: 'Composição Corporal', type: 'text' },
        { id: 'page-44', title: 'Acompanhamento de Progresso', type: 'text' }
      ]
    },
    {
      id: 'module-10',
      title: 'Conclusão e Certificação',
      pages: [
        { id: 'page-45', title: 'Revisão Geral', type: 'text' },
        { id: 'page-46', title: 'Prova Final', type: 'text' },
        { id: 'page-47', title: 'Certificado de Conclusão', type: 'text' },
        { id: 'page-48', title: 'Próximos Passos', type: 'video' }
      ]
    }
  ]

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules)
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId)
    } else {
      newExpanded.add(moduleId)
    }
    setExpandedModules(newExpanded)
  }

  const getPageIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4 text-blue-400" />
      default:
        return <FileText className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className={`${collapsed ? 'w-16' : 'w-80'} bg-gray-800/50 border-r border-gray-700 flex flex-col transition-all duration-300`}>
      {collapsed ? (
        /* Versão Colapsada - Apenas Favicon */
        <>
          <div className="p-4 border-b border-gray-700 flex flex-col items-center gap-4">
            <img
              src="/favicon.png"
              alt="Bravo One Favicon"
              className="w-6 h-6 cursor-pointer"
              onClick={onToggleCollapse}
              title="Expandir sidebar"
            />
            <button
              onClick={onToggleCollapse}
              className="p-2 hover:bg-gray-700 rounded"
              title="Expandir sidebar"
            >
              <PanelLeftClose className="w-4 h-4 text-gray-400 rotate-180" />
            </button>
          </div>
          
          {/* Rodapé: botão Voltar (versão colapsada) */}
          <div className="border-t border-gray-700 p-4 mt-auto">
            <button 
              onClick={onBack}
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-white text-sm w-full"
              title="Voltar"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-xs">Voltar</span>
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Logo e Controles */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="/bravo-logo-dark.svg"
                  alt="Bravo One"
                  className="w-28 h-auto cursor-pointer"
                  onClick={onToggleCollapse}
                  title="Fechar sidebar"
                />
              </div>
              <button
                onClick={onToggleCollapse}
                className="p-1 hover:bg-gray-700 rounded"
                title="Fechar sidebar"
              >
                <PanelLeftClose className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Accordion padrão - agora ocupa toda a altura disponível */}
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {/* Seção Conteúdo */}
            <button
              className={`w-full flex items-center justify-between px-4 py-2 text-left text-sm font-medium border-b border-gray-700 bg-gray-800/70 hover:bg-gray-700/30 transition ${openAccordion === 'conteudo' ? 'text-white' : 'text-gray-400'}`}
              onClick={() => setOpenAccordion(openAccordion === 'conteudo' ? null : 'conteudo')}
              aria-expanded={openAccordion === 'conteudo'}
            >
              Conteúdo
              {openAccordion === 'conteudo' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {openAccordion === 'conteudo' && (
              <div className="flex-1 min-h-0 overflow-y-auto bg-gray-900/80 rounded-b-md">
                <div className="px-4 py-2 space-y-2">
                  {mockModules.map((module) => (
                    <div key={module.id} className="space-y-1">
                      {/* Cabeçalho do Módulo */}
                      <div
                        className="flex items-center gap-2 p-2 hover:bg-gray-700/50 rounded cursor-pointer group"
                        onClick={() => toggleModule(module.id)}
                      >
                        {expandedModules.has(module.id) ? (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        )}
                        <span className="text-white font-medium flex-1">{module.title}</span>
                        <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-600 rounded">
                          <Plus className="w-3 h-3 text-gray-400" />
                        </button>
                      </div>
                      {/* Páginas do Módulo */}
                      {expandedModules.has(module.id) && (
                        <div className="ml-6 space-y-1">
                          {module.pages.map((page) => (
                            <div
                              key={page.id}
                              className="flex items-center gap-2 p-2 hover:bg-gray-700/30 rounded cursor-pointer group"
                            >
                              {getPageIcon(page.type)}
                              <span className="text-gray-300 text-sm flex-1">{page.title}</span>
                            </div>
                          ))}
                          {/* Botão Adicionar Página */}
                          <button className="flex items-center gap-2 p-2 text-gray-500 hover:text-gray-300 hover:bg-gray-700/30 rounded w-full text-left">
                            <Plus className="w-4 h-4" />
                            <span className="text-sm">Adicionar Página</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                  {/* Botão Adicionar Módulo */}
                  <button className="flex items-center gap-2 p-2 text-gray-500 hover:text-gray-300 hover:bg-gray-700/30 rounded w-full text-left mt-4">
                    <Plus className="w-4 h-4" />
                    <span className="text-sm font-medium">Adicionar Módulo</span>
                  </button>
                </div>
              </div>
            )}
            {/* Seção Configurações */}
            <button
              className={`w-full flex items-center justify-between px-4 py-2 text-left text-sm font-medium border-b border-gray-700 bg-gray-800/70 hover:bg-gray-700/30 transition ${openAccordion === 'config' ? 'text-white' : 'text-gray-400'}`}
              onClick={() => setOpenAccordion(openAccordion === 'config' ? null : 'config')}
              aria-expanded={openAccordion === 'config'}
            >
              Configurações
              {openAccordion === 'config' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {openAccordion === 'config' && (
              <div className="flex-1 min-h-0 overflow-y-auto bg-gray-900/80 rounded-b-md">
                <div className="px-4 py-2 space-y-4">
                  {/* Capa do Conteúdo */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-300">Capa do Conteúdo</label>
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center bg-gray-800/50">
                      <div className="w-full aspect-[10/16] max-w-24 mx-auto bg-gray-700/50 rounded flex items-center justify-center">
                        <span className="text-xs text-gray-500">10:16</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Clique para fazer upload</p>
                    </div>
                  </div>
                  {/* Academia */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-300">Academia</label>
                    <select className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500">
                      <option value="">Selecionar academia</option>
                      <option value="academia-1">Academia Central</option>
                      <option value="academia-2">Academia Norte</option>
                      <option value="academia-3">Academia Sul</option>
                    </select>
                  </div>
                  {/* Status */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-300">Status</label>
                    <select className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500">
                      <option value="draft">Rascunho</option>
                      <option value="published">Publicado</option>
                      <option value="archived">Arquivado</option>
                    </select>
                  </div>
                  {/* Tags */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-300">Tags</label>
                    <div className="flex flex-wrap gap-1 mb-2">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-600/20 text-blue-400 rounded text-xs">
                        Iniciante
                        <button className="hover:text-blue-300">×</button>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-600/20 text-green-400 rounded text-xs">
                        Musculação
                        <button className="hover:text-green-300">×</button>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-600/20 text-purple-400 rounded text-xs">
                        Treino A
                        <button className="hover:text-purple-300">×</button>
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder="Digite e pressione Enter"
                      className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  {/* Categoria */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-300">Categoria</label>
                    <select className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500">
                      <option value="">Selecionar categoria</option>
                      <option value="treino">Treino</option>
                      <option value="nutricao">Nutrição</option>
                      <option value="teoria">Teoria</option>
                      <option value="pratica">Prática</option>
                    </select>
                  </div>
                  {/* Dificuldade */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-300">Dificuldade</label>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 px-3 rounded text-xs bg-green-600/20 text-green-400 border border-green-600/30">
                        Fácil
                      </button>
                      <button className="flex-1 py-2 px-3 rounded text-xs bg-gray-700 text-gray-400 border border-gray-600 hover:bg-gray-600">
                        Médio
                      </button>
                      <button className="flex-1 py-2 px-3 rounded text-xs bg-gray-700 text-gray-400 border border-gray-600 hover:bg-gray-600">
                        Difícil
                      </button>
                    </div>
                  </div>
                  {/* Duração Estimada */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-300">Duração Estimada</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="45"
                        className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500"
                      />
                      <span className="flex items-center text-xs text-gray-500">minutos</span>
                    </div>
                  </div>
                  {/* Descrição */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-300">Descrição</label>
                    <textarea
                      rows={3}
                      placeholder="Breve descrição do conteúdo..."
                      className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>
                  {/* Pré-requisitos */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-300">Pré-requisitos</label>
                    <textarea
                      rows={2}
                      placeholder="Ex: Conhecimento básico de anatomia..."
                      className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Rodapé: botão Voltar */}
          <div className="border-t border-gray-700 p-4">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-gray-400 hover:text-white text-sm w-full"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default ModulesSidebar
