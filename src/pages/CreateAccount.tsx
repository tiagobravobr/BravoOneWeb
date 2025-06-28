import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function CreateAccount() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { signUp, user } = useAuth()
  const navigate = useNavigate()

  // Redirecionar se já estiver logado
  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    // Validações
    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      setIsLoading(false)
      return
    }

    if (!agreeTerms) {
      setError('Você deve aceitar os termos de uso')
      setIsLoading(false)
      return
    }

    try {
      const { error } = await signUp(email, password, {
        display_name: name,
      })
      
      if (error) {
        if (error.message.includes('already registered')) {
          setError('Este email já está cadastrado')
        } else {
          setError(error.message)
        }
      } else {
        setSuccess('Conta criada com sucesso! Verifique seu email para confirmar a conta.')
        // Opcionalmente redirecionar após alguns segundos
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      }
    } catch (err) {
      setError('Erro inesperado. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Lado esquerdo - Formulário */}
      <div className="flex-none w-full lg:w-2/5 bg-gray-900 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="min-h-full flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-20 xl:px-24">
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
                <h2 className="text-3xl font-bold text-white text-center font-serif">Criar Conta</h2>
                <p className="mt-2 text-base text-gray-400 text-center">
                  Junte-se à evolução do seu potencial
                </p>
              </div>

              {/* Formulário */}
              <form className="space-y-5" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-900/50 border border-red-700 rounded-lg p-3">
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                )}

                {success && (
                  <div className="bg-green-900/50 border border-green-700 rounded-lg p-3">
                    <p className="text-green-300 text-sm">{success}</p>
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block text-base font-medium text-gray-300 mb-2">
                    Como gostaria de ser chamado?
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-3 bg-gray-800 border border-gray-600 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base"
                    placeholder="Digite seu nome"
                  />
                </div>

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
                    className="appearance-none relative block w-full px-3 py-3 bg-gray-800 border border-gray-600 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base"
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
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-3 bg-gray-800 border border-gray-600 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base"
                    placeholder="Digite sua senha"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-base font-medium text-gray-300 mb-2">
                    Confirmar Senha
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-3 bg-gray-800 border border-gray-600 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base"
                    placeholder="Confirme sua senha"
                  />
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agree-terms"
                      name="agree-terms"
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 bg-gray-800 border-gray-600 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="agree-terms" className="text-gray-300">
                      Eu concordo com os{' '}
                      <a href="#" className="text-primary-400 hover:text-primary-300 transition-colors">
                        Termos de Serviço
                      </a>{' '}
                      e{' '}
                      <a href="#" className="text-primary-400 hover:text-primary-300 transition-colors">
                        Política de Privacidade
                      </a>
                    </label>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={!agreeTerms || isLoading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    {isLoading ? 'Criando conta...' : 'Criar Conta'}
                  </button>
                </div>
              </form>

              {/* Link para login */}
              <div className="mt-6 text-center">
                <p className="text-base text-gray-400">
                  Já tem uma conta?{' '}
                  <Link to="/login" className="font-medium text-primary-400 hover:text-primary-300 transition-colors">
                    Entrar
                  </Link>
                </p>
              </div>

              {/* Footer */}
              <div className="mt-8 text-center">
                <p className="text-xs text-gray-500">
                  © 2025 Bravo One. Todos os direitos reservados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lado direito - Imagem fixa */}
      <div className="hidden lg:block relative flex-1 lg:w-3/5 h-screen overflow-hidden">
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
  )
}
