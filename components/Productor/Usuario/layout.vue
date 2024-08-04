<template>
  <div v-if="$route.path.includes('usuario')"
      :class="useUser.dataUser.verificado ? 'mt-[65px]' : ''" 
      class="rounded-b-3xl px-20 bg-gray-100 h-usuario "
    >
    <h1 class="text-dark text-2xl pt-8 font-bold " >Configuración de la cuenta</h1>
    <div class="w-full flex gap-8 py-8 justify-between ">

      <div class=" ml-8 h-full flex flex-col items-center gap-8 overflow-hidden ">
        <UVerticalNavigation class="[&_ul]:h-full  [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2" :ui="{
            wrapper: 'h-full',
            base: 'text-center transition-all duration-700 ease-in-out border-l-2 ',
            padding:'py-4',
            inactive: 'border-white border-opacity-0 hover:border-secundary',
            rounded: 'rounded-none',
            active:'border-opacity-100 border-l-2 border-primary before:bg-gray-100 ',
            size: 'text-base'
          }" :links="links" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const useUser = useUserStore()

const route = useRoute()

const links = [
  [{
    label: 'Informacion Basica',
    to: '/dashboard/productor/usuario'
  }, {
    label: 'Informacion Comercial',
    // icon: 'i-heroicons-home',
    to: '/dashboard/productor/usuario/informacionComercial'
  }, {
    label: 'Notificaciones',
    // icon: 'i-heroicons-chart-bar',
    to: `/dashboard/productor/usuario/notificaciones`
  }, {
    label: 'Elimanar Cuenta',
    // icon: 'i-heroicons-command-line',
    to: '/dashboard/productor/usuario/eliminarCuenta'
  }],/*  [{
    label: 'Examples',
    icon: 'i-heroicons-light-bulb'
  }, {
    label: 'Help',
    icon: 'i-heroicons-question-mark-circle'
  }] */
]

</script>

<style scope>
.h-usuario{
  height: calc(100vh - 165px);
}
</style>