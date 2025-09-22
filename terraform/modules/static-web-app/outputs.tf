output "id" {
  description = "ID of the Static Web App"
  value       = azurerm_static_web_app.this.id
}

output "name" {
  description = "Name of the Static Web App"
  value       = azurerm_static_web_app.this.name
}

output "default_host_name" {
  description = "Default hostname of the Static Web App"
  value       = azurerm_static_web_app.this.default_host_name
}

output "api_key" {
  description = "API key for Static Web App deployment"
  value       = azurerm_static_web_app.this.api_key
  sensitive   = true
}

output "url" {
  description = "URL of the Static Web App"
  value       = "https://${azurerm_static_web_app.this.default_host_name}"
}

output "custom_domain_url" {
  description = "Custom domain URL (if configured)"
  value       = var.custom_domain != null ? "https://${var.custom_domain}" : null
}

output "custom_domain_validation" {
  description = "Custom domain validation details"
  value = var.custom_domain != null ? {
    domain_name     = azurerm_static_web_app_custom_domain.this[0].domain_name
    validation_type = azurerm_static_web_app_custom_domain.this[0].validation_type
  } : null
}