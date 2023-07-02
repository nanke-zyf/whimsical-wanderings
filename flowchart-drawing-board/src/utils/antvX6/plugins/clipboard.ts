import type { Graph } from "@antv/x6";
import { Clipboard } from "@antv/x6-plugin-clipboard";

// 启用【复制粘贴】插件
export default function useClipboard(graph: Graph) {
  graph.use(
    new Clipboard({
      enabled: true,
    })
  );
}
