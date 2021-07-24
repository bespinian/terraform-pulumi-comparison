variable "size" {
  type    = string
  default = "S"

  validation {
    condition     = contains(["S", "L"], var.size)
    error_message = "Allowed values for size are \"S\" and \"L\"."
  }
}
