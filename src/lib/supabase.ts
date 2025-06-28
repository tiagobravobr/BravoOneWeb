import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Variáveis de ambiente do Supabase não encontradas. Verifique se VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY estão configuradas no arquivo .env'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
