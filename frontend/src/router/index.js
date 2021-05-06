import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import MyProfil from '../views/MyProfil'
import ModifyProfilForm from '../components/ModifyProfilForm'



Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { 
      requiresAuth: true
    }
  },

  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    meta: {
      guest: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      guest: true
    }
  },
    {
    path: '/Profil',
    name: 'Profil',
    component: MyProfil,
  },
    {
    path: '/ModifyProfil',
    name: 'ModifyProfilForm',
    component: ModifyProfilForm,
  },
 
]

const router = new VueRouter({
  routes
})

export default router