<template>
  <div id="app">
    <!-- HEADER NAV -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light px-3 py-0 mb-3 fixed-top shadow-sm">
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
    <main class="container mt-5">
      <div class="row align-items-center m-12">
          <div class="col-lg-3 my-1 p-3 bg-dark text-light">options</div>
          <div class="col-lg-9 my-1 p-3 bg-light text-right">
            <app-chart></app-chart>
          </div>
      </div>
      <div class="row m-10">
          <div class="col-lg-12 my-1 p-3 bg-light">
              <div class="dropdown">
                <button class="btn btn-secondary btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  &#65291;
                </button>
                <div class="dropdown-menu shadow-sm" aria-labelledby="dropdownMenuButton">
                  <a v-if="!n.visible" v-for="n in NPIs" class="dropdown-item" @click="n.visible = !n.visible" href="#">{{n.name}}</a>
                </div>
              </div>
              <comp-npi v-if="n.visible" v-for="n in NPIs" :val="n.val" :set="n"></comp-npi>
          </div>
      </div>
      <aside class="row my-1 p-3 bg-light">
          <cov-api>Covid-19 live info:</cov-api>
      </aside>
    </main>
    <footer class="page-footer font-small indigo fixed-bottom">
      <div class="footer-copyright text-center py-3 text-light">Copyright 2020</div> 
    </footer>
  </div>
</template>

<script>
import Npi from './Npi.vue';
import Cov19Api from './Covid19Api.vue';
import Chart from './Chart.vue';
export default {
  name: 'app',
  components: {
    'comp-npi':  Npi,
    'cov-api':   Cov19Api,
    'app-chart': Chart
  },
  data () {     
    return {
      msg: 'Info',
      NPIs: [
        { name: 'aaa', visible: 1,  ror: 0.1, val: { id: 0, active: true,  steps: 25, valA: 0, valB: 0,  min: 0,max: 0  } },
        { name: 'bbb', visible: 1,  ror: 0.5, val: { id: 1, active: false, steps: 25, valA: 10,valB: 25, min: 0,max: 0  } },
        { name: 'ccc', visible: 0,  ror: 0.4, val: { id: 2, active: false, steps: 50, valA: 5, valB: 30, min: 0,max: 0  } },
        { name: 'ddd', visible: 0,  ror: 0.3, val: { id: 3, active: true,  steps: 50, valA: 20,valB: 40, min: 0,max: 45 } },
        { name: 'eee', visible: 0,  ror: 0.4, val: { id: 4, active: true,  steps: 50, valA: 20,valB: 40, min: 0,max: 45 } },
        { name: 'fff', visible: 1,  ror: 0.6, val: { id: 5, active: true,  steps: 25, valA: 5, valB: 18, min: 0,max: 0  } },
        { name: 'ggg', visible: 1,  ror: 0.6, val: { id: 6, active: true,  steps: 25, valA: 15,valB: 20, min: 0,max: 0  } },
        { name: 'hhh', visible: 1,  ror: 0.6, val: { id: 7, active: true,  steps: 25, valA: 1, valB: 12, min: 0,max: 0  } }
            ]
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
