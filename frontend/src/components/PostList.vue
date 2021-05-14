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

                    <!-- post créée le ... -->
                    <p> {{post.createdAt.slice(0,10).split('-').reverse().join('/') + ' à ' + post.createdAt.slice(11,16)}}
                    </p>
                </div>

                <hr>

                <!-- si l'utilisateur est admin alors afficher -->
                <div class="d-flex justify-content-end" v-if="admin()">

                    <!-- lien pour modifier le post en tant qu'admin  -->
                    <a :href="'#/post/update/'+post.id">
                        <b-icon id="AdminUpdatepost" icon="pencil-fill"></b-icon>
                    </a>

                </div>

                <!-- contenu du post -->
                <p>{{post.text}}</p>

                <!-- image du post -->
                <img :src="post.imageUrl" class="rounded img-fluid d-flex ml-auto mr-auto " id="imgResponsive"
                    alt="Responsive image" accept="image/*">

            </b-card>
        </div>

    </div>

</template>

<script>
    import { mapState } from "vuex";

    export default {
        name: "Wall",
        data() {
            return {}
        },

        computed: {
            ...mapState({
                posts: "posts",
            })
        },
        created() {
            this.$store.dispatch("getAllPosts")
        },

        methods: {
            // méthode pour verifier si l'utilisateur est admin
            admin() {
                if (localStorage.getItem('isAdmin') == "1") {
                    return true
                } else if (localStorage.getItem('isAdmin') == "0") {
                    return false
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