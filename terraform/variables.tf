variable "fqdn" {
  description = "Fully qualified name of the Gitlab instance"
  type        = string
  default     = "gitlab.mgmt.lab"
}

variable "size" {
  type    = string
  default = "L"

  validation {
    condition     = contains(["S", "L"], var.size)
    error_message = "Allowed values for size are \"S\" and \"L\"."
  }
}
