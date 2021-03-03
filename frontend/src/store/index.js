import Vue from 'vue'
import Vuex from 'vuex'

// Store

Vue.use(Vuex)
const store = new Vuex.Store(
  {
    state:{
      jwt: sessionStorage.getItem('jwt'),
      authenticated: false
    },
    mutations:{
      setAuthentication(state, status) {
        state.authenticated = status;
      }
    }
  }
)

export default store