<template>
    <body id="LoginForm">
        <div class="container">
            <h1 class="form-heading">Connexion</h1>
            <div class="login-form">
                <div class="main-div">
                    <div class="panel">
                        <p>Veuillez renseigner votre email et votre mot de passe</p>
                    </div>
                    <form @submit.prevent="submitForm" id="Login">

                        <div class="form-group">


                            <input class="form-control" v-model="email" type="email" name="email" id="email" placeholder="Email" required/>

                        </div>

                        <div class="form-group">

                            <input class="form-control" v-model="password" type="password" name="password" id="password" minlength="6" placeholder="Mot de passe" required/>

                        </div>
                        <span class="isError" v-show="isError"> mot de passe incorrect </span>

                        <div class="forgot">
                            <a href="reset.html">Mot de passe oublié?</a>
                        </div>
                        <button value="Connexion" class="btn btn-primary">Connexion</button>

                    </form>
                </div>
            </div>
        </div>
    </body>
</template>

<script>
import {mapActions} from 'vuex';


    export default {
        name: "Login",
        data: function () {
            return {
                email: "",
                password: "",
                isError: false,
            };
        },
        props: {},
        methods: {
            ...mapActions(['login']),

             async submitForm() {
                try {
                     await this.login({email:this.email, password: this.password});
                            this.isError = false;
                            this.$router.push('/')
                }catch(err){                    
                        this.isError = true;
                }
            },
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import  '../assets/scss/_mixins.scss';
  #LoginForm {
  margin: 2em auto;
  max-width: 750px;
}

  .button {
    @include button-connect;
  }
  .isError{
    background-color: red;
    color: white;
  }
    
</style>