import type { Graph, Cell } from "@antv/x6";
import { Transform } from "@antv/x6-plugin-transform";

// 启用【图形变化】插件，提供了节点缩放与旋转的能力
export default function useTransform(
  graph: Graph,
  enabled?: boolean | ((cell: Cell) => boolean)
) {
  graph.use(
    new Transform({
      resizing: {
        enabled: enabled || true,
        minWidth: 120,
        minHeight: 80,
        autoScroll: true, // 是否自动滚动画布
        orthogonal: false, // 是否显示中间缩放点,开启有8个控制点，关闭则只有4个
        preserveAspectRatio: false, //缩放过程中是否保持节点的宽高比例
      },
    })
  );
}
