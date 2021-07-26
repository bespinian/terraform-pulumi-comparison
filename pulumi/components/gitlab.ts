import * as pulumi from "@pulumi/pulumi";
import * as docker from "@pulumi/docker";

enum GitlabSize {
  Small,
  Large,
}

interface GitlabArgs {
  virtUrl: pulumi.Input<string>;
  size: pulumi.Input<GitlabSize>;
}

class Gitlab extends pulumi.ComponentResource {
  constructor(name: string, args: GitlabArgs, opts: pulumi.ResourceOptions) {
    super("components:Gitlab", name, {}, opts);

    let count = args.size == GitlabSize.Large ? 3 : 1;
    console.log(pulumi.interpolate`Virtualization URL: ${args.virtUrl}`);
    let image = new docker.RemoteImage("awesome-gitlab", {
      name: "bespinian/awesome-image:1.0.0",
    });
    for (var i = 0; i < count; i++) {
      let server = new docker.Container(`${name}-${i}` + i, {
        image: image.latest,
        ports: [{ external: 9080 + i, internal: 8080 }],
        envs: [`APP_TITLE=${name}-${i}`],
      });
    }

    this.registerOutputs();
  }
}

export { GitlabArgs, Gitlab, GitlabSize };
