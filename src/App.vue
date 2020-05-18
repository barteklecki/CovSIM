<template>
  <div id="app">
    <!-- HEADER NAV -->
    <app-header></app-header>
    <!-- CONTENT -->
    <router-view></router-view>
    <!-- <app-sim></app-sim> -->
    <!-- FOOTER -->
    <footer class="page-footer font-small indigo">
      <div class="footer-copyright text-center py-3 text-light">Copyright 2020</div> 
    </footer>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Sim from './components/Sim.vue'

export default {
  name: 'app',
  components: {
    'app-header': Header,
    'app-sim': Sim
  },
  data() {
    return {
        shareLink: '[Share Link]'
    }
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
