# Script para Deploy do VeraCare com Docker + IIS
# PowerShell Script

Write-Host "🏥 Iniciando Deploy do VeraCare com Docker + IIS..." -ForegroundColor Cyan

# Parar containers existentes
Write-Host "⏹️ Parando containers existentes..." -ForegroundColor Yellow
docker stop veracare-iis -ErrorAction SilentlyContinue
docker rm veracare-iis -ErrorAction SilentlyContinue

# Build da imagem Docker
Write-Host "🔨 Construindo imagem Docker com IIS..." -ForegroundColor Green
docker build -f Dockerfile.iis -t veracare-iis:latest .

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro no build da imagem!" -ForegroundColor Red
    exit 1
}

# Executar container com mapeamento de porta
Write-Host "🚀 Iniciando container VeraCare..." -ForegroundColor Green
docker run -d --name veracare-iis -p 8080:80 veracare-iis:latest

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao iniciar container!" -ForegroundColor Red
    exit 1
}

# Aguardar inicialização
Write-Host "⏳ Aguardando inicialização do IIS..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

# Verificar status
Write-Host "📊 Status do container:" -ForegroundColor Cyan
docker ps | Where-Object { $_ -match "veracare-iis" }

# Obter IP público
Write-Host "🌐 Obtendo IP público..." -ForegroundColor Cyan
try {
    $publicIP = (Invoke-RestMethod -Uri "http://ipinfo.io/ip").Trim()
    Write-Host "✅ VeraCare está disponível em:" -ForegroundColor Green
    Write-Host "   🏠 Local: http://localhost:8080" -ForegroundColor White
    Write-Host "   🌍 Público: http://${publicIP}:8080" -ForegroundColor White
    Write-Host ""
    Write-Host "📋 Comandos úteis:" -ForegroundColor Cyan
    Write-Host "   docker logs veracare-iis  # Ver logs"
    Write-Host "   docker stop veracare-iis  # Parar"
    Write-Host "   docker start veracare-iis # Iniciar"
} catch {
    Write-Host "⚠️ Não foi possível obter IP público, mas o site está rodando em http://localhost:8080" -ForegroundColor Yellow
}

Write-Host "🎉 Deploy concluído com sucesso!" -ForegroundColor Green