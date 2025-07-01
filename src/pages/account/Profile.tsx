import { useState, useEffect } from 'react'
import { Phone, Calendar, User } from 'lucide-react'
import Avatar from '../../components/Avatar'
import { useUserProfile } from '../../hooks/useUserProfile'
import { useAuth } from '../../contexts/AuthContext'
import { useAvatar } from '../../contexts/AvatarContext'

const Profile = () => {
  const { profile, updateProfile, updateDisplayName, updateEmail, refreshUserSession, removeAvatar, uploadAvatar } = useUserProfile()
  const { user } = useAuth()
  const { updateAvatarVersion } = useAvatar()
  const [formData, setFormData] = useState({
    nome_completo: '',
    telefone: '',
    data_nascimento: '',
    display_name: '' // Adicionando campo para nome de exibição
  })
  const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [phoneHasFocus, setPhoneHasFocus] = useState(false)
  const [unsavedFields, setUnsavedFields] = useState<Set<string>>(new Set())
  const [fieldFeedback, setFieldFeedback] = useState<{[key: string]: {type: 'success' | 'error', message: string} | null}>({})

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
        display_name: user?.user_metadata?.display_name || '' // Pegar do user_metadata
      })
    }
  }, [profile, user])

  // Função para salvar automaticamente após mudanças
  /* 
  // Função antiga - não usar mais
  const handleFieldChange = async (field: string, value: string) => {
    const newFormData = { ...formData, [field]: value }
    setFormData(newFormData)
    setUnsavedFields(prev => new Set(prev.add(field))) // Adiciona o campo às mudanças não salvas

    // Limpar timeout anterior se existir
    if (saveTimeout) {
      clearTimeout(saveTimeout)
    }

    // Criar novo timeout para salvar após 1 segundo de inatividade
    const timeout = setTimeout(async () => {
      setIsSaving(true)
      addDebugLog(`🔄 Iniciando salvamento de ${field}: "${value}"`)
      
      let result
      
      if (field === 'display_name') {
        addDebugLog(`📝 Salvando display_name no Auth...`)
        result = await handleDisplayNameChange(value)
      } else {
        addDebugLog(`💾 Salvando ${field} no profile...`)
        result = await updateProfile({ [field]: value })
      }
      
      setIsSaving(false)
      
      if (!result.error) {
        addDebugLog(`✅ ${field} salvo com sucesso!`)
        setLastSaved(new Date())
        setUnsavedFields(prev => {
          const newSet = new Set(prev)
          newSet.delete(field) // Remove o campo das mudanças não salvas
          return newSet
        })
      } else {
        addDebugLog(`❌ Erro ao salvar ${field}: ${result.error}`)
      }
    }, 1000)

    setSaveTimeout(timeout)
  }
  */



  // Função para atualizar o nome de exibição
  const handleDisplayNameChange = async (newDisplayName: string) => {
    const result = await updateDisplayName(newDisplayName)
    if (!result.error) {
      // Recarregar sessão para obter dados atualizados
      await refreshUserSession()
    }
    return result
  }

  // Função SIMPLES para remover avatar
  const handleRemoveAvatar = async () => {
    setIsSaving(true)
    clearFieldFeedback('avatar')
    const result = await removeAvatar()
    setIsSaving(false)
    if (!result.error) {
      showFieldFeedback('avatar', 'success', 'Avatar removido com sucesso!')
      updateAvatarVersion() // Atualiza todos os Avatars
    } else {
      showFieldFeedback('avatar', 'error', `Erro ao remover: ${result.error}`)
    }
  }

  // Função para upload de avatar
  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    setIsSaving(true)
    clearFieldFeedback('avatar')
    const result = await uploadAvatar(file)
    setIsSaving(false)
    if (!result.error) {
      showFieldFeedback('avatar', 'success', 'Avatar enviado com sucesso!')
      updateAvatarVersion() // Atualiza todos os Avatars
    } else {
      showFieldFeedback('avatar', 'error', `Erro ao fazer upload: ${result.error}`)
    }
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

  // Função para salvar imediatamente (para campos que salvam no onBlur)
  const handleInstantSave = async (field: string, value: string) => {
    setIsSaving(true)
    clearFieldFeedback(field) // Limpar feedback anterior
    
    let result
    
    if (field === 'display_name') {
      result = await handleDisplayNameChange(value)
    } else if (field === 'email') {
      result = await updateEmail(value)
    } else {
      result = await updateProfile({ [field]: value })
    }
    
    setIsSaving(false)
    
    if (!result.error) {
      const fieldName = field === 'display_name' ? 'Nome de exibição' : 
                       field === 'nome_completo' ? 'Nome completo' : 
                       field === 'telefone' ? 'Telefone' : 
                       field === 'data_nascimento' ? 'Data de nascimento' : 
                       field === 'email' ? 'E-mail' : 'Campo'
      showFieldFeedback(field, 'success', `${fieldName} salvo!`)
      // Remove da lista de campos não salvos
      setUnsavedFields(prev => {
        const newSet = new Set(prev)
        newSet.delete(field)
        return newSet
      })
    } else {
      showFieldFeedback(field, 'error', `Erro ao salvar: ${result.error}`)
    }
  }

  // Função para marcar campo como "sujo" (com mudanças não salvas)
  const markFieldAsUnsaved = (field: string) => {
    setUnsavedFields(prev => new Set(prev).add(field))
  }

  // Handler para campos de texto (auto-save com delay)
  const handleTextFieldChange = (field: string, value: string) => {
    const newFormData = { ...formData, [field]: value }
    setFormData(newFormData)
    markFieldAsUnsaved(field)

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
    markFieldAsUnsaved(field)
  }

  // Handler para onBlur de campos estruturados
  const handleStructuredFieldBlur = (field: string, value: string) => {
    // Só salva se o campo realmente mudou e tem valor
    if (unsavedFields.has(field)) {
      handleInstantSave(field, value)
    }
  }

  return (
    <div>
      {/* Card Principal do Perfil */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
        {/* Avatar no lado esquerdo com botões horizontais */}
        <div className="flex items-start gap-6 mb-10">
          <div className="flex-shrink-0">
            <Avatar 
              size="xl" 
              editable={true}
              className="w-20 h-20 text-xl"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <button 
                className="btn btn-danger text-sm px-4 py-2"
                onClick={handleRemoveAvatar}
                disabled={isSaving}
              >
                Remover
              </button>
              
              {/* Indicador de salvamento */}
              {isSaving && (
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            
            <p className="text-xs text-gray-400 mb-2">
              Imagens até 5MB • Clique na foto para alterar
            </p>
            
            {/* Feedback do avatar */}
            {fieldFeedback.avatar && (
              <div className={`text-xs ${
                fieldFeedback.avatar.type === 'success' ? 'text-green-400' : 'text-red-400'
              }`}>
                {fieldFeedback.avatar.message}
              </div>
            )}
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
                {unsavedFields.has('nome_completo') && <span className="text-yellow-400 ml-2 text-xs">●</span>}
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
                {unsavedFields.has('display_name') && <span className="text-yellow-400 ml-2 text-xs">●</span>}
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
                {unsavedFields.has('data_nascimento') && <span className="text-yellow-400 ml-2 text-xs">●</span>}
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
                {unsavedFields.has('telefone') && <span className="text-yellow-400 ml-2 text-xs">●</span>}
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
                {unsavedFields.has('email') && <span className="text-yellow-400 ml-2 text-xs">●</span>}
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
    </div>
  )
}

export default Profile
