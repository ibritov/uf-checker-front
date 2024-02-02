<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <div class="bg-white dark:bg-gray-700 p-8 rounded shadow-md max-w-md w-full">
            <h1 class="text-2xl font-semibold mb-4">Calculadora de UF</h1>

            <div class="flex flex-col space-y-4">
                <div class="flex flex-col">
                    <label for="date" class="block text-sm font-medium text-gray-700 mb-1">Seleccionar fecha</label>
                    <div class="flex">
                        <input type="date" id="date" name="date"
                            class="flex-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                </div>

                <div class="flex flex-col">
                    <label for="uf" class="block text-sm font-medium text-gray-700 mb-1">Ingresar cantidad de UF</label>
                    <div class="flex">
                        <input type="number" id="uf" name="uf" placeholder="Cantidad de UF"
                            class="flex-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                </div>

                <button @click="getUfConverted"
                    class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                    Calcular
                </button>
            </div>

            <UfConverted v-if="showResult" :convertedUf="convertedUf" />
        </div>
    </div>
</template>
  
  
<script>
import axios from 'axios';
import UfConverted from "./UfConverted.vue";

export default {
    data() {
        return {
            selectedDate: "",
            ufAmount: "",
            showResult: false,
            convertedUf: 0,
        };
    },
    components: {
        UfConverted,
    },
    methods: {
        async list() {
            const response = await axios.get(`${process.env.VUE_APP_API_URL}/user-check`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            console.log(response.data)
        },
        async getUfConverted() {
            try {
                // Objeto con los datos que se enviarán a la API
                const requestData = {
                    date: this.selectedDate,
                    ufAmount: this.ufAmount,
                };

                // Realizar la solicitud POST a la API
                const response = await axios.post(`${process.env.VUE_APP_API_URL}/user-check`, requestData);

                // Manejar la respuesta de la API
                this.convertedUf = response.data.result; // Ajusta según la respuesta real de tu API
                this.showResult = true;
            } catch (error) {
                console.error("Error al realizar la solicitud a la API:", error);
                // Puedes manejar el error de la manera que desees
            }
        }
    },

};
</script>
  