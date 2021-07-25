import * as pulumi from "@pulumi/pulumi";
import * as virt from "./components/virtualization";
import * as gl from "./components/gitlab";

const virtualization = new virt.Virtualization(
  "virtualization",
  virt.VirtualizationSize.Large,
  {}
);

const gitlab = new gl.Gitlab(
  "gitlab",
  virtualization.url,
  gl.GitlabSize.Large,
  {}
);
