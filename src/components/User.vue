<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div class="bg-white dark:bg-gray-700 p-8 rounded shadow-md max-w-md w-full">
        <h1 class="text-2xl font-semibold mb-4">Calculadorta de UF {{ authToken }}</h1>
        
        <div class="flex space-x-4">
          <div>
            <label for="date" class="block text-sm font-medium text-gray-700">Ingresar fecha</label>
            <input type="date" id="date" name="date" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
          <div>
            <label for="uf" class="block text-sm font-medium text-gray-700">Ingresar cantidad de Uf</label>
            <input type="number" id="uf" name="uf" placeholder="Cantidad de Uf"
            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
        </div>
        <button class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Calcular</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  
  export default {
    async list() {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/user-check`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        console.log(response.data)
    }
  };
  </script>
  