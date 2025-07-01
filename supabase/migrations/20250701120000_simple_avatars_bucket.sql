-- Migration: Configuração simples do bucket de avatars público
-- Data: 2025-07-01
-- Descrição: Cria bucket público para avatars (preparado para futuras comunidades)

-- Criar bucket público para avatars
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars', 
  'avatars', 
  true, -- Público para futuras comunidades
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Políticas simples do Supabase

-- Remover policies existentes se houver
DROP POLICY IF EXISTS "Anyone can view avatars" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete" ON storage.objects;

-- Qualquer um pode visualizar avatars (público)
CREATE POLICY "Anyone can view avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

-- Usuários autenticados podem fazer upload
CREATE POLICY "Authenticated users can upload"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'avatars');

-- Usuários autenticados podem atualizar
CREATE POLICY "Authenticated users can update"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'avatars');

-- Usuários autenticados podem deletar
CREATE POLICY "Authenticated users can delete" 
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'avatars');
