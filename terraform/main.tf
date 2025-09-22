terraform {
  required_version = ">= 1.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
    azapi = {
      source  = "azure/azapi"
      version = "~> 1.0"
    }
  }
}

provider "azurerm" {
  features {}
  
  # Uncomment and set your subscription ID if needed
  # subscription_id = var.subscription_id
}

# Local values for common configurations
locals {
  common_tags = {
    Environment = var.environment
    Project     = "Veracare"
    Owner       = "DevOps"
    ManagedBy   = "Terraform"
  }
}

# Resource Group Module
module "resource_group" {
  source = "./modules/resource-group"
  
  name     = var.resource_group_name
  location = var.location
  tags     = local.common_tags
}

# Storage Account Module (for Terraform state - optional)
module "storage_account" {
  count  = var.create_storage_account ? 1 : 0
  source = "./modules/storage-account"
  
  name                     = var.storage_account_name
  resource_group_name      = module.resource_group.name
  location                 = module.resource_group.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  create_container         = true
  container_name           = "tfstate"
  tags                     = local.common_tags
}

# Static Web App Module
module "static_web_app" {
  source = "./modules/static-web-app"
  
  name                = var.static_web_app_name
  resource_group_name = module.resource_group.name
  location            = var.static_web_app_location
  sku_tier           = var.sku_tier
  sku_size           = var.sku_size
  custom_domain      = var.custom_domain
  
  app_settings = {
    "NEXT_PUBLIC_ENV"         = var.environment
    "NEXT_PUBLIC_API_URL"     = var.api_url
    "NEXT_PUBLIC_WHATSAPP"    = var.whatsapp_number
    "NEXT_PUBLIC_SITE_NAME"   = "Veracare | Podologia em Casa Verde"
  }
  
  tags = local.common_tags
}