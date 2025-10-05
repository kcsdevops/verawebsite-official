# Script de Diagnóstico de Conectividade VeraCare
Write-Host "🔍 Diagnóstico de Conectividade VeraCare" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

# Obter IP público
Write-Host "`n🌐 Obtendo IP público..." -ForegroundColor Yellow
try {
    $publicIP = (Invoke-RestMethod -Uri "http://ipinfo.io/ip" -TimeoutSec 10).Trim()
    Write-Host "✅ IP Público: $publicIP" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro ao obter IP público" -ForegroundColor Red
    $publicIP = "N/A"
}

# Testar porta local
Write-Host "`n🏠 Testando acesso local..." -ForegroundColor Yellow
try {
    $localTest = Invoke-WebRequest -Uri "http://localhost:8080" -UseBasicParsing -TimeoutSec 5
    Write-Host "✅ Local OK: $($localTest.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "❌ Local FALHOU: $($_.Exception.Message)" -ForegroundColor Red
}

# Verificar container
Write-Host "`n🐳 Status do Container..." -ForegroundColor Yellow
$container = docker ps --filter "name=veracare-app" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
Write-Host $container

# Verificar firewall
Write-Host "`n🔥 Verificando Firewall..." -ForegroundColor Yellow
$firewallRules = netsh advfirewall firewall show rule name="VeraCare-8080" | Select-String "Ativado"
if ($firewallRules) {
    Write-Host "✅ Regra de firewall ativa" -ForegroundColor Green
} else {
    Write-Host "❌ Regra de firewall não encontrada" -ForegroundColor Red
}

# Verificar porta
Write-Host "`n🔌 Verificando Porta 8080..." -ForegroundColor Yellow
$portCheck = netstat -an | Select-String ":8080.*LISTENING"
if ($portCheck) {
    Write-Host "✅ Porta 8080 em escuta" -ForegroundColor Green
    Write-Host "$portCheck"
} else {
    Write-Host "❌ Porta 8080 não está em escuta" -ForegroundColor Red
}

# Teste de conectividade externa (simulado)
Write-Host "`n🌍 URLs de Acesso:" -ForegroundColor Yellow
Write-Host "   🏠 Local: http://localhost:8080" -ForegroundColor White
if ($publicIP -ne "N/A") {
    Write-Host "   🌐 Público: http://$publicIP:8080" -ForegroundColor White
    Write-Host "   ⚠️  Router: Pode precisar de Port Forwarding" -ForegroundColor Orange
}

Write-Host "`n📝 Próximos Passos para Acesso Público:" -ForegroundColor Cyan
Write-Host "1. Verificar se o firewall do Windows está permitindo" -ForegroundColor White
Write-Host "2. Configurar Port Forwarding no router (porta 8080)" -ForegroundColor White
Write-Host "3. Verificar se o provedor não bloqueia a porta" -ForegroundColor White

Write-Host "`n💡 Alternativa: Usar LocalTunnel para acesso imediato" -ForegroundColor Green
Write-Host "   lt --port 8080 --subdomain veracare2025" -ForegroundColor White