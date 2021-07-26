<template>

    <div class="row justify-content-md-center">
        <div class="col-lg-6 col-md-4 col-sm-4">

            <h1 class="form-heading">Publier un commentaire</h1>

            <!--- \\\\\\\Post-->
            <div v-if="post" class="card gedf-card">
                <div class="card-header">
                    <div class="card-header">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="mr-2">
                                    <img class="rounded-circle" width="45"
                                        :src="'https://robohash.org/'+post.User.id + '?set=set2'" alt="">
                                </div>
                                <div class="ml-2">
                                    <div class="h5 m-0"><img />{{ post.User.firstName }} {{ post.User.surname }}</div>
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
                </div>
                <!-- Post /////-->



                <div class="comment-form">

                    <!--- \\\\\\\Comment Form-->
                    <form method="POST" @submit.prevent="submitComment(post)">
                        <div class="tab-pane fade show active" role="tabpanel" aria-labelledby="comments-tab">

                            <div class="form-group">
                                <textarea class="form-control" rows="1" placeholder="Commenter la publication"
                                    v-model="comment.message" required></textarea>
                            </div>

                            <div class="btn-toolbar justify-content-between">
                                <div class="btn-group">
                                    <button type="submit" class="btn btn-primary">Commenter</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <!-- Comment Form /////-->

                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import PostService from "../services/post";

    export default {
        name: "CommentForm",
        data() {
            return {
                post: null,
                comment: {
                    message: "",
                }
            }
        },

        computed: {

        },

        async mounted() {
            this.post = await this.$store.dispatch("getOnePost", {
                id: this.$route.params.id
            })
        },

        methods: {

            submitComment(post) {
                PostService.commentAPost(post.id, {
                    comment: this.comment
                }).then(() => {
                    alert("Le commentaire a bien été ajouté")
                    this.$router.push('/');
                });
            },

        }
    }
</script>

<style scoped lang="scss">
    .form-heading {
        margin: 30px;
        text-align: center;
        text-shadow: 2px 2px 2px black;
        color: white;
    }
</style>