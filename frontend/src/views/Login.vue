<template>

  <body>
    <div class="login">
      <Login />
    </div>
  </body>

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
  body {
    background-image: url(/img/fond.6fed4a74.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: auto;
    position: absolute;
    left: 0;
    min-height: 100%;
    min-width: 1024px;
  }
</style>