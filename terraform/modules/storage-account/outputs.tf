output "id" {
  description = "ID of the storage account"
  value       = azurerm_storage_account.this.id
}

output "name" {
  description = "Name of the storage account"
  value       = azurerm_storage_account.this.name
}

output "primary_access_key" {
  description = "Primary access key of the storage account"
  value       = azurerm_storage_account.this.primary_access_key
  sensitive   = true
}

output "secondary_access_key" {
  description = "Secondary access key of the storage account"
  value       = azurerm_storage_account.this.secondary_access_key
  sensitive   = true
}

output "primary_blob_endpoint" {
  description = "Primary blob endpoint of the storage account"
  value       = azurerm_storage_account.this.primary_blob_endpoint
}

output "container_name" {
  description = "Name of the Terraform state container"
  value       = var.create_container ? azurerm_storage_container.tfstate[0].name : null
}

output "backend_config" {
  description = "Backend configuration for Terraform state"
  value = var.create_container ? {
    storage_account_name = azurerm_storage_account.this.name
    container_name       = azurerm_storage_container.tfstate[0].name
    key                  = "terraform.tfstate"
    access_key          = azurerm_storage_account.this.primary_access_key
  } : null
  sensitive = true
}