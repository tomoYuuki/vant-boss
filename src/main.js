import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//自定义主题样式第一步
// import "vant/lib/index.less";
//这里必须引入，才能设置rem基准值
import "lib-flexible/flexible";
Vue.config.productionTip = false;
//图片懒加载
import { Lazyload } from "vant";

Vue.use(Lazyload);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
