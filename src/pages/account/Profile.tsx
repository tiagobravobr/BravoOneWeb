import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react'

const Profile = () => {
  return (
    <div>
      {/* Foto e Info Principal */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded p-6 mb-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">Tiago Bravo</h3>
            <p className="text-gray-400 mb-2">Empreendedor</p>
            <button className="text-primary-400 hover:text-primary-300 text-sm transition-colors">
              Alterar foto do perfil
            </button>
          </div>
        </div>
      </div>

      {/* Informações Pessoais */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Informações Pessoais</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email
            </label>
            <input
              type="email"
              value="tiago@bravoone.com"
              className="form-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Telefone
            </label>
            <input
              type="tel"
              value="+55 (11) 99999-9999"
              className="form-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Data de Nascimento
            </label>
            <input
              type="date"
              value="1990-01-15"
              className="form-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              Localização
            </label>
            <input
              type="text"
              value="São Paulo, SP"
              className="form-input"
            />
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="flex gap-4">
            <button className="btn btn-primary">
              Salvar Alterações
            </button>
            <button className="btn btn-secondary">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
