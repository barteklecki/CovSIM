import Vue from 'vue';
import VueResource from 'vue-resource';
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.vue';
import VueRouter from 'vue-router';
import { routes } from './routes.js';

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
   routes: routes,     
   mode: 'hash'      // alternative mode: 'history'
});

export const eventBus = new Vue();

new Vue({
  el: '#app',
  router: router,   
  render: h => h(App)
})

