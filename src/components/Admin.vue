<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <div class="container mx-auto p-4">
            <h1 class="text-2xl font-semibold mb-4 text-white">Historial</h1>
            <input v-model="search" placeholder="Buscar por fecha" class="p-2 border mb-4" @input="filterItems">
            <button class="ml-3 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600" @click="exportToExcel">Exportar a
                Excel</button>

            <!-- Tabla -->
            <table class="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th class="py-2 px-4 border-b">Usuario</th>
                        <th class="py-2 px-4 border-b">Fecha</th>
                        <th class="py-2 px-4 border-b">Valor UF</th>
                        <th class="py-2 px-4 border-b">Valor Convertido</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in paginatedItems" :key="index">
                        <td class="py-2 px-4 border-b text-center">{{ item.user }}</td>
                        <td class="py-2 px-4 border-b text-center">{{ item.date }}</td>
                        <td class="py-2 px-4 border-b text-center">{{ item.ufValue }}</td>
                        <td class="py-2 px-4 border-b text-center">{{ item.ufConverted }}</td>
                    </tr>
                </tbody>
            </table>

            <div class="mt-4 bg-gray-700 text-center flex items-center justify-center">
                <v-pagination v-model="currentPage" :pages="Math.ceil(filteredItems.length / perPage)" :range-size="3"
                    active-color="#DCEDFF" @update:modelValue="changePage" />
            </div>

        </div>
    </div>
</template>
  
<script>

import axios from 'axios';
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import { read, utils, writeFile } from "xlsx";

export default {
    components: {
        VPagination,
    },
    data() {
        return {
            search: '',
            items: [],
            perPage: 10,
            currentPage: 1,
        };
    },
    computed: {
        filteredItems() {
            return this.items.filter(item => {
                return item.date && item.date.includes(this.search);
            });
        },

        paginatedItems() {
            const startIndex = (this.currentPage - 1) * this.perPage;
            const endIndex = startIndex + this.perPage;
            return this.filteredItems.slice(startIndex, endIndex);
        },
    },
    methods: {
        exportToExcel() {
            const dataToExport = this.items.map(item => ({
                Fecha: item.date,
                ValorUf: item.ufValue,
                MontoTotal: item.ufConverted,
                Usuario: item.user
                // ... otras columnas necesarias
            }));
            const ws = utils.json_to_sheet(dataToExport)

            const wb = utils.book_new()

            utils.book_append_sheet(wb, ws, 'Historial')

            const blob = writeFile(wb, 'exportacion.xlsx')

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'datos.xlsx';
            a.click();
            URL.revokeObjectURL(url);
        },
        async fetchData() {
            const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/user-check`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            this.items = response.data.map(item => ({
                date: this.formatDate(item.userCheck.ufDate),
                ufValue: item.userCheck.ufValue.toLocaleString('es-ES'),
                ufConverted: item.userCheck.amountConverted.toLocaleString('es-ES'),
                user: item.username
            }))

        },
        filterItems() {
            this.currentPage = 1;
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
            });
        },
        changePage(newPage) {
            this.currentPage = newPage;
        },
    },
    mounted() {
        this.fetchData();
    },
};
</script>
  