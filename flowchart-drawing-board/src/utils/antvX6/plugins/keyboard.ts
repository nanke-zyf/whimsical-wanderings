import type { Graph } from "@antv/x6";
import { Keyboard } from "@antv/x6-plugin-keyboard";

// 启用【快捷键】插件
export default function useKeyboard(graph: Graph) {
  graph.use(
    new Keyboard({
      enabled: true,
      global: true,
    })
  );
}
