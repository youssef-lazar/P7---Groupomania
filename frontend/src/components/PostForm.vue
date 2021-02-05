<template>
    <div id="formPost">
        <h1 class="ml-12">Forum</h1>
        <div class="ma-3 ml-12">
            <div class="mb-3">
                <h2>Nouveau post</h2>
            </div>
            
            <div>
                <form ref="form" class="ma-3">
                    <input v-model="dataPost.text" color="black" :rules="textRules" label="Message" required />
                    <input v-model="dataPost.imageUrl" color="black" label="Image"  />
                </form>
            </div>
            

            <div>
                <button class="success" @click="sendPost">Poster</button>
                <button text href="/Home" color="black">Annuler</button>
            </div>

        </div>
    </div>
</template>

<script>
import axios from "axios"

export default {
    name: "FormPost",
    data(){
        return{
            valid: true,

            textRules: [
                v => !!v || 'Ecrivez votre message',
            ],
            dataPost:{
                text:"",
                imageUrl:"",
                userId: localStorage.userId
            },
            dataPostS: "",
            msg: false,
            message: "",
        }
    },
    methods: {
        sendPost(){
            this.dataPostS = JSON.stringify(this.dataPost);
            axios.post("http://localhost:3000/api/posts/", this.dataPostS, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
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

</style>