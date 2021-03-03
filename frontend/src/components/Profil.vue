<template>
    <div class="profil">
        <main>
            <div id="profil" v-for="user in profil" :key="user.id">
                <h3>Bonjour <span>{{ user.firstName }}</span> ravi de vous revoir !</h3><hr>
                <div id="profil_informations">
                    <p>{{ user.firstName }} {{ user.surname }}</p>
                    <p>Vous êtes parmis nous depuis le :</p>
                    <p>{{ user.createdAt }}</p>
                </div> 
                <button @click="toggleModale">Supprimer mon compte</button>
                <div id="modal-confirmation" v-if="showModal===true" @close="toggleModale">
                    <hr>
                    <p id="confirm-delete">Etes vous sûr de vouloir supprimer votre compte ?</p>
                    <button id="confirm" @click="deleteAccount">OUI</button>
                    <button id="cancel" @click="toggleModale">NON</button>
                </div>
            </div>
        </main>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: 'Profil',
    props: ['userId', 'jwt'],
    data(){
        return {
            profil:"",
            showModal: false
        }
    },
    methods:{
        toggleModale(){
            this.showModal = !this.showModal
        },
        deleteAccount(){
            axios.delete('http://localhost:3000/api/user/' + this.userId, {
                headers: {
                    'Content-Type' : 'application/json',
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
    },
    mounted(){
        axios.get("http://localhost:3000/api/user/" + this.userId, 
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + sessionStorage.getItem("jwt")
            }
        })
        .then(res => {
            const data = res.data;
            this.profil = data;
        })
        .catch(error => console.log({error}));
    }
}
</script>