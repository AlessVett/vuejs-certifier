import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/scss/index.scss'
import router from "@/router";
import axios from 'axios';
import CryptoJS from 'crypto-js';

axios.defaults.headers.common['Authorization'] = `Certifier-acb06ddc-8fc5-4c56-ad6c-b51046c5cc5c ${localStorage.getItem('token-acb06ddc-8fc5-4c56-ad6c-b51046c5cc5c')};`;
// axios.defaults.headers.common['Authorization'] += `Certifier2 ${localStorage.getItem('token')}`;

createApp(App)
    .use(CryptoJS)
    .use(router)
    .mount('#app')
