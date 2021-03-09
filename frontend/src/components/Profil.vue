<template>
    <div class="Profil">

        <div id="Profil">
            <h3>Bonjour <span>{{ profil.firstName }}</span> ravi de vous revoir !</h3>
            <hr>
            <div id="profil_informations">
                <p>{{ profil.firstName }} {{ profil.surname }}</p>
                <p>Vous êtes parmis nous depuis le :</p>
                <p>{{ profil.createdAt }}</p>
            </div>
            <button @click="toggleModale">Supprimer mon compte</button>
            <div id="modal-confirmation" v-if="showModal===true" @close="toggleModale">
                <hr>
                <p id="confirm-delete">Etes vous sûr de vouloir supprimer votre compte ?</p>
                <button id="confirm" @click="deleteAccount">OUI</button>
                <button id="cancel" @click="toggleModale">NON</button>
            </div>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Profil',
        props: [ 'jwt'],
        data() {
            return {
                profil: {},
                userId: "",
                showModal: false,

                dataUser: {
                    userId: "",
                    firstName: "",
                    surname: "",
                    email: "",
                    photo: "",
                    bio: "",
                    createdAt: "",

                },
            }
        },
        mounted() {
            this.getUser()
        },

        methods: {
            toggleModale() {
                this.showModal = !this.showModal
            },

            getUser: function () {

                this.userId = sessionStorage.userId;
                
                axios.get("http://localhost:3000/api/user/" + this.userId, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + sessionStorage.getItem("jwt")
                        }
                    })
                    .then(response => {
                        this.profil = response.data;
                    })
                    .catch(error => console.log({
                        error
                    }));
            },

            deleteAccount() {
                axios.delete('http://localhost:3000/api/user/' + this.userId, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + sessionStorage.getItem("jwt")
                        }
                    })
                    .then(() => {
                        console.log("Profil supprimé");
                        sessionStorage.clear();
                        this.$store.commit("setAuthentication", false);
                        this.$router.push('/Login');
                    })
            }
        }
    }
</script>