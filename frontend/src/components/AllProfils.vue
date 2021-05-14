<template>
    <body>
        <h1 class="form-heading">Liste de tous les profils</h1>
        <div class="col-md-12 mx-auto mt-5">
            <div class="allCards">
                <b-card tag="article" class="shadow mb-3" v-for="user in users" :key="user.id" id="card">

                    <p>{{user.firstName}} {{user.surname}}</p>

                    <button @click="edit"><i class="fa fa-edit fa"></i></button>
                    <button @click="deleteProfil"><i class="fa fa-trash fa"></i></button>

                </b-card>
            </div>
        </div>
    </body>
</template>

<script>
    import { mapState, mapActions } from "vuex";

    export default {
        name: "Profils",
        data() {
            return {}
        },

        created() {
            this.$store.dispatch("getAllUsers")
        },

        computed: {
            ...mapState({
                users: "users",
            })
        },

        methods: {
            ...mapActions(['deleteUser']),

            async deleteProfil() {
                if (confirm("Souhaitez-vous supprimer ce compte?")) {
                    try {
                        await this.$store.dispatch('deleteUser', this.user)
                        this.$router.push("/signup");
                    } catch (error) {
                        // TODO  QUOI FAIRE ??
                    }
                }
            },

            async edit() {
                this.$router.push('/ModifyProfil')
            },
        }

    };
</script>

<style scoped lang="scss">
    body {
        margin: 0;
        padding: 100px;
        background: url("../assets/fond.jpg") no-repeat center fixed;
        -webkit-background-size: cover;
        background-size: cover;
    }

    .allCards {
        display: flex;
        flex-direction: row;
    }

    card {
        width: 300px;
    }

    button {
        margin: 10px;
        font-size: 20px;
    }
</style>