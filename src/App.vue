<template>
  <div :class="themeClass">
    <header>
      <Menu :showMenu="shouldShowMenu" />
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Menu from './components/Menu.vue';

export default {
  components: {
    Menu,
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'userRole','showMenu']),
    themeClass() {
      return 'dark-theme';
    },
    shouldShowMenu() {
      return this.showMenu;
    },
  },
  beforeMount() {
    this.$store.commit('setShowMenu', localStorage.getItem('showMenu') === 'false');
  },
};
</script>
