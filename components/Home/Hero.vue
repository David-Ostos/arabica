<script lang="ts" setup>
import BotonPrimary from '../Botones/BotonPrimary.vue';
</script>

<template>
  <div class="bg-[url('/img/hero.jpg')] bg-cover h-[120vh] w-full flex justify-center items-center ">
    <div class="text-center max-w-[1100px] backdrop-blur-sm px-4">
          <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl">Compre cafés de temporada y haga el pedido en línea</h1>
          <p class="my-6 text-xl leading-8 text-white">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur alias molestias vero iure molestiae laborum, vitae distinctio nisi harum numquam sunt non provident temporibus cupiditate at magnam a placeat dicta!
          Quia molestias iusto accusantium debitis nostrum, repudiandae, rem aut, officiis voluptas culpa ducimus incidunt qui nam aspernatur? Aliquid eaque nulla iure natus veniam atque repellat, quae ab! Id, labore repellendus?.</p>
          <BotonPrimary link="/auth/registro" contenido="Unete hoy mismo"/>
        </div>
  </div>
</template>

<style scoped></style>
