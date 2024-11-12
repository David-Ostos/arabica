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
      <UButton block to="/auth/login">
        Inicia Seción
      </UButton>
      <UDivider label="O" />
      <UButton color="stone" variant="outline" block to="/auth/register">
        Registrate
      </UButton>
    </div>

  </div>

  <div v-if="useUser.logged && useUser.dataUser.tipoUser === 'productor'" class="bg-white flex flex-col justify-between ">
    <div>
      <div v-for="container, index in linksMobileProductor " :key="index" class="mb-4 border-b last:border-none pb-4  ">

        <div v-for="item, index in container" :key="index">
          <NuxtLink :to="item.to" @click="clickLink(item)">
            <div
              :class="['flex justify-between rounded-xl  p-1', item.to === $route.fullPath ? 'text-primary bg-gray-100' : 'text-gray-500']">
              <div class="flex items-center gap-4">
                <UAvatar v-if="item.avatar" v-bind="item.avatar" size="2xs" loading="lazy" />
                <UIcon v-if="item.icon" :name="item.icon" class="w-5 h-5" dynamic />
                <p :class="['truncate capitalize  text-sm']">{{ item.label }}</p>
              </div>
              <UBadge v-if="item.badge" color="white" variant="solid">{{ item.badge }}</UBadge>
            </div>
          </NuxtLink>
        </div>

      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>

const useUser = useUserStore()
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
  action?: ()=> void
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

const linksMobileProductor: LinksMobile[][]= [
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
    /* {
      label: "Productores",
      to: `/dashboard/productor/productores`,
      icon: "i-tabler-brand-redhat",
    },
    {
      label: "Inventario",
      icon: "i-heroicons-megaphone",
      to: `/dashboard/productor/inventario`,
    },
    {
      label: "Solicita",
      icon: "i-heroicons-signal",
      to: `/dashboard/productor/solicita`,
    },
    {
      label: "Pedidos de Muestra",
      icon: "i-tabler-coffee",
      to: `/dashboard/productor/pedidos_muestras`,
    },
    {
      label: "Ventas",
      icon: "i-tabler-brand-shopee",
      to: `/dashboard/productor/ventas`,
    },
    /* {
      label: "Clientes",
      icon: "i-tabler-heart-handshake",
      to: `/dashboard/productor/clientes`,
    }, */
  ],
  /* [
     {
      label: "Servicio de envio",
      icon: "i-tabler-ship",
      icon_2: "i-tabler-arrow-badge-right",
      to: `/servicio_envio`,
      slot: "envio",
    }, 
  ], */
  [
    {
      label: "Perfil",
      icon: "i-tabler-user-circle",
      to: `/dashboard/productor/perfil`,
    },
    {
      label: "Ajustes de Cuenta",
      icon: "i-tabler-settings",
      to: `/dashboard/productor/usuario`,
    },
    {
      label: "Ayuda",
      icon: "i-tabler-help",
      to: `/ayuda`,
    }
  ],[
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
];

const clickLink = (item: LinksMobile) =>{
  closeSlider();
  if(item.action){
    item.action()
  }
  
}


</script>

<style></style>