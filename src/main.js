import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { Icon } from "@iconify/vue";
import "./style.css";
import VueLazyload from "vue-lazyload";

const app = createApp(App);


app.component("Icon", Icon);


app.use(router);


app.mount("#app");

app.use(VueLazyload);