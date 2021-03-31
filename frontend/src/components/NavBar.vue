<template>
    <nav>
        <div class="left-nav">
            <ul>
                <li>
                    <a>
                        <router-link to="/">Accueil</router-link>
                    </a>
                </li>
                <li>
                    <a>
                        <router-link to="/Profil">Votre Profil </router-link>
                    </a>
                </li>
            </ul>
        </div>
        <div class="logo">
            <div class="logo-image">
                <img src="../assets/icon-above-font.png">
            </div>

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
                <li>
                    <a style="color:red;" @click="logoutHandler">
                        Déconnexion
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
              
            },
        }

    }
</script>

<style lang="scss" scoped>
    nav {
        box-sizing: border-box;
        width: 100%;
        max-width: 1400px;
        margin: auto;
        position: relative;
        top: 0;
        left: 0;
        display: flex;
        padding: 20px;
        justify-content: space-between;
        border-bottom: thin solid black;
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

    .logo {
        display: flex;
        align-items: center;
    }

    .logo-text {
        text-align: center;
    }

    .logo-image {
        img {
            height: 8.5em;
        }

        margin-right: 1em;
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
        color: black;
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