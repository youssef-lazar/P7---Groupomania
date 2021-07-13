<template>

    <div class="container">
        <div class="row justify-content-md-center">
            <div class="col-lg-6 col-md-4 col-sm-4">

                <h1 class="form-heading">Inscription</h1>

                <div class="signup-form">
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

                        <div class="form-group">
                            <input class="form-control" v-model="passwordConfirm" type="password" name="passwordConfirm"
                                id="passwordConfirm" minlength="6" placeholder="Réécrivez votre mot de passe"
                                required />
                        </div>

                        <button value="Connexion" class="btn btn-primary">Connexion</button>

                    </form>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {
        mapActions
    } from 'vuex';

    export default {
        name: "Signup",
        data: function () {
            return {
                firstName: "",
                surname: "",
                email: "",
                password: "",
                passwordConfirm: "",
            };
        },
        props: {},
        methods: {
            ...mapActions(['signup']),

            async submitForm() {
                try {
                    if (this.password !== this.passwordConfirm) {
                        alert('Les mots de passe saisis ne sont pas identiques !')
                    } else await this.signup({
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

    .button {
        @include button-connect;
    }
</style>