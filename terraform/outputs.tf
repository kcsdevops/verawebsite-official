# Resource Group Outputs
output "resource_group_name" {
  description = "Name of the created resource group"
  value       = module.resource_group.name
}

output "resource_group_location" {
  description = "Location of the resource group"
  value       = module.resource_group.location
}

output "resource_group_id" {
  description = "ID of the resource group"
  value       = module.resource_group.id
}

# Static Web App Outputs
output "static_web_app_name" {
  description = "Name of the Static Web App"
  value       = module.static_web_app.name
}

output "static_web_app_url" {
  description = "Default URL of the Static Web App"
  value       = module.static_web_app.url
}

output "static_web_app_id" {
  description = "ID of the Static Web App"
  value       = module.static_web_app.id
}

output "static_web_app_api_key" {
  description = "API key for Static Web App deployment"
  value       = module.static_web_app.api_key
  sensitive   = true
}

output "static_web_app_default_host_name" {
  description = "Default hostname of the Static Web App"
  value       = module.static_web_app.default_host_name
}

# Custom Domain Outputs
output "custom_domain_url" {
  description = "Custom domain URL (if configured)"
  value       = module.static_web_app.custom_domain_url
}

output "custom_domain_validation" {
  description = "Custom domain validation details"
  value       = module.static_web_app.custom_domain_validation
}

# Storage Account Outputs (if created)
output "storage_account_name" {
  description = "Name of the storage account (if created)"
  value       = var.create_storage_account ? module.storage_account[0].name : null
}

output "storage_account_id" {
  description = "ID of the storage account (if created)"
  value       = var.create_storage_account ? module.storage_account[0].id : null
}

output "storage_account_primary_key" {
  description = "Primary access key of the storage account (if created)"
  value       = var.create_storage_account ? module.storage_account[0].primary_access_key : null
  sensitive   = true
}

output "terraform_backend_config" {
  description = "Terraform backend configuration (if storage account created)"
  value       = var.create_storage_account ? module.storage_account[0].backend_config : null
  sensitive   = true
}

# GitHub Deployment Instructions
output "github_deployment_instructions" {
  description = "Instructions for setting up GitHub Actions deployment"
  value = <<-EOT
    To setup automated deployment from GitHub:
    
    1. Add this secret to your GitHub repository:
       AZURE_STATIC_WEB_APPS_API_TOKEN = ${module.static_web_app.api_key}
    
    2. Create .github/workflows/azure-static-web-apps.yml with the provided configuration
    
    3. Your app will be deployed automatically on push to main branch
    
    Static Web App URL: ${module.static_web_app.url}
    ${var.custom_domain != null ? "Custom Domain URL: ${module.static_web_app.custom_domain_url}" : ""}
  EOT
  sensitive = true
}