<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <div class="container mx-auto p-4">
            <h1 class="text-2xl font-semibold mb-4 text-white">Historial</h1>
            <input v-model="search" placeholder="Buscar por fecha" class="p-2 border mb-4" @input="filterItems">

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

            <div class="mt-4">
                <div class="mt-4">
  
</div>

</div>

        </div>
    </div>
</template>
  
<script>

import axios from 'axios';


export default {
    components: {
        Paginate,
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
        async fetchData() {
            const response = await axios.get(`${process.env.VUE_APP_API_URL}/user-check`, {
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

            console.log(this.items)
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
        changePage(page) {
            this.currentPage = page;
        },
    },
    mounted() {
        this.fetchData();
    },
};
</script>
  