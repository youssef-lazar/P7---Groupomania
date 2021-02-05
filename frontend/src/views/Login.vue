<template>
  <div class="login">
    <img class="photo" alt="Vue logo" src="../assets/icon-left-font.png" />
    <Login msg="Bienvenue à Groupomania" />
  </div>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/LoginForm.vue";
export default {
  name: "login",
  components: {
    Login,
  },
};
</script>

<style scoped lang="scss">

</style>
