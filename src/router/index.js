import { createRouter, createWebHistory } from "vue-router";
import Axios from 'axios';
import middleware from "@/config/middleware";

const router = createRouter({
    history: createWebHistory('/'),
    routes: []
});

router.beforeEach(async (to, from) => {
    middleware.checker.csrf();

    if ((to.path === '/login' || to.path === '/signup') && middleware.checker.response(await Axios.get('http://auth.localhost:3000/'))) {
        return router.push('/');
    }

    switch (to.path) {
        case '/login': {
            const response = await Axios.post('http://auth.localhost:3000/login', {
                username: 'test',
                password: 'test'
            });

            middleware.checker.response(response);
            break;
        }
        case '/signup': {
            const response = await Axios.post('http://auth.localhost:3000/signup', {
                username: 'test',
                password: 'test'
            });

            middleware.checker.response(response);
            break;
        }
        case '/argo': {
            const response = await Axios.post('http://auth.localhost:3000/argo', middleware.argo.authorization.build());

            middleware.checker.response(response)
            break;
        }
        default: {
            const response = await Axios.get('http://auth.localhost:3000/');

            middleware.checker.response(response);
            break;
        }
    }
})

export default router;