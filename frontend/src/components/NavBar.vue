<template>

    <nav v-if="loggedIn" class="navbar navbar-expand-lg navbar-light navbar-fixed-top" role="navigation">

        <router-link class="navbar-brand" to="/">Groupomania</router-link>

        <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarContent"
            aria-controls="navbarContent" aria-expanded="false" aria-label="Afficher/Masquer navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div id="navbarContent" class="navbar-collapse collapse">
            <ul class="navbar-nav ml-auto">

                <li class="nav-item">
                    <router-link class="nav-link" to="/profil" >Mon profil </router-link>
                </li>

                <li class="nav-item">
                    <router-link class="nav-link" to="/all-profils" v-if="isAdmin" >Tous les profils </router-link>
                </li>

                <li class="nav-item">
                    <a class="nav-link" style="color:red;" @click="logoutHandler">Déconnexion</a>
                </li>

            </ul>
        </div>
    </nav>

   <nav v-else class="navbar navbar-expand-lg navbar-light navbar-fixed-top" role="navigation">

        <router-link class="navbar-brand" to="/">Groupomania</router-link>

        <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarContent"
            aria-controls="navbarContent" aria-expanded="false" aria-label="Afficher/Masquer navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div id="navbarContent" class="navbar-collapse collapse">
            <ul class="navbar-nav ml-auto ">

                <li class="nav-item">
                    <router-link class="nav-link" to="/signup" >Inscription </router-link>
                </li>

                <li class="nav-item">
                    <router-link class="nav-link" to="/login" >Connexion </router-link>
                </li>

            </ul>
        </div>
    </nav>

</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: "Navbar",

        computed: {
            ...mapGetters(['currentUser']),

            isAdmin() { // nous permet de savoir si l'utilisateur est un admin grâce aux infos présente dans le store
                return this.$store.getters.isAdmin
            },
            loggedIn() { // nous permet de savoir si l'utilisateur est connecté grâce au getter LoggedIn qui vient vérifier si l'utilisateur à bien un token
                return this.$store.getters.loggedIn
            },
            notLogged() { // nous permet de savoir si l'utilisateur est connecté grâce au getter LoggedIn qui vient vérifier si l'utilisateur à bien un token
                return this.$store.getters.notLogged
            }
        },

        methods: {
            ...mapActions(['logout']),
            logoutHandler() {
                this.logout();
                this.$router.push("/login");

            },
        }

    }
</script>

<style lang="scss" scoped>
    .navbar-brand {
        font-weight: 700;
    }

    .navbar .navbar-brand,
    .navbar .navbar-brand:hover {
        color: #0EA5E9;
    }

    .navbar {
        border-color: transparent;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .navbar .navbar-nav>.active>a,
    .navbar .navbar-nav>.active>a:hover,
    .navbar .navbar-nav>.active>a:focus {
        color: #0EA5E9;
        background-color: transparent;
    }

    .navbar .navbar-nav>li>a {
        color: #fff;
    }

    .navbar .navbar-nav>li>a:hover,
    .navbar .navbar-nav>li>a:focus {
        color: #0EA5E9;
    }

    .navbar .navbar-toggle {
        border: none;
        border-color: #fff;
    }

    .navbar .navbar-toggle:hover {
        background: #666;
    }

    .navbar .navbar-toggle .icon-bar {
        background-color: #fff;
    }
</style>