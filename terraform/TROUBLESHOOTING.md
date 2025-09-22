# Azure Authentication Troubleshooting

## Problema Identificado
A subscription `7a6dcb36-b062-4f1f-822c-43732b1f5707` não está acessível ou houve mudanças nas permissões/status da conta.

## Soluções Possíveis

### 1. Verificar Status da Subscription
```bash
# Login com tenant específico
az login --tenant 06c3d16a-623f-4119-89ea-bd53f49060ea

# Listar todas as subscriptions disponíveis
az account list --all

# Verificar status da subscription específica
az account show --subscription 7a6dcb36-b062-4f1f-822c-43732b1f5707
```

### 2. Usar Subscription Alternativa
```bash
# Ver subscriptions ativas
az account list --query "[?state=='Enabled']" --output table

# Definir uma subscription ativa
az account set --subscription "nova-subscription-id"

# Verificar se mudou
az account show
```

### 3. Configurar Terraform com Nova Subscription
Edite o arquivo `terraform.tfvars`:
```hcl
subscription_id = "sua-nova-subscription-id"
resource_group_name = "rg-veracare-nova"
static_web_app_name = "swa-veracare-nova"
```

### 4. Usar Service Principal (Recomendado para Produção)
```bash
# Criar Service Principal
az ad sp create-for-rbac --name "terraform-veracare" \
  --role="Contributor" \
  --scopes="/subscriptions/sua-subscription-id"

# Configurar variáveis de ambiente
export ARM_CLIENT_ID="appId"
export ARM_CLIENT_SECRET="password"
export ARM_SUBSCRIPTION_ID="sua-subscription-id"
export ARM_TENANT_ID="tenant"
```

### 5. Verificar Permissões
A conta precisa ter pelo menos:
- **Contributor** na subscription ou resource group
- Permissões para criar **Static Web Apps**
- Acesso para ler **Resource Providers**

## Como Continuar

1. **Escolha uma das soluções acima**
2. **Configure a nova subscription no terraform.tfvars**
3. **Execute terraform plan novamente**

```bash
cd terraform
terraform init
terraform plan
```

## Contatos de Suporte
- Verificar com administrador da subscription Azure
- Confirmar se a conta tem as permissões necessárias
- Considerar usar uma subscription de desenvolvimento/teste