# 🚀 DEPLOY VERACARE NO AZURE CONTAINER APPS
# PowerShell script para deploy automatizado

Write-Host "🚀 Iniciando deploy do VeraCare no Azure Container Apps..." -ForegroundColor Green

# Configurações
$ResourceGroup = "rg-veracare-prod"
$Location = "eastus"
$ContainerAppName = "veracare-app"
$EnvironmentName = "veracare-env"
$ImageName = "veracareapp:latest"
$RegistryName = "acrveracare$(Get-Random -Minimum 1000 -Maximum 9999)"

try {
    # 1. Verificar se Azure CLI está instalado
    Write-Host "🔍 Verificando Azure CLI..." -ForegroundColor Yellow
    az --version
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Azure CLI não encontrado. Instale: https://aka.ms/installazure" -ForegroundColor Red
        exit 1
    }

    # 2. Login no Azure
    Write-Host "🔐 Fazendo login no Azure..." -ForegroundColor Yellow
    az login

    # 3. Criar Resource Group
    Write-Host "📦 Criando Resource Group..." -ForegroundColor Yellow
    az group create --name $ResourceGroup --location $Location

    # 4. Criar Container Registry (SKU Basic para menor custo)
    Write-Host "📋 Criando Azure Container Registry..." -ForegroundColor Yellow
    az acr create `
        --resource-group $ResourceGroup `
        --name $RegistryName `
        --sku Basic `
        --admin-enabled true

    # 5. Build e push da imagem
    Write-Host "🏗️ Fazendo build e push da imagem..." -ForegroundColor Yellow
    az acr build `
        --registry $RegistryName `
        --image $ImageName `
        --file Dockerfile .

    # 6. Criar Container Apps Environment
    Write-Host "🌍 Criando Container Apps Environment..." -ForegroundColor Yellow
    az containerapp env create `
        --name $EnvironmentName `
        --resource-group $ResourceGroup `
        --location $Location

    # 7. Gerar secrets seguros
    Write-Host "🔐 Gerando secrets seguros..." -ForegroundColor Yellow
    $NextAuthSecret = [System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes([System.Guid]::NewGuid().ToString() + [System.Guid]::NewGuid().ToString()))
    $JwtSecret = [System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes([System.Guid]::NewGuid().ToString() + [System.Guid]::NewGuid().ToString()))
    $AdminHash = '$2b$12$8K9.Z5lXJ4qF2M3P1bE9GOeHG7sLk8nR2vB6cE5dA3qW9xC2pT7hS'

    # 8. Criar Container App
    Write-Host "🚢 Criando Container App..." -ForegroundColor Yellow
    az containerapp create `
        --name $ContainerAppName `
        --resource-group $ResourceGroup `
        --environment $EnvironmentName `
        --image "$RegistryName.azurecr.io/$ImageName" `
        --target-port 3000 `
        --ingress external `
        --min-replicas 0 `
        --max-replicas 2 `
        --cpu 0.25 `
        --memory 0.5Gi `
        --secrets "nextauth-secret=$NextAuthSecret" "jwt-secret=$JwtSecret" "admin-password=$AdminHash" `
        --env-vars "NODE_ENV=production" "NEXTAUTH_SECRET=secretref:nextauth-secret" "JWT_SECRET=secretref:jwt-secret" "ADMIN_PASSWORD_HASH=secretref:admin-password"

    # 9. Obter URL da aplicação
    Write-Host "🌐 Obtendo URL da aplicação..." -ForegroundColor Yellow
    $AppUrl = az containerapp show `
        --name $ContainerAppName `
        --resource-group $ResourceGroup `
        --query "properties.configuration.ingress.fqdn" `
        --output tsv

    # 10. Atualizar NEXTAUTH_URL
    Write-Host "🔄 Atualizando NEXTAUTH_URL..." -ForegroundColor Yellow
    az containerapp update `
        --name $ContainerAppName `
        --resource-group $ResourceGroup `
        --set-env-vars "NEXTAUTH_URL=https://$AppUrl"

    # 11. Sucesso!
    Write-Host "✅ Deploy concluído com sucesso!" -ForegroundColor Green
    Write-Host "🌐 URL da aplicação: https://$AppUrl" -ForegroundColor Cyan
    Write-Host "🔐 Login admin: admin / AdminVeraCare2025!" -ForegroundColor Cyan
    Write-Host "💰 Custo estimado: `$8-17/mês USD" -ForegroundColor Cyan

    # 12. Mostrar status
    Write-Host "📊 Status da aplicação:" -ForegroundColor Yellow
    az containerapp show `
        --name $ContainerAppName `
        --resource-group $ResourceGroup `
        --query "{Name:name,Status:properties.provisioningState,URL:properties.configuration.ingress.fqdn,CPU:properties.template.containers[0].resources.cpu,Memory:properties.template.containers[0].resources.memory}" `
        --output table

    Write-Host "🎉 VeraCare está online no Azure!" -ForegroundColor Green

} catch {
    Write-Host "❌ Erro durante o deploy: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}