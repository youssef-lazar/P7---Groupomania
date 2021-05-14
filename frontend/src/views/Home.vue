<template>

<body>
  <div class="home" v-if="disconnected()">
    <h1> Bienvenue sur le site Groupomania </h1>
  </div>


  <div class="home" v-else>
    <PostForm msg="posts" />
    <PostList/>
  </div>
  
</body>
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
                if( disconnected == null ) {
                    return true;
                }
                else{
                    return false;
                }
            },
    }
  };
</script>

<style scoped lang="scss">

body {
  margin:0;
  padding:100px;
  background: url("../assets/fond.jpg") no-repeat center fixed; 
  -webkit-background-size: cover; /* pour anciens Chrome et Safari */
  background-size: cover; /* version standardisée */
}

</style>
