<template>
<body>
    <div class="profile">
        <main>
            <div v-if="user" id="profile">
                <h3>Bonjour <span>{{ user.firstName }}</span>, ravi de vous revoir !</h3>
                <p>{{ user.photo }}</p>
                <div id="profile_informations">
                    <p>Vous êtes parmis nous depuis le :</p>
                    <p>{{ user.createdAt.slice(0,10).split('-').reverse().join('/')}}</p>
                    <p>Votre Prénom: {{ user.firstName }}</p>
                    <p>Votre Nom: {{ user.surname }}</p>
                    <p>Votre Bio: {{ user.bio }}</p>
                </div>

                <button @click="edit">Modifier mon compte</button>

                <button type="button" @click="deleteProfil">Supprimer mon compte</button>
            </div>
        </main>
    </div>
</body>
</template>

<script>
    import { mapState, mapActions  } from "vuex";

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
                    try{
                        
                    await this.$store.dispatch('deleteUser', this.user)
                        this.$router.push("/signup");
                    }catch(error){
                        // TODO  QUOI FAIRE ??
                    }
                }
            },

            async edit() {
                this.$router.push('/ModifyProfil')
            },
        }
    }
</script>

<style scoped lang="scss">
    // Palette de couleurs
    $primary-blue: #122442;
    $text-danger: #d1515a;
    $primary-grey: #aeaeaee0;
    $secondary-grey: #424242;
    $primary-white: whitesmoke;

    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        #profile {
            text-align: center;
            margin: 5%;
            padding: 2%;
            width: 600px;
            background-color: #aeaeaee0;
            border: 0.25px solid darken(#aeaeaee0, 5%);
            border-radius: 5px;
            box-shadow: 0px 0px 20px 0px rgba(72, 79, 88, 1);

            h3 {
                span {
                    color: $primary-blue;
                }
            }

            #profile_informations {
                margin: 6%;
                line-height: 0.9;

                p {
                    font-size: 120%;
                }
            }

            button {
                width: 200px;
                border: 1px outset $primary-grey;
                background-color: $primary-blue;
                color: white;
                border-radius: 10px;
                padding: 2.7%;
                font-size: 18px;
                text-decoration: none;
                text-align: center;
                font-weight: bold;

                &:hover {
                    background: darken($primary-blue, 5%);
                    transform: scale(1.01);
                }
            }

            #modal-confirmation {

                #confirm,
                #cancel {
                    width: 100px;
                    margin: 1% 4% 3% 4%;
                }

                #confirm {
                    &:hover {
                        transform: scale(1.01);
                        color: #1F1F1F;
                        background-color: #5CC150;
                    }
                }

                p {
                    font-weight: bold;
                }
            }

            button {
                width: 250px;
                padding: 1%;
                margin-bottom: 6%;
                background-color: $primary-blue;

                &:hover {
                    transform: scale(1.05);
                    background-color: darken($text-danger, 10%);
                }
            }
        }
    }
    body {
  margin:0;
  padding:100px;
  background: url("../assets/fond.jpg") no-repeat center fixed; 
  -webkit-background-size: cover; /* pour anciens Chrome et Safari */
  background-size: cover; /* version standardisée */
}

    // RESPONSIVE
    @media screen and (min-width: 300px) and (max-width: 325px) {
        main {
            #profile {
                width: 280px;
                margin: 10% 0 10% 0;
            }
        }
    }

    @media screen and (min-width: 326px) and (max-width: 400px) {
        main {
            #profile {
                width: 300px;
                margin: 10% 0 10% 0;
            }
        }
    }

    @media screen and (min-width: 401px) and (max-width: 425px) {
        main {
            #profile {
                width: 340px;
                margin: 10% 0 10% 0;
            }
        }
    }

    @media screen and (min-width: 426px) and (max-width: 500px) {
        main {
            #profile {
                width: 400px;
                margin: 5% 0 5% 0;
            }
        }
    }

    @media screen and (min-width: 501px) and (max-width: 525px) {
        main {
            #profile {
                width: 450px;
                margin: 5% 0 5% 0;
            }
        }
    }

    @media screen and (min-width: 526px) and (max-width: 600px) {
        main {
            #profile {
                width: 490px;
            }
        }
    }
</style>