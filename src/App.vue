

<template>
  <div :class="themeClass">
    <Login v-if="!loggedIn" @login-success="handleLoginSuccess" />
    <AdminView v-else-if="userRole === 'admin'" />
    <UserView v-else />
  </div>
</template>

<script>
import Login from './components/Login.vue';
import AdminView from './components/Admin.vue';
import UserView from './components/User.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    Login,
    AdminView,
    UserView,
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'userRole']),
  },
  data() {
    return {
      loggedIn: false,
      themeClass: 'dark-theme',
    };
  },
  methods: {
    ...mapActions(['login']),
    handleLoginSuccess() {
      // Este método se llamará cuando el usuario haya iniciado sesión correctamente
      // Aquí puedes realizar cualquier lógica adicional necesaria
      // Por ejemplo, puedes hacer una solicitud para obtener el rol del usuario
      // y luego establecer el estado en loggedIn y userRole
      this.loggedIn = true;
      this.userRole = 'admin'; // Por ejemplo, asigna el rol 'admin' para demostrar la funcionalidad
    },
  },
};
</script>