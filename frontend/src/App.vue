<template>
  <div id="app">
   <NavBar/>
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