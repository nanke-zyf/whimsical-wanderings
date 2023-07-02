import type { Graph } from "@antv/x6";
import { Selection } from "@antv/x6-plugin-selection";

// 启用【复制粘贴】插件
export default function useSelection(graph: Graph) {
  graph.use(
    new Selection({
      enabled: true,
      rubberband: true,
      modifiers: ["shift"], // 框选修饰键
      showNodeSelectionBox: true,
      pointerEvents: "none",
    })
  );
}
