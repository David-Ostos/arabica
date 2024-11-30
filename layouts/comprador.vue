<template>
  <div>
    <NavbarComprador class="mt-[4.2rem]"/>
      <div :class="$route.path.includes('usuario') ? 'grid grid-cols-8 bg-gray-100 h-full ' : ''">
        <CompradorUsuarioLayout class=" h-full col-span-2"/>
        <div :style=" containerStyles"  class="col-span-6">

          <slot  />
        </div>
      </div>
      <ProductorFooter />
  </div>
</template>

<script lang="ts" setup>
import NavbarComprador from '~/components/NavBar/Navbar.Comprador.vue';

const useGlobal = useGlobalStore()
const route = useRoute()
const {isScreenSmall} = useGlobalComposable()

const containerStyles = computed(() => {
  const baseMargin = `${useGlobal.heightNavComprador}px`
  const isLotePage = route.name === 'lote' || route.path.includes('/lote')
  const isPerfilPage = route.fullPath === '/dashboard/comprador/perfil'

  
  if(isPerfilPage){
    return {marginTop: 0}
  }
  /* if(isLotePage){
    return {marginTop: baseMargin}
  } */else{
    return {
      marginTop:  `calc(${baseMargin} + 24px)`
    }
  }

})

</script>

<style>

</style>