# Dockerfile para o projeto de portfólio Next.js

# ========================================
# ETAPA 1: Preparar o ambiente base
# ========================================
# Usamos a imagem oficial do Node.js versão 18 baseada no Alpine Linux
# Alpine é uma distribuição Linux muito leve, ideal para containers
FROM node:18-alpine AS base

# Instala algumas dependências que podem ser necessárias
# libc6-compat: compatibilidade com bibliotecas C
RUN apk add --no-cache libc6-compat

# Define o diretório de trabalho dentro do container
# Todos os comandos seguintes serão executados neste diretório
WORKDIR /app

# ========================================
# ETAPA 2: Instalar dependências
# ========================================
FROM base AS deps

# Copia apenas os arquivos de dependências primeiro
# Isso permite que o Docker use cache se as dependências não mudaram
COPY package*.json ./

# Instala as dependências
# --frozen-lockfile garante que as versões sejam exatamente as do package-lock.json
RUN npm ci

# ========================================
# ETAPA 3: Construir a aplicação
# ========================================
FROM base AS builder

# Copia os arquivos de dependências
COPY package*.json ./

# Instala TODAS as dependências (incluindo devDependencies para build)
RUN npm ci

# Copia todo o código fonte da aplicação
COPY . .

# Define variável de ambiente para build
ENV NEXT_TELEMETRY_DISABLED=1

# Roda o comando de build do Next.js
# Isso cria a versão otimizada para produção
RUN npm run build

# ========================================
# ETAPA 4: Imagem final para produção
# ========================================
FROM base AS runner

# Define a variável de ambiente para produção
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Cria um usuário não-root por segurança
# É uma boa prática não rodar aplicações como root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia os arquivos necessários da etapa de build
# .next/standalone: versão otimizada da aplicação (se disponível)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# .next/static: arquivos estáticos (CSS, JS, imagens)
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# public: arquivos públicos (imagens, ícones, etc.)
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Muda para o usuário não-root
USER nextjs

# Expõe a porta 3000 (porta padrão do Next.js)
EXPOSE 3000

# Define a porta como variável de ambiente
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Comando para iniciar a aplicação
CMD ["node", "server.js"] 