-- MIGRAÇÃO ANTIGA - SUBSTITUÍDA POR 20250701120000_simple_avatars_bucket.sql
-- Esta migração foi atualizada para uma versão mais simples
-- Você pode apagar este arquivo se quiser

-- Create avatars bucket for user profile images
-- insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
-- values (
--   'avatars', 
--   'avatars', 
--   true, -- Público para futuras comunidades
--   5242880, -- 5MB
--   ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
-- );

-- Comentado para evitar conflito com nova migration
