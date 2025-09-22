# 🚀 SCRIPT AUTOMÁTICO PARA DEPLOY VIA VS CODE
# =============================================
# Execute este script para preparar tudo automaticamente

param(
    [Parameter(Mandatory=$false)]
    [string]$ProjectId = "",
    
    [Parameter(Mandatory=$false)]
    [string]$Region = "us-central1"
)

Write-Host "🚀 CONFIGURANDO DEPLOY AUTOMÁTICO PARA GOOGLE CLOUD RUN" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

# Função para verificar se comando existe
function Test-Command($command) {
    try {
        Get-Command $command -ErrorAction Stop
        return $true
    } catch {
        return $false
    }
}

# Verificar pré-requisitos
Write-Host "`n📋 VERIFICANDO PRÉ-REQUISITOS..." -ForegroundColor Yellow

if (Test-Command "gcloud") {
    Write-Host "✅ Google Cloud CLI instalado" -ForegroundColor Green
} else {
    Write-Host "❌ Google Cloud CLI não encontrado!" -ForegroundColor Red
    Write-Host "   Instale em: https://cloud.google.com/sdk/docs/install" -ForegroundColor Yellow
    exit 1
}

if (Test-Command "docker") {
    Write-Host "✅ Docker instalado" -ForegroundColor Green
} else {
    Write-Host "❌ Docker não encontrado!" -ForegroundColor Red
    exit 1
}

# Verificar autenticação
Write-Host "`n🔐 VERIFICANDO AUTENTICAÇÃO..." -ForegroundColor Yellow

try {
    $currentAccount = gcloud auth list --filter=status:ACTIVE --format="value(account)" 2>$null
    if ($currentAccount) {
        Write-Host "✅ Autenticado como: $currentAccount" -ForegroundColor Green
    } else {
        throw "Não autenticado"
    }
} catch {
    Write-Host "🔐 Realizando autenticação..." -ForegroundColor Yellow
    gcloud auth login
    gcloud auth application-default login
}

# Listar e selecionar projeto
if (-not $ProjectId) {
    Write-Host "`n📂 PROJETOS DISPONÍVEIS:" -ForegroundColor Yellow
    gcloud projects list --format="table(projectId:label=PROJECT_ID,name:label=NAME,projectNumber:label=NUMBER)"
    
    $ProjectId = Read-Host "`nDigite o PROJECT_ID que deseja usar"
}

# Configurar projeto ativo
Write-Host "`n⚙️ CONFIGURANDO PROJETO: $ProjectId" -ForegroundColor Yellow
gcloud config set project $ProjectId
gcloud config set run/region $Region

# Habilitar APIs necessárias
Write-Host "`n🔌 HABILITANDO APIs NECESSÁRIAS..." -ForegroundColor Yellow

$apis = @(
    "cloudbuild.googleapis.com",
    "run.googleapis.com", 
    "containerregistry.googleapis.com",
    "artifactregistry.googleapis.com"
)

foreach ($api in $apis) {
    Write-Host "   Habilitando $api..." -ForegroundColor Gray
    gcloud services enable $api
}

# Atualizar configurações do Skaffold com projeto real
Write-Host "`n📝 ATUALIZANDO CONFIGURAÇÕES..." -ForegroundColor Yellow

