<template>

  <!-- card créer un post -->
  <b-card tag="article" class="col-md-5 mx-auto mt-4 container shadow">

    <!-- formulaire pour créer le post -->
    <b-form method="POST" @submit.prevent="saveModify" enctype="multipart/form-data">

      <div class="card gedf-card">
            <div class="card-header">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex justify-content-between align-items-center">
                            <div class="mr-2">
                                <img class="rounded-circle" width="45" :src="'https://robohash.org/'+post.User.id + '?set=set2'" alt="">
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

      <b-form-file v-model="post.imageUrl" accept="image/*" class="mt-3" @change="uploadImage" id="file-input" plain required></b-form-file>
      <textarea v-model="post.text" class="form-control" id="text-password" rows="6"  required></textarea>



      <!-- bouton pour enregistrer les modifications -->
      <b-button type="submit" class="btn btn-success" color="green" data-dismiss="modal"> Enregistrer</b-button>
      <b-button type="button" class="btn btn-danger" color="red" data-dismiss="modal" @click="cancel">Annuler</b-button>

    </b-form>

  </b-card>

</template>

<script>
  import PostService from "../services/post.js"
  import axios from 'axios';
  import { mapState } from "vuex";

  export default {
    name: "modifyPost",
    props: {
      id: {
        type: Number,
        default: null,
        required: false
      }
    },
    data: function () {
      return {
        post: {
          text: "",
          imageUrl: null,
        }
      }
    },

    computed: {
      ...mapState(["currentUser"])

    },

    async mounted() {
      const id = this.$route.params.id;
      const response = await PostService.getOnePost(id)
      this.post = response.data;
    },


    methods: {

      // requête pour modifier les informations du compte
      saveModify() {

        const newPost = new FormData();

        newPost.append("text", this.post.text);

        if (this.imageUrl !== null) {
          newPost.append("image", this.post.imageUrl, this.post.imageUrl.filename);
        }

        axios.put(`http://localhost:3000/api/posts/${this.$route.params.id}`,
            newPost, { headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + this.currentUser.token }}
          ).then((post) => {
            this.text = post.data.text
            this.imageUrl = post.data.imageUrl
            location.replace("http://localhost:8080/#/")
          })

          .catch((error) => error)
      },

      // fonction pour modifier l'image
      uploadImage(e) {
        this.post.imageUrl = e.target.files[0];
        if (this.post.imageUrl.length === 0) {
          return;
        }
      },

      async cancel() {
        this.$router.push('/')
      },
    }
  }
</script>


<style lang="scss" scoped>
  .headerPost p {
    /** Titre h2 de chaque section  */
    font-size: 10px;
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