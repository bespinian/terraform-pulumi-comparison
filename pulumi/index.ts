import * as pulumi from "@pulumi/pulumi";
import * as virt from "./components/virtualization";
import * as gl from "./components/gitlab";

let config = new pulumi.Config();

let virtSize: virt.VirtualizationSize;
let gitlabSize: gl.GitlabSize;

if (config.get("size") === "small") {
  virtSize = virt.VirtualizationSize.Small;
  gitlabSize = gl.GitlabSize.Small;
} else {
  virtSize = virt.VirtualizationSize.Large;
  gitlabSize = gl.GitlabSize.Large;
}

const virtualization = new virt.Virtualization("virtualization", virtSize, {});

const gitlab = new gl.Gitlab(
  "gitlab",
  <gl.GitlabArgs>{ size: gitlabSize, virtUrl: virtualization.url },
  { dependsOn: [virtualization] }
);
