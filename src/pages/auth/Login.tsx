import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { AuthLayout } from '../../components/layouts'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { signIn, user } = useAuth()
  const navigate = useNavigate()

  // Redirecionar se já estiver logado
  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = await signIn(email, password)
      
      if (error) {
        setError(error.message === 'Invalid login credentials' 
          ? 'Email ou senha incorretos' 
          : error.message)
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      setError('Erro inesperado. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="min-h-dvh flex">
      {/* Lado esquerdo - Formulário */}
      <div className="flex-none w-full lg:w-2/5 bg-gray-900 flex flex-col">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
              {/* Logo e título */}
              <div className="mb-8">
                <div className="flex justify-center mb-8">
                  <img
                    src="/bravo-logo-dark.svg"
                    alt="Bravo One"
                    className="h-8 w-auto"
                  />
                </div>
                <h2 className="text-3xl font-bold text-white text-center font-serif">Bem-vindo de volta</h2>
                <p className="mt-2 text-base text-gray-400 text-center">
                  Entre em sua conta para continuar
                </p>
              </div>

              {/* Formulário */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-900/50 border border-red-700 rounded-lg p-3">
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                )}
                
                <div>
                  <label htmlFor="email" className="block text-base font-medium text-gray-300 mb-2">
                    E-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    placeholder="Digite seu e-mail"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-base font-medium text-gray-300 mb-2">
                    Senha
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    placeholder="Digite sua senha"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="form-checkbox"
                    />
                    <label htmlFor="remember-me" className="ml-2 text-base text-gray-300">
                      Lembrar-me
                    </label>
                  </div>

                  <div className="text-base">
                    <Link to="/forgot-password" className="font-medium text-primary-400 hover:text-primary-300 transition-colors">
                      Esqueceu a senha?
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full flex justify-center transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Entrando...
                      </div>
                    ) : (
                      'Entrar'
                    )}
                  </button>
                </div>
              </form>

              {/* Link para cadastro */}
              <div className="mt-6 text-center">
                <p className="text-base text-gray-400">
                  Não tem uma conta?{' '}
                  <Link to="/create-account" className="font-medium text-primary-400 hover:text-primary-300 transition-colors">
                    Criar conta
                  </Link>
                </p>
              </div>

              {/* Footer */}
              <div className="mt-12 text-center">
                <p className="text-xs text-gray-500">
                  © 2025 Bravo One. Todos os direitos reservados.
                </p>
              </div>
            </div>
          </div>
        </div>

      {/* Lado direito - Imagem fixa */}
      <div className="hidden lg:block relative flex-1 lg:w-3/5 h-dvh overflow-hidden">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1492366254240-43affaefc3e3?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Equipe em ação"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-12">
          <blockquote className="text-white">
            <p className="text-xl font-medium leading-relaxed font-serif">
              A evolução começa quando você escolhe liderar.
            </p>
            <footer className="mt-4">
              <p className="text-base font-medium font-serif">Bravo One</p>
            </footer>
          </blockquote>
        </div>
      </div>
      </div>
    </AuthLayout>
  )
}
