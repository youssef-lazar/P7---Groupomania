<template>
  <div class="home">
    <PostForm msg="posts" />
    <PostList/>
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
  };
</script>

<style scoped lang="scss">

</style>
