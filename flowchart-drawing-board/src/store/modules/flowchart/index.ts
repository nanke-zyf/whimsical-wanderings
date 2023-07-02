import { defineStore } from "pinia";
import { ref } from "vue";
import { Graph, Node, Edge, Cell } from "@antv/x6";
import { init } from "@/utils/antvX6";

export const useFlowChartStore = defineStore("FlowChartStore", () => {
  const GraphInstance = ref<Graph>();

  function initGraph(options: Graph.Options) {
    if (GraphInstance.value) return;

    GraphInstance.value = init({
      ...options,
    });
  }

  return {
    GraphInstance,
    initGraph,
  };
});
