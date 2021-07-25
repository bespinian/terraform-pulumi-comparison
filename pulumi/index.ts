import * as pulumi from "@pulumi/pulumi";
import * as docker from "@pulumi/docker";

const image = new docker.RemoteImage("awesome", {
  name: "bespinian/awesome-image:1.0.0",
});

const container = new docker.Container("awesome", {
  image: image.latest,
  ports: [{ external: 8080, internal: 8080 }],
  envs: ["APP_TITLE=awesome"],
});
