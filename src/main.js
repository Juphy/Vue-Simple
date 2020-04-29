import Vue from 'vue'
import App from './App.vue'
import {
  Button,
  Layout,
  Menu,
  Icon,
  Breadcrumb
} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import "./assets/style.css";
import router from './router'

Vue.component(Button.name, Button);
Vue.component(Layout.name, Layout);
Vue.component(Layout.Header.name, Layout.Header);
Vue.component(Layout.Sider.name, Layout.Sider);
Vue.component(Layout.Content.name, Layout.Content);
Vue.component(Menu.name, Menu);
Vue.component(Menu.Item.name, Menu.Item);
Vue.component(Icon.name, Icon);
Vue.component(Breadcrumb.name, Breadcrumb);
Vue.component(Breadcrumb.Item.name, Breadcrumb.Item);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")