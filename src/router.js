import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from './components/Login.vue';
import AdminComponent from './components/Admin.vue';
import UserComponent from './components/User.vue';
import store from './store'

const routes = [
    { path: '/', component: LoginComponent },
    { path: '/login', component: LoginComponent, meta: { showMenu: false } },
    { path: '/admin', component: AdminComponent, meta: { showMenu: true }, name: 'admin' },
    { path: '/user', component: UserComponent, meta: { showMenu: true }, name: 'user' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.name === 'admin' || to.name === 'user') {
        store.commit('setShowMenu', true);
    } else {
        store.commit('setShowMenu', false);
    }
    next();
});

export default router;
