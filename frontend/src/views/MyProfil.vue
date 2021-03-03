<template>

    <div class="home">
        <div class="header">
        </div>

        <div class="addBar">
            <Profil v-bind:userId="userId" v-bind:jwt="jwt"/>
        </div>
    </div>

</template>

<script>

import Profil from '@/components/Profil.vue'
export default {
    name: 'Home',
    data(){
        return{
            revele: false,
            userId: sessionStorage.getItem('userId'),
            isAdmin: sessionStorage.getItem('isAdmin'),
            jwt: sessionStorage.getItem('jwt')
        }
    },
    components:{
        Profil,
    }
}
</script>