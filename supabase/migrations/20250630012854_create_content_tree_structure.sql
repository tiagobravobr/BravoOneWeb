-- Bravo One - Estrutura de Árvore de Conteúdo Educacional
-- Execute este SQL no SQL Editor do Supabase Dashboard

-- 1. ENUM de tipos de nó
CREATE TYPE content_node_type AS ENUM (
  'academia',
  'categoria', 
  'trilha',
  'colecao',
  'modulo',
  'conteudo'
);

-- 2. Tabela principal: content_nodes
CREATE TABLE content_nodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  title TEXT NOT NULL,
  description TEXT,
  
  type content_node_type NOT NULL,
  
  parent_id UUID REFERENCES content_nodes(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL DEFAULT 0,
  
  visibility TEXT DEFAULT 'public' CHECK (visibility IN ('public', 'internal', 'hidden')),
  cover_image_url TEXT,
  metadata JSONB DEFAULT '{}',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabela de blocos de conteúdo
CREATE TABLE content_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  node_id UUID NOT NULL REFERENCES content_nodes(id) ON DELETE CASCADE,
  
  type TEXT NOT NULL CHECK (type IN ('text', 'video', 'audio', 'image', 'gif', 'code', 'quiz')),
  content TEXT, -- usado para textos, códigos, markdown, etc
  media_url TEXT, -- usado para vídeos, imagens, áudios
  metadata JSONB DEFAULT '{}', -- ex: { "duration": 180, "language": "pt-BR" }
  
  position INTEGER NOT NULL DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Índices para performance
CREATE INDEX idx_nodes_parent_type ON content_nodes (parent_id, type);
CREATE INDEX idx_nodes_order ON content_nodes (parent_id, order_index);
CREATE INDEX idx_nodes_type ON content_nodes (type);
CREATE INDEX idx_nodes_visibility ON content_nodes (visibility);
CREATE INDEX idx_blocks_node_position ON content_blocks (node_id, position);

-- 5. Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_content_nodes_updated_at 
  BEFORE UPDATE ON content_nodes 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_blocks_updated_at 
  BEFORE UPDATE ON content_blocks 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 6. Função para validar se blocos só são criados em nós do tipo 'conteudo'
CREATE OR REPLACE FUNCTION validate_content_block_node_type()
RETURNS TRIGGER AS $$
DECLARE
  node_type content_node_type;
BEGIN
  SELECT type INTO node_type FROM content_nodes WHERE id = NEW.node_id;
  
  IF node_type <> 'conteudo' THEN
    RAISE EXCEPTION 'Blocos só podem ser adicionados a content_nodes do tipo ''conteudo''. Tipo encontrado: %', node_type;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_validate_content_block_type
  BEFORE INSERT OR UPDATE ON content_blocks
  FOR EACH ROW EXECUTE FUNCTION validate_content_block_node_type();

-- 7. Função para validar hierarquia pai-filho
CREATE OR REPLACE FUNCTION validate_node_hierarchy()
RETURNS TRIGGER AS $$
DECLARE
  parent_type content_node_type;
BEGIN
  -- Se não tem pai, deve ser academia
  IF NEW.parent_id IS NULL THEN
    IF NEW.type <> 'academia' THEN
      RAISE EXCEPTION 'Apenas nós do tipo ''academia'' podem não ter pai';
    END IF;
    RETURN NEW;
  END IF;
  
  -- Busca o tipo do pai
  SELECT type INTO parent_type FROM content_nodes WHERE id = NEW.parent_id;
  
  -- Valida combinações permitidas
  CASE
    WHEN NEW.type = 'categoria' AND parent_type = 'academia' THEN NULL;
    WHEN NEW.type = 'trilha' AND parent_type = 'categoria' THEN NULL;
    WHEN NEW.type = 'colecao' AND parent_type IN ('categoria', 'trilha') THEN NULL;
    WHEN NEW.type = 'modulo' AND parent_type = 'colecao' THEN NULL;
    WHEN NEW.type = 'conteudo' AND parent_type = 'modulo' THEN NULL;
    ELSE
      RAISE EXCEPTION 'Hierarquia inválida: tipo ''%'' não pode ter pai do tipo ''%''', NEW.type, parent_type;
  END CASE;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_validate_node_hierarchy
  BEFORE INSERT OR UPDATE ON content_nodes
  FOR EACH ROW EXECUTE FUNCTION validate_node_hierarchy();

-- 8. Função RPC para buscar breadcrumb de um nó
CREATE OR REPLACE FUNCTION get_breadcrumb(node_id UUID)
RETURNS TABLE (
  id UUID,
  title TEXT,
  type content_node_type,
  level INTEGER
) AS $$
BEGIN
  RETURN QUERY
  WITH RECURSIVE breadcrumb AS (
    -- Nó inicial
    SELECT cn.id, cn.title, cn.type, 0 as level
    FROM content_nodes cn
    WHERE cn.id = node_id
    
    UNION ALL
    
    -- Subir na hierarquia
    SELECT cn.id, cn.title, cn.type, b.level + 1
    FROM content_nodes cn
    JOIN breadcrumb b ON cn.id = b.parent_id
  )
  SELECT b.id, b.title, b.type, b.level
  FROM breadcrumb b
  ORDER BY b.level DESC;
END;
$$ LANGUAGE plpgsql;

-- 9. Função RPC para buscar árvore completa de um nó
CREATE OR REPLACE FUNCTION get_node_tree(root_node_id UUID)
RETURNS TABLE (
  id UUID,
  title TEXT,
  description TEXT,
  type content_node_type,
  parent_id UUID,
  order_index INTEGER,
  visibility TEXT,
  cover_image_url TEXT,
  metadata JSONB,
  level INTEGER,
  path TEXT
) AS $$
BEGIN
  RETURN QUERY
  WITH RECURSIVE tree AS (
    -- Nó raiz
    SELECT 
      cn.id, cn.title, cn.description, cn.type, cn.parent_id, cn.order_index,
      cn.visibility, cn.cover_image_url, cn.metadata,
      0 as level,
      cn.title as path
    FROM content_nodes cn
    WHERE cn.id = root_node_id
    
    UNION ALL
    
    -- Filhos recursivamente
    SELECT 
      cn.id, cn.title, cn.description, cn.type, cn.parent_id, cn.order_index,
      cn.visibility, cn.cover_image_url, cn.metadata,
      t.level + 1,
      t.path || ' > ' || cn.title
    FROM content_nodes cn
    JOIN tree t ON cn.parent_id = t.id
  )
  SELECT 
    t.id, t.title, t.description, t.type, t.parent_id, t.order_index,
    t.visibility, t.cover_image_url, t.metadata, t.level, t.path
  FROM tree t
  ORDER BY t.level, t.order_index;
END;
$$ LANGUAGE plpgsql;

-- 10. View para nós públicos (otimização de queries)
CREATE VIEW public_content_nodes AS
SELECT * FROM content_nodes
WHERE visibility = 'public';

-- 11. Dados de exemplo para teste
-- Academia principal
INSERT INTO content_nodes (id, title, description, type, parent_id, order_index) 
VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'Bravo Academy', 'Academia principal da plataforma', 'academia', NULL, 0);

-- Categoria de exemplo
INSERT INTO content_nodes (id, title, description, type, parent_id, order_index)
VALUES 
('550e8400-e29b-41d4-a716-446655440001', 'Marketing Digital', 'Conteúdos sobre marketing digital e vendas', 'categoria', '550e8400-e29b-41d4-a716-446655440000', 0);

-- Comentários para documentação
COMMENT ON TABLE content_nodes IS 'Tabela unificada que representa todos os níveis da hierarquia educacional';
COMMENT ON TABLE content_blocks IS 'Blocos modulares que compõem o conteúdo final dos nós do tipo ''conteudo''';
COMMENT ON TYPE content_node_type IS 'Tipos possíveis para os nós da árvore de conteúdo';
