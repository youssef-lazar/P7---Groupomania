<template>

        <div class="modify-profil">

            <div>
                <h1>Modifier les informations</h1>
            </div>



            <form v-if="user" method="POST" @submit.prevent.stop>
                <div class="form-group">
                    <label for="firstName">Prénom</label>
                    <input type="text" class="form-control" id="firstName" v-model="user.firstName">
                </div>

                <div class="form-group">
                    <label for="surname">Nom</label>
                    <input type="text" class="form-control" id="surname" v-model="user.surname">
                </div>

                <div class="form-group">
                    <label for="bio">Votre Bio</label>
                    <textarea class="form-control" id="bio" rows="5" v-model="user.bio"></textarea>
                </div>

                <button type="button" class="btn btn-success" color="green" @click="saveModify()">Enregistrer</button>

                <button type="button" class="btn btn-danger" color="red" @click="cancel">Annuler</button>

            </form>
        </div>

</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import UserService from "../services/user.js"

    export default {
        name: 'ModifyProfilForm',
        props: {
            userId: {
                type: Number,
                default: null,
                required: false
            }
        },
        data() {
            return {
                user: null,
            }
        },

        computed: {
            ...mapState(["currentUser"])
        },

        async mounted() {
            const response = await UserService.getOneUser(
            this.userId  || this.currentUser.userId)
            this.user = response.data;
        },

        methods: {
            ...mapActions(['modifyUser']),

            // requête pour modifier les informations du compte
            async saveModify() {

                await this.modifyUser(this.user)
                alert("Le profil a bien été modifié")
                this.$router.go(-1)
            },

            async cancel() {
                this.$router.go(-1)
            },
        }
    }
</script>

<style scoped lang="scss">

h1 {
    margin: 30px;
    text-align: center;
    text-shadow: 2px 2px 2px black;
    color: white;
}

</style>