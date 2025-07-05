import React, { useState } from "react";
import { Plus, FileText, Video, ChevronDown, ChevronRight } from "lucide-react";

const ContentSidebar: React.FC = () => {
    const [expandedModules, setExpandedModules] = useState<Set<string>>(
        new Set(["module-1"]),
    );

    const mockModules = [
        {
            id: "module-1",
            title: "Introdução",
            pages: [
                { id: "page-1", title: "Bem-vindo", type: "text" },
                { id: "page-2", title: "Visão Geral", type: "video" },
                { id: "page-3", title: "Objetivos do Curso", type: "text" },
                { id: "page-4", title: "Metodologia", type: "text" },
            ],
        },
        {
            id: "module-2",
            title: "Fundamentos",
            pages: [
                { id: "page-5", title: "Conceitos Básicos", type: "text" },
                { id: "page-6", title: "Exercício Prático", type: "text" },
                { id: "page-7", title: "Anatomia Humana", type: "video" },
                { id: "page-8", title: "Fisiologia do Exercício", type: "text" },
                { id: "page-9", title: "Biomecânica", type: "video" },
            ],
        },
        {
            id: "module-3",
            title: "Treino de Força",
            pages: [
                { id: "page-10", title: "Princípios Básicos", type: "text" },
                { id: "page-11", title: "Técnicas de Execução", type: "video" },
                { id: "page-12", title: "Progressão de Cargas", type: "text" },
                { id: "page-13", title: "Exercícios Compostos", type: "video" },
                { id: "page-14", title: "Exercícios Isolados", type: "video" },
                { id: "page-15", title: "Planejamento Semanal", type: "text" },
            ],
        },
        {
            id: "module-4",
            title: "Treino Cardiovascular",
            pages: [
                { id: "page-16", title: "Tipos de Cardio", type: "text" },
                { id: "page-17", title: "HIIT vs LISS", type: "video" },
                { id: "page-18", title: "Frequência Cardíaca", type: "text" },
                { id: "page-19", title: "Periodização Cardiovascular", type: "text" },
            ],
        },
        {
            id: "module-5",
            title: "Nutrição Esportiva",
            pages: [
                { id: "page-20", title: "Macronutrientes", type: "text" },
                { id: "page-21", title: "Micronutrientes", type: "text" },
                { id: "page-22", title: "Hidratação", type: "video" },
                { id: "page-23", title: "Suplementação", type: "text" },
                { id: "page-24", title: "Timing Nutricional", type: "video" },
                { id: "page-25", title: "Dieta para Hipertrofia", type: "text" },
                { id: "page-26", title: "Dieta para Definição", type: "text" },
            ],
        },
    ];

    const toggleModule = (moduleId: string) => {
        const newExpanded = new Set(expandedModules);
        if (newExpanded.has(moduleId)) {
            newExpanded.delete(moduleId);
        } else {
            newExpanded.add(moduleId);
        }
        setExpandedModules(newExpanded);
    };

    const getPageIcon = (type: string) => {
        switch (type) {
            case "video":
                return <Video className="w-3 h-3 text-blue-400 flex-shrink-0" />;
            default:
                return <FileText className="w-3 h-3 text-gray-400 flex-shrink-0" />;
        }
    };

    return (
        <div className="p-4">
            <div className="space-y-1">
                {mockModules.map((module) => (
                    <div key={module.id} className="space-y-0.5">
                        {/* Cabeçalho do Módulo - Minimalista */}
                        <div
                            className="flex items-center gap-2 py-1 cursor-pointer group text-sm min-w-0"
                            onClick={() => toggleModule(module.id)}
                        >
                            {expandedModules.has(module.id) ? (
                                <ChevronDown className="w-3 h-3 text-gray-500 flex-shrink-0" />
                            ) : (
                                <ChevronRight className="w-3 h-3 text-gray-500 flex-shrink-0" />
                            )}
                            <span className="text-gray-300 font-medium hover:text-white transition-colors truncate min-w-0">
                                {module.title}
                            </span>
                            <button className="opacity-0 group-hover:opacity-100 ml-auto flex-shrink-0">
                                <Plus className="w-3 h-3 text-gray-500 hover:text-gray-400" />
                            </button>
                        </div>

                        {/* Páginas do Módulo - Minimalista */}
                        {expandedModules.has(module.id) && (
                            <div className="ml-5 space-y-0.5">
                                {module.pages.map((page) => (
                                    <div
                                        key={page.id}
                                        className="flex items-center gap-2 py-1 cursor-pointer group text-sm hover:text-white transition-colors min-w-0"
                                    >
                                        {getPageIcon(page.type)}
                                        <span className="text-gray-400 hover:text-gray-300 truncate min-w-0">
                                            {page.title}
                                        </span>
                                    </div>
                                ))}
                                {/* Botão Adicionar Página - Minimalista */}
                                <button className="flex items-center gap-2 py-1 text-xs text-gray-500 hover:text-gray-400 transition-colors">
                                    <Plus className="w-3 h-3 flex-shrink-0" />
                                    <span className="truncate">Adicionar Página</span>
                                </button>
                            </div>
                        )}
                    </div>
                ))}

                {/* Botão Adicionar Módulo - Minimalista */}
                <button className="flex items-center gap-2 py-1 text-xs text-gray-500 hover:text-gray-400 transition-colors border-t border-gray-800/50 pt-2 mt-2">
                    <Plus className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">Adicionar Módulo</span>
                </button>
            </div>
        </div>
    );
};

export default ContentSidebar;
