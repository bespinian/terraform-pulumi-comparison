import * as pulumi from "@pulumi/pulumi";
import * as docker from "@pulumi/docker";

enum GitlabSize {
  Small,
  Large,
}

interface GitlabArgs {
  readonly virtUrl: pulumi.Input<string>;
  readonly size: pulumi.Input<GitlabSize>;
}

class Gitlab extends pulumi.ComponentResource {
  image: docker.RemoteImage;
  servers: docker.Container[];
  constructor(name: string, args: GitlabArgs, opts: pulumi.ResourceOptions) {
    super("platform:components:Gitlab", name, args, opts, false);

    let count = args.size == GitlabSize.Large ? 3 : 1;
    this.image = new docker.RemoteImage(
      "awesome-gitlab",
      {
        name: "bespinian/awesome-image:1.0.0",
      },
      { parent: this }
    );
    this.servers = [];
    for (var i = 0; i < count; i++) {
      let server = new docker.Container(
        `${name}-${i}` + i,
        {
          image: this.image.latest,
          ports: [{ external: 9080 + i, internal: 8080 }],
          envs: [`APP_TITLE=${name}-${i}`],
        },
        { parent: this }
      );
      this.servers.push(server);
    }

    this.registerOutputs();
  }
}

export { GitlabArgs, Gitlab, GitlabSize };
