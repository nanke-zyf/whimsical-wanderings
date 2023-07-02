import type { Graph } from "@antv/x6";
import { History } from "@antv/x6-plugin-history";

// 启用【撤销恢复】插件
export default function useHistory(graph: Graph) {
  graph.use(
    new History({
      enabled: true,
    })
  );
}
