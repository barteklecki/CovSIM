import App from './components/App.vue';
import Sim from './components/Sim.vue';
import Tutorial from './components/Tutorial.vue';

export const routes = [
    { path: '', component: App },
    { path: '/sim', component: App },
    { path: '/tutorial', component: Tutorial },
    { path: '/about', component: About },
];