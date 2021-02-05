<template>
  <div class="signup">
    <img class="photo" alt="Vue logo" src="../assets/icon-left-font.png" />
    <Signup msg="Bienvenue à Groupomania" />
  </div>
</template>

<script>
// @ is an alias to /src
import Signup from "@/components/SignupForm.vue";
export default {
  name: "signup",
  components: {
    Signup,
  },
};
</script>

<style scoped lang="scss">

</style>