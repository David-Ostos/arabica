<script lang="ts" setup>

definePageMeta({
  middleware: "comprador",
  layout: "comprador",
});

const useUser = useUserStore();

const disponible = 0

const mensajes = [
{
    icon: 'i-ph-farm-fill',
    title: 'existencias disponibles',
    text:'Una vez que los cafés almacenados en su almacén de Arabica estén disponibles, se mostrarán aquí.'
  },{
    icon: 'i-tabler-message-chatbot-filled',
    title: 'comentarios pendientes',
    text:'Una vez que haya catado sus muestras, podrá dar su opinión al vendedor aquí'
  },
]

</script>

<template>
  <div class="min-h-screen mx-20 mt-10">
    <h1>Panel de control</h1>

    <div v-for="mensaje ,index in mensajes" :key="index" >
      <div>
        <div>
          <UIcon :name="mensaje.icon" dynamic/>
          <h3>{{ disponible }} {{ mensaje.title }}</h3>
          <p>{{ mensaje.text }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped></style>
