# 📝 Setup do Blog Simples - Prisma + PostgreSQL

Este guia explica como configurar o banco de dados PostgreSQL com Prisma para um sistema de blog simples com apenas posts.

## 🚀 Configuração Inicial

### 1. Pré-requisitos

- Node.js (versão 18+)
- PostgreSQL instalado e rodando
- Conhecimento básico de SQL

### 2. Configuração do Banco de Dados

#### Opção A: PostgreSQL Local

1. **Instale o PostgreSQL** se ainda não tiver:
   - Windows: [Download PostgreSQL](https://www.postgresql.org/download/windows/)
   - macOS: `brew install postgresql`
   - Linux: `sudo apt-get install postgresql postgresql-contrib`

2. **Crie um banco de dados**:
   ```sql
   createdb portfolio_blog
   ```

3. **Configure as variáveis de ambiente**:
   ```bash
   # Copie o arquivo de exemplo
   cp env.example .env.local
   
   # Edite o .env.local com suas credenciais
   DATABASE_URL="postgresql://seu_usuario:sua_senha@localhost:5432/portfolio_blog"
   ```

#### Opção B: PostgreSQL na Nuvem (Recomendado para produção)

Você pode usar serviços como:
- [Supabase](https://supabase.com) (Gratuito)
- [Railway](https://railway.app) (Gratuito com limites)
- [Neon](https://neon.tech) (Gratuito)

### 3. Executar Migrations

```bash
# Gerar o cliente Prisma
npm run db:generate

# Executar as migrations (cria as tabelas)
npm run db:migrate

# Popular o banco com dados de exemplo
npm run db:seed
```

### 4. Verificar a Instalação

```bash
# Abrir o Prisma Studio (interface visual)
npm run db:studio
```

## 📊 Estrutura Simples do Banco de Dados

### Modelo Principal

- **Post**: Posts do blog com campos essenciais

### Campos do Post

- `id`: Identificador único
- `title`: Título do post
- `content`: Conteúdo completo (Markdown/HTML)
- `excerpt`: Resumo opcional
- `coverImage`: URL da imagem de capa (opcional)
- `published`: Status de publicação (true/false)
- `publishedAt`: Data de publicação
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run db:migrate      # Executar migrations
npm run db:generate     # Gerar cliente Prisma
npm run db:seed         # Popular banco com dados de exemplo
npm run db:studio       # Abrir interface visual
npm run db:reset        # Resetar banco (cuidado!)

# Produção
npx prisma migrate deploy  # Deploy de migrations em produção
```

## 📝 Como Usar

### API Routes Disponíveis

```bash
GET    /api/posts          # Listar posts publicados (com paginação)
GET    /api/posts/[id]     # Buscar post específico
POST   /api/posts          # Criar novo post
PUT    /api/posts/[id]     # Atualizar post
DELETE /api/posts/[id]     # Deletar post
```

### Usar com Hooks (Recomendado)

```typescript
import { usePosts, usePost } from '@/hooks/usePosts'

// Em um componente
function MeuComponente() {
  const { posts, loading, error, fetchPosts } = usePosts()
  
  useEffect(() => {
    fetchPosts(1, 10) // página 1, 10 posts
  }, [])
  
  if (loading) return <div>Carregando...</div>
  if (error) return <div>Erro: {error}</div>
  
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
```

### Usar com Fetch Direto

```typescript
// Listar posts
const response = await fetch('/api/posts?page=1&limit=10')
const data = await response.json()

// Criar post
const newPost = await fetch('/api/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Meu post',
    content: 'Conteúdo...',
    published: true
  })
})
```

## 🔧 Troubleshooting

### Erro de Conexão

```
Error: Can't reach database server at localhost:5432
```

**Solução**: Verifique se o PostgreSQL está rodando:
```bash
# Windows (se instalado como serviço)
net start postgresql-x64-14

# macOS/Linux
sudo systemctl start postgresql
# ou
brew services start postgresql
```

### Erro de Permissão

```
Error: password authentication failed for user
```

**Solução**: Verifique as credenciais no `.env.local` e se o usuário tem permissões no banco.

### Tabelas não encontradas

```
Error: relation "posts" does not exist
```

**Solução**: Execute as migrations:
```bash
npm run db:migrate
```

## 📚 Próximos Passos

1. **Criar páginas do blog** em `src/app/blog/`
2. **Implementar componentes** para listar posts
3. **Adicionar sistema de busca**
4. **Criar formulário** para adicionar/editar posts
5. **Implementar paginação**

## 🔗 Links Úteis

- [Documentação do Prisma](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Next.js App Router](https://nextjs.org/docs/app)

---

**Nota**: Lembre-se de nunca commitar arquivos `.env*` com credenciais reais no Git!
