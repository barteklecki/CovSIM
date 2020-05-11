import Vue from 'vue';
import VueResource from 'vue-resource';
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.vue';
import MultiSlider from './MultiSlider.vue';

Vue.use(VueResource);

new Vue({
  el: '#app',
  render: h => h(App)
})
