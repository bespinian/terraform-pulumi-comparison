module "gitlab" {
  source = "../modules/gitlab"

  fqdn          = "git.example.lab"
  size          = "L"
  virt_url      = module.virtualization.url
  virt_password = module.virtualization.admin_password
}
