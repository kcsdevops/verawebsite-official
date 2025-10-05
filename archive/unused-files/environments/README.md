# Veracare - Ambientes Docker

Este projeto possui dois ambientes separados com Docker: Desenvolvimento (DEV) e Produção (PROD).

## Estrutura dos Ambientes

```
environments/
├── dev/           # Ambiente de desenvolvimento
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── .env
└── prod/          # Ambiente de produção
    ├── Dockerfile
    ├── docker-compose.yml
    ├── .env
    └── nginx.conf
```

## Ambiente de Desenvolvimento (DEV)

### Iniciar

```bash
npm run docker:dev
```

### Parar

```bash
npm run docker:dev:down
```

### Reconstruir

```bash
npm run docker:build:dev
```

**Características:**

- Hot reload automático
- Volumes montados para desenvolvimento
- Porta 3000 exposta
- Ambiente de desenvolvimento do Next.js

## Ambiente de Produção (PROD)

### Iniciar

```bash
npm run docker:prod
```

### Parar

```bash
npm run docker:prod:down
```

### Reconstruir

```bash
npm run docker:build:prod
```

**Características:**

- Build otimizado para produção
- Nginx como proxy reverso
- SSL/TLS pronto (configurar certificados)
- Cache de arquivos estáticos
- Reinício automático em caso de falha

## Configuração de Variáveis de Ambiente

### Desenvolvimento

Edite o arquivo `environments/dev/.env`:

```env
NODE_ENV=development
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000

# Configure suas chaves do Firebase para desenvolvimento
NEXT_PUBLIC_FIREBASE_API_KEY=your_dev_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_dev_project.firebaseapp.com

# Configure sua chave do Mercado Pago para desenvolvimento
REACT_APP_MP_PUBLISHABLE_KEY=TEST-1234567890123456-123456-1234567890123456789
```

### Produção

Edite o arquivo `environments/prod/.env`:

```env
NODE_ENV=production
NEXT_PUBLIC_ENV=production
NEXT_PUBLIC_API_URL=https://yourdomain.com

# Configure suas chaves do Firebase para produção
NEXT_PUBLIC_FIREBASE_API_KEY=your_prod_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_prod_project.firebaseapp.com

# Configure sua chave do Mercado Pago para produção
REACT_APP_MP_PUBLISHABLE_KEY=APP_USR-1234567890123456-123456-1234567890123456789
```

## Desenvolvimento Local (sem Docker)

Para desenvolvimento sem Docker, use os comandos padrão:

```bash
npm install
npm run dev
```

## URLs dos Ambientes

- **Desenvolvimento**: http://localhost:3000
- **Produção**: http://localhost (porta 80) ou https://localhost (porta 443)

## Comandos Úteis

### Ver logs do container

```bash
# Desenvolvimento
cd environments/dev && docker-compose logs -f

# Produção
cd environments/prod && docker-compose logs -f
```

### Acessar container

```bash
# Desenvolvimento
cd environments/dev && docker-compose exec veracare-dev sh

# Produção
cd environments/prod && docker-compose exec veracare-prod sh
```

### Limpar containers e volumes

```bash
# Desenvolvimento
cd environments/dev && docker-compose down -v

# Produção
cd environments/prod && docker-compose down -v
```

## Segurança

- Nunca commite arquivos `.env` no Git
- Use chaves diferentes para DEV e PROD
- Configure certificados SSL para produção
- Mantenha as imagens Docker atualizadas

## Troubleshooting

### Porta já em uso

Se a porta 3000 estiver ocupada:

```bash
# Mate processos na porta 3000
sudo lsof -ti:3000 | xargs kill -9

# Ou use uma porta diferente no docker-compose.yml
```

### Problemas de permissão

```bash
# No Linux/Mac
sudo chown -R $USER:$USER .

# No Windows (PowerShell como admin)
# Execute: icacls . /grant $env:USERNAME:F /T
```

### Cache do Next.js

```bash
# Limpar cache
rm -rf .next
npm run docker:dev
```
