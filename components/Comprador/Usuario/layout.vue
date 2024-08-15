<template>
  <div v-if="$route.path.includes('usuario')"
      :class="useUser.dataUser.verificado ? 'mt-[65px]' : ''" 
      class="rounded-b-3xl ml-16 mb-1 bg-gray-100 h-usuario "
    >
    <h1 class="text-dark text-2xl pt-8 font-medium " >Configuración de la cuenta</h1>
    <div class="w-full  flex gap-8 my-8 justify-between ">

      <div class="flex flex-col justify-between ">
        <ul v-for="conjunto in links" class="" >
          <li v-for="item in conjunto" class=" p-4 transition-all duration-500 ease-in-out">
            <NuxtLink 
              :to="item.to" 
              activeClass="border-l-2 !border-slate-700 text-slate-700 font-semibold"
              class="p-4 text-slate-500 border-l-2 border-transparent hover:border-primary-600 transition-all duration-500 ease-in-out text-sm"
              >
              {{ item.label }}
            </NuxtLink>
            <UIcon :name="item.icon" class="text-slate-700 " />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const useUser = useUserStore()


const links = [
  [{
    label: 'Informacion Basica',
    icon:'',
    to: '/dashboard/comprador/usuario'
  }, {
    label: 'Informacion Comercial',
    icon:'',
    // icon: 'i-heroicons-home',
    to: '/dashboard/comprador/usuario/informacionComercial'
  },/*  {
    label: 'Notificaciones',
    icon:'',
    // icon: 'i-heroicons-chart-bar',
    to: `/dashboard/comprador/usuario/notificaciones`
  }, */ {
    label: 'Elimanar Cuenta',
    icon:'',
    // icon: 'i-heroicons-command-line',
    to: '/dashboard/comprador/usuario/eliminarCuenta'
  }]/* , [{
    label: 'Examples',
    icon: 'i-heroicons-light-bulb',
    to: ''
  }, {
    label: 'Help',
    icon: 'i-heroicons-question-mark-circle',
    to: ''
  }] */
]

</script>

<style scope>
.h-usuario{
  height: calc(100vh - 165px);
}
</style>