# 📮 Testando API do Blog com Postman

Este arquivo contém os exemplos de body para testar todas as rotas da API usando o Postman.

## 🚀 Configuração Inicial no Postman

### Base URL
```
http://localhost:3000
```

### Headers Padrão
Para todas as requisições POST e PUT, adicione o header:
```
Content-Type: application/json
```

---

## 1. 📖 GET - Listar Posts

### Rota: `GET /api/posts`

**URL Completa:**
```
http://localhost:3000/api/posts
```

**Query Parameters (opcionais):**
- `page`: 1
- `limit`: 10

**Exemplo com parâmetros:**
```
http://localhost:3000/api/posts?page=1&limit=5
```

**Body:** Nenhum (requisição GET)

**Resposta esperada:**
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "clx123abc456def789",
        "title": "Meu primeiro post",
        "content": "# Meu primeiro post\n\nEste é o conteúdo...",
        "excerpt": "Este é o resumo do meu primeiro post no blog.",
        "coverImage": null,
        "published": true,
        "publishedAt": "2024-01-15T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 3,
      "totalPages": 1
    }
  }
}
```

---

## 2. 🔍 GET - Buscar Post Específico

### Rota: `GET /api/posts/{id}`

**URL Completa:**
```
http://localhost:3000/api/posts/clx123abc456def789
```

**Body:** Nenhum (requisição GET)

**Resposta esperada:**
```json
{
  "success": true,
  "data": {
    "id": "clx123abc456def789",
    "title": "Meu primeiro post",
    "content": "# Meu primeiro post\n\nEste é o conteúdo completo do post...",
    "excerpt": "Este é o resumo do post.",
    "coverImage": null,
    "published": true,
    "publishedAt": "2024-01-15T00:00:00.000Z"
  }
}
```

---

## 3. ➕ POST - Criar Novo Post

### Rota: `POST /api/posts`

**URL Completa:**
```
http://localhost:3000/api/posts
```

### Exemplo 1: Post Básico
**Body (JSON):**
```json
{
  "title": "Meu Novo Post",
  "content": "Este é o conteúdo do meu novo post.",
  "published": true
}
```

### Exemplo 2: Post Completo
**Body (JSON):**
```json
{
  "title": "Tutorial Completo de React",
  "content": "# Tutorial de React\n\n## Introdução\nReact é uma biblioteca JavaScript...\n\n## Instalação\n```bash\nnpm create react-app meu-app\n```\n\n## Primeiro Componente\n```jsx\nfunction MeuComponente() {\n  return <h1>Hello World!</h1>\n}\n```",
  "excerpt": "Aprenda React do zero com este tutorial completo",
  "coverImage": "https://example.com/react-tutorial.jpg",
  "published": true
}
```

### Exemplo 3: Rascunho (Não Publicado)
**Body (JSON):**
```json
{
  "title": "Post em Desenvolvimento",
  "content": "Este post ainda está sendo escrito...",
  "excerpt": "Um post que ainda está sendo desenvolvido",
  "published": false
}
```

### Exemplo 4: Post com Markdown
**Body (JSON):**
```json
{
  "title": "Guia de JavaScript ES6+",
  "content": "# JavaScript ES6+ - Guia Completo\n\n## Arrow Functions\n```javascript\nconst soma = (a, b) => a + b\n```\n\n## Destructuring\n```javascript\nconst { nome, idade } = pessoa\n```\n\n## Template Literals\n```javascript\nconst mensagem = `Olá, ${nome}!`\n```\n\n## Async/Await\n```javascript\nasync function buscarDados() {\n  const response = await fetch('/api/dados')\n  return response.json()\n}\n```",
  "excerpt": "Aprenda as principais funcionalidades do JavaScript moderno",
  "coverImage": "https://example.com/js-es6.png",
  "published": true
}
```

**Resposta esperada:**
```json
{
  "success": true,
  "data": {
    "id": "clx789xyz123abc456",
    "title": "Meu Novo Post",
    "content": "Este é o conteúdo do meu novo post.",
    "excerpt": null,
    "coverImage": null,
    "published": true,
    "publishedAt": "2024-01-20T10:30:00.000Z"
  }
}
```

---

## 4. ✏️ PUT - Atualizar Post

### Rota: `PUT /api/posts/{id}`

**URL Completa:**
```
http://localhost:3000/api/posts/clx123abc456def789
```

### Exemplo 1: Atualização Parcial (Apenas Título)
**Body (JSON):**
```json
{
  "title": "Título Atualizado"
}
```

### Exemplo 2: Atualizar Conteúdo
**Body (JSON):**
```json
{
  "content": "# Conteúdo Totalmente Reescrito\n\nEste é o novo conteúdo do post com mais informações..."
}
```

### Exemplo 3: Publicar Post (era rascunho)
**Body (JSON):**
```json
{
  "published": true
}
```

### Exemplo 4: Despublicar Post (tornar rascunho)
**Body (JSON):**
```json
{
  "published": false
}
```

### Exemplo 5: Atualização Completa
**Body (JSON):**
```json
{
  "title": "Post Completamente Atualizado",
  "content": "# Novo Conteúdo\n\nEste post foi completamente reescrito com novas informações e exemplos.",
  "excerpt": "Resumo atualizado do post",
  "coverImage": "https://example.com/nova-imagem.jpg",
  "published": true
}
```

### Exemplo 6: Adicionar Imagem de Capa
**Body (JSON):**
```json
{
  "coverImage": "https://example.com/minha-capa.jpg"
}
```

### Exemplo 7: Remover Imagem de Capa
**Body (JSON):**
```json
{
  "coverImage": null
}
```

**Resposta esperada:**
```json
{
  "success": true,
  "data": {
    "id": "clx123abc456def789",
    "title": "Título Atualizado",
    "content": "Conteúdo original...",
    "excerpt": null,
    "coverImage": null,
    "published": true,
    "publishedAt": "2024-01-15T00:00:00.000Z"
  }
}
```

---

## 5. 🗑️ DELETE - Deletar Post

### Rota: `DELETE /api/posts/{id}`

**URL Completa:**
```
http://localhost:3000/api/posts/clx123abc456def789
```

**Body:** Nenhum (requisição DELETE)

**Resposta esperada:**
```json
{
  "success": true,
  "message": "Post deletado com sucesso"
}
```

---

## 🧪 Cenários de Teste Completos

### Cenário 1: Fluxo Completo de Post
1. **Criar rascunho**
   ```json
   POST /api/posts
   {
     "title": "Meu Post de Teste",
     "content": "Conteúdo inicial...",
     "published": false
   }
   ```

2. **Atualizar conteúdo**
   ```json
   PUT /api/posts/{id}
   {
     "content": "Conteúdo atualizado e melhorado..."
   }
   ```

3. **Publicar**
   ```json
   PUT /api/posts/{id}
   {
     "published": true
   }
   ```

4. **Buscar para verificar**
   ```
   GET /api/posts/{id}
   ```

5. **Deletar**
   ```
   DELETE /api/posts/{id}
   ```

### Cenário 2: Post com Conteúdo Rico
**Body para POST:**
```json
{
  "title": "Artigo Técnico Completo",
  "content": "# Como Criar uma API REST com Node.js\n\n## Pré-requisitos\n- Node.js instalado\n- Conhecimento básico de JavaScript\n- Editor de código\n\n## Passo 1: Configuração\n```bash\nnpm init -y\nnpm install express\n```\n\n## Passo 2: Servidor Básico\n```javascript\nconst express = require('express')\nconst app = express()\n\napp.use(express.json())\n\napp.get('/', (req, res) => {\n  res.json({ message: 'API funcionando!' })\n})\n\napp.listen(3000, () => {\n  console.log('Servidor rodando na porta 3000')\n})\n```\n\n## Conclusão\nCom estes passos você já tem uma API básica funcionando!",
  "excerpt": "Tutorial passo a passo para criar uma API REST com Node.js e Express",
  "coverImage": "https://example.com/nodejs-api.jpg",
  "published": true
}
```

---

## ❌ Exemplos de Erros Comuns

### 1. Erro 400 - Dados Obrigatórios Ausentes
**Request:**
```json
POST /api/posts
{
  "content": "Conteúdo sem título"
}
```

**Response:**
```json
{
  "success": false,
  "error": "Título e conteúdo são obrigatórios"
}
```

### 2. Erro 404 - Post Não Encontrado
**Request:**
```
GET /api/posts/id-inexistente
```

**Response:**
```json
{
  "success": false,
  "error": "Post não encontrado"
}
```

### 3. Erro 500 - Erro Interno
**Response:**
```json
{
  "success": false,
  "error": "Erro interno do servidor"
}
```

---

## 🔧 Collection do Postman

Para facilitar os testes, você pode criar uma Collection no Postman com estas requisições:

### Collection: "Blog API"

1. **📁 Pasta: "Posts"**
   - `GET` Listar Posts
   - `GET` Buscar Post por ID
   - `POST` Criar Post
   - `PUT` Atualizar Post
   - `DELETE` Deletar Post

2. **📁 Pasta: "Testes"**
   - `POST` Criar Post Completo
   - `POST` Criar Rascunho
   - `PUT` Publicar Post
   - `PUT` Atualização Parcial

### Variáveis de Environment
Crie um Environment com:
- `base_url`: `http://localhost:3000`
- `post_id`: (será preenchido dinamicamente)

