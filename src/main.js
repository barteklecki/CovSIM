import Vue from 'vue';
import VueResource from 'vue-resource';
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.vue';
//import VueRouter from 'vue-router';
//import { routes } from './routes.js';

Vue.use(VueResource);
//Vue.use(VueRauter);

// const router = new VueRouter({
//   routes: routes,      // ES6 ->     routes
//   mode: 'hash'         // mode: 'history'
// });

export const eventBus = new Vue();

new Vue({
  el: '#app',
  //router: router,     // ES5 ->     router
  render: h => h(App)
})

