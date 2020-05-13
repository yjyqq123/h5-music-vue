<template>
  <div id="app">
    <appheader />
    <div class="bottom">
      <appfooter />
    </div>
    <router-view />
  </div>
</template>
<script>
import appheader from '../components/Header'
import appfooter from '../components/Footer'
export default {
  name: 'app',
  components: {
    appheader,
    appfooter
  }
}
</script>
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
}
.bottom {
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0;
}
</style>
