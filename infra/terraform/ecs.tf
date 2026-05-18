resource "aws_ecs_task_definition" "service" {
  for_each                 = toset(local.service_names)
  family                   = "${var.project_name}-${each.key}"
  cpu                      = local.service_cpu[each.key]
  memory                   = local.service_memory[each.key]
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = aws_iam_role.execution.arn
  task_role_arn            = aws_iam_role.task.arn

  container_definitions = jsonencode([{
    name      = each.key
    image     = "${data.aws_caller_identity.current.account_id}.dkr.ecr.${var.aws_region}.amazonaws.com/${var.project_name}-${each.key}:${var.image_tag}"
    essential = true

    portMappings = [{
      containerPort = local.service_ports[each.key]
      hostPort      = local.service_ports[each.key]
      protocol      = "tcp"
    }]

    environment = local.container_env[each.key]

    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = aws_cloudwatch_log_group.ecs[each.key].name
        "awslogs-region"        = var.aws_region
        "awslogs-stream-prefix" = "ecs"
      }
    }

    # Custom dynamic block to inject elevated Linux network privileges for Nmap capabilities safely only within backend bounds
    linuxParameters = each.key == "backend" ? {
      capabilities = {
        add = ["NET_RAW", "NET_ADMIN"]
      }
    } : null
  }])

  tags = local.common_tags
}

resource "aws_ecs_service" "service" {
  for_each               = toset(local.service_names)
  name                   = "${var.project_name}-${each.key}"
  cluster                = aws_ecs_cluster.main.id
  task_definition        = aws_ecs_task_definition.service[each.key].arn
  desired_count          = var.deploy_ecs_services ? 1 : 0
  launch_type            = "FARGATE"
  enable_execute_command = true

  network_configuration {
    subnets         = aws_subnet.private[*].id
    security_groups = [aws_security_group.service[each.key].id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.service[each.key].arn
    container_name   = each.key
    container_port   = local.service_ports[each.key]
  }

  depends_on = [aws_lb_listener.http, aws_lb_listener_rule.api_routing]
  tags       = local.common_tags
}