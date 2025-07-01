-- Script SIMPLES para criar o bucket de avatars no Supabase
-- Execute este script no SQL Editor do painel do Supabase

-- Criar o bucket público para avatars
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars', 
  'avatars', 
  true, -- PÚBLICO para futuras comunidades
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Política simples: qualquer um pode ver as imagens (público)
CREATE POLICY IF NOT EXISTS "Anyone can view avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

-- Política simples: usuários autenticados podem fazer upload
CREATE POLICY IF NOT EXISTS "Authenticated users can upload"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'avatars');

-- Política simples: usuários autenticados podem atualizar/deletar
CREATE POLICY IF NOT EXISTS "Authenticated users can modify"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'avatars');

CREATE POLICY IF NOT EXISTS "Authenticated users can delete" 
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'avatars');
