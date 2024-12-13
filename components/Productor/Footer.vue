<template>
  <footer ref="footer"  class=" hidden relative sm:flex items-center px-8 bg-white md:px-20 rounded-t-xl border-t z-50">
    <UHorizontalNavigation
      :links="links"
      :ui="{
        after: 'after:hidden'
      }"
    />

  </footer>
</template>

<script lang="ts" setup>

const useGlobal = useGlobalStore()
const footer = ref()

onMounted(()=>{
  useGlobal.heightFooterProductor = footer.value.clientHeight
  console.log(useGlobal.heightFooterProductor);
})

const dynamicStyles = computed(() => ({
  height : `${useGlobal.heightNavProductor}px`
}))

const links = [
  [{
    label: 'Panel de control',
    to: `/dashboard/productor`
  }, {
    label: 'Perfil',
    to: '/dashboard/productor/perfil'
  }, {
    label: 'Inicio',
    to: '/'
  }],[{
    label: 'Ayuda',
    to: '/ayuda',
    icon: 'i-heroicons-question-mark-circle'
  }]
]
</script>

<style>

</style>