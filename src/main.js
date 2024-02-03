import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import store from './store'; // Importar el store de Vuex

createApp(App)
  .use(router)
  .use(store) // Integrar Vuex en la aplicación
  .mount('#app');
