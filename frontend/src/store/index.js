import Vue from 'vue'
import Vuex from 'vuex'

// Store

Vue.use(Vuex)
const store = new Vuex.Store(
  {
    state:{ // toutes nos données présente dans le state de l'application
    jwt: localStorage.getItem('jwt') || null,
    posts: [],
    allPosts: [],
    users: [],
    currentUser: JSON.parse(sessionStorage.getItem('userId')) || null,
    },

    mutations:{
      setAuthentication(state, status) {
        state.authenticated = status;
      }
    },

    getters: { // nos getters qui nous permettent de définir si un utilisateur est connecter et/ou admin
    loggedIn(state) {
      return state.jwt !== null;
    },
    isAdmin(state) {
      return state.currentUser.privilege != 0;
    },
  }, 
  
  }
)

export default store
