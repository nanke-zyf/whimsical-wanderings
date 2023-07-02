<template>
  <div class="drawing-board">
    <!-- <GraphHeader
      class="editor-header"
      :modelName="`${currentModelInfo.groupName} - 测试流程`"
      @close="router.back()"
      @save="handleConfirm"
    /> -->

    <div class="graph-container">
      <div class="main">
        <div style="width: 100%; height: 100%" ref="graphRef"></div>
      </div>
      <div class="side-stencil" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useFlowChartStore } from "@/store/modules/flowchart";

const graphRef = ref<HTMLDivElement>();
const FlowChartStore = useFlowChartStore();

onMounted(() => {
  FlowChartStore.initGraph({
    container: graphRef.value,
  });
});
</script>

<style lang="less" scoped>
.drawing-board {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .graph-container {
    flex: 1;
    position: relative;
    overflow: hidden;
    .main {
      width: 100% !important;
      height: 100% !important;
      margin-left: 180px;
      overflow: hidden;
    }

    .side-stencil {
      position: absolute;
      top: 0;
      left: 0;
      width: 180px;
      height: 100%;
      background: red;
    }
  }
}
</style>
