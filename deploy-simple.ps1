# Script Simplificado de Deploy VeraCare
Write-Host "🏥 VeraCare - Deploy com Servidor HTTP Estático" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

# Parar processos existentes na porta 8080
Write-Host "⏹️ Parando processos existentes..." -ForegroundColor Yellow
try {
    $processes = Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue
    if ($processes) {
        $processes | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
        Write-Host "✅ Processos parados" -ForegroundColor Green
    } else {
        Write-Host "ℹ️ Porta 8080 livre" -ForegroundColor Gray
    }
} catch {
    Write-Host "ℹ️ Porta 8080 livre" -ForegroundColor Gray
}

Write-Host "🔨 Fazendo build do Next.js..." -ForegroundColor Blue
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro no build!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build concluído!" -ForegroundColor Green

# Obter IPs
Write-Host "🌐 Obtendo informações de rede..." -ForegroundColor Cyan
try {
    $publicIP = (Invoke-RestMethod -Uri "http://ipinfo.io/ip" -TimeoutSec 5).Trim()
    Write-Host "📍 IP Público: $publicIP" -ForegroundColor White
} catch {
    Write-Host "⚠️ Não foi possível obter IP público" -ForegroundColor Yellow
    $publicIP = "N/A"
}

$env:PORT = "8080"

Write-Host "🚀 Iniciando servidor VeraCare..." -ForegroundColor Green
Write-Host " URLs de Acesso:" -ForegroundColor Cyan
Write-Host "   🏠 Local: http://localhost:8080" -ForegroundColor White
if ($publicIP -ne "N/A") {
    Write-Host "   🌍 Público: http://$publicIP:8080" -ForegroundColor White
}
Write-Host "🔄 Para parar: Ctrl+C" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan

node server-static.js