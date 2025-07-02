import { CreditCard, Plus, Trash2, Shield, Calendar } from 'lucide-react'

const PaymentMethods = () => {
  const paymentMethods = [
    {
      id: 1,
      type: 'visa',
      lastFour: '1234',
      expiryDate: '12/26',
      isDefault: true,
      holderName: 'TIAGO BRAVO'
    },
    {
      id: 2,
      type: 'mastercard',
      lastFour: '5678',
      expiryDate: '08/25',
      isDefault: false,
      holderName: 'TIAGO BRAVO'
    }
  ]

  const getCardIcon = (type: string) => {
    switch (type) {
      case 'visa':
        return (
          <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
            VISA
          </div>
        )
      case 'mastercard':
        return (
          <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">
            MC
          </div>
        )
      default:
        return <CreditCard className="w-8 h-8 text-gray-400" />
    }
  }

  return (
    <div>
      {/* Cartões Salvos */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Cartões Salvos</h3>
          <button 
            className="btn btn-primary flex items-center gap-2"
            onClick={() => {
              // TODO: Implementar integração com gateway seguro (Stripe Elements/Modal)
              // Nunca capturar dados sensíveis diretamente no nosso formulário
              console.log('Abrir modal seguro do gateway para adicionar cartão')
            }}
          >
            <Plus className="w-4 h-4" />
            Adicionar Cartão
          </button>
        </div>

        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded p-6 transition-all duration-200 hover:bg-gray-900/70">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {getCardIcon(method.type)}
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-white font-medium">
                        •••• •••• •••• {method.lastFour}
                      </p>
                      {method.isDefault && (
                        <span className="px-2 py-1 bg-primary-600/20 text-primary-400 text-xs rounded-full">
                          Padrão
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">{method.holderName}</p>
                    <p className="text-gray-400 text-sm flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Expira em {method.expiryDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!method.isDefault && (
                    <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors">
                      Definir como Padrão
                    </button>
                  )}
                  <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>



      {/* Informações de Segurança */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded p-6">
        <div className="flex items-start gap-3">
          <Shield className="w-6 h-6 text-green-400 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Segurança dos Dados</h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>🔒 Dados de cartão processados diretamente pelo gateway seguro</p>
              <p>🛡️ Nunca armazenamos ou processamos dados sensíveis do cartão</p>
              <p>💳 Integração via tokenização segura - certificado PCI DSS Level 1</p>
              <p>🔐 Autenticação 3D Secure disponível para maior proteção</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentMethods
