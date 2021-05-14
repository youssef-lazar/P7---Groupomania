<template>
  <div id="app">
   <NavBar/>
    <router-view />
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
</style>