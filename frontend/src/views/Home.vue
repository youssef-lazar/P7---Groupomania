<template>

    <div class="home" v-if="disconnected()">
      <img class="rounded img-fluid d-flex ml-auto mr-auto" src="../assets/icon-above-font.png" alt="Logo Groupomania" accept="image/*">
      

      <div class="presentation">
        Bienvenue sur le réseau social interne conçu pour les employés de Groupomania. Le but de cet outil est de
        faciliter les interactions entre collègues.
        Il vous permettra de publier des textes ainsi que du contenu multimédia avec tous les employés inscrits.
        Nous espéront que ce site vous permettra de faire plus ample connaissance et ce, dans un cadre plus informel.
      </div>


    </div>

    <div class="home" v-else>
      <PostForm msg="posts" />
      <PostList />
    </div>


</template>

<script>
  import PostForm from "@/components/PostForm.vue";
  import PostList from "@/components/PostList.vue";

  export default {
    name: "home",
    components: {
      PostForm,
      PostList
    },

    methods: {
      disconnected() {
        let disconnected = localStorage.getItem('currentUser');
        if (disconnected == null) {
          return true;
        } else {
          return false;
        }
      },
    }
  };
</script>

<style scoped lang="scss">

  .presentation {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    font-size: 1.5em;
    background-color: #aeaeaee0;
    border: 0.25px solid #aeaeaee0;
    border-radius: 5px;
    box-shadow: 0px 0px 20px 0px rgba(72, 79, 88, 1);
  }

</style>