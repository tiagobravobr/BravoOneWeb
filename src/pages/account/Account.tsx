import { useLocation, useNavigate, Outlet } from 'react-router-dom'
import { User, CreditCard, ShoppingBag, Settings as SettingsIcon, Crown } from 'lucide-react'

const Account = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User, path: '/account/profile' },
    { id: 'subscriptions', label: 'Assinaturas', icon: Crown, path: '/account/subscriptions' },
    { id: 'purchases', label: 'Compras', icon: ShoppingBag, path: '/account/purchases' },
    { id: 'payment', label: 'Métodos de Pagamento', icon: CreditCard, path: '/account/payment' },
    { id: 'settings', label: 'Configurações', icon: SettingsIcon, path: '/account/settings' },
  ]

  const isActiveTab = (path: string) => {
    return location.pathname === path
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cabeçalho */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Minha Conta</h1>
        <p className="text-gray-400">Gerencie seu perfil, assinaturas e configurações</p>
      </div>

      {/* Navegação por abas */}
      <div className="mb-8">
        <div className="border-b border-gray-700">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className={`flex items-center gap-2 px-1 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  isActiveTab(tab.path)
                    ? 'border-primary-500 text-primary-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Conteúdo da aba ativa */}
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Account
