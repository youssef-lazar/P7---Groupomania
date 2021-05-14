<template>

    <body>

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

                <button type="button" class="btn btn-success" color="green" data-dismiss="modal"
                    @click="saveModify()">Save</button>

                <button type="button" class="btn btn-default" color="primary" data-dismiss="modal"
                    @click="cancel">X</button>

            </form>
        </div>

    </body>

</template>

<script>
    import { mapActions, mapState } from 'vuex';
    
    // TODO en props de ce component tu dois avoir userID
    export default {
        name: 'Home',
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
            if (this.currentUser) {
                this.user = await this.$store.dispatch("getOneUser", {
                    id: this.currentUser.userId
                })
            }
        },

        methods: {
            ...mapActions(['modifyUser']),

            // requête pour modifier les informations du compte
            async saveModify() {
                console.log(this.user)
                await this.modifyUser(this.user)
                alert("Votre profil a bien été modifié")
                this.$router.push('/Profil')
            },

            async cancel() {
                this.$router.push('/Profil')
            },
        }
    }
</script>