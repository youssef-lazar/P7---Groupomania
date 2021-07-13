<template>


    <div class="container">
        <div class="row justify-content-md-center">
            <div class="main col-lg-8 col-md-5 col-sm-3 ">

                <div v-if="posts.length === 0">
                    <div class="shadow mb-4 card">

                        <h1> Aucun post pour le moment</h1>

                    </div>
                </div>

                <div class="col-lg-8 col-md-5 col-sm-3">

                    <!-- one-post -->
                    <div tag="article" class="shadow mb-4 card" v-for="post in posts" :key="post.id">

                        <!-- header -->
                        <div class="headerPost">
                            <!-- Auteur -->
                            <p>{{ post.User.firstName }} {{ post.User.surname }}</p>
                            <!-- post créée le ... -->
                            <p>{{post.createdAt.slice(0,10).split('-').reverse().join('/') + ' à ' + post.createdAt.slice(11,16)}}
                            </p>
                        </div>

                        <!-- Contenu du post -->
                        <p>{{post.text}}</p>

                        <!-- Image du post -->
                        <img :src="post.imageUrl" class="rounded img-fluid d-flex ml-auto mr-auto"
                            alt="Responsive image" accept="image/*">


                        <!-- Likes du post -->
                        <div class="likes">
                            <b-button @click="likePost(post)"><i class="like fa fa-heart"></i></b-button>
                            <span class="like-number">{{ post.Likes.length }}</span>
                        </div>


                        <button
                            v-if="post.UserId === $store.state.currentUser.userId || $store.state.currentUser.isAdmin === 1"
                            @click="edit(post)"><i class="fa fa-edit fa"></i></button>
                            <button
                                v-if="post.UserId === $store.state.currentUser.userId || $store.state.currentUser.isAdmin === 1"
                                @click="deletePost(post)"><i class="fa fa-trash fa"></i></button>

                                <form method="POST" @submit.prevent="submitComment(post)">

                                    <!-- contenu texte du commentaire  -->
                                    <section>
                                        <textarea class="form-control" id="comment" rows="1"
                                            placeholder="Commentez le post !" v-model="comment.message"
                                            required></textarea>
                                    </section>

                                    <hr>
                                    <!-- bouton pour partager le commentaire -->
                                    <button type="submit" variant="outline-primary">Commenter</button>

                                </form>

                                <!-- Commentaires du post -->
                                <div v-for="comment in post.Comments" :key="comment.id">

                                    <p>{{ comment.message }}</p>

                                    <button
                                        v-if="comment.UserId === $store.state.currentUser.userId || $store.state.currentUser.isAdmin === 1"
                                        @click="editComment(comment)"><i class="fa fa-edit fa"></i></button>
                                        <button
                                            v-if="comment.UserId === $store.state.currentUser.userId || $store.state.currentUser.isAdmin === 1"
                                            @click="deleteComment(comment)"><i class="fa fa-trash fa"></i></button>

                                </div>

                    </div>
                </div>
            </div>
            </div>
        </div>

</template>

<script>
    import PostService from "../services/post";
    import {
        mapState,
        mapGetters
    } from "vuex";

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
            return {
                comment: {
                    message: "",
                }
            }
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

            async likePost(post) {
                await PostService.likePost(post.id)
                this.$store.dispatch("getAllPosts");
            },

            submitComment(post) {
                PostService.commentAPost(post.id, {
                    comment: this.comment
                }).then(() => {
                    alert("Le commentaire a bien été ajouté")
                    this.$router.go();
                });
            },

            async editComment(comment) {
                this.$router.push('/modify-comment/' + comment.id)
            },

            async deleteComment(comment) {
                if (confirm("Souhaitez-vous supprimer ce commentaire?")) {
                    try {
                        await PostService.deleteComment(comment.id)
                        alert("Le commentaire a bien été supprimé")
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

    .like-buttons {
        display: flex;

        i {
            margin-right: 0.5em;
            cursor: pointer;
        }
    }

    .likes,
    .dislikes {
        margin: 0 0.4em;
    }

    .img-fluid {
        max-width: 500px;
    }

    .main {
        justify-content: center;
        display: flex;
    }

    @media (max-width: 500px) {
        .headerPost {
            display: flex;
            flex-direction: column;
        }
    }
</style>