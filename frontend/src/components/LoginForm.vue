<template>

        <div class="row justify-content-md-center">
            <div class="col-md-8 col-md-offset-2">

                <h1 class="form-heading">Connexion</h1>

                <div class="login-form">
                    <form @submit.prevent="submitForm" id="Login">

                        <div class="form-group">
                            <input class="form-control" v-model="email" type="email" name="email" id="email" placeholder="Email" required />
                        </div>

                        <span class="badAddress" v-show="badAddress"> Ce compte n'existe pas. </span><hr>

                        <div class="form-group">
                            <input class="form-control" v-model="password" type="password" name="password" id="password" minlength="6" placeholder="Mot de passe" required />
                        </div>

                        <span class="isError" v-show="isError"> Mot de passe incorrect! </span><hr>

                        <button value="Connexion" class="btn btn-primary">Connexion</button>

                    </form>
                </div>
            </div>
        </div>

</template>

<script>
    import { mapActions } from 'vuex';


    export default {
        name: "Login",
        data: function () {
            return {
                email: "",
                password: "",
                isError: false,
                badAddress: false,

            };
        },
        props: {}, 
        methods: {
            ...mapActions(['login']),

            async submitForm() {
                try {
                    await this.login({
                        email: this.email,
                        password: this.password
                    });
                    this.isError = false;
                    this.badAddress = false;
                    this.$router.push('/')
                } catch (err) {
                    this.isError = true;
                    this.badAddress = true;
                }
            },
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    .isError, .badAddress {
        background-color: red;
        color: white;
    }

    .form-heading {
    margin: 30px;
    text-align: center;
    text-shadow: 2px 2px 2px black;
    color: white;
}
</style>