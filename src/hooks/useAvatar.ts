import { useState, useCallback } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

export function useAvatar() {
  const { user } = useAuth()
  const [isUploading, setIsUploading] = useState(false)

  // Função para fazer upload do avatar
  const uploadAvatar = useCallback(async (file: File) => {
    if (!user) {
      throw new Error('Usuário não autenticado')
    }

    setIsUploading(true)
    try {
      // Sempre usar extensão .webp para consistência
      const fileName = `${user.id}.webp`
      
      console.log('Iniciando upload do avatar:', fileName)
      
      // Remover avatar anterior (tanto .jpg quanto .webp)
      const { error: removeError } = await supabase.storage
        .from('avatars')
        .remove([`${user.id}.jpg`, `${user.id}.webp`])
      
      if (removeError) {
        console.log('Erro ao remover (pode ser normal):', removeError)
      }

      // Upload do novo avatar
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (uploadError) {
        throw new Error(`Erro no upload: ${uploadError.message}`)
      }

      console.log('Avatar uploaded com sucesso!')
      
      // Forçar refresh global de todos os avatars
      if (typeof window !== 'undefined' && (window as any).refreshAvatar) {
        setTimeout(() => {
          (window as any).refreshAvatar()
        }, 500) // Pequeno delay para garantir que o arquivo foi processado
      }

      return { success: true }
    } catch (error) {
      console.error('Erro no upload:', error)
      throw error
    } finally {
      setIsUploading(false)
    }
  }, [user])

  // Função para remover avatar
  const removeAvatar = useCallback(async () => {
    if (!user) {
      throw new Error('Usuário não autenticado')
    }

    setIsUploading(true)
    try {
      console.log('Removendo avatar do usuário:', user.id)
      
      // Remover ambos os formatos
      const { error } = await supabase.storage
        .from('avatars')
        .remove([`${user.id}.jpg`, `${user.id}.webp`])

      if (error) {
        throw new Error(`Erro ao remover: ${error.message}`)
      }

      console.log('Avatar removido com sucesso!')
      
      // Forçar refresh global de todos os avatars
      if (typeof window !== 'undefined' && (window as any).refreshAvatar) {
        setTimeout(() => {
          (window as any).refreshAvatar()
        }, 200)
      }

      return { success: true }
    } catch (error) {
      console.error('Erro ao remover:', error)
      throw error
    } finally {
      setIsUploading(false)
    }
  }, [user])

  // Função para verificar se avatar existe
  const checkAvatarExists = useCallback(async () => {
    if (!user) return false

    try {
      const { data } = await supabase.storage
        .from('avatars')
        .list('', {
          search: user.id
        })

      return data && data.length > 0
    } catch {
      return false
    }
  }, [user])

  return {
    uploadAvatar,
    removeAvatar,
    checkAvatarExists,
    isUploading
  }
}
