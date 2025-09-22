# 🚀 Deploy para Google Cloud Run - Veracare Site

Este guia explica como fazer deploy da aplicação Veracare no **Google Cloud Run** usando apenas recursos **GRATUITOS**.

## 📋 Pré-requisitos

### 1. Conta Google Cloud
- Crie uma conta gratuita em [cloud.google.com](https://cloud.google.com)
- Ative o **$300 de créditos gratuitos** para novos usuários
- Configure billing (necessário, mas você usará apenas tier gratuito)

### 2. Instalar Google Cloud CLI
- Windows: Baixe em [cloud.google.com/sdk](https://cloud.google.com/sdk/docs/install)
- Execute: `gcloud init` após instalação

### 3. Docker (opcional para deploy manual)
- Baixe em [docker.com](https://www.docker.com/products/docker-desktop)

## 🎯 Recursos Gratuitos Utilizados

| Serviço | Tier Gratuito | Suficiente para |
|---------|---------------|-----------------|
| **Cloud Run** | 2M requests/mês | Site pequeno/médio |
| **Cloud Build** | 120 min/dia | Múltiplos deploys |
| **Container Registry** | 0.5 GB storage | Várias versões |
| **Cloud Storage** | 5 GB | Assets estáticos |

## 🚀 Método 1: Deploy Automático (Recomendado)

### Passo 1: Preparar Ambiente
```powershell
# Execute no PowerShell como administrador
./deploy-gcloud.ps1 -SetupOnly
```

### Passo 2: Deploy
```powershell
# Execute na pasta raiz do projeto
./deploy-gcloud.ps1
```

O script irá:
- ✅ Verificar configurações
- ✅ Habilitar APIs necessárias
- ✅ Fazer build automaticamente
- ✅ Deploy no Cloud Run
- ✅ Fornecer URL da aplicação

## 🛠️ Método 2: Deploy Manual

### Passo 1: Configurar Projeto
```bash
# Autenticar
gcloud auth login

# Criar projeto (substitua PROJECT_ID)
gcloud projects create veracare-site-12345
gcloud config set project veracare-site-12345

# Habilitar APIs
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

### Passo 2: Deploy
```powershell
# Execute o script de deploy manual
./deploy-manual.ps1
```

## 🔧 Configuração Avançada

### Variáveis de Ambiente
1. Copie `.env.production.example` para `.env.production.local`
2. Configure as variáveis conforme necessário
3. As variáveis são automaticamente incluídas no deploy

### Domínio Customizado
```bash
# Mapear domínio customizado
gcloud run domain-mappings create \
  --service veracare-site \
  --domain veracare.com.br \
  --region us-central1
```

### SSL Automático
- Cloud Run fornece SSL gratuito automaticamente
- Certificados são renovados automaticamente

## 📊 Monitoramento

### Logs
```bash
# Ver logs em tempo real
gcloud run services logs tail veracare-site --region=us-central1

# Ver logs no console
https://console.cloud.google.com/run
```

### Métricas
- Acesse: Google Cloud Console > Cloud Run
- Veja: Requests, latência, erros, CPU, memória

## 🔄 Atualizações

### Deploy Nova Versão
```bash
# Método 1: Script automático
./deploy-gcloud.ps1

# Método 2: Cloud Build
gcloud builds submit --config=cloudbuild.yaml

# Método 3: Manual
./deploy-manual.ps1
```

### Rollback
```bash
# Listar revisões
gcloud run revisions list --service=veracare-site --region=us-central1

# Fazer rollback
gcloud run services update-traffic veracare-site \
  --to-revisions=REVISION_NAME=100 \
  --region=us-central1
```

## 💰 Controle de Custos

### Configurações de Economia
- **Min instances**: 0 (escala para zero quando não usado)
- **Max instances**: 10 (limite de escala)
- **Memory**: 512Mi (suficiente para Next.js)
- **CPU**: 1 (adequado para sites pequenos/médios)

### Alertas de Billing
```bash
# Criar alerta de billing
gcloud alpha billing budgets create \
  --billing-account=BILLING_ACCOUNT_ID \
  --display-name="Veracare Budget" \
  --budget-amount=10USD
```

## 🆘 Troubleshooting

### Problemas Comuns

#### Build Falhando
```bash
# Verificar logs
gcloud builds list
gcloud builds log BUILD_ID
```

#### Serviço Não Respondendo
```bash
# Verificar status
gcloud run services describe veracare-site --region=us-central1

# Verificar logs
gcloud run services logs tail veracare-site --region=us-central1
```

#### Erro de Permissões
```bash
# Verificar IAM
gcloud projects get-iam-policy PROJECT_ID
```

### Comandos Úteis

```bash
# Listar serviços
gcloud run services list

# Deletar serviço
gcloud run services delete veracare-site --region=us-central1

# Ver configuração atual
gcloud run services describe veracare-site --region=us-central1

# Atualizar configuração
gcloud run services update veracare-site \
  --memory=1Gi \
  --region=us-central1
```

## 🔐 Segurança

### Headers de Segurança
O Next.js inclui automaticamente:
- CSRF Protection
- XSS Protection
- Content Security Policy

### HTTPS
- Cloud Run força HTTPS automaticamente
- Certificados SSL gratuitos e automáticos

### Variáveis Secretas
```bash
# Para dados sensíveis, use Secret Manager
gcloud secrets create DATABASE_URL --data-file=secret.txt
```

## 📈 Performance

### Cache
- Cloud Run inclui cache automático
- Next.js otimiza assets automaticamente

### CDN
```bash
# Para melhor performance global, configure Cloud CDN
gcloud compute backend-services create veracare-backend \
  --global \
  --load-balancing-scheme=EXTERNAL
```

## 📞 Suporte

### Documentação Oficial
- [Cloud Run Docs](https://cloud.google.com/run/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

### Comunidade
- [Stack Overflow](https://stackoverflow.com/questions/tagged/google-cloud-run)
- [Google Cloud Community](https://cloud.google.com/community)

---

## ✅ Checklist Final

Antes do deploy em produção:

- [ ] Testado localmente com `npm run build`
- [ ] Configuradas variáveis de ambiente
- [ ] Verificado domínio customizado
- [ ] Configurado monitoramento
- [ ] Testado rollback
- [ ] Configurado alertas de billing
- [ ] Backup de configurações

---

**🎉 Parabéns! Sua aplicação está rodando no Google Cloud Run!**

💡 **Dica**: O Cloud Run escala automaticamente para zero quando não há tráfego, então você só paga pelo que usar!