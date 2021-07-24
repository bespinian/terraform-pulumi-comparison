variable "virt_url" {
  description = "URL of the virtualization environment"
  type        = string
}

variable "virt_password" {
  description = "Password of the virtualization environment"
  type        = string
}

variable "fqdn" {
  description = "Fully qualified name of the Gitlab instance"
  type        = string
  default     = "gitlab.mgmt.lab"
}

variable "size" {
  type    = string
  default = "S"

  validation {
    condition     = contains(["S", "L"], var.size)
    error_message = "Allowed values for size are \"S\" and \"L\"."
  }
}
