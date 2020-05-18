import Sim from './components/Sim.vue';
import Tutorial from './components/Tutorial.vue';
import About from './components/About.vue';

export const routes = [
    { path: '/', component: Sim },
    { path: '/sim/:node', component: Sim, props: true, },
    { path: '/tutorial', component: Tutorial },
    { path: '/about', component: About },
    { path: '*', redirect: '/' }
];