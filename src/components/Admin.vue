<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <div class="bg-white dark:bg-gray-700 p-8 rounded shadow-md max-w-md w-full">
            <h1 class="text-2xl font-semibold mb-4">Vista de Administrador</h1>
        </div>
    </div>
</template>
  
<script>
import Pagination from 'vue-pagination-2';
import axios from 'axios';

export default {
    components: {
        Pagination,
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
                return item.date.includes(this.search);
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

            this.items = response.data.map(item => item.userCheck)

            console.log(response.data)
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
    },
};
</script>
  