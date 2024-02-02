import Vue from 'vue';
import Router from 'vue-router';
import LoginComponent from '../components/Login.vue';
import AdminComponent from '../components/Admin.vue';
import UserComponent from '../components/User.vue';

Vue.use(Router)


export default new Router({
    routes: [
        { path: '/login', component: LoginComponent },
        { path: '/admin', component: AdminComponent, name: 'admin' },
        { path: '/user', component: UserComponent, name: 'user' },
      ]
});
