<script setup lang="ts">
import Avatar from '~/components/global/avatar.vue';


const useUser = useUserStore();

const picture = ref();
onMounted(() => {
  if (useUser.dataUser.picture) {
    picture.value = useUser.dataUser.picture;
  } else {
    picture.value = "/img/avatar.png";
  }
});


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
    }, */
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
  [
    {
      label: "Servicio de envio",
      icon: "i-tabler-ship",
      icon_2: "i-tabler-arrow-badge-right",
      to: `/servicio_envio`,
      slot: "envio",
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
      to: `/dashboard/productor/usuario`,
    },
    {
      label: "Ayuda",
      icon: "i-tabler-help",
      to: `/ayuda`,
    },
    {
      label: "Arabica.com",
      icon: "i-tabler-world",
      to: `/ayuda`,
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
      <Avatar :picture="picture"/>
      <UIcon
        name="i-material-symbols-arrow-drop-down-rounded"
        class="!text-3xl"
        dynamic
      />
    </div>
    <template #account="{item}">
      <div class="text-left">
        <p>Sessión iniciada con</p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
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
