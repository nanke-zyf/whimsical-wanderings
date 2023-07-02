import { Graph } from "@antv/x6";
import { graphConfig } from "./config";

export function init(options: Graph.Options): Graph {
  const graphInstance = new Graph({
    ...(graphConfig as Graph.Options),
    ...options,
  });

  const plugins = import.meta.glob("./plugins/*.ts", { eager: true });

  Object.keys(plugins).forEach((path) => {
    (plugins[path] as any).default(graphInstance);
  });

  return graphInstance;
}
