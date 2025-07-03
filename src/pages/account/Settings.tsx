import { Bell, Lock, Eye, Shield, Smartphone, Globe, Moon, Sun } from 'lucide-react'

const Settings = () => {
  return (
    <div>
      <div className="space-y-8">
        {/* Notificações */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-primary-400" />
            <h3 className="text-lg font-semibold text-white">Notificações</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Email de novos cursos</p>
                <p className="text-gray-400 text-sm">Receba notificações sobre novos lançamentos</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Lembretes de aulas</p>
                <p className="text-gray-400 text-sm">Notificações para continuar seus estudos</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Promoções e ofertas</p>
                <p className="text-gray-400 text-sm">Receba ofertas especiais e descontos</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Push notifications</p>
                <p className="text-gray-400 text-sm">Notificações no navegador e mobile</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Privacidade e Segurança */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-primary-400" />
            <h3 className="text-lg font-semibold text-white">Privacidade e Segurança</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-white font-medium">Alterar senha</p>
                  <p className="text-gray-400 text-sm">Última alteração: há 3 meses</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors text-sm">
                Alterar
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-white font-medium">Autenticação em duas etapas</p>
                  <p className="text-gray-400 text-sm">Adicione uma camada extra de segurança</p>
                </div>
              </div>
              <button className="btn btn-primary text-sm">
                Ativar
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Eye className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-white font-medium">Sessões ativas</p>
                  <p className="text-gray-400 text-sm">Gerencie dispositivos conectados</p>
                </div>
              </div>
              <button className="btn btn-secondary btn-sm">
                Ver Sessões
              </button>
            </div>
          </div>
        </div>

        {/* Preferências de Interface */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded p-6">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-primary-400" />
            <h3 className="text-lg font-semibold text-white">Preferências de Interface</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Idioma</label>
              <select className="form-select md:w-auto">
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">English (US)</option>
                <option value="es-ES">Español</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Tema</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="theme" value="dark" className="form-radio" defaultChecked />
                  <Moon className="w-4 h-4 text-gray-400" />
                  <span className="text-white">Escuro</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="theme" value="light" className="form-radio" />
                  <Sun className="w-4 h-4 text-gray-400" />
                  <span className="text-white">Claro</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Velocidade de reprodução padrão</label>
              <select className="form-select md:w-auto">
                <option value="0.75">0.75x</option>
                <option value="1" selected>1x (Normal)</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Autoplay próximo vídeo</p>
                <p className="text-gray-400 text-sm">Reproduzir automaticamente o próximo conteúdo</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Dados e Privacidade */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-primary-400" />
            <h3 className="text-lg font-semibold text-white">Dados e Privacidade</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Baixar meus dados</p>
                <p className="text-gray-400 text-sm">Exportar todas as suas informações</p>
              </div>
              <button className="btn btn-secondary btn-sm">
                Solicitar
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Deletar conta</p>
                <p className="text-gray-400 text-sm">Remover permanentemente sua conta</p>
              </div>
              <button className="btn btn-danger btn-sm">
                Deletar
              </button>
            </div>
          </div>
        </div>

        {/* Botão Salvar */}
        <div className="flex justify-end">
          <button className="btn btn-primary">
            Salvar Configurações
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
