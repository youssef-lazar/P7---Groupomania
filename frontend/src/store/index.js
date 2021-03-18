import Vue from 'vue'
import Vuex from 'vuex'


// Store

Vue.use(Vuex)
const store = new Vuex.Store(
  {
    state:{
      jwt: sessionStorage.getItem('jwt'),
      authenticated: false,
      currentUserId: null
    },
    mutations:{
      setAuthentication(state, {token,status, userId, isAdmin}) {
        sessionStorage.setItem("jwt", token);
        sessionStorage.setItem("userId",userId);
        sessionStorage.setItem("isAdmin", isAdmin);
        state.authenticated = status;
      }
    },

    actions:{
      login({commit},email,password){
         this.axios
                    .post("http://localhost:3000/api/user/login", {
                        email: email,
                        password: password,
                    })
                    .then((res) => {
                        commit('setAuthentication', {status: true, token: res.data.token, userId: res.data.UserId})
                            return true;
                    })
                    .catch((err) => {
                        console.log(err);
                        return false;
                    });
      }
    }
  }
)

export default store