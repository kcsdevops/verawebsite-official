# Terraform Local Values for Testing
# Use this file for quick testing with local subscription

# Get your current subscription ID with: az account show --query id -o tsv

# Copy this to terraform.tfvars and uncomment/set your subscription:
# subscription_id = "your-subscription-id-here"
resource_group_name = "rg-veracare-test"
static_web_app_name = "swa-veracare-test"
location = "East US 2"
environment = "dev"