<script lang="ts" setup>
import BotonPrimary from '../Botones/BotonPrimary.vue';

const show = ref(false)

</script>

<template>
  <div 
    class="relative -mt-[88px] bg-[url('/img/hero.webp')] bg-cover bg-top scale-x-[-1] z-0 h-screen w-full flex justify-center items-center"
    :class="show ? 'h-[125vh]': 'h-screen'"
    >
    <div class="text-center max-w-[1100px] mx-8 sm:mx-0 px-4 scale-x-[-1]" >
          <h1 class="pt-[88px] md:pt-0 text-4xl font-bold tracking-tight text-white sm:text-5xl">Compre cafés de temporada y haga el pedido en línea</h1>
          <p 
            class="my-6 text-xl leading-8 line-clamp-6 text-white"
            :class="!show ? 'line-clamp-6' : 'line-clamp-none'"
            @click="show = !show"
          >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur alias molestias vero iure molestiae laborum, vitae distinctio nisi harum numquam sunt non provident temporibus cupiditate at magnam a placeat dicta!
          Quia molestias iusto accusantium debitis nostrum, repudiandae, rem aut, officiis voluptas culpa ducimus incidunt qui nam aspernatur? Aliquid eaque nulla iure natus veniam atque repellat, quae ab! Id, labore repellendus?.</p>
          <BotonPrimary link="/auth/registro" contenido="Unete hoy mismo"/>
        </div>
  </div>
</template>

<style scoped></style>
