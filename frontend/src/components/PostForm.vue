<template>
    <div id="formPost">

        <h1 class="ml-12">Forum</h1>
        <div class="ma-3 ml-12">
            <div class="mb-3">
                <h2>Nouveau post</h2>
            </div>

            <b-input-group>
                <template #prepend>
                    <b-input-group-text>
                        <p>Votre Message</p>
                    </b-input-group-text>
                </template>
                <b-form-input v-model="dataPost.text" label="Message" required />
            </b-input-group>

            <b-input-group>
                <template #prepend>
                    <b-input-group-text>
                        <p>Ajouter une image</p>
                    </b-input-group-text>
                </template>
                <b-form-input v-model="dataPost.imageUrl" label="Ajout Image" />
            </b-input-group>
        </div>

        <div>
            <button class="success" @click="sendPost">Poster</button>
            <button text href="/Home" color="black">Annuler</button>
        </div>

    </div>
</template>

<script>
    import axios from "axios"

    export default {
        name: "PostForm",
        data() {
            return {
                valid: true,

                textRules: [
                    v => !!v || 'Ecrivez votre message',
                ],
                dataPost: {
                    text: "",
                    imageUrl: "",
                    UserId: sessionStorage.userId
                },
                dataPostS: "",
                msg: false,
                message: "",
            }
        },
        methods: {
            sendPost() {
                this.dataPostS = {
                    post: this.dataPost
                };
                axios.post("http://localhost:3000/api/posts/", this.dataPostS, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + sessionStorage.getItem("jwt")
                        }
                    })
                    .then(response => {
                        let rep = response.data;
                        this.message = rep.message;
                        this.msg = true;
                        this.form = false;
                        this.$router.push('/Home')

                    })
                    .catch(error => {
                        console.log(error);
                        this.message = error;
                        this.msg = true
                    });
            },
        },
        components: {

        },
    }
</script>

<style lang="scss">
    .formPost {
        text-align: center;
    }
</style>