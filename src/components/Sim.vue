<template>
    <main class="container mt-5">
      <div class="row align-items-center m-12">
          <div class="col-lg-3 my-1 p-3 bg-dark text-light align-self-stretch">
            <app-settings :settings="settings"></app-settings>
          </div>
          <div class="chart-container col-lg-9 my-1 p-3 bg-light text-right">
            <app-chart id="chart" class="float-right"
                :chart-data="chartdata" 
                :options="options">
            </app-chart>
          </div>
      </div>
      <div @click="refresh()" class="row m-10">
          <div class="col-lg-12 my-1 p-3 bg-light">
              <div class="dropdown">
                <button @click="chartDraw" 
                        class="btn btn-secondary btn-sm" 
                        type="button" id="dropdownMenuButton" 
                        data-toggle="dropdown" 
                        aria-haspopup="true" 
                        aria-expanded="false">
                  &#65291;
                </button>
                <div class="dropdown-menu shadow-sm" aria-labelledby="dropdownMenuButton">
                    <a  v-for="npi in notVisibleNpis" 
                        @click="npi.isVisible = !npi.isVisible" 
                        class="dropdown-item" 
                        :key="">
                            {{npi.name}} (Ro-{{npi.ror}})
                    </a>
                </div>
                <span class="ml-3 text-dark font-weight-light">
                    Add <span class="font-weight-bold">non-pharmacological interventions (NPIs)</span> 
                    and set the day on which the measure begins and ends (double click to reset range):
                    </span>
              </div>
              <comp-npi 
                  v-for="npi in visibleNpis" 
                  :range="npi.range" 
                  :npi="npi" 
                  :key="">
              </comp-npi>
          </div>
      </div>
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
        settings: {              
            simTitle:               '',  
            daysOfSim:              30,  
            casesAtBeginning:       10, 
            reproductionNumber:    0.4,
            incubationPeriod:        1,   
            hospitalisationPeriond:  1,
            infectionFatalityRate:  10  
        },
        npis: [            
            { name: 'media information',  isVisible: 1, ror: 0.05, range: { isActive: 1, steps: 30, starts:  7, ends: 30} },
            { name: 'handwashing',        isVisible: 1, ror: 0.10, range: { isActive: 1, steps: 30, starts: 14, ends: 30} },
            { name: 'facemasks',          isVisible: 1, ror: 0.20, range: { isActive: 1, steps: 30, starts: 16, ends: 30} },
            { name: 'taking temperature', isVisible: 1, ror: 0.20, range: { isActive: 0, steps: 30, starts: 18, ends: 30} },
            { name: 'social distancing',  isVisible: 1, ror: 0.25, range: { isActive: 0, steps: 30, starts: 20, ends: 30} },
            { name: 'quarantining cases', isVisible: 1, ror: 0.30, range: { isActive: 0, steps: 30, starts: 22, ends: 30} },
            { name: 'stay at home',       isVisible: 1, ror: 0.40, range: { isActive: 0, steps: 30, starts: 24, ends: 30} },
            { name: 'soft lockdown',      isVisible: 1, ror: 0.80, range: { isActive: 0, steps: 30, starts: 26, ends: 30} },
            { name: 'hard lockdown',      isVisible: 0, ror: 0.95, range: { isActive: 0, steps: 30, starts: 28, ends: 30} }
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
                label: "Fatalities",
                borderColor: "#4a9179",
                backgroundColor: "#4a9179a0",
                fill: "origin"
            }]
        },
        options: {  // ChartJS
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: false,
        }
    }
  },
  methods: {
    chartDraw() {  
        this.chartdata = {
              labels: [],     
              datasets: [{ 
                  data: [],    
                  label: "Confirmed",
                  borderColor: "#7fffd4",
                  backgroundColor: "#cdffeea0", 
                  borderWidth: 1,
                  pointRadius: 2,
                  fill: 1
              }, { 
                  data: [],   
                  label: "Fatalities",
                  borderColor: "#4a9179",
                  backgroundColor: "#4a9179a0",
                  borderWidth: 1,
                  pointRadius: 2,
                  fill: "origin"
              }],
          };
          this.curveCalc(this.settings.daysOfSim);
    },
    curveCalc(days){ 
        days = Math.round(days);
        if (days < 10) { days = 10; }
        if (days > 365) { days = 365; }
        if (isNaN(days) || days === null)  { days = 30; }

        this.chartdata.labels.push(1);
        this.chartdata.datasets[0].data.push(this.settings.casesAtBeginning);
        this.chartdata.datasets[1].data.push(0);
        let rro = 0;
        let n = 0;

        for (let i = 1; i < days; i++) {   
          this.chartdata.labels.push(i+1);      
          rro = 0;
          n = 0;
          
          for (let j = 0; j < this.npis.length; j++) {
            if (this.npis[j].isVisible && this.npis[j].range.isActive && i > this.npis[j].range.starts && i < this.npis[j].range.ends)                      {
              rro += this.npis[j].ror;
            }
          }
          
          if (i - this.settings.incubationPeriod < 1 || this.settings.reproductionNumber - rro < 0) {
            this.chartdata.datasets[0].data.push(this.chartdata.datasets[0].data[i-1]);
          } else {
            this.chartdata.datasets[0].data.push(Math.round(((this.settings.reproductionNumber - rro) * this.chartdata.datasets[0].data[i-1])+1+this.chartdata.datasets[0].data[i-1]));
          }

          if (i - this.settings.hospitalisationPeriond < 1) {
            this.chartdata.datasets[1].data.push(this.chartdata.datasets[1].data[i-1]);
          } else {
            this.chartdata.datasets[1].data.push(Math.round(this.chartdata.datasets[0].data[i-1] * this.settings.infectionFatalityRate / 100 ));
          }          
        }
    },
    refresh() {    
        if (this.npis[0].range.steps !== this.settings.daysOfSim) {
          for (let i = 0; i < this.npis.length; i++) {
            if(this.npis[i].range.ends=this.npis[i].range.steps)
              if(this.npis[i].range.starts < this.settings.daysOfSim) {
                this.npis[i].range.steps = this.settings.daysOfSim;
                this.npis[i].range.ends  = this.settings.daysOfSim;
              } else {
                this.npis[i].range.starts = 0;
                this.npis[i].range.ends = 0;
                this.npis[i].range.steps = this.settings.daysOfSim;
              }
          }
        }
        eventBus.$emit('set-link', '');  
        this.chartDraw();                  
    },
    nodeSubmit() {  
        this.$http.post('csnode.json', { settings: this.settings, npis: this.npis} )
                .then(response => { 
                      console.log(response);
                      if(response.status === 200) { 
                        eventBus.$emit('set-link', window.location.href.split('sim/')[0]+'sim/' + response.body.name);
                      } else {
                        eventBus.$emit('set-link', 'error: ' + response.statusText);
                      }
                  }, error => {
                      console.tag('[ERR: no database connection]');
                });  
    },
    nodeFetch(key) {  
        this.$http.get('csnode/' + key + '.json')
                .then(response => { 
                      return response.json();
                  }, error => {
                      console.tag('[ERR: no database connection]');
                })
                .then( data => {
                      console.table(data);
                      this.setByNode(data);
                });
    },
    setByNode(node) { 
        this.settings = node.settings;
        this.npis = node.npis;
        this.refresh();
    }
  },
  computed: {  
        visibleNpis() {  
                let n=[];
                for(let i = 0; i < this.npis.length; i++) {
                    if(this.npis[i].isVisible) {
                        n.push(this.npis[i]);
                    }
                }
                return n;
        },
        notVisibleNpis() {  
                let n=[];
                for(let i = 0; i < this.npis.length; i++) {
                    if(!this.npis[i].isVisible) {
                        n.push(this.npis[i]);
                    }
                }
                return n;
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
        this.nodeSubmit();
    } );
    eventBus.$emit('is-share-visible', true);       
  },
  destroyed() {
    eventBus.$emit('is-share-visible', false);   
  },
  watch: {
    'settings.daysOfSim': function() {                
      this.refresh();
    },
    settings: {
      handler(val){         //range            
        this.refresh();
      },
      deep: true
    }
  }

}
</script>

<style scoped>
    #chart {
        width: 90%;
        height: 400px;
    }
</style>