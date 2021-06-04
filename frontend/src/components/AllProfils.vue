<template>

    <body>
        <h1 class="form-heading">Liste de tous les profils</h1>

        <div v-if="isAdmin" class="col-md-12 mx-auto mt-5">
            <div class="allCards">
                <b-card tag="article" class="shadow mb-3" v-for="user in users" :key="user.id" id="card">

                    <p>{{user.firstName}} {{user.surname}}</p>

                    <button @click="edit(user)"><i class="fa fa-edit fa"></i></button>
                    <button @click="deleteProfil(user)"><i class="fa fa-trash fa"></i></button>

                </b-card>
            </div>
        </div>

        <div v-else>

            <h1> Vous n'avez pas accès à cette section!</h1>

        </div>
    </body>
</template>

<script>
    import {
        mapState,
        mapActions,
        mapGetters
    } from "vuex";
    import UserService from "../services/user.js"

    export default {
        name: "Profils",
        props: {
            id: {
                type: Number,
                default: null,
                required: false
            }
        },
        data() {
            return {}
        },

        created() {
            this.$store.dispatch("getAllUsers")
        },

        computed: {
            ...mapGetters(['currentUser']),

            isAdmin() { // nous permet de savoir si l'utilisateur est un admin grâce aux infos présente dans le store
                return this.$store.getters.isAdmin
            },

            ...mapState({
                users: "users",
            })
        },

        methods: {
            ...mapActions(['deleteUser']),

            async deleteProfil(user) {
                if (confirm("Souhaitez-vous supprimer ce compte?")) {
                    try {
                        await UserService.deleteUser(user.id)
                        this.$router.push("/signup");
                    } catch (error) {
                        console.log(error)
                    }
                }
            },

            async edit(user) {
                this.$router.push('/modify-profil/' + user.id)
            },
        }

    };
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
        min-width: 100%;
    }

    .allCards {
        display: flex;
        flex-direction: row;
    }

    .card {
        display: flex;
        flex-direction: column;
        word-wrap: break-word;
        background-color: #fff;
        background-clip: border-box;
        border-radius: 20px;
        margin-left: auto;
        margin-right: auto;
        justify-content: space-between;
        width: auto;
    }

    .card-body {
        border: solid;
        margin: auto;
        text-align: center;
        width: 200px;
        border-radius: 20px;
    }

    h1 {
        text-align: center;
        padding-bottom: 40px;
    }

    button {
        margin: 10px;
        font-size: 20px;
    }
</style>