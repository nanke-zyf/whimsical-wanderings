import type { Graph } from "@antv/x6";
import { Snapline } from "@antv/x6-plugin-snapline";

// 启用【对齐线】插件
export default function useSnapline(graph: Graph) {
  graph.use(
    new Snapline({
      enabled: true,
      clean: 5000,
      filter(node) {
        // 为节省性能，子节点不触发对齐线
        return !!node.parent;
      },
    })
  );
}
