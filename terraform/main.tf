terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 2.13.0"
    }
  }
}

provider "docker" {}

resource "docker_image" "awesome" {
  name         = "bespinian/awesome-image:1.0.0"
  keep_locally = false
}

resource "docker_container" "gitlab-server" {
  count = (var.size == "L" ? 3 : 1)
  image = docker_image.awesome.latest
  name  = format("gitlab-server-%s", count.index)
  env   = [format("APP_TITLE=%s", var.fqdn)]
  ports {
    internal = 8080
    external = 8080 + count.index
  }
}
