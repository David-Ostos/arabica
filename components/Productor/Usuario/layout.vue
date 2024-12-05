<template>
  <div v-if="$route.path.includes('usuario') && !isScreenSmall"
  :class="useUser.dataUser.verificado ? 'mt-[65px]' : ''" 
  class="rounded-b-3xl ml-16 mb-1 bg-gray-100  "
  :style="containerStyles"
  >
  
  <ModalsNotificacion v-if="useModals.openModalNotificacion" @close="closeModal" titulo="Registro del usuario incompleto" 
      :contenido-one="useModals.textoModalNotidicaciones" 
      contenido-two="" icon="info"  
      texto-boton="Terminar el registro"
      :to="`/dashboard/${useUser.dataUser.tipoUser}`"
    />

    <h1 class="text-dar text-2xl pt-8 font-medium " >Configuración de la cuenta</h1>
    <div class="w-full  flex gap-8 my-8 justify-between ">

      <div class="flex flex-col justify-between ">
        <ul v-for="conjunto in links" class="" >
          <li v-for="item in conjunto" class=" p-4 transition-all duration-500 ease-in-out">
            <NuxtLink 
              :to="item.to" 
              activeClass="border-l-2 !border-slate-700 text-slate-700 font-semibold"
              :class="[ 'p-4 text-slate-500 border-l-2 border-transparent hover:border-primary-600 transition-all duration-500 ease-in-out text-sm', { 'cursor-not-allowed hover:cursor-not-allowed  opacity-50 ': item.disabled } ]" 
              @click="item.click"
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
const useModals = useShowModalsStore()

const useGlobal = useGlobalStore()
const route = useRoute()


const {isScreenSmall} = useGlobalComposable()


const containerStyles = computed(() => ({
  'min-height': `calc(100vh - ${useGlobal.heightNavProductor}px * 2 )`,
}))

const closeModal = (close: boolean)=>{
  useModals.openModalNotificacion = close
}

function onClickComercial (){
  if(!useUser.dataUser.perfilBase) {
    useModals.openModalNotificacion = true
    return true
  }
}

interface Link { 
  label: string;
  icon: string;
  to?: string;
  click?: () => any;
  disabled: boolean; 
}
const links: Link[][] = [
  [{
    label: 'Informacion Basica',
    icon:'',
    to: '/dashboard/productor/usuario',
    click: () =>{ return true},
    disabled: false
  }, {
    label: 'Informacion Comercial',
    icon:'',
    disabled: !useUser.dataUser.perfilBase,
    click: () => onClickComercial(),
    // icon: 'i-heroicons-home',
    to: '/dashboard/productor/usuario/informacionComercial'
  },/*  {
    label: 'Notificaciones',
    icon:'',
    // icon: 'i-heroicons-chart-bar',
    to: `/dashboard/productor/usuario/notificaciones`
  }, */ {
    label: 'Elimanar Cuenta',
    icon:'',
    // icon: 'i-heroicons-command-line',
    to: '/dashboard/productor/usuario/eliminarCuenta',
    click: () =>{ return true},
    disabled: false

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

const linkMobile: Link[][] = [
  [{
    label: 'Info Basica',
    icon:'',
    to: '/dashboard/productor/usuario',
    click: () =>{ return true},
    disabled: false
  }, {
    label: 'Info Comercial',
    icon:'',
    disabled: !useUser.dataUser.perfilBase,
    click: () => onClickComercial(),
    // icon: 'i-heroicons-home',
    to: '/dashboard/productor/usuario/informacionComercial'
  },/*  {
    label: 'Notificaciones',
    icon:'',
    // icon: 'i-heroicons-chart-bar',
    to: `/dashboard/productor/usuario/notificaciones`
  }, */ {
    label: 'Elimanar Cuenta',
    icon:'',
    // icon: 'i-heroicons-command-line',
    to: '/dashboard/productor/usuario/eliminarCuenta',
    click: () =>{ return true},
    disabled: false

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

const isActiveRoute = (path: string) => {
  return route.path === path
}

</script>

<style scope>

</style>