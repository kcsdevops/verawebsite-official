# 🔐 CONFIGURAÇÃO DE SECRETS GITHUB PARA DEPLOY AUTOMÁTICO

## 📋 Secrets Necessários

Para o deploy automático funcionar, você precisa configurar o seguinte secret no GitHub:

### 1. `GOOGLE_CLOUD_SA_KEY`

Este é o JSON da Service Account do Google Cloud que permite deploy automático.

## 🔧 COMO CONFIGURAR

### Passo 1: Criar Service Account no Google Cloud

```bash
# 1. Definir variáveis
export PROJECT_ID="veracare-podologia"
export SA_NAME="github-actions-deploy"
export SA_EMAIL="$SA_NAME@$PROJECT_ID.iam.gserviceaccount.com"

# 2. Criar service account
gcloud iam service-accounts create $SA_NAME \
  --display-name="GitHub Actions Deploy" \
  --description="Service account para deploy automático via GitHub Actions"

# 3. Dar permissões necessárias
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SA_EMAIL" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SA_EMAIL" \
  --role="roles/storage.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SA_EMAIL" \
  --role="roles/iam.serviceAccountUser"

# 4. Gerar chave JSON
gcloud iam service-accounts keys create key.json \
  --iam-account=$SA_EMAIL

# 5. Mostrar conteúdo da chave (copie este JSON)
cat key.json
```

### Passo 2: Configurar Secret no GitHub

1. **Acesse seu repositório**: https://github.com/kcsdevops/verapodalespecial
2. **Vá em Settings** → **Secrets and variables** → **Actions**
3. **Clique em "New repository secret"**
4. **Nome**: `GOOGLE_CLOUD_SA_KEY`
5. **Value**: Cole o conteúdo completo do arquivo `key.json`
6. **Clique em "Add secret"**

### Passo 3: Verificar Projeto Google Cloud

Certifique-se de que o projeto `veracare-podologia` existe:

```bash
# Listar projetos
gcloud projects list

# Se não existir, criar:
gcloud projects create veracare-podologia \
  --name="Veracare Podologia" \
  --set-as-default

# Habilitar APIs necessárias
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

## ⚡ SCRIPT AUTOMÁTICO

Execute este script PowerShell para configurar tudo automaticamente:

```powershell
# Execute no terminal do seu projeto:
.\deploy-setup.ps1
```

## 🔄 COMO FUNCIONA O DEPLOY AUTOMÁTICO

### Triggers
- ✅ **Push para master/main**: Deploy automático para produção
- ✅ **Pull Request**: Deploy de preview para testes
- ✅ **Workflow manual**: Deploy sob demanda

### Fluxo
1. **Build**: npm install + npm run build
2. **Test**: Executa testes se disponíveis
3. **Deploy**: Deploy direto para Cloud Run
4. **Verify**: Teste de saúde da aplicação
5. **Notify**: Comentário automático no PR

### Recursos Configurados
- **CPU**: 1 vCPU
- **Memória**: 512Mi
- **Auto-scaling**: 0-10 instâncias
- **Região**: us-central1
- **URL**: https://veracare-podologia-us-central1.a.run.app

## 🧪 TESTANDO O DEPLOY

1. **Faça um commit e push**:
   ```bash
   git add .
   git commit -m "test: trigger deploy automático"
   git push origin master
   ```

2. **Acompanhe o deploy**:
   - GitHub: https://github.com/kcsdevops/verapodalespecial/actions
   - Cloud Run: https://console.cloud.google.com/run?project=veracare-podologia

3. **Acesse a aplicação**:
   - URL será mostrada nos logs do GitHub Actions

## 🛠️ TROUBLESHOOTING

### Erro: "Project not found"
```bash
gcloud config set project veracare-podologia
```

### Erro: "Service account permissions"
Re-execute os comandos de permissões do Passo 1.

### Erro: "API not enabled"
```bash
gcloud services enable cloudbuild.googleapis.com run.googleapis.com
```

### Erro: "Secret not found"
Verifique se o secret `GOOGLE_CLOUD_SA_KEY` foi configurado corretamente no GitHub.

## 📊 MONITORAMENTO

- **Logs**: https://console.cloud.google.com/logs?project=veracare-podologia
- **Métricas**: https://console.cloud.google.com/monitoring?project=veracare-podologia
- **Cloud Run**: https://console.cloud.google.com/run?project=veracare-podologia

---

**🎯 Resultado**: Deploy automático completo sempre que você fizer push para master! 🚀