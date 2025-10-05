# VeraCare Docker Management Script
Write-Host "🐳 VeraCare Docker Management" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

function Show-Status {
    Write-Host "📊 Status dos Containers:" -ForegroundColor Yellow
    docker ps -a --filter "name=veracare"
    
    Write-Host "`n🌐 Informações de Rede:" -ForegroundColor Yellow
    $publicIP = (curl -s http://ipinfo.io/ip).Trim()
    Write-Host "   🏠 Local: http://localhost:8080" -ForegroundColor Green
    Write-Host "   🌍 Público: http://$publicIP:8080" -ForegroundColor Green
    
    Write-Host "`n📋 Logs recentes:" -ForegroundColor Yellow
    docker logs --tail 5 veracare-app
}

function Start-VeraCare {
    Write-Host "🚀 Iniciando VeraCare..." -ForegroundColor Green
    docker start veracare-app
    Start-Sleep 3
    Show-Status
}

function Stop-VeraCare {
    Write-Host "⏹️ Parando VeraCare..." -ForegroundColor Red
    docker stop veracare-app
}

function Restart-VeraCare {
    Write-Host "🔄 Reiniciando VeraCare..." -ForegroundColor Yellow
    docker restart veracare-app
    Start-Sleep 3
    Show-Status
}

# Verificar parâmetro
$action = $args[0]

switch ($action) {
    "status" { Show-Status }
    "start" { Start-VeraCare }
    "stop" { Stop-VeraCare }
    "restart" { Restart-VeraCare }
    "logs" { docker logs -f veracare-app }
    default { 
        Show-Status
        Write-Host "`n🆘 Comandos: status, start, stop, restart, logs" -ForegroundColor Cyan
    }
}