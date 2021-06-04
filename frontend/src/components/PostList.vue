<template>


    <div class="col-md-5 mx-auto mt-5">

        <div v-if="posts.length === 0">

            <b-card class="shadow mb-4" id="card">

                <h1> Aucun post pour le moment</h1>

            </b-card>

        </div>

        <div>

            <!-- one-post -->
            <b-card tag="article" class="shadow mb-4" v-for="post in posts" :key="post.id" id="card">



                <!-- header -->
                <div class="headerPost">

                    <!-- post username -->
                    <p>{{ post.User.firstName }} {{ post.User.surname }}</p>
                    <!-- post créée le ... -->
                    <p>{{post.createdAt.slice(0,10).split('-').reverse().join('/') + ' à ' + post.createdAt.slice(11,16)}}
                    </p>
                </div>

                <!-- contenu du post -->
                <p>{{post.text}}</p>

                <!-- image du post -->
                <img :src="post.imageUrl" class="rounded img-fluid d-flex ml-auto mr-auto " id="imgResponsive"
                    alt="Responsive image" accept="image/*">

                <button v-if="post.UserId === $store.state.currentUser.userId || $store.state.currentUser.isAdmin === 1"
                    @click="edit(post)"><i class="fa fa-edit fa"></i></button>
                <button v-if="post.UserId === $store.state.currentUser.userId || $store.state.currentUser.isAdmin === 1"
                    @click="deletePost(post)"><i class="fa fa-trash fa"></i></button>

            </b-card>
        </div>
    </div>

</template>

<script>
    import PostService from "../services/post";
    import { mapState, mapGetters } from "vuex";

    export default {
        name: "Wall",
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

        computed: {
            ...mapGetters(['currentUser']),

            isAdmin() { // nous permet de savoir si l'utilisateur est un admin grâce aux infos présente dans le store
                return this.$store.getters.isAdmin
            },

            ...mapState({
                posts: "posts",
            })
        },
        created() {
            this.$store.dispatch("getAllPosts")
        },

        methods: {
            async edit(post) {
                this.$router.push('/modify-post/' + post.id)
            },

            /*deletePost(post, UserId) {
                PostService.deletePost(post.id, {
                    UserId: UserId,
                }).then((res) => {
                    console.log(res.data.message);
                    this.$store.dispatch("getAllPosts");
                })
            }*/

            async deletePost(post) {
                if (confirm("Souhaitez-vous supprimer ce post?")) {
                    try {
                        await PostService.deletePost(post.id)
                        alert("Le post a bien été supprimé")
                        this.$store.dispatch("getAllPosts");
                    } catch (error) {
                        // TODO  QUOI FAIRE ??
                    }
                }
            },

        }
    };
</script>

<style>
    .headerPost p {
        /** Titre h2 de chaque section  */
        font-size: 10px;
    }

    /* couleur de l'icon update */
    #AdminUpdatepost {
        color: red;
    }

    @media (max-width: 500px) {
        .headerPost {
            display: flex;
            flex-direction: column;
        }
    }
</style>