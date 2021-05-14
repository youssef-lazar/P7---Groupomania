<template>

    <body id="SignupForm">
        <div class="container">
            <h1 class="form-heading">Inscription</h1>
            <div class="login-form">
                <div class="main-div">

                    <form @submit.prevent="submitForm" id="Login">

                        <div class="form-group">
                            <input class="form-control" v-model="surname" type="text" name="surname" id="surname"
                                placeholder="Votre Nom" required />
                        </div>

                        <div class="form-group">
                            <input class="form-control" v-model="firstName" type="text" name="firstName" id="firstName"
                                placeholder="Votre Prénom" required />
                        </div>

                        <div class="form-group">
                            <input class="form-control" v-model="email" type="email" name="email" id="email"
                                placeholder="Email" required />
                        </div>

                        <div class="form-group">
                            <input class="form-control" v-model="password" type="password" name="password" id="password"
                                minlength="6" placeholder="Mot de passe" required />
                        </div>

                        <button value="Connexion" class="btn btn-primary">Connexion</button>

                    </form>
                </div>
            </div>
        </div>
    </body>
</template>

<script>
    import { mapActions } from 'vuex';

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
            ...mapActions(['signup']),

            async submitForm() {
                try {
                    await this.signup({
                        firstName: this.firstName,
                        surname: this.surname,
                        email: this.email,
                        password: this.password
                    });
                    alert("Votre compte a bien été créé");
                    this.$router.push('/')
                } catch (err) {
                    console.log(err);
                }
            },
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import '../assets/scss/_mixins.scss';

    #SignupForm {
        margin: 0;
        padding: 100px;
        background: url("../assets/fond.jpg") no-repeat center fixed;
        -webkit-background-size: cover;
        /* pour anciens Chrome et Safari */
        background-size: cover;
        /* version standardisée */
    }

    .button {
        @include button-connect;
    }
</style>