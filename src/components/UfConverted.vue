<template>
    <div class="mt-4 bg-green-100 p-4 rounded">
        <h2 class="text-lg font-semibold mb-2">Resultado:</h2>
        <p>En la fecha seleccionada el valor de la UF es de <span class="font-bold">${{ ufValue }}</span></p>
        <p>y el total convertido es <span class="font-bold">${{ convertedUf }}</span></p>
    </div>
</template>
  
<script>
export default {
    props: {
        convertedUf: {
            type: String,
            required: true,
        },
        ufValue: {
            type: String,
            required: true,
        },
    },
};
</script>
  