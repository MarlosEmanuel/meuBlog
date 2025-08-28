import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importe o arquivo de roteamento

const app = createApp(App);

app.use(router); // Diga ao Vue para usar o router

app.mount('#app');