#!/bin/bash

# 🚀 SCRIPT DE DEPLOY PARA AZURE CONTAINER APPS
# Deploy automatizado do VeraCare no Azure com menor custo

echo "🚀 Iniciando deploy do VeraCare no Azure Container Apps..."

# Configurações
RESOURCE_GROUP="rg-veracare-prod"
LOCATION="eastus"
CONTAINER_APP_NAME="veracare-app"
ENVIRONMENT_NAME="veracare-env"
IMAGE_NAME="veracareapp:latest"
REGISTRY_NAME="acrveracare"

# 1. Login no Azure
echo "🔐 Fazendo login no Azure..."
az login

# 2. Criar Resource Group
echo "📦 Criando Resource Group..."
az group create \
  --name $RESOURCE_GROUP \
  --location $LOCATION

# 3. Criar Container Registry (para economizar, usar Basic SKU)
echo "📋 Criando Azure Container Registry..."
az acr create \
  --resource-group $RESOURCE_GROUP \
  --name $REGISTRY_NAME \
  --sku Basic \
  --admin-enabled true

# 4. Build e push da imagem
echo "🏗️ Fazendo build e push da imagem..."
az acr build \
  --registry $REGISTRY_NAME \
  --image $IMAGE_NAME \
  --file Dockerfile .

# 5. Criar Container Apps Environment
echo "🌍 Criando Container Apps Environment..."
az containerapp env create \
  --name $ENVIRONMENT_NAME \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION

# 6. Gerar secrets seguros
NEXTAUTH_SECRET=$(openssl rand -base64 32)
JWT_SECRET=$(openssl rand -base64 32)
ADMIN_HASH='$2b$12$8K9.Z5lXJ4qF2M3P1bE9GOeHG7sLk8nR2vB6cE5dA3qW9xC2pT7hS'

# 7. Criar Container App
echo "🚢 Criando Container App..."
az containerapp create \
  --name $CONTAINER_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --environment $ENVIRONMENT_NAME \
  --image $REGISTRY_NAME.azurecr.io/$IMAGE_NAME \
  --target-port 3000 \
  --ingress external \
  --min-replicas 0 \
  --max-replicas 2 \
  --cpu 0.25 \
  --memory 0.5Gi \
  --secrets \
    nextauth-secret=$NEXTAUTH_SECRET \
    jwt-secret=$JWT_SECRET \
    admin-password=$ADMIN_HASH \
  --env-vars \
    NODE_ENV=production \
    NEXTAUTH_URL=secretref:nextauth-url \
    NEXTAUTH_SECRET=secretref:nextauth-secret \
    JWT_SECRET=secretref:jwt-secret \
    ADMIN_PASSWORD_HASH=secretref:admin-password

# 8. Obter URL da aplicação
echo "🌐 Obtendo URL da aplicação..."
APP_URL=$(az containerapp show \
  --name $CONTAINER_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --query properties.configuration.ingress.fqdn \
  --output tsv)

# 9. Atualizar NEXTAUTH_URL
echo "🔄 Atualizando NEXTAUTH_URL..."
az containerapp update \
  --name $CONTAINER_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --set-env-vars NEXTAUTH_URL=https://$APP_URL

echo "✅ Deploy concluído com sucesso!"
echo "🌐 URL da aplicação: https://$APP_URL"
echo "🔐 Login admin: admin / AdminVeraCare2025!"
echo "💰 Custo estimado: $8-17/mês USD"

# 10. Mostrar status
echo "📊 Status da aplicação:"
az containerapp show \
  --name $CONTAINER_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --query "{Name:name,Status:properties.provisioningState,URL:properties.configuration.ingress.fqdn,CPU:properties.template.containers[0].resources.cpu,Memory:properties.template.containers[0].resources.memory}" \
  --output table