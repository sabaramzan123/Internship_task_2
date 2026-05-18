resource "aws_security_group" "alb" {
  name        = "${var.project_name}-alb-sg"
  description = "Controls dynamic proxy ingress routing boundaries into ALB"
  vpc_id      = aws_vpc.main.id
  tags        = merge({ Name = "${var.project_name}-alb-sg" }, local.common_tags)
}

resource "aws_security_group_rule" "alb_ingress_80" {
  type              = "ingress"
  security_group_id = aws_security_group.alb.id
  from_port         = 80
  to_port           = 80
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "alb_ingress_443" {
  type              = "ingress"
  security_group_id = aws_security_group.alb.id
  from_port         = 443
  to_port           = 443
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "alb_egress_all" {
  type              = "egress"
  security_group_id = aws_security_group.alb.id
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
}

resource "aws_security_group" "service" {
  for_each    = toset(local.service_names)
  name        = "${var.project_name}-${each.key}-sg"
  description = "Security perimeter context layer wrapping for task instance execution of ${each.key}"
  vpc_id      = aws_vpc.main.id
  tags        = merge({ Name = "${var.project_name}-${each.key}-sg" }, local.common_tags)
}

resource "aws_security_group_rule" "service_ingress_from_alb" {
  for_each                 = toset(local.service_names)
  type                     = "ingress"
  security_group_id        = aws_security_group.service[each.key].id
  from_port                = local.service_ports[each.key]
  to_port                  = local.service_ports[each.key]
  protocol                 = "tcp"
  source_security_group_id = aws_security_group.alb.id
}

resource "aws_security_group_rule" "service_egress_all" {
  for_each          = toset(local.service_names)
  type              = "egress"
  security_group_id = aws_security_group.service[each.key].id
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
}