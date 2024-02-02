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
      try {
        
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/auth/login`, credentials);

        console.log('response es')
        console.log(response)

        if (response.status === 200 && response.data.token) {
          commit('setLoggedIn', true);
          commit('setUserRole', response.data.role);
          commit('setToken', response.data.token);
        } else {
          console.error('Error en la autenticación ', response.message);
        }
      } catch (error) {
        console.error('Error en la solicitud de autenticación:', error.message);
      }
    },

  },
  getters: {
    isLoggedIn: (state) => state.loggedIn,
    userRole: (state) => state.userRole,
    authToken: (state) => state.token,
  },
});
