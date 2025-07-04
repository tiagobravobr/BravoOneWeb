import React from 'react'
import { Settings, Eye, Users, Lock } from 'lucide-react'

const AcademySettings: React.FC = () => {
  return (
    <div className="bg-gray-900/30 border border-gray-800 rounded p-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Configurações da Academia
        </h3>
        <p className="text-gray-400">
          Configure as preferências e configurações desta academia
        </p>
      </div>

      <div className="space-y-6">
        {/* Configurações de Visibilidade */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Visibilidade</h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-white font-medium">Academia Pública</p>
                  <p className="text-sm text-gray-400">Qualquer pessoa pode ver e acessar esta academia</p>
                </div>
              </div>
              <input type="radio" name="visibility" defaultChecked className="text-primary-500" />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-white font-medium">Somente Convidados</p>
                  <p className="text-sm text-gray-400">Apenas usuários convidados podem acessar</p>
                </div>
              </div>
              <input type="radio" name="visibility" className="text-primary-500" />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-white font-medium">Academia Privada</p>
                  <p className="text-sm text-gray-400">Apenas você pode ver e editar esta academia</p>
                </div>
              </div>
              <input type="radio" name="visibility" className="text-primary-500" />
            </div>
          </div>
        </div>

        {/* Configurações Gerais */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Configurações Gerais</h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700">
              <div>
                <p className="text-white font-medium">Permitir Comentários</p>
                <p className="text-sm text-gray-400">Usuários podem comentar nos conteúdos</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700">
              <div>
                <p className="text-white font-medium">Certificados Automáticos</p>
                <p className="text-sm text-gray-400">Gerar certificados ao concluir a academia</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700">
              <div>
                <p className="text-white font-medium">Notificações de Progresso</p>
                <p className="text-sm text-gray-400">Enviar e-mails sobre progresso dos alunos</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-3 pt-6 border-t border-gray-700">
          <button className="btn btn-primary btn-lg">
            Salvar Configurações
          </button>
          <button className="btn btn-secondary btn-lg">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default AcademySettings
