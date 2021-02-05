import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'

// plugins
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

// bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

const axiosInstance = axios.create({
  headers: {
      Authorization: 'Bearer '+ sessionStorage.getItem('jwt'),
      'Content-Type': 'application/json'
  }
});  
Vue.prototype.axios = axiosInstance

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')