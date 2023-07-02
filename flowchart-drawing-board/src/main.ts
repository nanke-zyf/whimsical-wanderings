import { createApp } from "vue";
import { setupStore } from "@/store/index";
import "./style.css";
import App from "./App.vue";

const app = createApp(App);

setupStore(app);
app.mount("#app");
