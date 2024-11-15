<script lang="ts" setup>
import NavbarProductor from '~/components/NavBar/Navbar.Productor.vue';

const useGlobal = useGlobalStore()

const containerStyles = computed(() => ({
  marginTop: `calc(${useGlobal.heightNavProductor}px)`,
}))

onMounted(()=>{
  console.log(useGlobal.heightNavProductor)
})
</script>

<template>
    <div>
      <NavbarProductor />
      <ProductorPerfilLayout/>
      <div :style="containerStyles" :class="$route.path.includes('usuario') ? `grid grid-cols-8 bg-gray-100  ` : ''">
        <ProductorUsuarioLayout class=" h-full col-span-2"/>
        <div class="col-span-6">

          <slot  />
        </div>
      </div>
      <ProductorFooter class="fixed bg-white bottom-0 w-full" />
    </div>
</template>

<style scoped>
</style>
