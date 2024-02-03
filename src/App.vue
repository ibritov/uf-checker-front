<template>
  <div :class="themeClass">
    <header>
      <!-- Barra de navegación -->
      <nav v-if="isUserLoggedIn" class="bg-blue-800 p-4">
        <!-- Logo o título -->
        <div class="text-white font-bold">Mi Aplicación</div>

        <!-- Menú de navegación para dispositivos grandes -->
        <ul class="hidden md:flex space-x-4">
          <li><router-link to="/" class="text-white">Inicio</router-link></li>
          <li><router-link to="/about" class="text-white">Acerca de</router-link></li>
          <!-- Otros elementos del menú... -->
        </ul>

        <!-- Menú de navegación para dispositivos pequeños (responsivo) -->
        <div class="md:hidden">
          <!-- Agrega aquí el código para un botón de menú responsivo (por ejemplo, usando Vue.js y Tailwind CSS) -->
        </div>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isLoggedIn', 'userRole']),
    themeClass() {
      return 'dark-theme'; 
    },
    isUserLoggedIn() {
      return !!localStorage.getItem('userId');
    },
    logout(){
      
    }
  },
};
</script>
