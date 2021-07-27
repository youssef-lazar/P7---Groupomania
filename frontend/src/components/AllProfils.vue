<template>
    <!-- Team -->
    <section id="team" class="pb-5">
        <h5 class="section-title h1">Liste des profils</h5>
        <div class="row" v-if="isAdmin">
            <!-- Team member -->
            <div class="col-xs-12 col-sm-6 col-md-4" v-for="user in users" :key="user.id">
                <div class="image-flip" ontouchstart="this.classList.toggle('hover');">
                    <div class="mainflip">
                        <div class="frontside">
                            <div class="card">
                                <div class="card-body text-center">
                                    <p><img class=" img-fluid" :src="'https://avatars.dicebear.com/api/micah/'+ user.id + '.svg'" alt="card avatar"></p>
                                    <h4 class="card-title">{{user.firstName}} {{user.surname}}</h4>
                                    <p class="card-text">{{user.bio}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="backside">
                            <div class="card">
                                <div class="card-body text-center mt-4">
                                    <h4 class="card-title">{{user.firstName}} {{user.surname}}</h4>
                                    <p class="card-text"> Inscrit le: {{ user.createdAt.slice(0,10).split('-').reverse().join('/')}}</p>
                                    <p class="card-text"> Email: {{ user.email }}</p>
                                    <p class="card-text"> Bio: {{ user.bio }}</p>
                                    <ul class="list-inline">
                                        <li class="list-inline-item">
                                            <a class="social-icon text-xs-center" @click="edit(user)"><i class="fa fa-edit fa"></i>
                                            </a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a class="social-icon text-xs-center" @click="deleteProfil(user)"><i class="fa fa-trash fa"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- ./Team member -->
        </div>
    </section>
</template>

<script>
    import { mapState, mapActions, mapGetters } from "vuex";
    import UserService from "../services/user.js"

    export default {
        name: "Profils",
        props: {
            id: {
                type: Number,
                default: null,
                required: false
            }
        },
        data() {
            return {}
        },

        created() {
            this.$store.dispatch("getAllUsers")
        },

        computed: {
            ...mapGetters(['currentUser']),

            isAdmin() { // nous permet de savoir si l'utilisateur est un admin grâce aux infos présente dans le store
                return this.$store.getters.isAdmin
            },

            ...mapState({
                users: "users",
            })
        },

        methods: {
            ...mapActions(['deleteUser']),

            async deleteProfil(user) {
                if (confirm("Souhaitez-vous supprimer ce compte?")) {
                    try {
                        await UserService.deleteUser(user.id)
                        this.$router.go();
                    } catch (error) {
                        console.log(error)
                    }
                }
            },

            async edit(user) {
                this.$router.push('/modify-profil/' + user.id)
            },
        }

    };
</script>

<style scoped lang="scss">
    /* FontAwesome for working BootSnippet :> */

    @import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

    .btn-primary:hover,
    .btn-primary:focus {
        background-color: #108d6f;
        border-color: #108d6f;
        box-shadow: none;
        outline: none;
    }

    .btn-primary {
        color: #fff;
        background-color: #22427C;
        border-color: #22427C;
    }

    section {
        padding: 60px 0;
    }

    section .section-title {
        text-align: center;
        color: #22427C;
        margin-bottom: 50px;
        text-transform: uppercase;
    }

    #team .card {
        border: none;
        background: #ffffff;
    }

    .image-flip:hover .backside,
    .image-flip.hover .backside {
        -webkit-transform: rotateY(0deg);
        -moz-transform: rotateY(0deg);
        -o-transform: rotateY(0deg);
        -ms-transform: rotateY(0deg);
        transform: rotateY(0deg);
        border-radius: .25rem;
    }

    .image-flip:hover .frontside,
    .image-flip.hover .frontside {
        -webkit-transform: rotateY(180deg);
        -moz-transform: rotateY(180deg);
        -o-transform: rotateY(180deg);
        transform: rotateY(180deg);
    }

    .mainflip {
        -webkit-transition: 1s;
        -webkit-transform-style: preserve-3d;
        -ms-transition: 1s;
        -moz-transition: 1s;
        -moz-transform: perspective(1000px);
        -moz-transform-style: preserve-3d;
        -ms-transform-style: preserve-3d;
        transition: 1s;
        transform-style: preserve-3d;
        position: relative;
    }

    .frontside {
        position: relative;
        -webkit-transform: rotateY(0deg);
        -ms-transform: rotateY(0deg);
        z-index: 2;
        margin-bottom: 30px;
    }

    .backside {
        position: absolute;
        top: 0;
        left: 0;
        background: white;
        -webkit-transform: rotateY(-180deg);
        -moz-transform: rotateY(-180deg);
        -o-transform: rotateY(-180deg);
        -ms-transform: rotateY(-180deg);
        transform: rotateY(-180deg);
        -webkit-box-shadow: 5px 7px 9px -4px rgb(158, 158, 158);
        -moz-box-shadow: 5px 7px 9px -4px rgb(158, 158, 158);
        box-shadow: 5px 7px 9px -4px rgb(158, 158, 158);
    }

    .frontside,
    .backside {
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        -ms-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-transition: 1s;
        -webkit-transform-style: preserve-3d;
        -moz-transition: 1s;
        -moz-transform-style: preserve-3d;
        -o-transition: 1s;
        -o-transform-style: preserve-3d;
        -ms-transition: 1s;
        -ms-transform-style: preserve-3d;
        transition: 1s;
        transform-style: preserve-3d;
    }

    .frontside .card,
    .backside .card {
        min-height: 312px;
    }

    .backside .card a {
        font-size: 18px;
        color: #22427C !important;
    }

    .frontside .card .card-title,
    .backside .card .card-title {
        color: #22427C !important;
    }

    .frontside .card .card-body img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }
</style>