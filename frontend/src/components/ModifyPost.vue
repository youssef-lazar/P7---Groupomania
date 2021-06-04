<template>

  <!-- card créer un post -->
  <b-card tag="article" class="col-md-5 mx-auto mt-4 container shadow">

    <!-- formulaire pour créer le post -->
    <b-form method="POST" @submit.prevent.stop enctype="multipart/form-data">

      <!-- contenu texte du post  -->
      <section>
        <textarea class="form-control" id="text-password" rows="6" v-model="post.text" required></textarea>
      </section>

      <!-- image à charger -->
      <div>
        <b-form-file  accept="image/*" class="mt-3" id="file-input" plain></b-form-file>
        <img :src="post.imageUrl" class="rounded img-fluid d-flex ml-auto mr-auto " id="imgResponsive" alt="Responsive image" accept="image/*">
      </div>

      <hr>

      <!-- bouton pour enregistrer les modifications -->
      <b-button type="button" class="btn btn-success" color="green" data-dismiss="modal" @click="saveModify()">Enregistrer</b-button>
      <b-button type="button" class="btn btn-success" color="red" data-dismiss="modal" @click="cancel">Annuler</b-button>

    </b-form>

  </b-card>

</template>

<script>
  import { mapActions } from 'vuex';
    import PostService from "../services/post.js"

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

    },

    async mounted() {
      const id = this.$route.params.id;
      const response = await PostService.getOnePost(id)
      this.post = response.data; 
    },


    methods: {
      ...mapActions(['modifyPost']),

      // requête pour modifier les informations du compte
      async saveModify() {

        await this.modifyPost(this.post)
        alert("Votre post a bien été modifié")
        this.$router.push('/')
      },

      async cancel() {
        this.$router.push('/')
      },
    }
  }
</script>