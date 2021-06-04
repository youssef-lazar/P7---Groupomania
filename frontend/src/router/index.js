import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import MyProfil from '../views/MyProfil'
import ModifyProfilForm from '../components/ModifyProfilForm'
import AllProfils from '../components/AllProfils'
import ModifyPost from '../components/ModifyPost'



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
    path: '/profil',
    name: 'profil',
    component: MyProfil,
  },
    {
    path: '/modify-profil/:id',
    name: 'ModifyProfilForm',
    component: ModifyProfilForm,
    props: route => ({ userId: Number(route.params.id) } )
  },
    {
    path: '/all-profils',
    name: 'AllProfils',
    component: AllProfils,
  },
    {
    path: '/modify-post/:id',
    name: 'ModifyPost',
    component: ModifyPost,
    props: route => ({ postId: Number(route.params.id) } )
  },
 
]

const router = new VueRouter({
  routes
})

export default router