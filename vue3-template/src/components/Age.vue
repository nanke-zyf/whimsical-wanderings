<template>
  <div class="user">
    <p>Age组件</p>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { setStorage } from "@/utils/index.ts";

onMounted(() => {
  setStorage("age", "20");
});
</script>

<style lang="less" scoped></style>
