# Veracare - Website de Podologia

Website moderno para clínica de podologia desenvolvido com Next.js 14 e deploy no Google Cloud Run usando recursos gratuitos.

## ✨ Características

- **Framework**: Next.js 14 com App Router
- **Estilização**: Tailwind CSS  
- **Linguagem**: TypeScript
- **Deploy**: Google Cloud Run (Tier Gratuito)
- **Containerização**: Docker multi-stage
- **CI/CD**: Google Cloud Build + GitHub Actions

## 🚀 Funcionalidades

- Design responsivo e moderno
- Páginas de serviços com fotos e vídeos
- Integração com WhatsApp
- Otimizado para SEO e performance
- Deploy automatizado
- Escala automaticamente (zero a milhões de requests)
- Infraestrutura modular e reutilizável

## 📁 Estrutura do Projeto

```
veracare-website/
├── app/                    # Aplicação Next.js
│   ├── components/         # Componentes reutilizáveis
│   ├── page.tsx           # Página inicial
│   ├── servicos/          # Página de serviços
│   ├── contato/           # Página de contato
│   └── layout.tsx         # Layout principal
├── terraform/             # Infraestrutura como código
│   ├── modules/           # Módulos Terraform reutilizáveis
│   │   ├── resource-group/    # Módulo para Resource Group
│   │   ├── static-web-app/    # Módulo para Static Web App
│   │   └── storage-account/   # Módulo para Storage Account
│   ├── main.tf           # Configuração principal (chama módulos)
│   ├── variables.tf      # Variáveis globais
│   ├── outputs.tf        # Outputs globais
│   ├── providers.tf      # Provedores Azure
│   └── terraform.tfvars.example # Exemplo de variáveis
├── .github/workflows/     # GitHub Actions
└── public/               # Assets estáticos
```

## 🧩 Arquitetura Modular

### Módulos Terraform

A infraestrutura está organizada em módulos reutilizáveis:

#### 1. Resource Group Module (`terraform/modules/resource-group/`)
- Cria e gerencia o Resource Group
- Configura tags padrão
- Exporta nome e localização

#### 2. Static Web App Module (`terraform/modules/static-web-app/`)
- Configura Azure Static Web App
- Suporte a domínio personalizado
- Integração com GitHub
- Gerencia configurações de deploy

#### 3. Storage Account Module (`terraform/modules/storage-account/`)
- Cria Storage Account para Terraform state
- Configura container para backend
- Implementa configurações de segurança

### Vantagens da Arquitetura Modular

- **Reutilização**: Módulos podem ser usados em diferentes ambientes
- **Manutenibilidade**: Cada módulo tem responsabilidade específica
- **Testabilidade**: Módulos podem ser testados independentemente
- **Escalabilidade**: Fácil adição de novos recursos

## 🛠 Configuração do Desenvolvimento

### Pré-requisitos

- Node.js 18+
- Terraform 1.0+
- Azure CLI
- Conta no Azure
- Conta no GitHub

### Instalação Local

