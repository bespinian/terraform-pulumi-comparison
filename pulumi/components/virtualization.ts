import * as pulumi from "@pulumi/pulumi";
import * as docker from "@pulumi/docker";

enum VirtualizationSize {
  Small,
  Large,
}

class Virtualization extends pulumi.ComponentResource {
  constructor(
    name: string,
    size: VirtualizationSize,
    opts: pulumi.ResourceOptions
  ) {
    super("components:Virtualization", name, {}, opts);

    let count = size == VirtualizationSize.Large ? 3 : 1;

    let image = new docker.RemoteImage("awesome", {
      name: "bespinian/awesome-image:1.0.0",
    });

    for (var i = 0; i < count; i++) {
      let container = new docker.Container(`${name}-${i}` + i, {
        image: image.latest,
        ports: [{ external: 8080 + i, internal: 8080 }],
        envs: [`APP_TITLE=${name}-${i}`],
      });
    }
    this.registerOutputs();
  }
}

export { Virtualization, VirtualizationSize };
