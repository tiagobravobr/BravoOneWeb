import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      // Aqui você pode adicionar a lógica de reset de senha
      console.log('Reset password for:', email)
      
      // Simular envio de email
      setTimeout(() => {
        setEmailSent(true)
        setIsLoading(false)
      }, 2000)
    } catch (err) {
      setError('Erro inesperado. Tente novamente.')
      setIsLoading(false)
    }
  }

  if (emailSent) {
    return (
      <div className="min-h-screen flex">
        {/* Lado esquerdo - Confirmação */}
        <div className="flex-none w-full lg:w-2/5 bg-gray-900 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <div className="min-h-full flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
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
                  <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 mb-4">
                      <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-white text-center font-serif">E-mail Enviado</h2>
                    <p className="mt-2 text-base text-gray-400 text-center">
                      Enviamos um link de recuperação para <strong className="text-white">{email}</strong>
                    </p>
                  </div>
                </div>

                {/* Instruções */}
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-300">
                    Verifique sua caixa de entrada e clique no link para redefinir sua senha. 
                    O link expira em 24 horas.
                  </p>
                </div>

                {/* Botão voltar */}
                <div>
                  <Link
                    to="/login"
                    className="btn btn-primary w-full"
                  >
                    Voltar ao login
                  </Link>
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

  return (
    <div className="min-h-screen flex">
      {/* Lado esquerdo - Formulário */}
      <div className="flex-none w-full lg:w-2/5 bg-gray-900 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="min-h-full flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
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
                <h2 className="text-3xl font-bold text-white text-center font-serif">Esqueceu a Senha?</h2>
                <p className="mt-2 text-base text-gray-400 text-center">
                  Digite seu e-mail e enviaremos um link de recuperação
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
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary w-full"
                  >
                    {isLoading ? 'Enviando...' : 'Enviar Link de Recuperação'}
                  </button>
                </div>
              </form>

              {/* Link para voltar ao login */}
              <div className="mt-6 text-center">
                <p className="text-base text-gray-400">
                  Lembrou da senha?{' '}
                  <Link to="/login" className="font-medium text-primary-400 hover:text-primary-300 transition-colors">
                    Voltar ao login
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
