<template>

    <div class="card">
        <div class="box" v-if="user">

            <h2>Bonjour {{ user.firstName }}!</h2>
            <h2 v-if="$store.state.currentUser.isAdmin === 1"><span>Vous êtes administrateur</span></h2>
            <p>Vous êtes parmis nous depuis le :</p>
            <p>{{ user.createdAt.slice(0,10).split('-').reverse().join('/')}}</p>
            <p>Votre Prénom: {{ user.firstName }}</p>
            <p>Votre Nom: {{ user.surname }}</p>
            <p>Votre Bio: {{ user.bio }}</p>
            <span>
                <ul>
                    <li><a @click="edit"><i class="fa fa-edit" aria-hidden="true"></i></a></li>
                    <li><a @click="deleteProfil"><i class="fa fa-trash" aria-hidden="true"></i></a></li>
                </ul>
            </span>
        </div>
    </div>

</template>

<script>
    import { mapState, mapActions } from "vuex";

    export default {
        name: 'Profil',
        data() {
            return {
                user: null
            }
        },


        computed: {
            ...mapState(["currentUser", "userDetails"])
        },
        
        async mounted() {
            if (this.currentUser) {
                this.user = await this.$store.dispatch("getOneUser", {
                    id: this.currentUser.userId
                })
            }
        },

        methods: {
            ...mapActions(['deleteUser']),

            async deleteProfil() {
                if (confirm("Souhaitez-vous supprimer votre compte?")) {
                    try {

                        await this.$store.dispatch('deleteUser', {
                            id: this.currentUser.userId
                        })
                        this.$router.push("/signup");
                    } catch(error){console.log(error)}
                }
            },

            async edit() {
                this.$router.push('/modify-profil/' + this.currentUser.userId)
            },
        }
    }
</script>

<style scoped lang="scss">
    .card {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        min-height: 400px;
        background: #fff;
        box-shadow: 0 20px 50px rgba(0, 0, 0, .1);
        border-radius: 10px;
        transition: 0.5s;
        margin-top: 250px;
    }

    .card:hover {
        box-shadow: 0 30px 70px rgba(0, 0, 0, .2);
    }

    .card .box {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        text-align: center;
        padding: 20px;
        box-sizing: border-box;
        width: 100%;
    }

    .card .box .img {
        width: 120px;
        height: 120px;
        margin: 0 auto;
        border-radius: 50%;
        overflow: hidden;
    }

    .card .box .img img {
        width: 100%;
        height: 100%;
    }

    .card .box h2 {
        font-size: 20px;
        color: #262626;
        margin: 20px auto;
    }

    .card .box h2 span {
        font-size: 14px;
        background: #0EA5E9;
        color: #fff;
        display: inline-block;
        padding: 4px 10px;
        border-radius: 15px;
    }

    .card .box p {
        color: #262626;
    }

    .card .box span {
        display: inline-flex;
    }

    .card .box ul {
        margin: 0;
        padding: 0;
    }

    .card .box ul li {
        list-style: none;
        float: left;
    }

    .card .box ul li a {
        display: block;
        color: #aaa;
        margin: 0 10px;
        font-size: 20px;
        transition: 0.5s;
        text-align: center;
    }

    .card .box ul li:hover a {
        color: #0EA5E9;
        transform: rotateY(360deg);
    }
</style>