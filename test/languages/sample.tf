terraform {
  required_version = ">= 1.8.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5"
    }
  }
}

variable "theme_name" {
  description = "Name written to the generated fixture"
  type        = string
  default     = "Akihabara"
  validation {
    condition     = length(var.theme_name) > 0
    error_message = "The theme name must not be empty."
  }
}

locals {
  palette = { control = "#7757BA", action = "#00A5E0" }
}

resource "local_file" "theme" {
  filename = "${path.module}/theme.json"
  content  = jsonencode({ name = var.theme_name, palette = local.palette })
}

output "fixture_path" { value = local_file.theme.filename }