$skaffoldPath = "skaffold.yaml"
if (Test-Path $skaffoldPath) {
    $content = Get-Content $skaffoldPath -Raw
    $content = $content -replace 'projectid: ".*?"', "projectid: `"$ProjectId`""
    Set-Content $skaffoldPath $content
    Write-Host "✅ Skaffold.yaml atualizado com projeto: $ProjectId" -ForegroundColor Green
}

# Configurar Service Account para GitHub Actions
Write-Host "`n🔑 CONFIGURANDO SERVICE ACCOUNT PARA GITHUB ACTIONS..." -ForegroundColor Yellow

$saName = "github-actions-deploy"
$saEmail = "$saName@$ProjectId.iam.gserviceaccount.com"

try {
    # Verificar se service account já existe
    $existingSA = gcloud iam service-accounts list --filter="email:$saEmail" --format="value(email)" 2>$null
    
    if (-not $existingSA) {
        Write-Host "   Criando service account..." -ForegroundColor Gray
        gcloud iam service-accounts create $saName `
            --display-name="GitHub Actions Deploy" `
            --description="Service account para deploy automático via GitHub Actions"
    } else {
        Write-Host "   Service account já existe" -ForegroundColor Gray
    }

    # Configurar permissões necessárias
    Write-Host "   Configurando permissões..." -ForegroundColor Gray
    
    $roles = @(
        "roles/run.admin",
        "roles/storage.admin", 
        "roles/iam.serviceAccountUser",
        "roles/cloudbuild.builds.builder"
    )

    foreach ($role in $roles) {
        gcloud projects add-iam-policy-binding $ProjectId `
            --member="serviceAccount:$saEmail" `
            --role="$role" 2>$null
    }

    # Gerar chave JSON se não existir
    $keyFile = "github-sa-key.json"
    if (-not (Test-Path $keyFile)) {
        Write-Host "   Gerando chave JSON..." -ForegroundColor Gray
        gcloud iam service-accounts keys create $keyFile `
            --iam-account="$saEmail"
        
        Write-Host "`n🔐 IMPORTANTE - CONFIGURAR GITHUB SECRET:" -ForegroundColor Red
        Write-Host "=====================================" -ForegroundColor Red
        Write-Host "1. Acesse: https://github.com/kcsdevops/portal-podal-vera/settings/secrets/actions" -ForegroundColor Yellow
        Write-Host "2. Clique em 'New repository secret'" -ForegroundColor Yellow
        Write-Host "3. Nome: GOOGLE_CLOUD_SA_KEY" -ForegroundColor Yellow
        Write-Host "4. Value: Cole o conteúdo do arquivo github-sa-key.json" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "📄 Conteúdo da chave (COPIE ESTE JSON):" -ForegroundColor Cyan
        Write-Host "=======================================" -ForegroundColor Cyan
        Get-Content $keyFile | Write-Host -ForegroundColor White
        Write-Host "=======================================" -ForegroundColor Cyan
    }

} catch {
    Write-Host "⚠️ Erro ao configurar service account: $($_.Exception.Message)" -ForegroundColor Yellow
    Write-Host "   Configure manualmente seguindo GITHUB-SECRETS-SETUP.md" -ForegroundColor Yellow
}

# Criar .env para desenvolvimento local
Write-Host "`n🌐 CRIANDO ARQUIVO .ENV..." -ForegroundColor Yellow
$envContent = @"
NODE_ENV=production
PORT=8080
GOOGLE_CLOUD_PROJECT=$ProjectId
GOOGLE_CLOUD_REGION=$Region
"@

Set-Content ".env.cloud" $envContent
Write-Host "✅ Arquivo .env.cloud criado" -ForegroundColor Green

Write-Host "`n🎉 CONFIGURAÇÃO COMPLETA!" -ForegroundColor Green
Write-Host "========================" -ForegroundColor Green
Write-Host ""
Write-Host "📖 PRÓXIMOS PASSOS:" -ForegroundColor Cyan
Write-Host "1. Abra Command Palette: Ctrl + Shift + P" -ForegroundColor White
Write-Host "2. Digite: 'Cloud Code: Deploy to Cloud Run'" -ForegroundColor White  
Write-Host "3. Siga o assistente automático" -ForegroundColor White
Write-Host ""
Write-Host "🧪 PARA TESTAR LOCALMENTE:" -ForegroundColor Cyan
Write-Host "1. Command Palette: Ctrl + Shift + P" -ForegroundColor White
Write-Host "2. Digite: 'Cloud Code: Run on Cloud Run Emulator'" -ForegroundColor White
Write-Host ""
Write-Host "📊 PROJETO CONFIGURADO:" -ForegroundColor Cyan
Write-Host "   Projeto: $ProjectId" -ForegroundColor White
Write-Host "   Região: $Region" -ForegroundColor White
Write-Host "   Serviço: veracare-podologia" -ForegroundColor White
Write-Host ""
Write-Host "🔗 URLs ÚTEIS:" -ForegroundColor Cyan
Write-Host "   Console: https://console.cloud.google.com/run?project=$ProjectId" -ForegroundColor White
Write-Host "   Logs: https://console.cloud.google.com/logs?project=$ProjectId" -ForegroundColor White

# Abrir VS Code Command Palette automaticamente
Write-Host "`n🚀 Abrindo VS Code para deploy..." -ForegroundColor Green
Start-Sleep 2
code .