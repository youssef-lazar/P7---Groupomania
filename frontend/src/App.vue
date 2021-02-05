<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home | </router-link> 
      <router-link class="signup" to="/signup">Inscription | </router-link> 
      <router-link class="login" to="/login">connexion</router-link>
      
    </div>
    <router-view />

    <footer id="footer">
      <a href="utilisation" > Mentions Legales </a>
    </footer>
  </div>
</template>

<script>

</script>

<style scoped lang="scss">

</style>