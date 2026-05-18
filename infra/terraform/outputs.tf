output "app_url" {
  value       = "http://${aws_lb.main.dns_name}"
  description = "Frontend Client Public Entry Point Address DNS"
}

output "api_url" {
  value       = "http://${aws_lb.main.dns_name}/api"
  description = "Decoupled Routing Target Framework Base URL API Endpoint"
}

output "frontend_ecr_url" {
  value       = aws_ecr_repository.service["frontend"].repository_url
  description = "Target Base Image Registry Endpoint for Frontend Container builds"
}

output "backend_ecr_url" {
  value       = aws_ecr_repository.service["backend"].repository_url
  description = "Target Base Image Registry Endpoint for Recon Backend Container builds"
}

output "ecs_cluster_name" {
  value       = aws_ecs_cluster.main.name
  description = "Identifier Name Tracking Live Active ECS Cluster Context"
}