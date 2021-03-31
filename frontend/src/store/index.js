import Vue from 'vue'
import Vuex from 'vuex'
import UserService from "../services/user";
import PostService from "../services/post";


// Store

Vue.use(Vuex)
const store = new Vuex.Store({
  
  state: {
    
    // User

    currentUser: JSON.parse(localStorage.getItem('currentUser')),

  // Posts

    posts: [],
},

  mutations: {

    // User

    removeCurrentUser(state){
        localStorage.removeItem('currentUser');
        state.currentUser = null;
    },
    setAuthentication(state, {
      token,
      userId,
      isAdmin
    }) {
      state.currentUser = {
        token,
        userId,
        isAdmin
      }
      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    },

    // posts
    setPosts(state, posts) {
    state.posts = posts
    },

  },
  getters: {
    currentUser(state) {
      return state.currentUser;
    }
  },

  actions: {

    // User

    logout({commit}){
      commit('removeCurrentUser');
    },

    async login({
      commit
    }, {email, password}) {
      const res = await UserService.login({
        email,
        password
      });
      commit('setAuthentication',res.data);
    },

    async signup({
      commit
    }, {firstName, surname, email, password}) {
      const res = await UserService.signup({
        firstName,
        surname,
        email,
        password
      });
      commit('setAuthentication',res.data);
    },

    // Posts

    async getAllPosts({ commit }) {
      try{
      const response = await PostService.getAllPosts({jwt: this.state.currentUser.token});
        commit("setPosts", response.data);
      }catch(error){
        console.log(error.response);
      }
    },

  }
})

export default store