### Scripts de Teste
Para capturar o ID do post criado, adicione este script na aba "Tests" da requisição POST:

```javascript
if (pm.response.code === 201) {
    const response = pm.response.json();
    if (response.success && response.data.id) {
        pm.environment.set("post_id", response.data.id);
    }
}
```

---

## 📱 Testando com cURL (Alternativa)

### Listar Posts
```bash
curl -X GET http://localhost:3000/api/posts
```

### Criar Post
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Post via cURL",
    "content": "Conteúdo criado via cURL",
    "published": true
  }'
```

### Atualizar Post
```bash
curl -X PUT http://localhost:3000/api/posts/POST_ID \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Título atualizado via cURL"
  }'
```

### Deletar Post
```bash
curl -X DELETE http://localhost:3000/api/posts/POST_ID
```

---

## ⚡ Dicas para Testes

1. **Sempre teste primeiro** a rota GET para listar posts
2. **Salve os IDs** dos posts criados para usar em outras requisições
3. **Teste cenários de erro** com dados inválidos
4. **Verifique os status codes** das respostas
5. **Use variáveis** no Postman para IDs dinâmicos

---

**🚀 Lembre-se**: Certifique-se de que o servidor Next.js esteja rodando em `http://localhost:3000` antes de fazer os testes!
