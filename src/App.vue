<template>
  <div id="app">
    <!-- HEADER NAV -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light px-3 py-0 mb-3">
      <a class="navbar-brand mx-3 font-weight-bold" href="#">
        <img src="./img/covico.svg" width="30" height="30" class="d-inline-block align-top mx-2" alt="">
        COVSIM
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="#">Sim<span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Tutorial</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">About</a>
          </li>
        </ul>
      </div>
    </nav>
    <!-- CONTENT -->
    <main class="container">
      <div class="row align-items-center m-12">
          <div class="col-lg-4 my-1 p-3 bg-dark text-light">options</div>
          <div class="col-lg-8 my-1 p-3 bg-light text-right">graph</div>
      </div>
      <div class="row m-10">
          <div class="col-lg-12 my-1 p-3 bg-light">
              <comp-npi></comp-npi>
              <comp-npi></comp-npi>
              <comp-npi></comp-npi>
              <comp-npi></comp-npi>
              <comp-npi></comp-npi>
              <comp-npi></comp-npi>
              <comp-npi></comp-npi>
          </div>
      </div>
    </main>
    <footer class="page-footer font-small indigo fixed-bottom">
      <div class="footer-copyright text-center py-3 text-light">Copyright 2020</div> 
    </footer>
  </div>
</template>

<script>
import Npi from './Npi.vue';
export default {
  name: 'app',
  components: {
    'comp-npi': Npi
  },
  data () {     // <-- ES6 syntax or data: function () {
    return {
      msg: 'Info'
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
