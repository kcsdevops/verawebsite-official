# 🚀 GUIA COMPLETO: Deploy Veracare via VS Code + Cloud Code
# ================================================================

## 📋 PRÉ-REQUISITOS VERIFICADOS ✅
- ✅ Cloud Code Extension instalada
- ✅ Docker funcionando (v28.3.0)
- ✅ Google Cloud CLI instalado (v535.0.0)
- ✅ Arquivos de configuração criados

## 🔧 CONFIGURAÇÃO INICIAL

### 1. Autenticação Google Cloud
```powershell
# Execute no terminal do VS Code:
gcloud auth login
gcloud auth application-default login
```

### 2. Configurar Projeto
```powershell
# Listar projetos disponíveis:
gcloud projects list

# Definir projeto ativo:
gcloud config set project SEU-PROJECT-ID

# Definir região padrão:
gcloud config set run/region us-central1
```

## 🌐 DEPLOY VIA VS CODE (Método Recomendado)

### Método 1: Deploy Direto (Mais Fácil)
1. **Abra Command Palette**: `Ctrl + Shift + P`
2. **Digite**: `Cloud Code: Deploy to Cloud Run`
3. **Siga o assistente**:
   - Selecione o projeto Google Cloud
   - Confirme a região (us-central1)
   - Nome do serviço: `veracare-podologia`
   - Aguarde o build e deploy automático

### Método 2: Deploy via Skaffold
1. **Command Palette**: `Ctrl + Shift + P`
2. **Digite**: `Skaffold: Deploy to Cloud Run`
3. **Perfil de produção será usado automaticamente**

## 🧪 DESENVOLVIMENTO LOCAL

### Emular Cloud Run Localmente
1. **Command Palette**: `Ctrl + Shift + P`
2. **Digite**: `Cloud Code: Run on Cloud Run Emulator`
3. **Acesse**: http://localhost:8080

### Debug Local
1. **Command Palette**: `Ctrl + Shift + P`
2. **Digite**: `Cloud Code: Debug on Cloud Run Emulator`
3. **Defina breakpoints e debug normalmente**

## ⚡ COMANDOS RÁPIDOS (Terminal)

### Deploy Rápido via CLI
```powershell
# Build e Deploy em um comando:
gcloud run deploy veracare-podologia \
  --source . \
  --region us-central1 \
  --platform managed \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --port 3000 \
  --allow-unauthenticated
```

### Monitoramento
```powershell
# Ver logs em tempo real:
gcloud run services logs tail veracare-podologia --region us-central1

# Status do serviço:
gcloud run services describe veracare-podologia --region us-central1
```

## 🔑 APIS NECESSÁRIAS

Execute para habilitar todas as APIs:
```powershell
gcloud services enable \
  cloudbuild.googleapis.com \
  run.googleapis.com \
  containerregistry.googleapis.com \
  artifactregistry.googleapis.com
```

## 🎯 CONFIGURAÇÕES DE PRODUÇÃO

### Variáveis de Ambiente
No Cloud Code ou via CLI:
- `NODE_ENV=production`
- `PORT=8080`

### Recursos Otimizados
- **CPU**: 1 vCPU
- **Memória**: 512Mi
- **Concorrência**: 80 requests simultâneas
- **Auto-scaling**: 0-10 instâncias

## 🆘 TROUBLESHOOTING

### Erro de Autenticação
```powershell
gcloud auth revoke --all
gcloud auth login
gcloud auth application-default login
```

### Erro de Permissões
Verifique se sua conta tem as roles:
- Cloud Run Admin
- Storage Admin
- Cloud Build Editor

### Erro de Região
```powershell
gcloud config set run/region us-central1
```

## 📊 MONITORAMENTO PÓS-DEPLOY

1. **Acesse**: https://console.cloud.google.com/run
2. **Clique no serviço**: veracare-podologia
3. **Monitore**: Requests, Latência, Erros
4. **Logs**: Visualize logs em tempo real

## 🔄 FLUXO DE DESENVOLVIMENTO

1. **Desenvolvimento**: Use Cloud Run Emulator
2. **Teste**: Deploy para ambiente de teste
3. **Produção**: Deploy final via Cloud Code
4. **Monitoramento**: Acompanhe métricas

---
*Configurado automaticamente pelo assistente para deploy otimizado via VS Code* 🤖