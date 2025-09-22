# Terraform Azure Static Web App Deployment

Este projeto contém a infraestrutura como código (IaC) para fazer deploy do site Veracare no Azure usando Azure Static Web Apps.

## 📋 Pré-requisitos

- [Terraform](https://www.terraform.io/downloads.html) >= 1.5.0
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) instalado e configurado
- Conta no Azure com permissões para criar recursos
- Repositório GitHub configurado

## 🚀 Deploy Manual

### 1. Configurar autenticação no Azure

```bash
# Login no Azure
az login

# Verificar subscription ativa
az account show

# Definir subscription (se necessário)
az account set --subscription "sua-subscription-id"
```

### 2. Executar Terraform

```bash
# Navegar para diretório terraform
cd terraform

# Inicializar Terraform
terraform init

# Revisar plano de deployment
terraform plan

# Aplicar infraestrutura
terraform apply
```

### 3. Configurar GitHub Actions

Após o deploy da infraestrutura, configure os secrets no GitHub:

1. Vá para Settings > Secrets and variables > Actions no seu repositório
2. Adicione os seguintes secrets:

```
AZURE_STATIC_WEB_APPS_API_TOKEN = [obtido do output do Terraform]
ARM_CLIENT_ID = [Service Principal ID]
ARM_CLIENT_SECRET = [Service Principal Secret]
ARM_SUBSCRIPTION_ID = [Sua Subscription ID]
ARM_TENANT_ID = [Seu Tenant ID]
```

## 🔧 Configuração

### Variáveis Terraform

Principais variáveis em `variables.tf`:

- `resource_group_name`: Nome do Resource Group (padrão: "rg-veracare-prod")
- `static_web_app_name`: Nome do Static Web App (padrão: "swa-veracare-prod")
- `location`: Região do Azure (padrão: "East US 2")
- `custom_domain`: Domínio customizado (opcional)

### Personalizar configuração

Crie um arquivo `terraform.tfvars`:

```hcl
resource_group_name = "rg-veracare-custom"
static_web_app_name = "swa-veracare-custom"
location = "Brazil South"
custom_domain = "www.veracare.com.br"
```

## 🤖 CI/CD Automático

O projeto inclui dois workflows GitHub Actions:

### 1. `terraform-deploy.yml`
- Executa quando arquivos em `terraform/` são modificados
- Faz deploy da infraestrutura
- Atualiza automaticamente o secret `AZURE_STATIC_WEB_APPS_API_TOKEN`

### 2. `azure-static-web-apps.yml`
- Executa em push para main/master
- Faz build do Next.js
- Deploy automático no Azure Static Web Apps

## 📁 Estrutura do Projeto

```
├── terraform/
│   ├── main.tf              # Configuração principal
│   ├── variables.tf         # Definição de variáveis
│   ├── outputs.tf           # Outputs dos recursos
│   └── terraform.tfvars     # Valores personalizados (opcional)
├── .github/workflows/
│   ├── terraform-deploy.yml # Deploy da infraestrutura
│   └── azure-static-web-apps.yml # Deploy da aplicação
├── app/                     # Código fonte Next.js
└── README.md
```

## 🌐 URLs de Acesso

Após o deploy, acesse:

- **URL padrão**: `https://[static-web-app-name].azurestaticapps.net`
- **URL customizada**: `https://[custom-domain]` (se configurado)

## 🛠️ Comandos Úteis

```bash
# Ver outputs do Terraform
terraform output

# Ver API key do Static Web App
terraform output -raw static_web_app_api_key

# Destruir infraestrutura
terraform destroy

# Formatar código Terraform
terraform fmt

# Validar configuração
terraform validate
```

## 🔒 Segurança

- O API token do Static Web App é marcado como `sensitive`
- Use Service Principal para autenticação em produção
- Mantenha os secrets do GitHub protegidos
- Revise as permissões do Resource Group regularmente

## 📞 Suporte

Para dúvidas sobre a infraestrutura, verifique:

1. [Documentação do Azure Static Web Apps](https://docs.microsoft.com/en-us/azure/static-web-apps/)
2. [Documentação do Terraform Azure Provider](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs)
3. Logs dos workflows GitHub Actions

---

🏥 **Veracare** - Cuide da saúde e bem-estar dos seus pés com a Veracare. Prevenção, tratamento e conforto em cada atendimento.