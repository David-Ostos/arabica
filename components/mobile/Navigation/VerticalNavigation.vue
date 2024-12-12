<template>
  <div v-if="!useUser.logged" class="bg-white flex flex-col justify-between ">
    <div>
      <div v-for="container, index in linksMobile " :key="index" class="mb-2 border-b pb-2  ">

        <div v-for="item, index in container" :key="index">
          <NuxtLink :to="item.to" @click="clickLink(item)">
            <div
              :class="['flex justify-between rounded-xl  p-1', item.to === $route.fullPath ? 'text-primary bg-gray-100' : 'text-gray-500']">
              <div class="flex items-center gap-2">
                <UAvatar v-if="item.avatar" v-bind="item.avatar" size="2xs" loading="lazy" />
                <UIcon v-if="item.icon" :name="item.icon" class="w-5 h-5" dynamic/>
                <p :class="['truncate capitalize  text-sm']">{{ item.label }}</p>
              </div>
              <UBadge v-if="item.badge" color="white" variant="solid">{{ item.badge }}</UBadge>
            </div>
          </NuxtLink>
        </div>

      </div>
    </div>

    <div class="mt-8 flex flex-col w-full items-center gap-4 ">
      <UButton block @click="closeSlider" to="/auth/login">
        Inicia Seción
      </UButton>
      <UDivider label="O" />
      <UButton @click="closeSlider"  color="stone" variant="outline" block to="/auth/register">
        Registrate
      </UButton>
    </div>

  </div>

  <div v-if="useUser.logged && useUser.dataUser.tipoUser === 'productor'" class="bg-white flex flex-col justify-between ">
    <div>
      <div v-for="container, index in linksMobileProductor " :key="index" class="mb-4 border-b last:border-none pb-4  ">

        <div v-for="item, index in container" :key="index">
          
          <NuxtLink :to="item.to" @click="clickLink(item);">
            <div
              :class="['flex justify-between rounded-xl  p-1', item.to === $route.fullPath ? 'text-primary bg-gray-100' : 'text-gray-500']">
              <div class="flex items-center gap-4">
                <UAvatar v-if="item.avatar" v-bind="item.avatar" size="2xs" loading="lazy" />
                <UIcon v-if="item.icon" :name="item.icon" class="w-5 h-5" dynamic />
                <p :class="['truncate capitalize  text-sm']">{{ item.label }}</p>
                <UIcon v-if="item.slot" name="i-ic-baseline-keyboard-arrow-down" dynamic :class="item.slot?.isOpen ? 'rotate-180' : ''" />
              </div>
              <UBadge v-if="item.badge" color="white" variant="solid">{{ item.badge }}</UBadge>
            </div>
          </NuxtLink>

          <div v-if="item.slot && item.slot.isOpen">
            <div class=" mx-12 pt-2 border-t">
              <NuxtLink @click="closeSlider()" v-for="slot, index in item.slot.items" :key="index"  :to="slot.to">
              <div
                :class="['flex justify-between rounded-xl  p-1 px-2', slot.to === $route.fullPath ? 'text-primary bg-gray-100' : 'text-gray-500']">
                <div class="flex items-center gap-4">
                  <UIcon v-if="slot.icon" :name="slot.icon" class="w-5 h-5" dynamic />
                  <p :class="['truncate capitalize  text-sm']">{{ slot.label }}</p>
                </div>
              </div>
            </NuxtLink>
            </div>
          </div>

        </div>

        

      </div>

      <BotonesBotonSecondary v-if="!useUser.dataUser.perfilBase" 
      class="text-end"
      contenido="Completar Registro" 
      :link="`/dashboard/${useUser.dataUser.tipoUser}`" 
      @click="useModal.showModalProductorPerfilCompleto = true" />

    </div>
  </div>

  <div v-if="useUser.logged && useUser.dataUser.tipoUser === 'comprador'" class="bg-white flex flex-col justify-between ">
    <div>
      <div v-for="container, index in linksMobileComprador " :key="index" class="mb-4 border-b last:border-none pb-4  ">

        <div v-for="item, index in container" :key="index">
          
          <NuxtLink :to="item.to" @click="clickLink(item);">
            <div
              :class="['flex justify-between rounded-xl  p-1', item.to === $route.fullPath ? 'text-primary bg-gray-100' : 'text-gray-500']">
              <div class="flex items-center gap-4">
                <UAvatar v-if="item.avatar" v-bind="item.avatar" size="2xs" loading="lazy" />
                <UIcon v-if="item.icon" :name="item.icon" class="w-5 h-5" dynamic />
                <p :class="['truncate capitalize  text-sm']">{{ item.label }}</p>
                <UIcon v-if="item.slot" name="i-ic-baseline-keyboard-arrow-down" dynamic :class="item.slot?.isOpen ? 'rotate-180' : ''" />
              </div>
              <UBadge v-if="item.badge" color="white" variant="solid">{{ item.badge }}</UBadge>
            </div>
          </NuxtLink>

          <div v-if="item.slot && item.slot.isOpen">
            <div class=" mx-12 pt-2 border-t">
              <NuxtLink @click="closeSlider()" v-for="slot, index in item.slot.items" :key="index"  :to="slot.to">
              <div
                :class="['flex justify-between rounded-xl  p-1 px-2', slot.to === $route.fullPath ? 'text-primary bg-gray-100' : 'text-gray-500']">
                <div class="flex items-center gap-4">
                  <UIcon v-if="slot.icon" :name="slot.icon" class="w-5 h-5" dynamic />
                  <p :class="['truncate capitalize  text-sm']">{{ slot.label }}</p>
                </div>
              </div>
            </NuxtLink>
            </div>
          </div>

        </div>

      </div>

      <BotonesBotonSecondary v-if="!useUser.dataUser.perfilBase" 
      class="text-end"
      contenido="Completar Registro" 
      :link="`/dashboard/${useUser.dataUser.tipoUser}`" 
      @click="useModal.showModalCompradorPerfilCompleto = true" />


    </div>
  </div>

