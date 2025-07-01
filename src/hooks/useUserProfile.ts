import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

interface UserProfile {
  id: string
  user_id: string
  nome_completo: string | null
  telefone: string | null
  data_nascimento: string | null
}

export function useUserProfile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Função para buscar o perfil
  const fetchProfile = async () => {
    if (!user) {
      setProfile(null)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      setProfile(data || null)
    } catch (err) {
      console.error('Erro ao buscar perfil:', err)
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  // Função para atualizar o perfil
  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { error: 'Usuário não autenticado' }

    try {
      setLoading(true)
      
      // Limpar e validar os dados antes de salvar
      const cleanedUpdates = cleanUpdates(updates)
      
      console.log('=== DEBUG updateProfile ===')
      console.log('Updates originais:', updates)
      console.log('Updates limpos:', cleanedUpdates)
      console.log('User ID:', user.id)
      console.log('Profile exists:', !!profile)
      console.log('Profile ID:', profile?.id)
      
      let data, error

      if (profile?.id) {
        // Se já existe um perfil, fazer UPDATE
        console.log('Fazendo UPDATE no perfil existente...')
        const result = await supabase
          .from('profiles')
          .update({
            ...cleanedUpdates,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id)
          .select()
          .single()
        
        data = result.data
        error = result.error
      } else {
        // Se não existe perfil, fazer INSERT
        console.log('Fazendo INSERT de novo perfil...')
        const result = await supabase
          .from('profiles')
          .insert({
            user_id: user.id,
            ...cleanedUpdates,
            updated_at: new Date().toISOString()
          })
          .select()
          .single()
        
        data = result.data
        error = result.error
      }

      console.log('Supabase response:', { data, error })
      
      if (error) {
        console.error('Supabase error details:', error)
        throw error
      }

      setProfile(data)
      console.log('Profile updated successfully:', data)
      return { data, error: null }
    } catch (err) {
      console.error('=== ERRO COMPLETO ===')
      console.error('Erro original:', err)
      console.error('Tipo do erro:', typeof err)
      console.error('Message:', err instanceof Error ? err.message : 'Sem message')
      console.error('Stack:', err instanceof Error ? err.stack : 'Sem stack')
      
      let errorMessage = 'Erro desconhecido'
      if (err instanceof Error) {
        errorMessage = err.message
      } else if (typeof err === 'string') {
        errorMessage = err
      } else if (err && typeof err === 'object' && 'message' in err) {
        errorMessage = String(err.message)
      }
      
      console.error('Error message final:', errorMessage)
      setError(errorMessage)
      return { data: null, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Função para upload de avatar (simples, rápida)
  const uploadAvatar = async (file: File) => {
    if (!user) return { error: 'Usuário não autenticado' }
    try {
      setLoading(true)
      if (!file.type.startsWith('image/')) throw new Error('Por favor, selecione apenas arquivos de imagem')
      if (file.size > 5 * 1024 * 1024) throw new Error('Arquivo muito grande. Máximo 5MB')
      const fileName = `${user.id}.jpg`
      await supabase.storage.from('avatars').remove([fileName])
      const { error: uploadError } = await supabase.storage.from('avatars').upload(fileName, file, { upsert: true, contentType: file.type })
      if (uploadError) throw new Error(`Erro no upload: ${uploadError.message}`)
      await fetchProfile()
      return { data: true, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer upload'
      setError(errorMessage)
      return { data: null, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Função para remover avatar (simples, rápida)
  const removeAvatar = async () => {
    if (!user) return { error: 'Usuário não autenticado' }
    try {
      setLoading(true)
      await supabase.storage.from('avatars').remove([`${user.id}.jpg`])
      return { data: true, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao remover'
      return { data: null, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Função para atualizar display_name no Auth
  const updateDisplayName = async (displayName: string) => {
    if (!user) return { error: 'Usuário não autenticado' }

    try {
      const { data, error } = await supabase.auth.updateUser({
        data: { display_name: displayName }
      })

      if (error) throw error

      console.log('Display name atualizado no Auth:', data)
      return { data, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar display name'
      console.error('Erro ao atualizar display name:', err)
      return { data: null, error: errorMessage }
    }
  }

  // Função para atualizar email do usuário
  const updateEmail = async (newEmail: string) => {
    if (!user) return { error: 'Usuário não autenticado' }

    try {
      setLoading(true)
      
      const { error } = await supabase.auth.updateUser({
        email: newEmail
      })

      if (error) throw error

      return { data: null, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar email'
      console.error('Erro ao atualizar email:', err)
      return { data: null, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Função para recarregar dados do usuário da sessão
  const refreshUserSession = async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession()
      
      if (error) {
        console.error('Erro ao recarregar sessão:', error)
        return { error: error.message }
      }
      
      console.log('Sessão recarregada:', data)
      return { data, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao recarregar sessão'
      console.error('Erro ao recarregar sessão:', err)
      return { data: null, error: errorMessage }
    }
  }

  // Função para testar conexão com a tabela profiles
  const testProfilesTable = async () => {
    try {
      console.log('=== TESTANDO TABELA PROFILES ===')
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)
      
      console.log('Teste da tabela profiles:', { data, error })
      return { data, error }
    } catch (err) {
      console.error('Erro ao testar tabela profiles:', err)
      return { data: null, error: err }
    }
  }

  // Função para limpar valores vazios antes de salvar
  const cleanUpdates = (updates: Partial<UserProfile>) => {
    const cleaned: any = {}
    
    for (const [key, value] of Object.entries(updates)) {
      if (key === 'data_nascimento') {
        // Para data, só incluir se não estiver vazia
        if (value && value.trim() !== '') {
          cleaned[key] = value
        } else {
          cleaned[key] = null // Explicitamente null para limpar o campo
        }
      } else if (key === 'telefone') {
        // Para telefone, só incluir se não estiver vazio
        if (value && value.trim() !== '') {
          cleaned[key] = value
        } else {
          cleaned[key] = null // Explicitamente null para limpar o campo
        }
      } else {
        // Outros campos mantém como estão
        cleaned[key] = value
      }
    }
    
    return cleaned
  }

  useEffect(() => {
    fetchProfile()
  }, [user, user?.user_metadata?.display_name])

  return {
    profile,
    loading,
    error,
    updateProfile,
    uploadAvatar,
    removeAvatar,
    fetchProfile,
    updateDisplayName,
    updateEmail,
    refreshUserSession,
    testProfilesTable,
    cleanUpdates
  }
}
