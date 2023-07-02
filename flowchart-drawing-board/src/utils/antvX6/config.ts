import { Shape } from "@antv/x6";

// 画布网格配置
export const GridConfig = {
  type: "doubleMesh",
  size: 20, // 画布网格大小，同时也是Edge连线路由manhattan的推荐值
  visible: true,
  args: [
    {
      color: "#E7E8EA",
      thickness: 1,
    },
    {
      color: "#CBCED3",
      thickness: 1,
      factor: 5,
    },
  ],
  backgroud: "#F5F7FA",
};

// 全局连线配置
export const connectingConfig = {
  snap: {
    radius: 50, // 50px附近自动吸附
  },
  allowMulti: "withPort",
  allowBlank: false, // 是否允许连接到画布空白位置的点
  allowLoop: true, // 是否允许创建循环连线，即边的起始节点和终止节点为同一节点
  allowNode: false, // 是否允许边链接到节点（非节点上的链接桩）
  allowEdge: false,
  allowPort: true,
  // anchor: 'center',
  // connectionPoint: 'boundary',
  router: {
    name: "manhattan",
    args: {
      step: 20,
    },
  },
  // createEdge() {
  //   return new Shape.Edge({
  //     attrs: baseEdgeAttrs.normal,
  //     labels: [
  //       {
  //         attrs: {
  //           text: {
  //             text: '',
  //             fontSize: 16,
  //             fill: '#333',
  //           },
  //         },
  //       },
  //     ],
  //     connector: 'rounded', //'normal',
  //     data: {
  //       edgeType: EdgeShapeEnum.NORMAL,
  //     },
  //   });
  // },
};

export const graphConfig = {
  autoResize: true,
  grid: GridConfig,
  background: {
    color: GridConfig.backgroud,
  },
  /** 鼠标滚轮的默认行为是滚动页面， 按住'ctrl'或'meta'是缩放 */
  mousewheel: {
    enabled: true,
    modifiers: ["ctrl", "meta"],
  },
  scroller: {
    enabled: true,
    pannable: true,
    pageVisible: true,
    pageBreak: false,
  },
  panning: {
    enabled: true,
    eventTypes: ["leftMouseDown", "rightMouseDown", "mouseWheel"],
  },
  scaling: {
    min: 0.3, // 默认值为 0.01
    max: 10, // 默认值为 16
  },
  /** 全局连线配置 */
  connecting: connectingConfig,
};
