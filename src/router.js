import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from './components/Login.vue';
import AdminComponent from './components/Admin.vue';
import UserComponent from './components/User.vue';

const routes = [
    { path: '/', component: LoginComponent },
    { path: '/login', component: LoginComponent },
    { path: '/admin', component: AdminComponent, name: 'admin' },
    { path: '/user', component: UserComponent, name: 'user' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
