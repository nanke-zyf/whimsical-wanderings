import type { Graph } from "@antv/x6";
import { Export } from "@antv/x6-plugin-export";

// 启用【导出图片】插件
export default function useExport(graph: Graph) {
  graph.use(new Export());
}
