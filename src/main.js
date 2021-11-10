import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueAxios from "vue-axios";
import hevueImgPreview from 'hevue-img-preview';
import "./assets/css/style.css";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(hevueImgPreview, {
  clickMaskCLose: true,
});
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
