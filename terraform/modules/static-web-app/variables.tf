variable "name" {
  description = "Name of the Azure Static Web App"
  type        = string
}

variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
}

variable "location" {
  description = "Azure region for the Static Web App"
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

variable "app_settings" {
  description = "App settings for the Static Web App"
  type        = map(string)
  default     = {}
}

variable "custom_domain" {
  description = "Custom domain for the Static Web App (optional)"
  type        = string
  default     = null
}

variable "tags" {
  description = "Tags to be applied to the Static Web App"
  type        = map(string)
  default     = {}
}