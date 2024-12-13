<script lang="ts" setup>
import NavbarProductor from '~/components/NavBar/Navbar.Productor.vue';

const {isScreenSmall} = useGlobalComposable()

const useGlobal = useGlobalStore()
const route = useRoute()

const containerStyles = computed(() => {
  const baseMargin = `${useGlobal.heightNavProductor}px`
  const isLotePage = route.name === 'lote' || route.path.includes('/lote')
  const isPerfilPage = route.fullPath === '/dashboard/productor/perfil'

  if(isPerfilPage){
    return {marginTop: 0}
  }
  if(isLotePage){
    return {marginTop: baseMargin}
  }else{
    return {
      marginTop:  `calc(${baseMargin} + 24px)`
    }
  }

})

</script>

<template>
    <div>
      <NavbarProductor />
      <ProductorPerfilLayout/>
      <div :style="containerStyles" class="2xl:container 2xl:mx-auto" :class="[,$route.path.includes('usuario') && !isScreenSmall ? `grid grid-cols-8 bg-gray-100  ` : '']">
        <ProductorUsuarioLayout class=" h-full md:col-span-2"/>
        <div class="col-span-6">
        <div  :class="[$route.path.includes('productor/lotes') ? 'hidden': '']">
          <ProductorPerfilIndexCompletarPerfil />
        </div>
          <slot  />
        </div>
      </div>
      <ProductorFooter class=" bg-white bottom-0 w-full" />
    </div>
</template>

<style scoped>
</style>
