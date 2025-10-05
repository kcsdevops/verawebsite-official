# Dockerfile para ambiente de produção
FROM node:18-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production --legacy-peer-deps

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Produção
FROM node:18-alpine AS runner

WORKDIR /app

# Copiar arquivos necessários
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Expor porta
EXPOSE 3000

# Comando para iniciar em modo produção
CMD ["npm", "start"]
