import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    loggedIn: false,
    userRole: '',
    token: '',
  },
  mutations: {
    setLoggedIn(state, value) {
      state.loggedIn = value;
    },
    setUserRole(state, role) {
      state.userRole = role;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    async login({ commit }, credentials) {
       const response = await axios.post(`${process.env.VUE_APP_API_URL}/auth/login`, credentials);

        if (response.status === 200 && response.data.token) {
            console.log(response.data)
          commit('setLoggedIn', true);
          commit('setUserRole', response.data.role);
          commit('setToken', response.data.token);
        } 
    },

  },
  getters: {
    isLoggedIn: (state) => state.loggedIn,
    userRole: (state) => state.userRole,
    authToken: (state) => state.token,
  },
});
