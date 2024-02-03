<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 
    ">
        <div class="bg-white dark:bg-gray-700 p-8 rounded shadow-md max-w-md w-full">
            <h1 class="text-2xl font-semibold mb-4 text-center text-zinc-50">Calculadora de UF</h1>


            <div class="flex flex-col space-y-4">
                <div class="flex flex-col">
                    <label for="date" class="block text-sm font-medium text-white mb-1">Seleccionar fecha</label>
                    <div class="flex">
                        <input type="date" id="date" name="date" v-model="selectedDate"
                            class="flex-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                </div>

                <div class="flex flex-col">
                    <label for="uf" class="block text-sm font-medium text-white mb-1">Ingresar cantidad de UF</label>
                    <div class="flex">
                        <input v-model="cantUf" type="number" id="uf" name="uf" placeholder="Cantidad de UF"
                            class="flex-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                </div>

                <button @click="getUfConverted"
                    class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                    Calcular
                </button>
            </div>

            <UfConverted v-if="showResult" :convertedUf="convertedUf" :ufValue="ufValue" />
        </div>
    </div>
</template>
  
  
<script>
import axios from 'axios';
import UfConverted from "./UfConverted.vue";
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            selectedDate: "",
            cantUf: "",
            ufValue: 0,
            amountConverted: "",
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
        async validateCantUf() {
            if (this.cantUf < 0) {
                Swal.fire({
                    title: 'Valor incorrecto',
                    text: 'La cantidad de UF no puede ser negativa',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                });
                throw new Error('La cantidad de UF no puede ser negativa.');
            }
        },
        async validateDate() {
            const selectedDate = new Date(this.selectedDate)
            const today = new Date()

            if (!this.fechaSeleccionada) {
                Swal.fire({
                    title: 'Fecha incorrecta',
                    text: 'No puede estar vacio',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })

                throw new Error('La fecha seleccionada no es válida.');
            }

            if (selectedDate > today) {

                this.fechaSeleccionada = ''
                Swal.fire({
                    title: 'Fecha incorrecta',
                    text: 'No puede ingresar una fecha mayor a hoy',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })

                throw new Error('La fecha seleccionada no es válida.');
            }
        },
        async getUfConverted() {

            try {
                await this.validateDate()
                await this.validateCantUf()
                // Objeto con los datos que se enviarán a la API
                const requestData = {
                    date: this.selectedDate,
                    cantUf: this.cantUf,
                    userId: localStorage.getItem('userId'),
                };
                console.log(requestData)
                const response = await axios.post(`${process.env.VUE_APP_API_URL}/user-check`, requestData);

                this.selectedDate = response.data.amountConverted.toLocaleString('es-ES', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                });

                this.ufValue = response.data.ufValue.toLocaleString('es-ES', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                });

                this.showResult = true;

            } catch (error) {
                console.error("Error al realizar la solicitud a la API:", error);
            }
        }
    },

};
</script>
  