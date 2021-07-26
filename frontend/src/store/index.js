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
    userDetails: JSON.parse(localStorage.getItem('userDetails')),

    users: [],
    

  // Posts

    posts: [],
    post: [],


    // Comment

    setComment: [],
},

  mutations: {

    // User

    removeCurrentUser(state){
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userDetails');
        state.currentUser = null;
        state.userDetails = null;
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

    setUserDetails(state, {
        firstName,
        surname,
        email,
        photo,
        bio,
        createdAt
    }) {
      state.userDetails = {
        firstName,
        surname,
        email,
        photo,
        bio,
        createdAt
      }
      localStorage.setItem("userDetails", JSON.stringify(state.userDetails));
    },

    setUsersList(state, users) {
    state.users = users
    },
    

    // posts
    setPosts(state, posts) {
    state.posts = posts
    },

    setPost(state, post) {
    state.post = post
    },

    // comment
    setComment(state, comment) {
    state.comment = comment
    },

  },

  getters: {
    currentUser(state) {
      return state.currentUser;
    },
    loggedIn(state) {
      return state.currentUser !== null;
    },
    notLogged(state) {
      return state.currentUser == null;
    },
    isAdmin(state) {
      return state.currentUser.isAdmin === 1;
    },
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

    async getOneUser({commit},{id}) {
      try{
      const response = await UserService.getOneUser(id);
        commit("setUserDetails", response.data);
        return response.data;
      }catch(error){
        console.log(error.response);
      }
    },

    async modifyUser({ commit },{id, firstName, surname, bio}) {
      try{
      const response = await UserService.modifyUser(id,{
        user:{
        firstName,
        surname,
        bio
      }});
       commit(response.data);
        return response.data;
      }catch(error){
        console.log(error.response);
      }
    },

    async deleteUser({ commit }, {id}) {
      try{
      const response = await UserService.deleteUser(id);
      commit("removeCurrentUser", response.data);
        return response.data;
      }catch(error){
       throw new Error(error.message)
      }
    },

    async getAllUsers({ commit }) {
      try{
      const response = await UserService.getAllUsers();
        commit("setUsersList", response.data);
      }catch(error){
        console.log(error.response);
      }
    },

    // Posts

    async getAllPosts({ commit }) {
      try{
      const response = await PostService.getAllPosts();
        commit("setPosts", response.data);
      }catch(error){
        console.log(error.response);
      }
    },

    async createPost({ commit }, {text, imageUrl}) {
      const res = await PostService.createPost({
        text,
        imageUrl
      });
      commit(res.data);
    },

    async getOnePost({ commit },{id}) {
      try{
      const response = await PostService.getOnePost(id);
        commit("setPost", response.data);
        return response.data;
      }catch(error){
        console.log(error.response);
      }
    },

    async modifyPost({ commit },{id, text, imageUrl}) {
      try{
      const response = await PostService.modifyPost(id,{
        post:{
        text,
        imageUrl
      }});
        commit(response.data);
        return response.data;
      }catch(error){
        console.log(error.response);
      }
    },

    async deletePost({ commit },{id}) {
      try{
      const response = await PostService.deletePost(id);
        commit(response.data);
        return response.data;
      }catch(error){
       throw new Error(error.message)
      }
    },

    async getOneComment({ commit },{id}) {
      try{
      const response = await PostService.getOneComment(id);
        commit("setComment", response.data);
        return response.data;
      }catch(error){
        console.log(error.response);
      }
    },

    async modifyComment({ commit },{id,comment}) {
      try{
      const response = await PostService.modifyComment(id,comment);
        commit(response.data);
        return response.data;
      }catch(error){
        console.log(error.response);
      }
    },


  }
})

export default store