<template>
  <div ref="container" class="py-20">
    <div class=" flex-col-reverse md:flex-row flex mx-4 md:mx-40">
      <div class="basis-1/2">
        <span class="text-primary mb-4"> DETALLES DE ENVÍO </span>

        <h2 class="text-xl md:text-6xl font-bold md:leading-[1.2] my-4">
          Enviar solo o compartir el contenedor
        </h2>

        <p class="text-base leading-7 text-gray-600">
          Obtenga fechas de entrega flexibles enviando sus volúmenes más grandes
          en contenedores dedicados o elija una de las muchas consolidaciones
          disponibles para lotes más pequeños. Pida cualquier cosa de una bolsa
          y envíela junto con otros tostadores europeos compartiendo espacio en
          el contenedor. Nosotros nos encargamos de todo para que no tengas que
          preocuparte.
        </p>

        <BotonPrimary contenido="¡Cómpralo ahora!" link="/auth/registro" class=" text-center md:text-start mt-8"/>
      </div>
      <div class="relative mt-20">
        <img
          src="/img/detalles-home.png"
          width="570"
          height="380"
          fit="cover"
        />

        <div
          class="absolute top-0 right-0 rounded-full ring-1 ring-primary-900 ring-offset-[12px] bg-[#e5f5f0] text-white flex flex-col justify-center items-center w-40 h-40"
        >
          <span class="text-[#03764d] text-4xl font-bold">{{ count }}%</span>
          <p class="text-[#333333] text-lg font-semibold">Café fresco</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BotonPrimary from "../Botones/BotonPrimary.vue";

const container = ref();
const count = ref(0);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          conteo();
        }
      });
    },
    {
      threshold: 0, // Detectar al entrar completamente en pantalla
    }
  );

  observer.observe(container.value);
});

function conteo() {
  count.value = 0;
  let intervalId = setInterval(() => {
    if (count.value < 100) {
      count.value++;
    } else {
      clearInterval(intervalId);
    }
  }, 20);
}
</script>

<style></style>
