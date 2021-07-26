<template>

    <div class="row justify-content-md-center">
        <div class="col-lg-8 col-md-6 col-sm-3">

            <h1 class="form-heading">Inscription</h1>

            <div class="signup-form">

                <form @submit.prevent="submitForm" id="signup">

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
                            id="passwordConfirm" minlength="6" placeholder="Réécrivez votre mot de passe" required />
                    </div>

                    <button value="Inscription" class="btn btn-primary">Inscription</button>

                </form>
            </div>
        </div>
    </div>



</template>

<script>
    import UserService from "../services/user.js"

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

            async submitForm() {
                try {
                    if (this.password !== this.passwordConfirm) {
                        alert('Les mots de passe saisis ne sont pas identiques !')
                    } else {
                        await UserService.signup({
                            firstName: this.firstName,
                            surname: this.surname,
                            email: this.email,
                            password: this.password
                        });
                        alert("Votre compte a bien été créé");
                        this.$router.push('/login')
                    }
                } catch (err) {
                    console.log(err);
                }
            },
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .form-heading {
        margin: 30px;
        text-align: center;
        text-shadow: 2px 2px 2px black;
        color: white;
    }
</style>