<template>
  <div id="app">
    <NavBar />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
  import NavBar from './components/NavBar';

  export default {
    name: "home",
    components: {
      NavBar
    },
  };
</script>

<style scoped lang="scss">
  #app {
    background-image: url(assets/fond.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 100vh;
  }
</style>