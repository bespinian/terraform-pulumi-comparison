output "url" {
  description = "URL of the hypervisor"
  value       = join(",", docker_container.host.*.id)
}

output "admin_password" {
  description = "URL of the hypervisor"
  value       = join(",", docker_container.host.*.id)
  sensitive   = true
}
