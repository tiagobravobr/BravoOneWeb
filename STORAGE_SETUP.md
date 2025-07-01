# Configuração Simples do Storage de Avatars

## Problema
Upload de avatars falhando por falta de configuração do bucket no Supabase.

## Solução Simples
Configurar bucket público para avatars (pensando em futuras comunidades).

## Como configurar:

### Opção 1: Migration (Recomendado) ✅
Execute a migration: `supabase/migrations/20250701120000_simple_avatars_bucket.sql`

Se estiver usando Supabase local:
```bash
npx supabase db reset
```

Ou execute manualmente no SQL Editor do Supabase.

### Opção 2: Script Manual
Execute `setup-avatars-bucket.sql` no SQL Editor do Supabase.

### Opção 3: Interface Gráfica
1. Vá em **Storage** no painel do Supabase
2. Clique em **New bucket**
3. Configure:
   - **Name**: `avatars`
   - **Public bucket**: ✅ Sim (para comunidades futuras)
   - **File size limit**: `5242880` (5MB)
   - **Allowed MIME types**: `image/jpeg,image/jpg,image/png,image/gif,image/webp`

## Políticas Simples

- **👀 Visualização**: Qualquer pessoa pode ver avatars (público)
- **📤 Upload**: Apenas usuários autenticados podem enviar
- **✏️ Editar/Deletar**: Apenas usuários autenticados

## Estrutura de Arquivos
```
avatars/
├── user1-123456789.jpg
├── user2-123456789.png
└── user3-123456789.gif
```

## Testando
1. Execute a migration `20250701120000_simple_avatars_bucket.sql`
2. Faça login na aplicação 
3. Tente fazer upload de um avatar
4. Deve funcionar! 🎉
