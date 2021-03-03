<template>
    <div class="container feed mt-4">

        <h2 v-if="allPosts.length > 0">Fil d'actualité</h2>
        <h2 v-else>Aucun article pour le moment!</h2>

        <div class="card" v-for="post in allPosts" :key="post.id">
            <img src="post.imageUrl" class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title" ></h5>
                <p class="card-text">
                    {{ post.text }}
                </p>
                <p class="card-text">
                    Posté le {{ post.createdAt }} 
                </p>
                <p class="card-text">
                    Par {{ post.surname }} 
                </p>

            </div>
        </div>

    </div>
</template>

<script>
    import axios from "axios"

    export default {
        name: 'PostList',
        data() {
            return {
                userId: "",
                allPosts: [],
                id: "",


                dataPost: {
                    id: "",
                    text: "",
                    imageUrl: "",
                    userId: "",
                },
            }
        },
        mounted(){
            this.getAllPosts()
        },
        methods: {
            getAllPosts: function () {

                this.userId = sessionStorage.userId;

                axios.get("http://localhost:3000/api/posts", {
                        headers: {
                            Authorization: 'Bearer ' + sessionStorage.getItem('jwt')
                        }
                    })
                    .then(response => {                      
                        this.allPosts = response.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
        },
    }
</script>