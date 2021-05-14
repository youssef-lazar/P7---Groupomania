<template>

  <!-- card créer un post -->
  <b-card tag="article" class="col-md-5 mx-auto mt-4 container shadow">

    <!-- formulaire pour créer le post -->
    <b-form method="POST" @submit.prevent="submitForm" enctype="multipart/form-data">

      <!-- contenu texte du post  -->
      <section>
        <textarea class="form-control" id="text-password" rows="6" placeholder="Écrivez votre premier message !"
          v-model="post.text" required>
          </textarea>
      </section>

      <!-- image à charger -->
      <div>
        <b-form-file v-model="post.imageUrl" accept="image/*" class="mt-3"  id="file-input" plain></b-form-file>

      </div>

      <hr>

      <!-- bouton pour partager le post -->
      <b-button type="submit" variant="outline-primary">Partager</b-button>

    </b-form>

  </b-card>

</template>

<script>
  import PostService from "../services/post";

  export default {
    name: "createPost",
    data: function() {
      return {
        post: {
          text: "",
          imageUrl: null,
        }
      }
    },
    methods: {

      submitForm: function () {
        const newPost = new FormData();
        newPost.append("text", this.post.text);
        newPost.append("image", this.post.imageUrl, this.post.imageUrl.filename);

        PostService.createPost(newPost).then(() => {
          this.$router.push("/");
        });
        return true;
        
      },
    }
  }
</script>