<template>
  <div :class="themeClass">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isLoggedIn', 'userRole']),
    themeClass() {
      return 'dark-theme'; // Puedes ajustar esto según tu lógica de tema
    },
  },
};
</script>
