<template>
    <div :class="themeClass">
        <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div class="bg-white dark:bg-gray-700 p-8 rounded shadow-md max-w-md w-full">
                <h1 class="text-2xl font-semibold mb-4 text-white">Inicio de Sesión</h1>
                <form @submit.prevent="handleLogin">
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
                    <button @click="handleLogin" type="submit"
                        class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import { mapMutations } from 'vuex';

export default {
    data() {
        return {
            username: '',
            password: '',
            themeClass: 'dark-theme',
            showMenu: false,
        };
    },
    methods: {
        ...mapMutations(['setUserRole']),
        async handleLogin() {
            try {

                const credentials = { username: this.username, password: this.password };
                
                const response = await axios.post(`${process.env.VUE_APP_API_URL}/auth/login`, credentials);

                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userRole', response.data.role)
                localStorage.setItem('userId', response.data.userId)


                if (response.data.role === 'ADMINISTRADOR') {
                    await this.setUserRole('ADMINISTRADOR');
                    this.$router.push({ name: 'admin' });
                }
                if (response.data.role === 'ENCARGADO') {
                    await this.setUserRole('ENCARGADO');
                    this.$router.push('/user');
                }

            } catch (error) {
                Swal.fire({
                    title: '¡Usuario no encontrado!',
                    text: '¿Ingreso sus credenciales correctamente?',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
            }
        },
    },
};
</script>