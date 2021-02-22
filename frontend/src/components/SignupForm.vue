<template>

    <body>
        <div class="container signup">
            <div class="row main">
                <div class="panel-heading">
                </div>
                <div class="main-login main-center">
                    <form class="form-horizontal" @submit.prevent="signup" action="/api/user/signup" method="post">
                        <b-input-group>
                            <template #prepend> 
                                <b-input-group-text>                               
                            <i class="fa fa-user fa"
                                            aria-hidden="true"></i>
                                </b-input-group-text>
                            </template>
                            <b-form-input v-model="surname" placeholder="Votre nom"/>
                        </b-input-group>                        
                        <div class="form">
                            <label for="surname" class="cols-sm-2 control-label">Votre Nom</label>
                            <div class="cols-sm-10">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="fa fa-user fa"
                                            aria-hidden="true"></i></span>
                                    <input class="form" v-model="surname" type="text" name="surname"
                                        id="surname" placeholder="Nom" required />
                                </div>
                            </div>
                        </div>

                        <div class="form">
                            <label for="firstName" class="cols-sm-2 control-label">Votre Prénom</label>
                            <div class="cols-sm-10">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="fa fa-user fa"
                                            aria-hidden="true"></i></span>
                                    <input class="form" v-model="firstName" type="text" name="firstName"
                                        id="firstName" placeholder="Prenom" required />
                                </div>
                            </div>
                        </div>

                        <div class="form">
                            <label for="email" class="cols-sm-2 control-label">Adresse Mail</label>
                            <div class="cols-sm-10">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="fa fa-envelope fa"
                                            aria-hidden="true"></i></span>
                                    <input class="form" v-model="email" type="email" name="email" id="email"
                                        placeholder="Email" required />
                                </div>
                            </div>
                        </div>

                        <div class="form">
                            <label for="password" class="cols-sm-2 control-label">Mot de passe</label>
                            <div class="cols-sm-10">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="fa fa-lock fa-lg"
                                            aria-hidden="true"></i></span>
                                    <input class="form" v-model="password" type="password" name="password"
                                        id="password" minlength="6" placeholder="Mot de passe" required />
                                </div>
                            </div>
                        </div>

                        <div class="form ">
                            <input type="submit" value="Inscription" id="button" class="btn btn-primary btn-lg btn-block login-button" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </body>
</template>

<script>
    export default {
        name: "Signup",
        data: function () {
            return {
                firstName: "",
                surname: "",
                email: "",
                password: "",
            };
        },
        props: {},
        methods: {
            signup: function () {
                this.axios
                    .post("http://localhost:3000/api/user/signup", {
                        firstName: this.firstName,
                        surname: this.surname,
                        email: this.email,
                        password: this.password,
                    })
                    .then(() => {
                       
                            alert("Votre compte a bien été créé, veuillez vous connecter");
                            window.location.href = "http://localhost:8080/#/";
                            // on est content
    
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import  '../assets/scss/_mixins.scss';

  .signup {
  margin: auto;
  max-width: 750px;
  text-align: center;
  margin-right: 130px;
}

</style>