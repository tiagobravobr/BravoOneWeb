import { useState } from 'react'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [passwordReset, setPasswordReset] = useState(false)

  const getPasswordStrength = (password: string) => {
    if (password.length < 6) return { strength: 'weak', color: 'bg-red-500', text: 'Fraca' }
    if (password.length < 8) return { strength: 'medium', color: 'bg-yellow-500', text: 'Média' }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) return { strength: 'medium', color: 'bg-yellow-500', text: 'Média' }
    return { strength: 'strong', color: 'bg-green-500', text: 'Forte' }
  }

  const passwordStrength = getPasswordStrength(password)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) return
    
    setIsLoading(true)
    
    // Aqui você pode adicionar a lógica de redefinição de senha
    console.log('Password reset:', { password })
    
    // Simular redefinição de senha
    setTimeout(() => {
      setIsLoading(false)
      setPasswordReset(true)
    }, 2000)
  }

  if (passwordReset) {
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
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                      <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-white text-center font-serif">Senha Redefinida</h2>
                    <p className="mt-2 text-base text-gray-400 text-center">
                      Sua senha foi alterada com sucesso
                    </p>
                  </div>
                </div>

                {/* Botão de login */}
                <div>
                  <a
                    href="/login"
                    className="btn btn-primary w-full"
                  >
                    Fazer Login
                  </a>
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

        {/* Lado direito - Imagem */}
        <div className="hidden lg:block relative flex-1 lg:w-3/5 overflow-hidden">
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
                <h2 className="text-3xl font-bold text-white text-center font-serif">Nova Senha</h2>
                <p className="mt-2 text-base text-gray-400 text-center">
                  Defina uma nova senha segura para sua conta
                </p>
              </div>

              {/* Formulário */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="password" className="block text-base font-medium text-gray-300 mb-2">
                    Nova Senha
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    placeholder="Digite sua nova senha"
                  />
                  {password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Força da senha:</span>
                        <span className={`font-medium ${
                          passwordStrength.strength === 'weak' ? 'text-red-400' :
                          passwordStrength.strength === 'medium' ? 'text-yellow-400' : 'text-green-400'
                        }`}>
                          {passwordStrength.text}
                        </span>
                      </div>
                      <div className="mt-1 w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                          style={{
                            width: passwordStrength.strength === 'weak' ? '33%' :
                                   passwordStrength.strength === 'medium' ? '66%' : '100%'
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-base font-medium text-gray-300 mb-2">
                    Confirmar Nova Senha
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-input"
                    placeholder="Confirme sua nova senha"
                  />
                  {confirmPassword && password !== confirmPassword && (
                    <p className="mt-2 text-sm text-red-400">As senhas não coincidem</p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading || !password || !confirmPassword || password !== confirmPassword}
                    className="btn btn-primary w-full"
                  >
                    {isLoading ? 'Redefinindo...' : 'Redefinir Senha'}
                  </button>
                </div>
              </form>

              {/* Link para login */}
              <div className="mt-6 text-center">
                <a href="/login" className="text-base font-medium text-primary-400 hover:text-primary-300 transition-colors">
                  Voltar ao login
                </a>
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

      {/* Lado direito - Imagem */}
      <div className="hidden lg:block relative flex-1 lg:w-3/5 overflow-hidden">
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
