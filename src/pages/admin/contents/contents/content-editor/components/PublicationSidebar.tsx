import React, { useState } from "react";
import { Upload, X, Plus, Tag } from "lucide-react";

const PublicationSidebar: React.FC = () => {
    const [tags, setTags] = useState<string[]>(["negócios", "empreendedorismo"]);
    const [newTag, setNewTag] = useState("");

    const addTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            setTags([...tags, newTag.trim()]);
            setNewTag("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTag();
        }
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-800/50">
                <h3 className="text-sm font-medium text-gray-300">Publicação</h3>
            </div>

            {/* Conteúdo */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Capa */}
                <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">
                        Capa (10:16)
                    </label>
                    <div className="relative">
                        <div className="w-full aspect-[10/16] bg-gray-800/50 border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-600 transition-colors">
                            <div className="text-center">
                                <Upload className="w-6 h-6 text-gray-500 mx-auto mb-2" />
                                <p className="text-xs text-gray-500">
                                    Clique para adicionar capa
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tags */}
                <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">
                        Tags
                    </label>
                    <div className="space-y-2">
                        {/* Tags existentes */}
                        <div className="flex flex-wrap gap-1">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-1 px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md"
                                >
                                    <Tag className="w-3 h-3" />
                                    {tag}
                                    <button
                                        onClick={() => removeTag(tag)}
                                        className="ml-1 hover:text-red-400 transition-colors"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>

                        {/* Adicionar nova tag */}
                        <div className="flex gap-1">
                            <input
                                type="text"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Nova tag..."
                                className="flex-1 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs text-gray-300 placeholder-gray-500 focus:outline-none focus:border-gray-600"
                            />
                            <button
                                onClick={addTag}
                                className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs text-gray-300 transition-colors"
                            >
                                <Plus className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Status */}
                <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">
                        Status
                    </label>
                    <select className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs text-gray-300 focus:outline-none focus:border-gray-600">
                        <option value="draft">Rascunho</option>
                        <option value="published">Publicado</option>
                        <option value="archived">Arquivado</option>
                    </select>
                </div>

                {/* Botão Publicar */}
                <div className="pt-4 border-t border-gray-800/50">
                    <button className="w-full px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded transition-colors">
                        Publicar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PublicationSidebar;
