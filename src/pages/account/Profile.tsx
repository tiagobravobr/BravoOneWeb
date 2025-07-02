import { useState, useEffect } from 'react'
import { Phone, Calendar, User, Camera, X } from 'lucide-react'
import Avatar from '../../components/Avatar'
import AvatarUploader from '../../components/AvatarUploader'
import { useUserProfile } from '../../hooks/useUserProfile'
import { useAvatar } from '../../hooks/useAvatar'
import { useAuth } from '../../contexts/AuthContext'

const Profile = () => {
  const { profile, updateProfile, updateDisplayName, updateEmail, refreshUserSession } = useUserProfile()
  const { uploadAvatar, removeAvatar, checkAvatarExists, isUploading } = useAvatar()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    nome_completo: '',
    telefone: '',
    data_nascimento: '',
    display_name: ''
  })
  const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null)
  const [phoneHasFocus, setPhoneHasFocus] = useState(false)
  const [fieldFeedback, setFieldFeedback] = useState<{[key: string]: {type: 'success' | 'error', message: string} | null}>({})
  
  // Estados para o sistema de avatar
  const [showAvatarUploader, setShowAvatarUploader] = useState(false)
  const [hasAvatar, setHasAvatar] = useState(false)

  // Estado para controlar overlay em touch devices
  const [showAvatarOverlay, setShowAvatarOverlay] = useState(false)

  // Função para mostrar feedback por campo
  const showFieldFeedback = (field: string, type: 'success' | 'error', message: string) => {
    setFieldFeedback(prev => ({
      ...prev,
      [field]: { type, message }
    }))
    
    if (type === 'success') {
      setTimeout(() => {
        setFieldFeedback(prev => ({
          ...prev,
          [field]: null
        }))
      }, 3000) // Remove mensagem de sucesso após 3 segundos
    }
    // Mensagens de erro persistem até serem corrigidas
  }

  // Função para limpar feedback de um campo
  const clearFieldFeedback = (field: string) => {
    setFieldFeedback(prev => ({
      ...prev,
      [field]: null
    }))
  }

  // Atualizar formData quando profile mudar
  useEffect(() => {
    if (profile || user) {
      setFormData({
        nome_completo: profile?.nome_completo || '',
        telefone: profile?.telefone || '',
        data_nascimento: profile?.data_nascimento || '',
        display_name: user?.user_metadata?.display_name || ''
      })
    }
  }, [profile, user])

  // Função para atualizar o nome de exibição
  const handleDisplayNameChange = async (newDisplayName: string) => {
    const result = await updateDisplayName(newDisplayName)
    if (!result.error) {
      // Recarregar sessão para obter dados atualizados
      await refreshUserSession()
    }
    return result
  }

  // Função para aplicar máscara no telefone
  const formatPhoneNumber = (value: string, hasFocus = false) => {
    // Se não há valor e não tem foco, retorna string vazia (mostra apenas placeholder)
    if ((!value || value.trim() === '') && !hasFocus) {
      return ''
    }
    
    // Remove tudo que não for número
    const numbers = value.replace(/\D/g, '')
    
    // Se não há números, retorna vazio
    if (numbers.length === 0) {
      return ''
    }
    
    // Aplica a máscara (XX) XXXXX-XXXX
    if (numbers.length <= 2) {
      return `(${numbers}`
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
    }
  }

  // Função para remover máscara do telefone
  const unformatPhoneNumber = (value: string) => {
    return value.replace(/\D/g, '')
  }

  // Função especializada para mudança de telefone com máscara
  const handlePhoneChange = (value: string) => {
    const unformattedPhone = unformatPhoneNumber(value)
    handleStructuredFieldChange('telefone', unformattedPhone)
  }

  // Função para salvar telefone ao sair do campo
  const handlePhoneBlur = () => {
    const unformattedPhone = unformatPhoneNumber(formatPhoneNumber(formData.telefone, phoneHasFocus))
    handleStructuredFieldBlur('telefone', unformattedPhone)
    setPhoneHasFocus(false)
  }

  // Função para salvar imediatamente
  const handleInstantSave = async (field: string, value: string) => {
    clearFieldFeedback(field)
    
    let result
    
    if (field === 'display_name') {
      result = await handleDisplayNameChange(value)
    } else if (field === 'email') {
      result = await updateEmail(value)
    } else {
      result = await updateProfile({ [field]: value })
    }
    
    if (!result.error) {
      const fieldName = field === 'display_name' ? 'Nome de exibição' : 
                       field === 'nome_completo' ? 'Nome completo' : 
                       field === 'telefone' ? 'Telefone' : 
                       field === 'data_nascimento' ? 'Data de nascimento' : 
                       field === 'email' ? 'E-mail' : 'Campo'
      showFieldFeedback(field, 'success', `${fieldName} salvo!`)
    } else {
      showFieldFeedback(field, 'error', `Erro ao salvar: ${result.error}`)
    }
  }

  // Handler para campos de texto (auto-save com delay)
  const handleTextFieldChange = (field: string, value: string) => {
    const newFormData = { ...formData, [field]: value }
    setFormData(newFormData)

    // Limpar timeout anterior se existir
    if (saveTimeout) {
      clearTimeout(saveTimeout)
    }

    // Criar novo timeout para salvar após 2 segundos de inatividade
    const timeout = setTimeout(async () => {
      await handleInstantSave(field, value)
    }, 2000)

    setSaveTimeout(timeout)
  }

  // Handler para campos estruturados (salvar no onBlur)
  const handleStructuredFieldChange = (field: string, value: string) => {
    const newFormData = { ...formData, [field]: value }
    setFormData(newFormData)
  }

  // Handler para onBlur de campos estruturados
  const handleStructuredFieldBlur = (field: string, value: string) => {
    handleInstantSave(field, value)
  }

  // Verificar se usuário tem avatar
  useEffect(() => {
    if (user) {
      checkAvatarExists().then((exists) => setHasAvatar(exists || false))
    }
  }, [user, checkAvatarExists])

  // Funções para gerenciar avatar
  const handleAvatarUpload = async (file: File) => {
    try {
      await uploadAvatar(file)
      setHasAvatar(true)
      setShowAvatarUploader(false)
      showFieldFeedback('avatar', 'success', 'Avatar atualizado com sucesso!')
    } catch (error) {
      showFieldFeedback('avatar', 'error', error instanceof Error ? error.message : 'Erro ao fazer upload')
    }
  }

  const handleAvatarRemove = async () => {
    try {
      await removeAvatar()
      setHasAvatar(false)
      setShowAvatarUploader(false)
      showFieldFeedback('avatar', 'success', 'Avatar removido com sucesso!')
    } catch (error) {
      showFieldFeedback('avatar', 'error', error instanceof Error ? error.message : 'Erro ao remover avatar')
    }
  }

  return (
    <div>
      {/* Card Principal do Perfil */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
        {/* Avatar e controles - layout responsivo */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
          <div className="flex-shrink-0 relative group">
            <Avatar 
              size="xl" 
              className="w-20 h-20 text-xl cursor-pointer"
              onClick={() => {
                // Em dispositivos touch, mostrar overlay primeiro
                if ('ontouchstart' in window && !showAvatarOverlay) {
                  setShowAvatarOverlay(true)
                  setTimeout(() => setShowAvatarOverlay(false), 3000) // Auto-hide após 3s
                } else {
                  setShowAvatarUploader(true)
                }
              }}
            />
            
            {/* Overlay com opções - visível no hover ou quando ativado em touch */}
            <div className={`
              absolute inset-0 bg-black/70 rounded-full transition-all duration-300 
              flex items-center justify-center pointer-events-none
              ${showAvatarOverlay ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
            `}>
              <div className="flex gap-1.5 pointer-events-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowAvatarOverlay(false)
                    setShowAvatarUploader(true)
                  }}
                  className="p-2 bg-white/25 hover:bg-white/40 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/20 shadow-lg hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-white/30"
                  title={hasAvatar ? 'Alterar Avatar' : 'Adicionar Avatar'}
                  disabled={isUploading}
                >
                  <Camera className="w-4 h-4 text-white drop-shadow-sm" />
                </button>
                
                {hasAvatar && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowAvatarOverlay(false)
                      handleAvatarRemove()
                    }}
                    className="p-2 bg-red-500/85 hover:bg-red-500 rounded-full transition-all duration-200 backdrop-blur-sm border border-red-400/30 shadow-lg hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400/50"
                    title="Remover Avatar"
                    disabled={isUploading}
                  >
                    <X className="w-4 h-4 text-white drop-shadow-sm" />
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex-1 text-center sm:text-left space-y-3">
            <p className="text-xs text-gray-400">
              Imagens até 5MB • JPG, PNG ou WebP
            </p>
            
            {/* Botões para gerenciar avatar */}
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              <button
                onClick={() => setShowAvatarUploader(true)}
                className="btn btn-secondary text-xs px-3 py-1.5"
                disabled={isUploading}
              >
                {hasAvatar ? 'Alterar Avatar' : 'Adicionar Avatar'}
              </button>
              
              {hasAvatar && (
                <button
                  onClick={handleAvatarRemove}
                  className="btn btn-danger text-xs px-3 py-1.5"
                  disabled={isUploading}
                >
                  Remover Avatar
                </button>
              )}
            </div>
            
            {/* Área fixa para feedback do avatar - reserva espaço para evitar jump */}
            <div className="h-4 flex items-start justify-center sm:justify-start">
              {fieldFeedback.avatar && (
                <div className={`text-xs transition-opacity duration-200 ${
                  fieldFeedback.avatar.type === 'success' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {fieldFeedback.avatar.message}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Formulário em grid responsivo */}
        <div className="space-y-8">
          {/* Primeira linha: Nome Completo | Nome de Exibição | Data de Nascimento */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Nome Completo */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                <User className="w-4 h-4 inline mr-2" />
                Nome Completo
              </label>
              <input
                type="text"
                value={formData.nome_completo}
                onChange={(e) => handleTextFieldChange('nome_completo', e.target.value)}
                className="form-input w-full"
                placeholder="Seu nome completo"
              />
              <div className="mt-2 h-4">
                {fieldFeedback.nome_completo && (
                  <div className={`text-xs ${
                    fieldFeedback.nome_completo.type === 'success' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {fieldFeedback.nome_completo.message}
                  </div>
                )}
              </div>
            </div>

            {/* Nome de Exibição */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                <User className="w-4 h-4 inline mr-2" />
                Nome de Exibição
              </label>
              <input
                type="text"
                value={formData.display_name}
                onChange={(e) => handleTextFieldChange('display_name', e.target.value)}
                className="form-input w-full"
                placeholder="Como você quer ser chamado"
              />
              <div className="mt-2 h-4">
                {fieldFeedback.display_name && (
                  <div className={`text-xs ${
                    fieldFeedback.display_name.type === 'success' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {fieldFeedback.display_name.message}
                  </div>
                )}
              </div>
            </div>

            {/* Data de Nascimento */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                <Calendar className="w-4 h-4 inline mr-2" />
                Data de Nascimento
              </label>
              <input
                type="date"
                value={formData.data_nascimento}
                onChange={(e) => handleStructuredFieldChange('data_nascimento', e.target.value)}
                onBlur={(e) => handleStructuredFieldBlur('data_nascimento', e.target.value)}
                className="form-input w-full"
              />
              <div className="mt-2 h-4">
                {fieldFeedback.data_nascimento && (
                  <div className={`text-xs ${
                    fieldFeedback.data_nascimento.type === 'success' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {fieldFeedback.data_nascimento.message}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Segunda linha: Telefone | E-mail | Senha */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Telefone */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                <Phone className="w-4 h-4 inline mr-2" />
                Telefone
              </label>
              <input
                type="tel"
                value={formatPhoneNumber(formData.telefone, phoneHasFocus)}
                onChange={(e) => handlePhoneChange(e.target.value)}
                onFocus={() => setPhoneHasFocus(true)}
                onBlur={handlePhoneBlur}
                className="form-input w-full"
                placeholder="(11) 99999-9999"
              />
              <div className="mt-2 h-4">
                {fieldFeedback.telefone && (
                  <div className={`text-xs ${
                    fieldFeedback.telefone.type === 'success' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {fieldFeedback.telefone.message}
                  </div>
                )}
              </div>
            </div>

            {/* E-mail - campo editável */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                E-mail
              </label>
              <input
                type="email"
                value={user?.email || ''}
                onChange={(e) => handleTextFieldChange('email', e.target.value)}
                className="form-input w-full"
                placeholder="seu@email.com"
              />
              <div className="mt-2 h-4">
                {fieldFeedback.email && (
                  <div className={`text-xs ${
                    fieldFeedback.email.type === 'success' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {fieldFeedback.email.message}
                  </div>
                )}
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Senha
              </label>
              <div className="flex justify-start">
                <button className="btn btn-secondary text-sm px-6 py-3 min-h-[44px]">
                  Alterar Senha
                </button>
              </div>
              <div className="mt-2 h-4"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal do AvatarUploader */}
      {showAvatarUploader && (
        <AvatarUploader
          onSave={handleAvatarUpload}
          onCancel={() => setShowAvatarUploader(false)}
        />
      )}
    </div>
  )
}

export default Profile
