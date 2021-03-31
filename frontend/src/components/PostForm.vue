<template>

  <!-- card créer un post -->
  <b-card tag="article" class="col-md-5 mx-auto mt-4 container shadow">

    <!-- formulaire pour créer le post -->
    <b-form method="POST" @submit.prevent = "createPost" enctype = " multipart / form-data ">

      <!-- contenu texte du post  -->
      <section>
          <textarea
            class="form-control"
            id="text-password"
            rows="6"
            placeholder="Écrivez votre premier message !"
            v-model="post.text"
            required>
          </textarea>
      </section>

      <!-- image à charger -->
      <div>
        <b-form-file v-model="post.imageUrl" accept="image/*" class="mt-3" @change="uploadImage" id="file-input" plain required></b-form-file>
     
      </div>

      <hr>

      <!-- bouton pour partager le post -->
      <b-button type="submit" variant="outline-primary">Partager</b-button>

    </b-form>

  </b-card>

</template>

<script>
import axios from "axios";

export default {
  name: "createPost",
  data() {
    return {
      post:{
        text: "",
        imageUrl: null,
      }
    }
  },
  methods: {
    createPost: function() {
      const newPost = new FormData();
      newPost.append("text", this.post.text);
      newPost.append("image", this.post.imageUrl, this.post.imageUrl.filename);
      if( !newPost ) {
        alert('Champ requis !')
      }
      // requête pour poster le post
      axios.post("http://localhost:3000/api/posts",  newPost,
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('jwt') }}
      )
      .then(() => { this.post ; location.replace("http://localhost:8080/#/");})
      .catch((erreur) => ("erreur" + erreur))
    },
    // fontion pour charger l'image 
    uploadImage(e) {
      this.post.imageUrl = e.target.files[0];
      if (this.post.imageUrl.length === 0) {
        return ;
      }
    }
  }
}
</script>

