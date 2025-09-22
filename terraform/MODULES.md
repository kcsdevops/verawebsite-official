# Terraform Modules Documentation

Este documento explica como usar e entender os módulos Terraform criados para o projeto Veracare.

## 📁 Estrutura dos Módulos

```
terraform/modules/
├── resource-group/
│   ├── variables.tf    # Variáveis de entrada
│   ├── main.tf        # Recursos do módulo
│   └── outputs.tf     # Valores de saída
├── static-web-app/
│   ├── variables.tf
│   ├── main.tf
│   └── outputs.tf
└── storage-account/
    ├── variables.tf
    ├── main.tf
    └── outputs.tf
```

## 🧩 Módulo: Resource Group

### Propósito
Cria e gerencia Azure Resource Groups com configurações padronizadas.

### Variáveis
- `name` (string): Nome do resource group
- `location` (string): Localização do Azure
- `tags` (map): Tags para aplicar ao resource group

### Outputs
- `name`: Nome do resource group criado
- `location`: Localização do resource group
- `id`: ID completo do resource group

### Exemplo de Uso
```hcl
module "my_resource_group" {
  source = "./modules/resource-group"
  
  name     = "rg-meu-projeto"
  location = "Brazil South"
  tags = {
    Environment = "Production"
    Project     = "Meu Projeto"
  }
}
```

## 🌐 Módulo: Static Web App

### Propósito
Configura Azure Static Web App com suporte a domínio personalizado e integração GitHub.

### Variáveis
- `name` (string): Nome da Static Web App
- `resource_group_name` (string): Nome do resource group
- `location` (string): Localização do Azure
- `github_repo` (string): URL do repositório GitHub
- `github_branch` (string): Branch para deploy
- `custom_domain` (string, opcional): Domínio personalizado
- `tags` (map): Tags para aplicar ao recurso

### Outputs
- `name`: Nome da Static Web App
- `default_hostname`: Hostname padrão gerado
- `api_key`: Chave API para GitHub Actions (sensível)
- `custom_domain`: Domínio personalizado configurado
- `id`: ID completo do recurso

### Exemplo de Uso
```hcl
module "my_static_web_app" {
  source = "./modules/static-web-app"
  
  name                = "swa-meu-projeto"
  resource_group_name = module.my_resource_group.name
  location           = module.my_resource_group.location
  github_repo        = "https://github.com/meuuser/meu-projeto"
  github_branch      = "main"
  custom_domain      = "www.meusite.com.br"
  
  tags = {
    Environment = "Production"
    Project     = "Meu Projeto"
  }
}
```

## 💾 Módulo: Storage Account

### Propósito
Cria Storage Account para Terraform state com configurações de segurança.

### Variáveis
- `name` (string): Nome da storage account
- `resource_group_name` (string): Nome do resource group
- `location` (string): Localização do Azure
- `container_name` (string): Nome do container para state
- `account_tier` (string): Tier da storage account
- `replication_type` (string): Tipo de replicação
- `tags` (map): Tags para aplicar ao recurso

### Outputs
- `name`: Nome da storage account
- `primary_endpoint`: Endpoint primário
- `container_name`: Nome do container criado
- `access_key`: Chave de acesso (sensível)
- `id`: ID completo do recurso

### Exemplo de Uso
```hcl
module "my_storage" {
  source = "./modules/storage-account"
  
  name                = "stmeuprojeto"
  resource_group_name = module.my_resource_group.name
  location           = module.my_resource_group.location
  container_name     = "terraform-state"
  
  tags = {
    Environment = "Production"
    Project     = "Meu Projeto"
  }
}
```

## 🔧 Configuração Completa

### Exemplo de main.tf usando todos os módulos:

```hcl
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
}

module "resource_group" {
  source = "./modules/resource-group"
  
  name     = var.resource_group_name
  location = var.location
  tags     = var.tags
}

module "storage_account" {
  source = "./modules/storage-account"
  
  name                = var.storage_account_name
  resource_group_name = module.resource_group.name
  location           = module.resource_group.location
  container_name     = "terraform-state"
  
  tags = var.tags
}

module "static_web_app" {
  source = "./modules/static-web-app"
  
  name                = var.static_web_app_name
  resource_group_name = module.resource_group.name
  location           = module.resource_group.location
  github_repo        = var.github_repo
  github_branch      = var.github_branch
  custom_domain      = var.custom_domain
  
  tags = var.tags
}
```

## 🧪 Testando Módulos

### Validação Individual
Para testar cada módulo separadamente:

```bash
# Teste do módulo resource-group
cd terraform/modules/resource-group
terraform init
terraform validate

# Teste do módulo static-web-app
cd ../static-web-app
terraform init
terraform validate

# Teste do módulo storage-account
cd ../storage-account
terraform init
terraform validate
```

### Validação Completa
Para testar a configuração completa:

```bash
cd terraform
terraform init
terraform validate
terraform plan
```

## 📋 Checklist de Deploy

### Antes do Deploy
- [ ] Azure CLI configurado e logado
- [ ] Subscription ID correto em terraform.tfvars
- [ ] Nomes de recursos únicos globalmente
- [ ] Repositório GitHub configurado
- [ ] Permissões adequadas no Azure

### Durante o Deploy
- [ ] `terraform init` executado com sucesso
- [ ] `terraform plan` revisado
- [ ] `terraform apply` confirmado

### Após o Deploy
- [ ] Outputs verificados
- [ ] Static Web App acessível
- [ ] GitHub Actions configurado com API key
- [ ] Domínio personalizado funcionando (se aplicável)

## 🚨 Troubleshooting

### Erros Comuns

1. **Nome já existe**: Storage account names devem ser únicos globalmente
2. **Permissões**: Verifique se tem permissão para criar recursos
3. **Quota**: Verifique limites da subscription
4. **Região**: Nem todos os recursos estão disponíveis em todas as regiões

### Comandos Úteis

```bash
# Verificar recursos criados
az resource list --resource-group rg-veracare-website

# Verificar static web app
az staticwebapp list --resource-group rg-veracare-website

# Verificar storage account
az storage account list --resource-group rg-veracare-website

# Limpar recursos (cuidado!)
terraform destroy
```

## 📚 Referências

- [Azure Static Web Apps Documentation](https://docs.microsoft.com/azure/static-web-apps/)
- [Terraform Azure Provider](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs)
- [Azure CLI Reference](https://docs.microsoft.com/cli/azure/)