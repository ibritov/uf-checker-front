<template>
    <div class="mt-4 bg-green-100 p-4 rounded">
      <h2 class="text-lg font-semibold mb-2">Resultado:</h2>
      <p>{{ convertedUf }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      convertedUf: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  