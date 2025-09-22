# Deploy Manual Simples - Veracare Site
# Para usar quando o deploy automático não estiver funcionando

Write-Host "🚀 DEPLOY MANUAL - VERACARE SITE" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan

# Verificar se está no diretório correto
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Execute este script na pasta raiz do projeto (onde está o package.json)" -ForegroundColor Red
    exit 1
}

# Configurações
$PROJECT_ID = Read-Host "Digite seu Project ID do Google Cloud"
$SERVICE_NAME = "veracare-site"
$REGION = "us-central1"

Write-Host "`n🔧 Configurando projeto..." -ForegroundColor Yellow
gcloud config set project $PROJECT_ID

Write-Host "`n📦 Fazendo build da imagem Docker..." -ForegroundColor Yellow
$IMAGE_NAME = "gcr.io/$PROJECT_ID/$SERVICE_NAME"
docker build -t $IMAGE_NAME .

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro no build da imagem Docker" -ForegroundColor Red
    exit 1
}

Write-Host "`n📤 Enviando imagem para Container Registry..." -ForegroundColor Yellow
docker push $IMAGE_NAME

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao enviar imagem" -ForegroundColor Red
    exit 1
}

Write-Host "`n🚀 Fazendo deploy no Cloud Run..." -ForegroundColor Yellow
gcloud run deploy $SERVICE_NAME `
    --image $IMAGE_NAME `
    --region $REGION `
    --platform managed `
    --allow-unauthenticated `
    --port 3000 `
    --memory 512Mi `
    --cpu 1 `
    --min-instances 0 `
    --max-instances 10 `
    --set-env-vars "NODE_ENV=production,NEXT_TELEMETRY_DISABLED=1"

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Deploy concluído com sucesso!" -ForegroundColor Green
    
    # Obter URL
    $URL = gcloud run services describe $SERVICE_NAME --region $REGION --format="value(status.url)"
    Write-Host "`n🌐 URL da aplicação: $URL" -ForegroundColor Cyan
    
    Write-Host "`n🎉 Sua aplicação está online!" -ForegroundColor Green
} else {
    Write-Host "`n❌ Erro no deploy" -ForegroundColor Red
    exit 1
}