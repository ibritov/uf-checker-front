<template>
    <div :class="themeClass">
        <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div class="bg-white dark:bg-gray-700 p-8 rounded shadow-md max-w-md w-full">
                <h1 class="text-2xl font-semibold mb-4 text-white">Inicio de Sesión</h1>
                <form @submit.prevent="login">
                    <div class="mb-4">
                        <label for="username" class="block text-sm font-medium text-gray-600 dark:text-gray-300">
                            Nombre de usuario
                        </label>
                        <input type="text" id="username" v-model="username"
                            class="mt-1 p-2 w-full border rounded-md dark:bg-gray-600" required />
                    </div>
                    <div class="mb-4">
                        <label for="password" class="block text-sm font-medium text-gray-600 dark:text-gray-300">
                            Contraseña
                        </label>
                        <input type="password" id="password" v-model="password"
                            class="mt-1 p-2 w-full border rounded-md dark:bg-gray-600" required />
                    </div>
                    <button @click="login" type="submit" class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['login']),
    async login() {
      // Llama a la acción 'login' de Vuex para manejar la lógica de inicio de sesión
      await this.login();
      // Emitir un evento indicando que el inicio de sesión fue exitoso
      this.$emit('login-success');
    },
  },
  data() {
    return {
      themeClass: 'dark-theme',
    };
  },
};
</script>