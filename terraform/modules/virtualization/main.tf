terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 2.13.0"
    }
  }
}

resource "docker_image" "awesome" {
  name         = "bespinian/awesome-image:1.0.0"
  keep_locally = false
}

resource "docker_container" "host" {
  count = (var.size == "L" ? 3 : 1)
  image = docker_image.awesome.latest
  name  = format("host-%s", count.index)
  env   = [format("APP_TITLE=host-%s", count.index)]
  ports {
    internal = 8080
    external = 9080 + count.index
  }
}
