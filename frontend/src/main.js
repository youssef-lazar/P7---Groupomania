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
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap-vue/dist/bootstrap-vue.css'



// register jw pagination component globally
import JWPagination from 'jw-vue-pagination';
Vue.component('jw-pagination', JWPagination);

Vue.config.productionTip = false

const axiosInstance = axios.create({
  headers: {
      Authorization: 'Bearer '+ localStorage.getItem('jwt'),
      'Content-Type': 'application/json'
  }
});
Vue.prototype.axios = axiosInstance

new Vue({
  router,
  store,

  render: h => h(App)
}).$mount('#app')