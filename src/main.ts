import { createApp } from "vue";
import { createVfm } from "vue-final-modal";
import { plugin, defaultConfig } from "@formkit/vue";
import config from ".././formkit.config.ts";
import "./style.css";
import "vue-final-modal/style.css";
import App from "./App.vue";

const app = createApp(App);

const vfm = createVfm();

app.use(vfm);
app.use(plugin, defaultConfig(config));
app.mount("#app");
