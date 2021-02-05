import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //posts: []
  },
  mutations: {
    /* setPosts(state,data){
      state.posts = data
    } */
  },

  getters: {
    /* getPosts: state => {
     return state.posts;
    } */
  },
  
  actions: {
   /* loadPost({commit}){
      //API pour recuperer data
      //si ok 
      //mutation
    } */
  },
  modules: {
  }
})
