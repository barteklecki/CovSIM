<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
    <footer class="page-footer font-small">
      <div class="footer-copyright text-center py-1">
        <a class="text-light" href="https://github.com/barteklecki/CovSIM">
          Copyright 2020 by BarLec
        </a>
      </div> 
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
