import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/resetStyle.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ViewUI from 'view-design';
// import VueContextMenu from '@xunlei/vue-context-menu';
//
// Vue.use(VueContextMenu);
import 'view-design/dist/styles/iview.css';

Vue.use(ElementUI);
Vue.use(ViewUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
