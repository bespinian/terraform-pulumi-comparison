import * as pulumi from "@pulumi/pulumi";
import * as docker from "@pulumi/docker";

const image = new docker.RemoteImage("ubuntu", {
  name: "ubuntu:precise",
});

const container = new docker.Container("ubuntu", {
  image: image.latest,
});
