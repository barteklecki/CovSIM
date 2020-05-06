import Vue from 'vue'
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.vue';
import MultiSlider from './MultiSlider.vue';

Vue.component('multi-slider', MultiSlider)
{

  
}

new Vue({
  el: '#app',
  render: h => h(App)
})
