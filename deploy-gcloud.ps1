# Deploy para Google Cloud Run - Veracare Site
# Este script automatiza o processo de deploy para o Google Cloud

param(
    [Parameter(Mandatory=$false)]
    [string]$ProjectId = "",
    
    [Parameter(Mandatory=$false)]
    [string]$Region = "us-central1",
    
    [Parameter(Mandatory=$false)]
    [switch]$SetupOnly,
    
    [Parameter(Mandatory=$false)]
    [switch]$DeployOnly
)

# Cores para output
$Red = "`e[31m"
$Green = "`e[32m"
$Yellow = "`e[33m"
$Blue = "`e[34m"
$Reset = "`e[0m"

function Write-ColorText {
    param($Text, $Color)
    Write-Host "${Color}${Text}${Reset}"
}

function Write-Step {
    param($Text)
    Write-ColorText "🔧 $Text" $Blue
}

function Write-Success {
    param($Text)
    Write-ColorText "✅ $Text" $Green
}

function Write-Warning {
    param($Text)
    Write-ColorText "⚠️  $Text" $Yellow
}

function Write-Error {
    param($Text)
    Write-ColorText "❌ $Text" $Red
}

Write-ColorText @"
🚀 VERACARE SITE - DEPLOY PARA GOOGLE CLOUD RUN
================================================
Este script irá configurar e fazer deploy da aplicação no Google Cloud Run
Usando recursos do tier gratuito do Google Cloud
"@ $Blue

# Verificar se gcloud está instalado
Write-Step "Verificando se Google Cloud CLI está instalado..."
try {
    $gcloudVersion = gcloud version --format="value(Google Cloud SDK)" 2>$null
    if ($gcloudVersion) {
        Write-Success "Google Cloud CLI encontrado: $gcloudVersion"
    } else {
        throw "Google Cloud CLI não encontrado"
    }
} catch {
    Write-Error "Google Cloud CLI não está instalado!"
    Write-ColorText @"
Por favor, instale o Google Cloud CLI primeiro:
1. Acesse: https://cloud.google.com/sdk/docs/install
2. Faça o download e instale
3. Execute: gcloud init
4. Execute novamente este script
"@ $Yellow
    exit 1
}

# Verificar se está autenticado
Write-Step "Verificando autenticação..."
try {
    $authAccount = gcloud auth list --filter=status:ACTIVE --format="value(account)" 2>$null
    if ($authAccount) {
        Write-Success "Autenticado como: $authAccount"
    } else {
        throw "Não autenticado"
    }
} catch {
    Write-Warning "Não está autenticado no Google Cloud"
    Write-Step "Iniciando processo de autenticação..."
    gcloud auth login
}

# Configurar projeto
if (-not $ProjectId) {
    Write-Step "Listando projetos disponíveis..."
    gcloud projects list --format="table(projectId,name,lifecycleState)"
    
    $ProjectId = Read-Host "`nDigite o ID do projeto que deseja usar (ou deixe vazio para criar novo)"
    
    if (-not $ProjectId) {
        $ProjectId = Read-Host "Digite o ID para o novo projeto (ex: veracare-site-12345)"
        Write-Step "Criando novo projeto: $ProjectId"
        gcloud projects create $ProjectId --name="Veracare Site"
        Write-Success "Projeto criado com sucesso!"
    }
}

# Configurar projeto ativo
Write-Step "Configurando projeto ativo: $ProjectId"
gcloud config set project $ProjectId

# Verificar se billing está habilitado
Write-Step "Verificando billing..."
$billingEnabled = gcloud billing projects describe $ProjectId --format="value(billingEnabled)" 2>$null
if ($billingEnabled -ne "True") {
    Write-Warning "Billing não está habilitado para este projeto"
    Write-ColorText @"
Para usar o Google Cloud Run, você precisa habilitar o billing:
1. Acesse: https://console.cloud.google.com/billing
2. Associe uma conta de billing ao projeto
3. Nota: O Cloud Run tem um tier gratuito generoso!
"@ $Yellow
    
    $continue = Read-Host "Deseja continuar mesmo assim? (y/n)"
    if ($continue -ne "y") {
        exit 1
    }
}

if ($SetupOnly) {
    Write-Success "Setup concluído! Execute o script novamente com -DeployOnly para fazer o deploy"
    exit 0
}

# Habilitar APIs necessárias
Write-Step "Habilitando APIs necessárias..."
$apis = @(
    "cloudbuild.googleapis.com",
    "run.googleapis.com",
    "containerregistry.googleapis.com"
)

foreach ($api in $apis) {
    Write-Step "Habilitando $api..."
    gcloud services enable $api
    Write-Success "$api habilitada"
}

# Build e Deploy
Write-Step "Iniciando build e deploy..."
Write-ColorText @"
🔨 INICIANDO BUILD
- Utilizando Google Cloud Build
- Imagem será armazenada no Container Registry
- Deploy automático para Cloud Run
"@ $Blue

try {
    # Submeter build
    gcloud builds submit --config=cloudbuild.yaml --substitutions=_REGION=$Region
    Write-Success "Build e deploy concluídos com sucesso!"
    
    # Obter URL do serviço
    Write-Step "Obtendo URL do serviço..."
    $serviceUrl = gcloud run services describe veracare-site --region=$Region --format="value(status.url)"
    
    Write-ColorText @"
🎉 DEPLOY CONCLUÍDO COM SUCESSO!
================================
URL da aplicação: $serviceUrl

📊 RECURSOS UTILIZADOS (TIER GRATUITO):
- Cloud Run: 2 milhões de requests/mês
- Cloud Build: 120 minutos/dia
- Container Registry: 0.5 GB storage

🔧 PRÓXIMOS PASSOS:
1. Acesse a URL acima para ver sua aplicação
2. Configure domínio customizado se necessário
3. Configure monitoring e alertas

💡 DICAS:
- O Cloud Run escala automaticamente para zero
- Você só paga pelo que usar
- Logs disponíveis no Cloud Console
"@ $Green

} catch {
    Write-Error "Erro durante o build/deploy: $_"
    Write-ColorText @"
🛠️  TROUBLESHOOTING:
1. Verifique se todas as APIs estão habilitadas
2. Confirme se o billing está ativo
3. Verifique os logs: gcloud builds list
4. Tente novamente: gcloud builds submit --config=cloudbuild.yaml
"@ $Yellow
    exit 1
}

Write-Success "Script concluído com sucesso! 🚀"