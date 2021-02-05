<template>
  <div class="home">
    <img alt="groupomania logo" class="photo" src="../assets/icon-left-font.png" />
 
    <Posts msg="posts" />
   
  </div>
</template>

<script>
  // @ is an alias to /src
  import Posts from "@/components/PostForm.vue";
  export default {
    name: "home",
    components: {
      Posts,
    },
  };
</script>

<style scoped lang="scss">

</style>
