<template>
    <nav v-if="loggedIn">
        <div class="left-nav">
            <ul>
                <li>
                    <a>
                        <router-link to="/">Accueil</router-link>
                    </a>
                </li>
                <li>
                    <a>
                        <router-link to="/profil">Votre Profil </router-link>
                    </a>
                </li>
                <li>
                    <a>
                        <router-link v-if="isAdmin" to="/all-profils">Tous les profils </router-link>
                    </a>
                </li>
            </ul>
        </div>
        <div class="right-nav">
            <ul>
                <li>
                    <a style="color:red;" @click="logoutHandler">
                        Déconnexion
                    </a>
                </li>
            </ul>
        </div>
    </nav>
    

    <nav v-else>
        <div class="left-nav">
            <ul>
                <li>
                    <a>
                        <router-link to="/">Accueil</router-link>
                    </a>
                </li>
            </ul>
        </div>
        <div class="right-nav">
            <ul>
                <li>
                    <a>
                        <router-link to="/signup">Inscription </router-link>
                    </a>
                </li>
                <li>
                    <a>
                        <router-link to="/login">Connexion </router-link>
                    </a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>

import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "Navbar",

        computed: {
            ...mapGetters(['currentUser']),

            isAdmin() { // nous permet de savoir si l'utilisateur est un admin grâce aux infos présente dans le store
                return this.$store.getters.isAdmin
            },
            loggedIn() { // nous permet de savoir si l'utilisateur est connecté grâce au getter LoggedIn qui vient vérifier si l'utilisateur à bien un token
                return this.$store.getters.loggedIn
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
    nav {
        box-sizing: border-box;
        width: 100%;
        margin: auto;
        position: relative;
        top: 0;
        left: 0;
        display: flex;
        padding: 20px;
        justify-content: space-between;
        border-bottom: thin solid black;
        background: url("../assets/navbar2.png"); 
    }

    h1 {
        font-weight: 700;
        font-size: 2.4em;
        margin: 0;
    }

    h5 {
        font-size: 1.2em;
        font-weight: 400;
        margin: 0;
    }

    .left-nav,
    .right-nav {
        align-self: center;
        width: 30%;
    }

    .right-nav {
        ul {
            justify-content: flex-end;
        }
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
    }

    li {
        margin: 0 15px;
    }

    a {
        color: white;
        font-weight: 400;
        text-decoration: none;
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    }

    .active {
        font-weight: 700;
        text-decoration: underline;
    }
</style>