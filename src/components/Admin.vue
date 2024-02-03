<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div class="bg-white dark:bg-gray-700 p-8 rounded shadow-md max-w-md w-full">
        <h1 class="text-2xl font-semibold mb-4">Vista de Administrador</h1>
        <button @click="toggleShowMenu">Toggle Show Menu</button>
      </div>
    </div>
  </template>
  
  <script>
  import { mapMutations } from 'vuex';
  
  export default {
    methods: {
      ...mapMutations(['setShowMenu']),
      toggleShowMenu() {
        this.setShowMenu(!this.showMenu);
      },
    },
    computed: {
      showMenu() {
        return this.$store.state.showMenu;
      },
    },
  };
  </script>
  