1. Clone o repositório:
```bash
git clone https://github.com/yourusername/veracare-website.git
cd veracare-website
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse http://localhost:3000

## 🚀 Deploy no Google Cloud Run (GRATUITO)

### Método Rápido (Recomendado)
```powershell
# Execute na pasta raiz do projeto
./deploy-gcloud.ps1
```

### Deploy Manual
```powershell
# Para deploy manual passo a passo
./deploy-manual.ps1
```

### Recursos Gratuitos Utilizados
- **Cloud Run**: 2M requests/mês
- **Cloud Build**: 120 minutos/dia  
- **Container Registry**: 0.5 GB storage
- **SSL**: Certificados automáticos e gratuitos

### Vantagens do Google Cloud Run
- ✅ **Zero custo** para sites pequenos/médios
- ✅ **Escala automática** (zero to millions)
- ✅ **Deploy em segundos**
- ✅ **HTTPS automático**
- ✅ **Global CDN incluso**

📖 **Documentação completa**: Veja [DEPLOY.md](./DEPLOY.md) para instruções detalhadas

---

## ☁️ Deploy no Azure (Alternativo)

### 1. Configuração da Infraestrutura

1. Configure o Azure CLI:
```bash
az login
az account set --subscription "your-subscription-id"
```

2. Configure as variáveis do Terraform:
```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
# Edite o arquivo terraform.tfvars com seus valores
```

3. Execute o Terraform:
```bash
terraform init
terraform plan
terraform apply
```

### 2. Configuração do GitHub Actions

1. Adicione as secrets no repositório GitHub:
   - `AZURE_STATIC_WEB_APPS_API_TOKEN`: Token da Static Web App (obtido nos outputs do Terraform)

2. Faça push para o branch main para trigger do deploy automático

## 📝 Configuração

### Variáveis do Terraform

| Variável | Descrição | Valor Padrão | Obrigatório |
|----------|-----------|--------------|-------------|
| `subscription_id` | ID da subscription Azure | - | ✅ |
| `resource_group_name` | Nome do resource group | `rg-veracare-website` | ❌ |
| `location` | Região do Azure | `East US` | ❌ |
| `static_web_app_name` | Nome da Static Web App | `swa-veracare` | ❌ |
| `storage_account_name` | Nome da storage account | `stveracarewebsite` | ❌ |
| `github_repo` | URL do repositório GitHub | `https://github.com/yourusername/veracare-website` | ❌ |
| `github_branch` | Branch para deploy | `main` | ❌ |
| `custom_domain` | Domínio customizado | `""` | ❌ |
| `environment` | Nome do ambiente | `production` | ❌ |
| `tags` | Tags para recursos | `{}` | ❌ |

### Usando Módulos em Outros Projetos

Para reutilizar os módulos em outros projetos:

```hcl
module "veracare_resource_group" {
  source = "./modules/resource-group"
  
  name     = "rg-meu-projeto"
  location = "Brazil South"
  tags = {
    Project = "Meu Projeto"
    Environment = "Production"
  }
}

module "veracare_static_web_app" {
  source = "./modules/static-web-app"
  
  name                = "swa-meu-projeto"
  resource_group_name = module.veracare_resource_group.name
  location           = module.veracare_resource_group.location
  github_repo        = "https://github.com/meuuser/meu-projeto"
  # ... outras variáveis
}
```

### Personalização

- **Cores**: Edite `tailwind.config.js` para personalizar o tema
- **Conteúdo**: Modifique os arquivos em `app/` para atualizar o conteúdo
- **Componentes**: Adicione novos componentes em `app/components/`
- **Módulos**: Customize os módulos Terraform conforme necessário

## 🔧 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run start` - Servidor de produção
- `npm run lint` - Linting do código

## 📱 Contato WhatsApp

O botão de WhatsApp está configurado para o número: **+55 11 96738-1029**

Para alterar, edite o arquivo `app/page.tsx` e modifique a URL do WhatsApp.

## 🐛 Troubleshooting

### Problemas Comuns

1. **Erro de autenticação Azure**: Verifique se está logado corretamente com `az login`
2. **Terraform state conflicts**: Use backend remoto ou delete `.terraform` e execute `terraform init` novamente
3. **Build failures**: Verifique se todas as dependências estão instaladas
4. **Static Web App deployment issues**: Verifique se a API key está configurada corretamente no GitHub
5. **Module not found**: Execute `terraform get` para baixar os módulos

### Logs e Debugging

- Logs do Terraform: Aumentar verbosidade com `TF_LOG=DEBUG`
- Logs do Next.js: Verificar console do navegador
- Logs do GitHub Actions: Verificar aba Actions no repositório
- Validação de módulos: Use `terraform validate` em cada diretório de módulo

### Testando Módulos

Para testar módulos individualmente:

```bash
cd terraform/modules/resource-group
terraform init
terraform validate
terraform plan
```

## 🤝 Contribuição

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
