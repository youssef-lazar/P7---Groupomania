<template>
  <div class="login">
    <Login/>
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
