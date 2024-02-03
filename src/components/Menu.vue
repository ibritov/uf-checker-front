<template>
    <nav v-if="shouldShowMenu" class="bg-blue-800 p-4">
      <div class="text-white font-bold">Menu</div>
      <ul class="hidden md:flex space-x-4">
        <li>
          <router-link to="/" @click="logout" class="text-white border-b-2 border-blue-800">Salir</router-link>
        </li>
        <li v-if="isAdminUser">
          <router-link to="/admin" class="text-white border-b-2 border-blue-800">Historial</router-link>
        </li>
        <li v-if="isAdminUser">
          <router-link to="/user" class="text-white border-b-2 border-blue-800">Calcular UF</router-link>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    computed: {
      isUserLoggedIn() {
        return !!localStorage.getItem('userId');
      },
      isAdminUser() {
        return this.$store.getters.userRole === 'ADMINISTRADOR';
      },
      shouldShowMenu() {
        return this.$store.state.showMenu && this.isUserLoggedIn;
      },
    },
    methods: {
      logout() {
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        localStorage.removeItem('token');
      },
    },
  };
  </script>
  