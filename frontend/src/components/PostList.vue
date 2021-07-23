<template>

    <div class="main">

        <!--- \\\\\\\Post-->
        <div class="card gedf-card" v-for="post in pageOfPosts" :key="post.id">
            <div class="card-header">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="ml-2">
                            <div class="h5 m-0">{{ post.User.firstName }} {{ post.User.surname }}</div>
                            <div class="h7 text-muted">{{ post.User.email }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card-body">
                <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i>Le
                    {{post.createdAt.slice(0,10).split('-').reverse().join('/') + ' à ' + post.createdAt.slice(11,16)}}
                </div>
                <p class="card-text"> {{post.text}}</p>
                <!-- Image du post -->
                <img :src="post.imageUrl" class="rounded img-fluid d-flex ml-auto mr-auto" accept="image/*">
            </div>

            <div class="card-footer">
                <div class="right-footer">
                    <a class="card-link" @click="likePost(post)"><i class="fa fa-gittip"></i></a>
                    <a class="card-link" @click="commentPost(post)"><i class="fa fa-comment"></i></a>
                    <a class="card-link" v-if="post.UserId === $store.state.currentUser.userId || $store.state.currentUser.isAdmin === 1" @click="edit(post)"><i class="fa fa-edit"></i></a>
                    <a class="card-link" v-if="post.UserId === $store.state.currentUser.userId || $store.state.currentUser.isAdmin === 1" @click="deletePost(post)"><i class="fa fa-trash"></i></a>
                </div>

                <div class="left-footer">
                    <span class="like-number">{{ post.Likes.length }} Like(s)</span>
                </div>
            </div>
            <!-- Post /////-->

            <!--- \\\\\\\Comment Form
            <form method="POST" @submit.prevent="submitComment(post)">
                <div class="tab-pane fade show active" role="tabpanel" aria-labelledby="comments-tab">

                    <div class="form-group">
                        <textarea class="form-control" rows="1" placeholder="Commenter la publication" v-model="comment.message" required></textarea>
                    </div>

                    <div class="btn-toolbar justify-content-between">
                        <div class="btn-group">
                            <button type="submit" class="btn btn-primary">Commenter</button>
                        </div>
                    </div>
                </div>
            </form>
             Comment Form /////-->

            <!--- \\\\\\\Comments-->
            <div class="card gedf-card" v-for="comment in post.Comments" :key="comment.id">

                <hr class="hr-text" data-content="COMMENTAIRES">

                <div class="card-header">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="ml-2">
                                <div class="h5 m-0">{{ comment.User.firstName }} {{ comment.User.surname }}</div>
                                <div class="h7 text-muted">{{ comment.User.bio }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card-body">
                    <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i>Le
                        {{comment.createdAt.slice(0,10).split('-').reverse().join('/') + ' à ' + comment.createdAt.slice(11,16)}}
                    </div>
                    <p class="card-text"> {{comment.message}}</p>
                </div>

                <div class="card-footer">
                    <div class="right-footer">
                        <a class="card-link" v-if="post.UserId === $store.state.currentUser.userId || $store.state.currentUser.isAdmin === 1" @click="editComment(comment)"><i class="fa fa-edit"></i></a>
                        <a class="card-link" v-if="post.UserId === $store.state.currentUser.userId || $store.state.currentUser.isAdmin === 1" @click="deleteComment(comment)"><i class="fa fa-trash"></i></a>
                    </div>
                </div>
                <!-- Comments /////-->
            </div>
        </div>

        <div class="text-center text-lg-start text-muted">
            <jw-pagination :items="posts" @changePage="onChangePage"></jw-pagination>
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
            return {
                comment: {
                    message: "",
                },
                pageOfPosts: []
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

            async commentPost(post) {
                this.$router.push('/create-comment/' + post.id)
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

            onChangePage(pageOfPosts) {
                // update page of items
                this.pageOfPosts = pageOfPosts;
            },

        }
    };
</script>

<style lang="scss" scoped>
    .headerPost p {
        /** Titre h2 de chaque section  */
        font-size: 10px;
    }

    .hr-text {
        line-height: 1em;
        position: relative;
        outline: 0;
        border: 0;
        color: black;
        text-align: center;
        height: 1.5em;
        opacity: .5;

        &:before {
            content: '';
            background: linear-gradient(to right, transparent, #818078, transparent);
            position: absolute;
            left: 0;
            top: 50%;
            width: 100%;
            height: 1px;
        }

        &:after {
            content: attr(data-content);
            position: relative;
            display: inline-block;
            color: black;
            padding: 0 .5em;
            line-height: 1.5em;
            color: #818078;
            background-color: #fcfcfa;
        }
    }

    .card-footer {
        display: flex;
        justify-content: space-between;
    }

    .like-number {
        color: #007bff;
    }

    .h7 {
        font-size: 0.8rem;
    }

    .gedf-wrapper {
        margin-top: 0.97rem;
    }

    #comments {
        margin-top: 20px;
    }

    .gedf-main {
        padding-left: 4rem;
        padding-right: 4rem;
    }

    .gedf-card {
        margin-bottom: 2.77rem;
        margin-top: 2.77rem;
    }

    /**Reset Bootstrap*/
    .dropdown-toggle::after {
        content: none;
        display: none;
    }
</style>