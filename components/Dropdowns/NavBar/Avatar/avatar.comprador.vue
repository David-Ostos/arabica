<script setup lang="ts">
const useUser = useUserStore();

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
      link: `/dashboard/comprador`,
      badge: {value : false, number: 1}
    },
    // {
    //   label: "Solicitudes",
    //   name: "solicitudes",
    //   link: `/dashboard/${useUser.dataUser.tipoUser}/solicitudes`,
    //   icon: "i-heroicons-book-open",
    //   badge: {value : true, number: 3}
    // }, 
    // {
    //   label: "Planificadores",
    //   name: "planificadores",
    //   icon: "i-heroicons-presentation-chart-line",
    //   link: `/dashboard/${useUser.dataUser.tipoUser}/planificadores`,
    //   badge: {value : true, number: 1}
    // } ,
    // {
    //   label: "Muestras",
    //   name: "muestras",
    //   icon: "i-hugeicons-coffee-beans",
    //   link: `/dashboard/comprador/muestras`,
    //   disabled: ,
    //   badge: {value : false, number: 1}
    // },
    // {
    //   label: "Pedidos",
    //   name: "pedidos",
    //   icon: "i-heroicons-truck",
    //   link: `/dashboard/comprador/pedidos`,
    //   badge: {value : true, number: 10}
    // },
    //  {
    //   label: "Facturas",
    //   name: "facturas",
    //   icon: "i-heroicons-clipboard-document-list",
    //   link: `/dashboard/${useUser.dataUser.tipoUser}/facturas`,
    //   badge: {value : true, number: 25}
    // }
  ],
  [
    // {
    //   label: "Perfil",
    //   icon: "i-tabler-user-circle",
    //   to: `/dashboard/comprador/perfil`,
    // },
    {
      label: "Ajustes de Cuenta",
      icon: "i-tabler-settings",
      to: `/dashboard/comprador/usuario`,
    },
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
    },
  ],
];
</script>


<template>
  <UDropdown
    :items="items"
    :ui="{
      item: {
        disabled: 'cursor-text select-text',
      },
      width: 'w-56',
    }"
    :popper="{placement: 'bottom-start'}"
  >
    <div class="flex items-center">
      <Avatar />
      <UIcon
        name="i-material-symbols-arrow-drop-down-rounded"
        class="!text-3xl"
        dynamic
      />
    </div>
    <template #account="{item}">
      <div class="text-left">
        <p>Sesión iniciada con</p>
        <p class="truncate font-medium text-gray-900 dark:-text-dar">
          {{ useUser.dataUser.email }}
        </p>
      </div>
    </template>

    <template #item="{item}">
      <NuxtLink
        :to="item.link"
        class="flex gap-4 items-center w-full"
        @click="item.action"
      >
        <UIcon
          dynamic
          :name="item.icon"
          class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500"
        />
        <span class="truncate">{{ item.label }}</span>
      </NuxtLink>
    </template>
    <template #envio="{item}">
      <NuxtLink
        :to="item.link"
        class="flex gap-4 w-full items-center text-primary-600"
        @click="item.action"
      >
        <UIcon dynamic :name="item.icon" class="flex-shrink-0 h-4 w-4" />
        <span class="truncate font-bold">{{ item.label }}</span>
        <UIcon :name="item.icon_2" class="ml-8 flex-shrink-0 h-4 w-4" dynamic />
      </NuxtLink>
    </template>
  </UDropdown>
</template>
