// store.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    showMenu: false,
    userRole: null
  },
  mutations: {
    setShowMenu(state, value) {
      state.showMenu = value;
    },
    setUserRole(state, role) { 
        state.userRole = role;
      },
  },
  getters: {
    showMenu(state) {
      return state.showMenu;
    },
    userRole(state) { 
        return state.userRole;
      },
  },
});
