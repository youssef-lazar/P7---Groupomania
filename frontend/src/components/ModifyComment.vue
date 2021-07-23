<template>

  <div class="row justify-content-md-center">
    <div class="col-lg-6 col-md-4 col-sm-4">

      <h1 class="form-heading">Modifier le commentaire</h1>

      <div class="comment-form">

        <form method="POST" @submit.prevent.stop>

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
          message: "",
        }
      }
    },

    computed: {

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