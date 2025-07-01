import { CreditCard, Calendar, Check, Crown } from 'lucide-react'

const Subscriptions = () => {
  const currentPlan = {
    name: 'Plano Premium',
    price: 'R$ 49,90/mês',
    renewDate: '15/01/2025',
    status: 'Ativo',
    features: [
      'Acesso a todos os cursos',
      'Certificados ilimitados', 
      'Suporte prioritário',
      'Mentoria exclusiva',
      'Networking Premium'
    ]
  }

  const availablePlans = [
    {
      name: 'Básico',
      price: 'R$ 19,90/mês',
      description: 'Ideal para iniciantes',
      features: [
        'Acesso a cursos básicos',
        'Certificados limitados',
        'Suporte via email'
      ],
      current: false
    },
    {
      name: 'Premium',
      price: 'R$ 49,90/mês',
      description: 'Melhor custo-benefício',
      features: [
        'Acesso a todos os cursos',
        'Certificados ilimitados',
        'Suporte prioritário',
        'Mentoria exclusiva',
        'Networking Premium'
      ],
      current: true,
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'R$ 99,90/mês',
      description: 'Para empresas e times',
      features: [
        'Tudo do Premium',
        'Gestão de equipes',
        'Relatórios avançados',
        'API personalizada',
        'Consultoria dedicada'
      ],
      current: false
    }
  ]

  return (
    <div>
      {/* Plano Atual */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded p-6 mb-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{currentPlan.name}</h3>
              <p className="text-gray-400">{currentPlan.price}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              {currentPlan.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-white font-medium mb-3">Recursos inclusos:</h4>
            <ul className="space-y-2">
              {currentPlan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <Check className="w-4 h-4 text-green-400 mr-3" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-300">
              <Calendar className="w-4 h-4" />
              <span>Próxima cobrança: {currentPlan.renewDate}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <CreditCard className="w-4 h-4" />
              <span>Cartão terminado em ****1234</span>
            </div>
            <div className="flex gap-3 pt-2">
              <button className="btn btn-secondary text-sm">
                Alterar Plano
              </button>
              <button className="btn btn-danger text-sm">
                Cancelar Assinatura
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Planos Disponíveis */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-6">Outros Planos Disponíveis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {availablePlans.map((plan, index) => (
            <div key={index} className={`relative bg-gray-900/50 backdrop-blur-sm border rounded p-6 transition-all duration-200 hover:bg-gray-900/70 ${
              plan.current ? 'border-primary-500' : 'border-gray-800'
            }`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-600 text-white px-3 py-1 text-xs rounded-full">
                    Mais Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-4">
                <h4 className="text-lg font-semibold text-white mb-1">{plan.name}</h4>
                <p className="text-gray-400 text-sm mb-2">{plan.description}</p>
                <div className="text-2xl font-bold text-primary-400">{plan.price}</div>
              </div>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-300 text-sm">
                    <Check className="w-3 h-3 text-green-400 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-2 rounded transition-colors ${
                  plan.current 
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                    : 'bg-primary-600 hover:bg-primary-700 text-white'
                }`}
                disabled={plan.current}
              >
                {plan.current ? 'Plano Atual' : 'Selecionar Plano'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Histórico de Pagamentos */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Histórico de Pagamentos</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-700">
              <div>
                <p className="text-white">Plano Premium - Janeiro 2025</p>
                <p className="text-gray-400 text-sm">15/01/2025</p>
              </div>
              <div className="text-right">
                <p className="text-white">R$ 49,90</p>
                <span className="text-green-400 text-sm">Pago</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-700">
              <div>
                <p className="text-white">Plano Premium - Dezembro 2024</p>
                <p className="text-gray-400 text-sm">15/12/2024</p>
              </div>
              <div className="text-right">
                <p className="text-white">R$ 49,90</p>
                <span className="text-green-400 text-sm">Pago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Subscriptions
