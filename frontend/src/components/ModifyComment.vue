<template>

  <!-- card créer un post -->
  <div  tag="article" class="col-md-5 mx-auto mt-4 container shadow card">

    <!-- formulaire pour créer le post -->
    <form method="POST" @submit.prevent.stop>

      <!-- contenu texte du post  -->
      <section>
        <textarea class="form-control" id="comment-message" rows="6" v-model="comment.message" required></textarea>
      </section>

      <hr>

      <!-- bouton pour enregistrer les modifications -->
      <button type="button" class="btn btn-success" color="green" data-dismiss="modal" @click="saveModify">Enregistrer</button>
      <button type="button" class="btn btn-success" color="red" data-dismiss="modal" @click="cancel">Annuler</button>

    </form>

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
    data:  () => {
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

        await this.modifyComment({id:this.commentId,comment: this.comment})
        alert("Votre commentaire a bien été modifié")
        this.$router.push('/')
      },

      async cancel() {
        this.$router.push('/')
      },
    }
  }
</script>