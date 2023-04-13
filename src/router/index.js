import { createRouter, createWebHistory } from "vue-router";
import Axios from 'axios';

const router = createRouter({
    history: createWebHistory('/'),
    routes: []
});

router.beforeEach(async (to, from) => {
    switch (to.path) {
        case '/login': {
            const response = await Axios.post('http://auth.localhost:3000/login', {
                username: 'test',
                password: 'test'
            });

            console.log(response);

            if (response.data.status) {
                const {status, token, user} = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
            }
            break;
        }
        case '/signup': {
            const response = await Axios.post('http://auth.localhost:3000/signup', {
                username: 'test',
                password: 'test'
            });
            console.log(response.data)
            break;
        }
        default: {
            Axios.post('http://auth.localhost:3000/').then(data => {
                console.log(data)
            })
            break;
        }
    }
})

export default router;