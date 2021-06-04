<template>

    <body>
        <div class="home">
            <div class="header">
            </div>

            <div class="addBar">
                <Profil v-bind:userId="userId" v-bind:jwt="jwt" />
            </div>
        </div>
    </body>

</template>

<script>
    import Profil from '@/components/Profil.vue'

    export default {
        name: 'Home',
        data() {
            return {
                revele: false,
                userId: sessionStorage.getItem('userId'),
                isAdmin: sessionStorage.getItem('isAdmin'),
                jwt: sessionStorage.getItem('jwt')
            }
        },
        components: {
            Profil,

        }
    }
</script>

<style scoped lang="scss">
    body {
        background-image: url(/img/fond.6fed4a74.jpg);
        background-size: cover;
        background-repeat: no-repeat;
        width: 100%;
        height: auto;
        position: absolute;
        left: 0;
        min-height: 100%;
        min-width: 1024px;
    }
</style>