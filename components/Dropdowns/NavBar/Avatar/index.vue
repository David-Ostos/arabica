<script setup lang="ts">
import Avatar from '~/components/global/avatar.vue';

const useUser = useUserStore();

const picture = ref()
const pictureTrue = ref(false)

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
  /* [
    {
      label: "ben@example.com",
      slot: "account",
      disabled: true,
    },
  ], */
  [
    {
      label: "Sobre Nosotros",
      name: "about",
      icon: "i-material-symbols-team-dashboard-outline",
      link: `/about`,
    },
    {
      label: "Como funciona",
      name: "guia",
      link: `/guia`,
      icon: "i-heroicons-book-open",
    },
    {
      label: "ayuda",
      name: "ayuda",
      icon: "i-heroicons-presentation-chart-line",
      link: `/ayuda`,
    },
    {
      label: "Iniciar sesión",
      name: "login",
      icon: "i-hugeicons-coffee-beans",
      link: `/auth/login`,
    }
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
      <Avatar :picture="picture"/>
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
