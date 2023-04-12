import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/scss/index.scss'
import router from "@/router";
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = `Certifier ${localStorage.getItem('token')}`;

createApp(App)
    .use(router)
    .mount('#app')
