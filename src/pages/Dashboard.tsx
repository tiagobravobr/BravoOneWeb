import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-indigo-400">Dashboard - Bravo One</h1>
            <button
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Sair
            </button>
          </div>

          <div className="bg-gray-700 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-indigo-300">Informações do Usuário</h2>
            <div className="space-y-2">
              <p><span className="font-medium text-gray-300">Email:</span> {user?.email}</p>
              <p><span className="font-medium text-gray-300">ID:</span> {user?.id}</p>
              <p><span className="font-medium text-gray-300">Última conexão:</span> {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString('pt-BR') : 'N/A'}</p>
              <p><span className="font-medium text-gray-300">Criado em:</span> {user?.created_at ? new Date(user.created_at).toLocaleString('pt-BR') : 'N/A'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-indigo-600 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Bem-vindo!</h3>
              <p className="text-indigo-100">Você está autenticado com sucesso</p>
            </div>
            
            <div className="bg-green-600 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Status</h3>
              <p className="text-green-100">Sistema Online</p>
            </div>
            
            <div className="bg-purple-600 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Supabase</h3>
              <p className="text-purple-100">Conectado</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
