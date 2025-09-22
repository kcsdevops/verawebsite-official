# Azure Configuration
variable "subscription_id" {
  description = "Azure Subscription ID (optional - uses default if not specified)"
  type        = string
  default     = null
}

# General Configuration
variable "resource_group_name" {
  description = "Name of the Azure Resource Group"
  type        = string
  default     = "rg-veracare-prod"
}

variable "location" {
  description = "Azure region for resources"
  type        = string
  default     = "East US 2"
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  default     = "prod"
}

# Static Web App Configuration
variable "static_web_app_name" {
  description = "Name of the Azure Static Web App"
  type        = string
  default     = "swa-veracare-prod"
}

variable "static_web_app_location" {
  description = "Location for Static Web App (limited regions)"
  type        = string
  default     = "East US 2"
}

variable "sku_tier" {
  description = "SKU tier for Static Web App"
  type        = string
  default     = "Free"
  validation {
    condition     = contains(["Free", "Standard"], var.sku_tier)
    error_message = "SKU tier must be Free or Standard."
  }
}

variable "sku_size" {
  description = "SKU size for Static Web App"
  type        = string
  default     = "Free"
  validation {
    condition     = contains(["Free", "Standard"], var.sku_size)
    error_message = "SKU size must be Free or Standard."
  }
}

# Application Configuration
variable "api_url" {
  description = "API URL for the application"
  type        = string
  default     = "https://api.veracare.com.br"
}

variable "whatsapp_number" {
  description = "WhatsApp number for contact"
  type        = string
  default     = "5511967381029"
}

# Storage Account (for Terraform state)
variable "create_storage_account" {
  description = "Whether to create a storage account for Terraform state"
  type        = bool
  default     = false
}

variable "storage_account_name" {
  description = "Name of the storage account for Terraform state"
  type        = string
  default     = "stveracarestate"
}

# Custom Domain (optional)
variable "custom_domain" {
  description = "Custom domain for the Static Web App (optional)"
  type        = string
  default     = null
}

# GitHub Configuration
variable "github_repo_url" {
  description = "GitHub repository URL"
  type        = string
  default     = "https://github.com/kcsdevops/veracare-site"
}

variable "github_branch" {
  description = "GitHub branch for deployment"
  type        = string
  default     = "main"
}