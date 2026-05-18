data "aws_availability_zones" "available" {
  state = "available"
}

data "aws_caller_identity" "current" {}

locals {
  azs         = length(var.availability_zones) > 0 ? var.availability_zones : [data.aws_availability_zones.available.names[0], data.aws_availability_zones.available.names[1]]
  common_tags = merge({ Project = var.project_name, ManagedBy = "terraform" }, var.tags)

  service_names = ["frontend", "backend"]

  service_ports = {
    frontend = 3000
    backend  = 8000
  }

  service_cpu = {
    frontend = 512
    backend  = 1024
  }

  service_memory = {
    frontend = 1024
    backend  = 2048
  }

  container_env = {
    frontend = [
      { name = "PORT", value = "3000" },
      { name = "NODE_ENV", value = "production" },
      { name = "NEXT_PUBLIC_API_URL", value = "http://${aws_lb.main.dns_name}/api" }
    ]
    backend = [
      { name = "PORT", value = "8000" },
      { name = "PYTHONUNBUFFERED", value = "1" }
    ]
  }
}