import * as pulumi from "@pulumi/pulumi";
import * as docker from "@pulumi/docker";

enum GitlabSize {
  Small,
  Large,
}

class Gitlab extends pulumi.ComponentResource {
  constructor(
    name: string,
    virtUrl: pulumi.Input<string>,
    size: GitlabSize,
    opts: pulumi.ResourceOptions
  ) {
    super("components:Gitlab", name, {}, opts);

    let count = size == GitlabSize.Large ? 3 : 1;

    let image = new docker.RemoteImage("awesome-gitlab", {
      name: "bespinian/awesome-image:1.0.0",
    });
    for (var i = 0; i < count; i++) {
      let server = new docker.Container(`${name}-${i}` + i, {
        image: image.latest,
        ports: [{ external: 9080 + i, internal: 8080 }],
        envs: [`APP_TITLE=${name}-${i}`, `DB_HOST=${virtUrl}`],
      });
    }

    this.registerOutputs();
  }
}

export { Gitlab, GitlabSize };
