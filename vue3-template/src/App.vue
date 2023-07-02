<template>
  <p>Vue3+Webpack5 配置模板</p>
  <img :src="xiaomeng" alt="" />
  <img src="/WQE.svg" alt="" />
  <div class="img"></div>
  <User />
  <Age />

  <video :src="video" controls></video>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import "./styles/index.scss";
import xiaomeng from "@/assets/images/xiaomeng.gif";
import video from "@/assets/media/1.mp4";
import { getStorage } from "@/utils/index.ts";
import User from "@/components/User.vue";
import Age from "@/components/Age.vue";

console.log(process.env.NODE_ENV);
console.log(process.env.APP_ENV);
console.log(getStorage("username"));
</script>

<style scoped lang="scss">
p {
  color: red;
  transform: translateX(100px);
}

.img {
  width: 50px;
  height: 50px;
  background: url("@/assets/images/xiaomeng.gif") no-repeat center 100%/100%;
}
</style>
