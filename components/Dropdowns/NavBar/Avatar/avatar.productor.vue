
 <script setup lang="ts">

const useUser = useUserStore()

const items = [
  [{
    label: 'ben@example.com',
    slot: 'account',
    disabled: true
  }], [{
    label: 'Ajustes',
    icon: 'i-heroicons-cog-8-tooth',
    link: `/dashboard/${useUser.dataUser.tipoUser}/perfil/ajustes`
  }], [{
    label: 'Documentation',
    icon: 'i-heroicons-book-open'
  }, {
    label: 'Changelog',
    icon: 'i-heroicons-megaphone'
  }, {
    label: 'Status',
    icon: 'i-heroicons-signal'
  }], [{
    label: 'Cerrar sessión',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    action: useUser.logout
  }]
]
</script>

<template>
  <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start' }">
    
    <div class="flex items-center ">
      <UAvatar 
        size="xl" 
        :src=" useUser.dataUser.picture !== null ? useUser.dataUser.picture : '/img/avatar.png'"
        >
      </UAvatar>
      <UIcon name="i-material-symbols-arrow-drop-down-rounded" class="!text-3xl" dynamic/>

    </div>
    <template #account="{ item }">
      <div class="text-left">
        <p>
          Sessión iniciada con
        </p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ useUser.dataUser.email }}
        </p>
      </div>
    </template>

    <template #item="{ item }">
      <NuxtLink :to="item.link" class="flex justify-around w-full"
        @click="item.action">
        <span class="truncate">{{ item.label }}</span>
        <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
      </NuxtLink>
    </template>
  </UDropdown>
</template>

