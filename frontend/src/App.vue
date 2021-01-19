<template>
  <div id="app">
    <div id="nav">
      <img alt="Groupomana logo" src="frontend/src/assets/images/icon-above-font.png">

      <router-link to="/">Connexion</router-link> |
      <router-link to="/signup">Créer un compte</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
  img {
    max-width: 20%;
  }
}
</style>