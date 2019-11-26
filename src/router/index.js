import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    base: process.env.BASE_URL,
    linkActiveClass: 'active',
    routes
});

export default router;
