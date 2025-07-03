# 🔑 Como Conseguir IDs da Vercel - Passo a Passo

## 🎯 **Método Mais Fácil: Dashboard da Vercel**

### **1. 🏠 PROJECT_ID (ID do Projeto)**

**Passo a passo:**
1. Vá para: https://vercel.com/dashboard
2. **Clique no seu projeto** (aquele que tem seu portfólio)
3. Clique na aba **"Settings"** (configurações)
4. Role para baixo até encontrar **"Project ID"**
5. **Copie o ID** (começa com `prj_`)

```
Exemplo: prj_1a2b3c4d5e6f7g8h9i0j
```

### **2. 👤 ORG_ID (ID da Organização/Conta)**

**Passo a passo:**
1. No canto superior direito, clique no **seu avatar/foto**
2. Clique em **"Account Settings"** ou **"Personal Account Settings"**
3. Na aba **"General"**, procure por **"Your ID"** ou **"Account ID"**
4. **Copie o ID** (pode começar com `team_` ou outro prefixo)

```
Exemplo: team_1a2b3c4d5e6f7g8h9i0j
```

### **3. 🔐 VERCEL_TOKEN (Token de Acesso)**

**Passo a passo:**
1. Ainda nas configurações da conta (**Account Settings**)
2. Clique na aba **"Tokens"**
3. Clique em **"Create"** ou **"New Token"**
4. Dê um nome: `GitHub Actions`
5. **Copie o token** (começa com `vercel_`)
6. ⚠️ **CUIDADO:** Só aparece uma vez! Guarde bem!

```
Exemplo: vercel_1a2b3c4d5e6f7g8h9i0j...
```

---

## 🛠️ **Método Alternativo: Vercel CLI**

Se o dashboard não estiver mostrando os IDs claramente:

### **Instalar CLI:**
```bash
npm i -g vercel
```

### **Fazer login:**
```bash
vercel login
```

### **Linkar projeto:**
```bash
# Na pasta do seu projeto
vercel link
```

**O comando `vercel link` vai mostrar:**
```
? Link to existing project? Yes
? What's the name of your existing project? seu-portfolio
✅  Linked to your-org/seu-portfolio (created .vercel folder)

# Depois vai mostrar os IDs que você precisa!
```

### **Ver IDs salvos:**
```bash
# Ver conteúdo do arquivo .vercel/project.json
cat .vercel/project.json
```

Vai mostrar algo como:
```json
{
  "orgId": "team_1a2b3c4d5e6f7g8h9i0j",
  "projectId": "prj_1a2b3c4d5e6f7g8h9i0j"
}
```

---

## 🔐 **Configurar Secrets no GitHub**

Depois de conseguir os 3 valores:

### **1. Ir para configurações do repositório:**
```
https://github.com/SEU_USUARIO/SEU_REPO/settings/secrets/actions
```

### **2. Adicionar 3 secrets:**

| Nome do Secret | Valor | Exemplo |
|----------------|-------|---------|
| `VERCEL_TOKEN` | `vercel_1a2b...` | Token que você criou |
| `VERCEL_ORG_ID` | `team_1a2b...` | ID da sua conta |
| `VERCEL_PROJECT_ID` | `prj_1a2b...` | ID do projeto |

### **3. Clicar em "Add secret" para cada um**

---

## 🚨 **Se Ainda Estiver Difícil...**

### **🟢 Opção Mais Simples:**

1. **Delete** o arquivo `ci-cd.yml`:
   ```bash
   rm .github/workflows/ci-cd.yml
   ```

2. **Mantenha apenas** o `tests-only.yml`

3. **Faça commit e push:**
   ```bash
   git add .
   git commit -m "feat: configurar apenas testes automáticos"
   git push
   ```

4. **Resultado:**
   - ✅ GitHub Actions roda os testes
   - ✅ Vercel continua fazendo deploy como sempre
   - ✅ Zero configuração extra!

---

## 🎯 **Visual do que procurar:**

### **No Dashboard da Vercel:**
```
📱 Dashboard
├── 📁 Seus Projetos
│   └── 🎯 Seu Portfólio
│       └── ⚙️ Settings
│           └── 📋 General
│               └── 🔑 Project ID: prj_xxxxx
│
└── 👤 Seu Avatar (canto superior direito)
    └── ⚙️ Account Settings  
        ├── 📋 General
        │   └── 🔑 Your ID: team_xxxxx
        └── 🔐 Tokens
            └── ➕ Create Token
```

---

## 🎉 **Dica Final:**

**Se estiver complicado, vá com a Opção 1!**
- 🎯 Funciona 100%
- 🔧 Zero configuração
- 🚀 Você já ganha muito valor
- 📚 Aprende GitHub Actions sem complicação

**Depois que dominar, evolui para Opção 2!** 

---

**Quer tentar conseguir os IDs ou prefere ir com a Opção 1?** 🤔 