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
          <div class="col-lg-3 my-1 p-3 bg-dark text-light align-self-stretch">options</div>
          <div class="chart-container col-lg-9 my-1 p-3 bg-light text-right">
            <app-chart class="float-right" ref="child"
                :chart-data="chartdata" 
                :options="options" 
                style="width: 90%"
                :height="400">
            </app-chart>
          </div>
      </div>
      <div class="row m-10" @click="refresh()">
          <div class="col-lg-12 my-1 p-3 bg-light">
              <comp-npi 
                  v-if="n.visible" 
                  v-for="n in NPIs" 
                  :val="n.val" 
                  :set="n" 
                  :key="">
              </comp-npi>
              <div class="dropdown">
                <button class="btn btn-secondary btn-sm" @click="chartDraw" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  &#65291;
                </button>
                <div class="dropdown-menu shadow-sm" aria-labelledby="dropdownMenuButton">
                  <a v-if="!n.visible" v-for="n in NPIs" class="dropdown-item" @click="n.visible = !n.visible" href="#" :key="">{{n.name}}</a>
                </div>
              </div>
          </div>
      </div>
      <aside class="row my-1 p-3 bg-light">
          <cov-api>Covid-19 live info:</cov-api>
      </aside>
    </main>
    <footer class="page-footer font-small indigo">
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
      set: {
        days:       30,     // days of symulation
        dayZero:    1,      // case count at day zero
        ro:         0.5,    // pathogen reproduction number
        incubation: 1,      // avrage incubation period in days
        hospit:     1,      // avrage hospitalisation period
        ifr:        10,     // avrage infaction fatality rate
      },
      NPIs: [             // list of non pharm. interventions
        { name: 'aaa', visible: 1, ror: 0.02, val: { id: 0, active: 1, steps: 30, valA:  7, valB: 30, min: 0,max: 0  } },
        { name: 'bbb', visible: 1, ror: 0.05, val: { id: 1, active: 1, steps: 30, valA: 14, valB: 30, min: 0,max: 0  } },
        { name: 'ccc', visible: 1, ror: 0.07, val: { id: 2, active: 1, steps: 30, valA: 21, valB: 30, min: 0,max: 0  } },
        { name: 'ddd', visible: 0, ror: 0.15, val: { id: 3, active: 1, steps: 30, valA: 20, valB: 30, min: 0,max: 0  } },
        { name: 'eee', visible: 0, ror: 0.10, val: { id: 4, active: 1, steps: 30, valA: 20, valB: 30, min: 0,max: 0  } },
        { name: 'fff', visible: 0, ror: 0.80, val: { id: 5, active: 1, steps: 30, valA:  5, valB: 18, min: 0,max: 0  } },
        { name: 'ggg', visible: 0, ror: 0.60, val: { id: 6, active: 1, steps: 30, valA: 15, valB: 20, min: 0,max: 0  } },
        { name: 'hhh', visible: 0, ror: 0.20, val: { id: 7, active: 1, steps: 30, valA:  1, valB: 12, min: 0,max: 0  } }
            ],
      chartdata: {
            labels: [1,2,3],
            datasets: [{ 
                data: [1,6,9],
                label: "Confirmed",
                borderColor: "#7fffd4",
                backgroundColor: "#cdffeea0", 
                fill: 1
            }, { 
            //     data: [1,4,6],
            //     label: "Recovered",
            //     borderColor: "#7fffd4",
            //     backgroundColor: "#7fffd4a0",
            //     fill: 2
            // }, { 
                data: [1,2,3],
                label: "Deaths",
                borderColor: "#4a9179",
                backgroundColor: "#4a9179a0",
                fill: "origin"
            }]
      },
      options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: false,
      }
    }
  },
  methods: {
    chartDraw() {
        this.chartdata = {
              labels: [],       // clear array
              datasets: [{ 
                  data: [],     // clear array
                  label: "Confirmed",
                  borderColor: "#7fffd4",
                  backgroundColor: "#cdffeea0", 
                  borderWidth: 1,
                  pointRadius: 2,
                  fill: 1
              }, { 
              //     data: [],     // clear array
              //     label: "Recovered",
              //     borderColor: "#7fffd4",
              //     backgroundColor: "#7fffd4a0",
              //     borderWidth: 1,
              //     pointRadius: 2,
              //     fill: 2
              // }, { 
                  data: [],     // clear array
                  label: "Deaths",
                  borderColor: "#4a9179",
                  backgroundColor: "#4a9179a0",
                  borderWidth: 1,
                  pointRadius: 2,
                  fill: "origin"
              }],
          };
          this.curveCalc(this.set.days);
    },
    curveCalc(d){
        //validation
        d = Math.round(d);
        if (d < 10)                 { d = 10; }
        //if (d > 365)                { d = 365; }
        if (d == NaN && d == null)  { d = 30; }

        // day zero init
        this.chartdata.labels.push(1);
        this.chartdata.datasets[0].data.push(this.set.dayZero);
        this.chartdata.datasets[1].data.push(0);
        //this.chartdata.datasets[2].data.push(0);

        let rro = 0;
        let n = 0;

        for (let i = 1; i < d; i++) { 
          
          this.chartdata.labels.push(i+1);      // chart x-axis add day
          rro = 0;
          n = 0;
          // confirmed cases
          for (let j = 0; j < this.NPIs.length; j++) {
            if (this.NPIs[j].visible && this.NPIs[j].val.active && i > this.NPIs[j].val.valA && i < this.NPIs[j].val.valB)                      {
              rro += this.NPIs[j].ror;
              console.log('V'+this.NPIs[j].visible+' A'+this.NPIs[j].val.active+' ROR'+this.NPIs[j].ror);
            }
          }
          
          if (i - this.set.incubation < 1 || this.set.ro - rro < 0) {
            this.chartdata.datasets[0].data.push(this.chartdata.datasets[0].data[i-1]);
          } else {
            this.chartdata.datasets[0].data.push(Math.round(((this.set.ro - rro) * this.chartdata.datasets[0].data[i-1])+this.chartdata.datasets[0].data[i-1]));
          }
          //this.chartdata.datasets[0].data.push(Math.round(this.set.dayZero*Math.pow(this.set.ro - rro, i)));
          //console.log('PV: '+this.chartdata.datasets[0].data[i-1])
          //this.chartdata.datasets[0].data.push(Math.round(this.set.dayZero*Math.pow(this.set.ro - rro, i)));
          //this.chartdata.datasets[1].data.push(i*20);
          // if (i - this.set.hospot < 1) {
          //   this.chartdata.datasets[1].data.push(this.chartdata.datasets[1].data[i-1]);
          // } else {
          //   this.chartdata.datasets[1].data.push(Math.round(this.chartdata.datasets[0].data[i-1] * (100 - this.set.ifr / 100)));
          // }
          if (i - this.set.hospit < 1) {
            this.chartdata.datasets[1].data.push(this.chartdata.datasets[1].data[i-1]);
          } else {
            this.chartdata.datasets[1].data.push(Math.round(this.chartdata.datasets[0].data[i-1] * this.set.ifr / 100 ));
          }          
        }
        console.log('DAY: '+ this.chartdata.labels);
        console.log('CH1: '+ this.chartdata.datasets[0].data);
    },
    refresh() {
        //console.log('NPI CLICK!');
        this.chartDraw();
    }
  },
  mounted () {
    this.chartDraw();
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

  .small {
    max-width: 600px;
    margin:  150px auto;
  }

</style>
