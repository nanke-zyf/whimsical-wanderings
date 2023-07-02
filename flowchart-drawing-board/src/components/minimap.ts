import type { Graph } from "@antv/x6";
import { MiniMap } from "@antv/x6-plugin-minimap";

// 启用【复制粘贴】插件
export default function useMiniMap(graph: Graph, container: HTMLElement) {
  graph.use(
    new MiniMap({
      container,
      width: 200,
      height: 160,
      padding: 10,
    })
  );
}
