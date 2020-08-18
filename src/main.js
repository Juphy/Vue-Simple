// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import {
  Button,
  Layout,
  Menu,
  Icon,
  Breadcrumb
} from 'ant-design-vue';
import "./global.less";
import router from './router'

for (let key of [Button, Layout, Menu, Icon, Breadcrumb]) {
  Vue.use(key)
}

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")