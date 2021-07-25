import * as pulumi from "@pulumi/pulumi";
import * as virt from "./components/virtualization";

const virtualization = new virt.Virtualization(
  "virtualization",
  virt.VirtualizationSize.Large,
  {}
);
