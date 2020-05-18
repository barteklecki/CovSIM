<template>
  <div id="app">
    <!-- HEADER NAV -->
    <app-header></app-header>
    <!-- CONTENT -->
    <router-view></router-view>
    <!-- FOOTER -->
    <footer class="page-footer font-small indigo">
      <div class="footer-copyright text-center py-3 text-light">Copyright 2020 by BarLec</div> 
    </footer>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'app',
  components: {
    'app-header': Header
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  background-color: aquamarine;
}


</style>
