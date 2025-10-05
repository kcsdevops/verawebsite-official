# 🚀 GUIA DE DEPLOY AZURE CONTAINER APPS

## ✅ Sistema Preparado para Deploy

### 📋 Arquivos Criados:
- ✅ `Dockerfile` - Otimizado para produção
- ✅ `next.config.js` - Configurado com output standalone
- ✅ `deploy-azure.ps1` - Script PowerShell de deploy
- ✅ `deploy-azure.sh` - Script Bash de deploy
- ✅ `azure-container-app.yaml` - Configurações detalhadas

## 🎯 Azure Container Apps - Menor Custo

### 💰 Configuração Econômica:
- **CPU**: 0.25 cores (mínimo)
- **RAM**: 0.5 GB (suficiente para Next.js)
- **Replicas**: 0-2 (scale to zero quando não usar)
- **SKU**: Basic (menor custo)

### 💵 Custo Estimado Mensal:
- **CPU**: ~$5-10/mês
- **RAM**: ~$2-5/mês  
- **Ingress**: ~$1-2/mês
- **Registry**: ~$5/mês
- **TOTAL**: ~$13-22/mês USD

## 🚀 Como Fazer Deploy

### Opção 1: PowerShell (Recomendado)
```powershell
# Execute no PowerShell:
.\deploy-azure.ps1
```

### Opção 2: Bash/WSL
```bash
# Execute no WSL ou Git Bash:
chmod +x deploy-azure.sh
./deploy-azure.sh
```

### Opção 3: Manual via Azure CLI
```bash
# 1. Login
az login

# 2. Criar Resource Group
az group create --name rg-veracare-prod --location eastus

# 3. Criar Registry
az acr create --resource-group rg-veracare-prod --name acrveracare --sku Basic

# 4. Build imagem
az acr build --registry acrveracare --image veracareapp:latest --file Dockerfile .

# 5. Criar Environment
az containerapp env create --name veracare-env --resource-group rg-veracare-prod --location eastus

# 6. Deploy Container App
az containerapp create \
  --name veracare-app \
  --resource-group rg-veracare-prod \
  --environment veracare-env \
  --image acrveracare.azurecr.io/veracareapp:latest \
  --target-port 3000 \
  --ingress external \
  --min-replicas 0 \
  --max-replicas 2 \
  --cpu 0.25 \
  --memory 0.5Gi
```

## 📋 Pré-requisitos

### 1. Azure CLI
```powershell
# Instalar Azure CLI:
# Windows: https://aka.ms/installazure
# Ou via winget:
winget install Microsoft.AzureCLI
```

### 2. Azure Subscription
- Conta Azure ativa
- Subscription com permissões de Contributor

### 3. Container Apps Extension
```bash
az extension add --name containerapp
```

## 🔧 Configurações Importantes

### Variáveis de Ambiente (Produção):
```env
NODE_ENV=production
NEXTAUTH_URL=https://veracare-app.[região].azurecontainerapps.io
NEXTAUTH_SECRET=[gerado automaticamente]
JWT_SECRET=[gerado automaticamente]  
ADMIN_PASSWORD_HASH=[hash da senha AdminVeraCare2025!]
```

### Secrets Configurados:
- `nextauth-secret` - Chave de 32+ caracteres
- `jwt-secret` - Chave de 32+ caracteres  
- `admin-password` - Hash bcrypt da senha admin

## 🌐 Após o Deploy

### 1. URL da Aplicação:
```
https://veracare-app.[região].azurecontainerapps.io
```

### 2. Login Admin:
- **Usuário**: admin
- **Senha**: AdminVeraCare2025!

### 3. Funcionalidades Disponíveis:
- ✅ Hero banner animado
- ✅ Sistema de agendamento
- ✅ Cases de sucesso
- ✅ Painel administrativo
- ✅ Login social (OAuth configurado)
- ✅ Sistema de segurança JWT

## 🔍 Monitoramento

### Ver Status:
```bash
az containerapp show --name veracare-app --resource-group rg-veracare-prod
```

### Ver Logs:
```bash
az containerapp logs show --name veracare-app --resource-group rg-veracare-prod
```

### Escalar:
```bash
az containerapp update \
  --name veracare-app \
  --resource-group rg-veracare-prod \
  --min-replicas 1 \
  --max-replicas 5
```

## 🛠️ Manutenção

### Atualizar Aplicação:
```bash
# 1. Build nova versão
az acr build --registry acrveracare --image veracareapp:v2 --file Dockerfile .

# 2. Atualizar container app
az containerapp update \
  --name veracare-app \
  --resource-group rg-veracare-prod \
  --image acrveracare.azurecr.io/veracareapp:v2
```

### Backup dos Dados:
- Dados em memória (será perdido ao reiniciar)
- Para persistência: implementar Azure Storage/Database

## 🎉 Pronto para Deploy!

Execute o comando:
```powershell
.\deploy-azure.ps1
```

E aguarde ~5-10 minutos para o sistema ficar online! 🚀