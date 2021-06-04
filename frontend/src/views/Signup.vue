<template>

  <body>
    <div class="signup">
      <Signup />
    </div>
  </body>
</template>

<script>
  import Signup from "@/components/SignupForm.vue";
  export default {
    name: "signup",
    components: {
      Signup,
    },
  };
</script>

<style scoped lang="scss">
  body {
    background-image: url(/img/fond.6fed4a74.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: auto;
    position: absolute;
    left: 0;
    min-height: 100%;
    min-width: 1024px;
  }
</style>