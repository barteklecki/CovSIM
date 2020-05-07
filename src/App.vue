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
      <div class="row align-items-center m-10">
          <div class="col-lg-3 my-1 p-3 bg-dark text-light">options</div>
          <div class="col-lg-8 my-1 p-3 bg-light text-right">graph</div>
      </div>
      <div class="row m-10">
          <div class="col-lg-11 my-1 p-3 bg-light">parameters:{{ msg }}
              <multi-slider class="my-1" style="height: 30px" :msSteps="10"  :msA="0" :msAB="0"></multi-slider>
              <multi-slider class="my-1" style="height: 30px" :msSteps="25"  :msA="5" :msAB="10"></multi-slider>
              <multi-slider class="my-1" style="height: 30px" :msSteps="50"  :msA="0" :msAB="0"></multi-slider>
              <multi-slider class="my-1" style="height: 30px" :msSteps="100" :msA="0" :msAB="0" :msMin="10" :msMax="80"></multi-slider>
          </div>
      </div>
    </main>
    <footer>
            <!-- web footer -->
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
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
