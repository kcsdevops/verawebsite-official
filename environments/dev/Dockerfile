# Dockerfile para ambiente de desenvolvimento
FROM node:18-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install --legacy-peer-deps

# Copiar código fonte
COPY . .

# Expor porta
EXPOSE 3000

# Comando para iniciar em modo desenvolvimento
CMD ["npm", "run", "dev"]
