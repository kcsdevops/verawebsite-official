# Veracare - Portal e Agendamento Separados

Este projeto foi dividido em dois sistemas independentes: **Portal** (site institucional) e **Agendamento** (sistema de reservas).

## 📁 Estrutura do Projeto

```
veracare/
├── apps/
│   ├── portal/                    # 🏢 Site institucional
│   │   ├── pages/                # Páginas do portal (home, contato, serviços)
│   │   ├── environments/         # Docker para portal
│   │   └── package.json          # Dependências do portal
│   └── agendamento/              # 📅 Sistema de agendamento
│       ├── pages/                # Páginas do agendamento (admin, checkout, etc.)
│       ├── environments/         # Docker para agendamento
│       └── package.json          # Dependências do agendamento
├── environments/                 # 🐳 Docker (ambiente combinado)
├── components/                   # 🧩 Componentes compartilhados
├── hooks/                        # 🎣 Hooks customizados
├── ui/                          # 🎨 Componentes de UI
├── services/                     # 🔧 Serviços (Firebase, etc.)
└── utils/                        # 🛠️ Utilitários
```

## 🚀 Como Usar

### Desenvolvimento Separado

**Portal (porta 3001):**
```bash
npm run portal:dev
```
Acesse: http://localhost:3001

**Agendamento (porta 3002):**
```bash
npm run agendamento:dev
```
Acesse: http://localhost:3002

**Ambos ao mesmo tempo:**
```bash
npm run dev:all
```

### Produção Separada

**Portal em produção:**
```bash
npm run portal:prod
```
Acesse: http://localhost:81

**Agendamento em produção:**
```bash
npm run agendamento:prod
```
Acesse: http://localhost:82

**Ambos em produção:**
```bash
npm run prod:all
```

## 🔧 Desenvolvimento

### Trabalhando no Portal
```bash
cd apps/portal
npm install
npm run dev
```

### Trabalhando no Agendamento
```bash
cd apps/agendamento
npm install
npm run dev
```

## 🐳 Docker

Cada aplicação tem seus próprios ambientes Docker:

### Portal
```bash
cd apps/portal/environments/dev
docker-compose up --build
```

### Agendamento
```bash
cd apps/agendamento/environments/dev
docker-compose up --build
```

## 📦 Dependências

### Portal
- Next.js 14.2.5
- React 18.2.0
- Styled Components
- Tailwind CSS

### Agendamento
- Next.js 14.2.5
- React 18.2.0
- Material-UI v4
- Firebase
- Mercado Pago
- React Router DOM

## 🔗 Integração

Os sistemas podem se comunicar através de:
- APIs REST
- Shared components
- Common utilities
- Environment variables

## 🌍 URLs de Produção

- **Portal**: https://portal.veracare.com
- **Agendamento**: https://agendamento.veracare.com

## 📋 Checklist de Deploy

### Portal
- [ ] Configurar domínio
- [ ] SSL certificate
- [ ] Environment variables
- [ ] Analytics
- [ ] SEO optimization

### Agendamento
- [ ] Firebase configuration
- [ ] Mercado Pago setup
- [ ] Database setup
- [ ] Admin credentials
- [ ] Email notifications

## 🛠️ Troubleshooting

### Portas ocupadas
```bash
# Verificar portas
netstat -ano | findstr :3001
netstat -ano | findstr :3002

# Matar processo
taskkill /PID <PID> /F
```

### Cache do Next.js
```bash
# Limpar cache
rm -rf .next
npm run dev
```

### Dependências
```bash
# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

## 🤝 Contribuição

1. **Portal**: Trabalhe na branch `feature/portal-*`
2. **Agendamento**: Trabalhe na branch `feature/agendamento-*`
3. Faça PR para `main` quando pronto

## 📞 Suporte

- **Portal**: Issues relacionadas ao site institucional
- **Agendamento**: Issues relacionadas ao sistema de reservas
- **Infraestrutura**: Issues relacionadas ao Docker/deploy
