<template>

  <div class="row justify-content-md-center">
    <div class="col-lg-6 col-md-4 col-sm-4">

      <h1 class="form-heading">Modifier le commentaire</h1>

      <div class="comment-form">

        <form method="POST" @submit.prevent.stop>

          <div class="card gedf-card comment-card" v-if="comment.id">

            <div class="card-header">
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="mr-2">
                    <img class="rounded-circle" width="45" :src="'https://avatars.dicebear.com/api/micah/'+ comment.UserId + '.svg'"
                      alt="Avatar utilisateur">
                  </div>
                  <div class="ml-2">
                    <div class="h5 m-0">{{ comment.User.firstName }} {{ comment.User.surname }}</div>
                    <div class="h7 text-muted">{{ comment.User.email }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-body">
              <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i>Le
                {{comment.createdAt.slice(0,10).split('-').reverse().join('/') + ' à ' + comment.createdAt.slice(11,16)}}
              </div>
            </div>
          </div>

          <!-- contenu texte du post  -->
          <div>
            <textarea class="form-control" id="comment-message" rows="6" v-model="comment.message" required></textarea>
          </div>

          <hr>

          <!-- bouton pour enregistrer les modifications -->
          <button type="button" class="btn btn-success" @click="saveModify">Enregistrer</button>
          <button type="button" class="btn btn-danger" @click="cancel">Annuler</button>

        </form>

      </div>
    </div>
  </div>


</template>

<script>
  import PostService from "../services/post.js"
  import { mapActions } from 'vuex';

  export default {
    name: "modifyComment",
    props: {
      commentId: {
        type: Number,
        required: true
      }
    },
    data: () => {
      return {
        comment: {
          id: null,
          message: "",
        }
      }
    },

    computed: {

    },

    async mounted() {
      const id = this.commentId;
      const response = await PostService.getOneComment(id)
      this.comment = response.data;
    },

    methods: {
      ...mapActions(['modifyComment']),

      // requête pour modifier les informations du compte
      async saveModify() {

        await this.modifyComment({
          id: this.commentId,
          comment: this.comment
        })
        alert("Votre commentaire a bien été modifié")
        this.$router.push('/')
      },

      async cancel() {
        this.$router.push('/')
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

    .text-muted {
        color: black !important;
    }
</style>