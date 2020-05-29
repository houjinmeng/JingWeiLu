// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/index.css'
import qs from 'qs'
import axios from 'axios'
import Vant from 'vant';
import 'vant/lib/index.css';


Vue.use(Vant)
Vue.use(ElementUI);
Vue.config.productionTip = false
// axios请求根地址
// axios.defaults.baseURL = 'http://liujunfeng.imwork.net:23930/api/'
axios.defaults.baseURL = 'http://192.168.0.106:1022/api/'
Vue.prototype.$http = axios
Vue.prototype.$qs = qs
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

