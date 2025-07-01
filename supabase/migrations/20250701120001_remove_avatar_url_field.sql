-- Remove o campo avatar_url redundante da tabela profiles
-- A URL será construída dinamicamente baseada no user_id

ALTER TABLE profiles DROP COLUMN IF EXISTS avatar_url;
