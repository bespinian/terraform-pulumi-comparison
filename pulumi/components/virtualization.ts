import * as pulumi from "@pulumi/pulumi";
import * as docker from "@pulumi/docker";

enum VirtualizationSize {
  Small,
  Large,
}

class Virtualization extends pulumi.ComponentResource {
  public readonly url: pulumi.Output<string>;
  image: docker.RemoteImage;
  hosts: docker.Container[];

  constructor(
    name: string,
    size: VirtualizationSize,
    opts: pulumi.ResourceOptions
  ) {
    super("platform:components:Virtualization", name, {}, opts);

    let count = size == VirtualizationSize.Large ? 3 : 1;

    this.image = new docker.RemoteImage(
      "awesome-virtualization",
      {
        name: "bespinian/awesome-image:1.0.0",
      },
      { parent: this }
    );

    let urls = [];
    this.hosts = [];
    for (var i = 0; i < count; i++) {
      let host = new docker.Container(
        `${name}-${i}` + i,
        {
          image: this.image.latest,
          ports: [{ external: 8080 + i, internal: 8080 }],
          envs: [`APP_TITLE=${name}-${i}`],
        },
        { parent: this }
      );
      this.hosts.push(host);
      urls.push(host.id);
    }

    this.url = pulumi.all(urls).apply((urls) => urls.join(","));
    this.registerOutputs({ url: this.url });
  }
}

export { Virtualization, VirtualizationSize };
