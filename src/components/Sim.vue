<template>
    <main class="container mt-5">
      <div class="row align-items-center m-12">
          <div class="col-lg-3 my-1 p-3 bg-dark text-light align-self-stretch">
            <app-settings :set="set"></app-settings>
          </div>
          <div class="chart-container col-lg-9 my-1 p-3 bg-light text-right">
            <app-chart class="float-right"
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
                  v-for="n in npis" 
                  :val="n.val" 
                  :set="n" 
                  :key="">
              </comp-npi>
              <div class="dropdown">
                <button class="btn btn-secondary btn-sm" @click="chartDraw" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  &#65291;
                </button>
                <div class="dropdown-menu shadow-sm" aria-labelledby="dropdownMenuButton">
                  <a v-if="!n.visible" v-for="n in npis" class="dropdown-item" @click="n.visible = !n.visible" href="#" :key="">{{n.name}}</a>
                </div>
              </div>
          </div>
      </div>
      <aside class="row my-1 p-3 bg-light">
          <cov-api>Covid-19 live info: {{ node }} <button class="btn btn-secondary" @click="nodeFetch('-M7bKktgGABUessajBWO')">FETCH</button></cov-api>
      </aside>
    </main>    
</template>

<script>
import Npi from './Npi.vue';
import Cov19Api from './Covid19Api.vue';
import Chart from './Chart.vue';
import Settings from './Settings.vue';
import { eventBus } from '../main.js';

export default {
  props: ['node'],
  components: {
    'app-chart': Chart,
    'app-settings': Settings,
    'comp-npi': Npi,
    'cov-api': Cov19Api
  },  
  data () {     
    return {
        set: {                // default settings
            title:      '',     // sim title 
            days:       30,     // days of symulation
            dayZero:    10,     // case count at day zero
            ro:         0.2,    // pathogen reproduction number
            incubation: 1,      // avrage incubation period in days
            hospit:     1,      // avrage hospitalisation period
            ifr:        10,     // avrage infaction fatality rate
            linlog:     0       // y-axis 0-linear 1-log
        },
        npis: [               // list of NPIs
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
        d = Math.round(d);
        if (d < 10)                 { d = 10; }
        if (d > 365)                { d = 365; }
        if (d == NaN && d == null)  { d = 30; }
        // day zero init
        this.chartdata.labels.push(1);
        this.chartdata.datasets[0].data.push(this.set.dayZero);
        this.chartdata.datasets[1].data.push(0);

        let rro = 0;
        let n = 0;

        for (let i = 1; i < d; i++) {   
          this.chartdata.labels.push(i+1);      // chart x-axis add day
          rro = 0;
          n = 0;
          // confirmed cases
          for (let j = 0; j < this.npis.length; j++) {
            if (this.npis[j].visible && this.npis[j].val.active && i > this.npis[j].val.valA && i < this.npis[j].val.valB)                      {
              rro += this.npis[j].ror;
              //console.log('V'+this.npis[j].visible+' A'+this.npis[j].val.active+' ROR'+this.npis[j].ror);
            }
          }
          
          if (i - this.set.incubation < 1 || this.set.ro - rro < 0) {
            this.chartdata.datasets[0].data.push(this.chartdata.datasets[0].data[i-1]);
          } else {
            this.chartdata.datasets[0].data.push(Math.round(((this.set.ro - rro) * this.chartdata.datasets[0].data[i-1])+1+this.chartdata.datasets[0].data[i-1]));
          }
          if (i - this.set.hospit < 1) {
            this.chartdata.datasets[1].data.push(this.chartdata.datasets[1].data[i-1]);
          } else {
            this.chartdata.datasets[1].data.push(Math.round(this.chartdata.datasets[0].data[i-1] * this.set.ifr / 100 ));
          }          
        }
        //console.log('DAY: '+ this.chartdata.labels);
        //console.log('CH1: '+ this.chartdata.datasets[0].data);
    },
    refresh() {
        if (this.npis[0].val.steps !== this.set.days) {
          for (let i = 0; i < this.npis.length; i++) {
            if(this.npis[i].val.valB=this.npis[i].val.steps)
              if(this.npis[i].val.valA < this.set.days) {
                this.npis[i].val.steps = this.set.days;
                this.npis[i].val.valB  = this.set.days;
              } else {
                this.npis[i].val.valA = 0;
                this.npis[i].val.valB = 0;
                this.npis[i].val.steps = this.set.days;
              }
          }
        }
        //console.log('NPI CLICK!');
        eventBus.$emit('set-link', '');
        this.chartDraw();
    },
    nodeSubmit() {
        // Fire Base Realtime Database connection
        this.$http.post('https://covsim-7ce15.firebaseio.com/csnode.json', { set: this.set, npis: this.npis} )
                .then(response => { 
                      console.log(response);
                      if(response.status === 200) {   // status 'ok'
                        eventBus.$emit('set-link', 'http://localhost:8080/#/sim/'+response.body.name);
                      } else {
                        //this.shareLink = 'error: '+response.statusText;
                        eventBus.$emit('set-link', 'error: '+response.statusText);
                      }
                  }, error => {
                      console.tag('[ERR: no database connection]');
                });  
        //console.log('DATA: '+data);
        //console.log('OBJ: '+this.obj);
    },
    nodeFetch(key) {
        // Fire Base Realtime Database connection
        this.$http.get('https://covsim-7ce15.firebaseio.com/csnode/'+key+'.json')
                .then(response => { 
                      // console.log(response);
                      return response.json();
                  }, error => {
                      console.tag('[ERR: no database connection]');
                })
                .then( data => {
                      console.log(data);
                      this.setByNode(data);
                });
    },
    setByNode(node) {
        this.set = node.set;
        this.npis = node.npis;
        this.refresh();
    }
  },
  mounted () {
    this.chartDraw();
    if(this.node) {
        eventBus.$emit('set-link', '');
        this.nodeFetch(this.node);  
    }
  },
  created() {
    eventBus.$on('node-submit', () => {
        console.log('[EB: node submit -> sim.vue');
        this.nodeSubmit();
    } );
  },
  destroyed() {
    console.log('[sim destroyed]');
    //eventBus.$emit('set-link', 'hide');
  },
  watch: {
    'set.days': function() {
      this.refresh();
      //console.log('WATCH: set.days changed');
    },
    set: {
      handler(val){
        this.refresh();
        //console.log('WATCH: SET changed');
      },
      deep: true
    }
  }

}
</script>