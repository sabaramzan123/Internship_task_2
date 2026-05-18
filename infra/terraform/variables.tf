variable "aws_region" {
  type        = string
  description = "Target deployment region in AWS"
  default     = "us-east-1"
}

variable "project_name" {
  type        = string
  description = "Name identifier prefix assigned to the system stack"
  default     = "aetherrecon"
}

variable "vpc_cidr" {
  type        = string
  description = "Base networking block assignment allocation"
  default     = "10.50.0.0/16"
}

variable "public_subnet_cidrs" {
  type        = list(string)
  description = "CIDR block list tracking external public zones"
  default     = ["10.50.1.0/24", "10.50.2.0/24"]
}

variable "private_subnet_cidrs" {
  type        = list(string)
  description = "CIDR block list tracking routing protected segments"
  default     = ["10.50.11.0/24", "10.50.12.0/24"]
}

variable "availability_zones" {
  type        = list(string)
  description = "Explicit mapping list overrides for target topology allocation"
  default     = []
}

variable "image_tag" {
  type        = string
  description = "Target tracking container deployment immutable tag pointer value"
  default     = "latest"
}

variable "deploy_ecs_services" {
  type        = bool
  description = "Conditional evaluation switch governing platform execution layers initialization"
  default     = false
}

variable "tags" {
  type        = map(string)
  description = "Global metadata enforcement tracking map structure keys"
  default = {
    Environment = "production"
    Owner       = "aetherrecon"
  }
}