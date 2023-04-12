import { createRouter, createWebHistory } from "vue-router";
import axios from 'axios';

const router = createRouter({
    history: createWebHistory('/'),
    routes: []
});

router.beforeEach((to, from) => {
    switch (to.path) {
        case '/login': {
            axios.post('http://auth.localhost:3000/login', {
                params: {
                    username: 'test',
                    password: 'test'
                }
            }).then(data => {
                if(data.data.status) {
                    const { status, token, user } = data.data;
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user));
                }
            })
            break;
        }
        case '/signup': {
            axios.post('http://auth.localhost:3000/signup', {
                params: {
                    username: 'test',
                    password: 'test'
                }
            }).then(data => {
                console.log(data)
            })
            break;
        }
        default: {
            axios.post('http://auth.localhost:3000/').then(data => {
                console.log(data)
            })
            break;
        }
    }
})

export default router;