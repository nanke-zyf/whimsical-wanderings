<template>
  <div class="user">
    <p>User组件</p>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { setStorage } from "@/utils/index.ts";

onMounted(() => {
  setStorage("username", "xiaomeng");
});
</script>

<style lang="less" scoped></style>