</template>

<script lang="ts" setup>

const useUser = useUserStore()
const useModal = useShowModalsStore()
const emit = defineEmits(['close'])

const closeSlider = () =>{
  emit('close', false)
}

interface LinksMobile {
  label: string,
  avatar?: {
    src: string
  },
  badge?: number,
  icon?: string,
  to?: string,
  action?: (isOpen?: boolean)=> void | boolean,
  slot?: {
    label: 'Ajustes de cuenta',
    isOpen: boolean,
    items: {
      label: string,
      to: string,
      icon?:string
    }[]
  }
}
const linksMobile: LinksMobile[][] = [
  [{
    label: 'Inicio',
    icon: 'i-heroicons-home',
    to: '/'
  }, {
    label: 'Sobre nosotros',
    icon: 'i-heroicons-heart',
    to: "/about"
  }, {
    label: "Lotes de café",
    to: "/lotes",
    icon: 'i-heroicons-chart-bar',
  }],
  [{
    label: "Preguntas Frecuentes",
    icon: "i-heroicons-question-mark-circle",
    to: "ayuda/faq",
  },
  {
    label: "blog",
    icon: "i-heroicons-newspaper",
    to: "/blog",
  },]
]

const linksMobileProductor: LinksMobile[][]= reactive([
  [
    {
      label: "Panel de control",
      icon: "i-tabler-layout-dashboard",
      to: `/dashboard/productor`,
    },
    {
      label: "Lotes de Café",
      icon: "i-heroicons-archive-box",
      to: `/dashboard/productor/lotes`,
    },
  ],
  [
    {
      label: "Perfil",
      icon: "i-tabler-user-circle",
      to: `/dashboard/productor/perfil`,
    },
    {
      label: "Ajustes de Cuenta",
      icon: "i-tabler-settings",
      to: ``,
      action: () =>{
        return 
      } ,
      slot: {
        label:'Ajustes de cuenta',
        isOpen: true,
        items:[
        {
            label:'Información Basica',
            to:'/dashboard/productor/usuario',
          },{
            label:'Información Comercial',
            to:'/dashboard/productor/usuario/informacionComercial',
          },{
            label:'Eliminar Cuenta',
            to:'/dashboard/productor/usuario/eliminarCuenta',
          },
        ]
      }
    },
  ],
    
    [
    {
      label: "Ayuda",
      icon: "i-tabler-help",
      to: `/ayuda`,
    },
  {
      label: "Arabica.com",
      icon: "i-tabler-world",
      to: `/`,
    },
    {
      label: "Cerrar sessión",
      icon: "i-heroicons-arrow-left-on-rectangle",
      action: useUser.logout,
    }
  ]
]);

const linksMobileComprador: LinksMobile[][]= reactive([
  [
    {
      label: "Panel de control",
      icon: "i-tabler-layout-dashboard",
      to: `/dashboard/comprador`,
    },
    {
      label: "Lotes de Café",
      icon: "i-heroicons-archive-box",
      to: `/lotes`,
    },{

    label: "Lotes Favoritos",
      icon: "i-material-symbols-favorite-outline",
      to: `/dashboard/comprador/favoritos`,
  }],
  [
    /* {
      label: "Perfil",
      icon: "i-tabler-user-circle",
      to: `/dashboard/comprador/perfil`,
    }, */
    {
      label: "Ajustes de Cuenta",
      icon: "i-tabler-settings",
      to: ``,
      action: () =>{
        return 
      } ,
      slot: {
        label:'Ajustes de cuenta',
        isOpen: true,
        items:[
        {
            label:'Información Basica',
            to:'/dashboard/comprador/usuario',
          },{
            label:'Información Comercial',
            to:'/dashboard/comprador/usuario/informacionComercial',
          },{
            label:'Eliminar Cuenta',
            to:'/dashboard/comprador/usuario/eliminarCuenta',
          },
        ]
      }
    },
  ],
    
    [
    {
      label: "Ayuda",
      icon: "i-tabler-help",
      to: `/ayuda`,
    },
  {
      label: "Arabica.com",
      icon: "i-tabler-world",
      to: `/`,
    },
    {
      label: "Cerrar sessión",
      icon: "i-heroicons-arrow-left-on-rectangle",
      action: useUser.logout,
    }
  ]
]);

const clickLink = (item: LinksMobile) =>{
  if(item.action){
    item.action()
  }

  if(item.slot){
    item.slot.isOpen = !item.slot.isOpen
    return 
  }
  
  closeSlider();
}


</script>

<style></style>