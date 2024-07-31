<script setup lang="ts">
const useUser = useUserStore();

const picture = ref()
const pictureTrue = ref(false)
const loadingImg = ref(true)

onMounted(()=>{
  if(useUser.dataUser.picture){
    picture.value = useUser.dataUser.picture
    pictureTrue.value = true
  }else{
    picture.value = '/img/avatar.png'
    pictureTrue.value = false
  }
})

const items = [
  [
    {
      label: "ben@example.com",
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: "Panel de control",
      name: "dashboard",
      icon: "i-material-symbols-team-dashboard-outline",
      link: `/dashboard/${useUser.dataUser.tipoUser}`,
      badge: {value : false, number: 1}
    },
    {
      label: "Solicitudes",
      name: "solicitudes",
      link: `/dashboard/${useUser.dataUser.tipoUser}/solicitudes`,
      icon: "i-heroicons-book-open",
      badge: {value : true, number: 3}
    },
    {
      label: "Planificadores",
      name: "planificadores",
      icon: "i-heroicons-presentation-chart-line",
      link: `/dashboard/${useUser.dataUser.tipoUser}/planificadores`,
      badge: {value : true, number: 1}
    },
    {
      label: "Muestras",
      name: "muestras",
      icon: "i-hugeicons-coffee-beans",
      link: `/dashboard/${useUser.dataUser.tipoUser}/muestras`,
      badge: {value : false, number: 1}
    },
    {
      label: "Pedidos",
      name: "pedidos",
      icon: "i-heroicons-truck",
      link: `/dashboard/${useUser.dataUser.tipoUser}/pedidos`,
      badge: {value : true, number: 10}
    },
    {
      label: "Facturas",
      name: "facturas",
      icon: "i-heroicons-clipboard-document-list",
      link: `/dashboard/${useUser.dataUser.tipoUser}/facturas`,
      badge: {value : true, number: 25}
    },
  ],
  [
    {
      label: "Cuenta",
      name: "perfil",
      icon: "i-heroicons-identification",
      link: `/dashboard/${useUser.dataUser.tipoUser}/perfil`,
      badge: {value : false, number: 1}
    },
    {
      label: "Ayuda",
      name: "ayuda",
      icon: "i-heroicons-question-mark-circle",
      link: `/ayuda`,
      badge: {value : false, number: 1}
    },
    {
      label: "Arabica.com",
      name: "/",
      icon: "i-heroicons-globe-alt",
      link: `/`,
      badge: {value : false, number: 1}
    },
    {
      label: "Cerrar sesión",
      name: "logout",
      icon: "i-heroicons-arrow-left-on-rectangle",
      action: useUser.logout,
      badge: {value : false, number: 0}
    },
  ],
];
</script>

<template>
  <UDropdown
    :items="items"
    :ui="{item: {disabled: 'cursor-text select-text'}}"
    :popper="{offsetDistance: 5, placement: 'bottom-start'}"
  >
    <div class="flex items-center">
      <USkeleton v-if="loadingImg" class="w-full h-full" :ui="{
								background: 'bg-secundary'
							}" />
      <div class=" rounded-full">
        <img class="h-8 w-8" 
        :src="picture" @load="loadingImg = true" alt="">
      </div>
      <UIcon
        name="i-material-symbols-arrow-drop-down-rounded"
        class="!text-3xl"
        dynamic
      />
    </div>
    <template #account="{item}" class="[&_button]:!opacity-100">
      <div class="text-left !text-dark">
         <p class="flex items-center gap-1"> <UIcon name="i-heroicons-user-circle"/> {{ capitalizeFirstLetter(useUser.dataUser.nombre!) }}</p>
        <p class="truncate  font-medium text-gray-900 dark:text-white flex items-center gap-1">
          <UIcon name="i-heroicons-envelope"/> {{ useUser.dataUser.email }}
        </p>
      </div>
    </template>

    <template #item="{item}">
      <NuxtLink :to="item.link" @click="item.action">
        <div class="flex items-center">
          <UIcon
            :name="item.icon"
            class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto mr-4"
            dynamic
          />
          <span class="truncate">{{ item.label }}</span>
          <UChip v-if="item.badge.value" class="absolute right-4">
            <span class=" text-[9px] border rounded-lg px-2">{{ item.badge.number }}</span>
            </UChip>
          
        </div>
      </NuxtLink>
    </template>
  </UDropdown>
</template>
