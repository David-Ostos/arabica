<template>
  <header
    ref="nav1"
    class="fixed w-screen top-0 z-50 transition-all text-dark bg-white dark:bg-dark border-b-2 rounded-lg shadow-sm"
  >
    <div class="container pt-1 sm:px-12 px-8 mx-auto">
      <div class="flex justify-between sm:justify-between items-center">
        <div class="flex">
          <NuxtLink to="/" class="-m-1.5 p-1.5">
            <span class="sr-only">Arabica</span>
            <img
              class="h-14"
              :src="imgLoginLitgh"
              :class="{ hidden: mobileMenuOpen === true }"
              alt="Logo Arabica"
            />
          </NuxtLink>
        </div>

        <SearchComprador class="hidden sm:block" />

        <DropdownsNavBarAvatarComprador />
      </div>

      <SearchComprador class="sm:hidden mt-4" />
    </div>
  </header>
  <div class=""></div>
  <UHorizontalNavigation
    :links="items"
    class="hidden sm:flex mt-[60px] !justify-center border-b border-gray-200 dark:border-gray-800"
    :ui="{}"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";

import { useGlobalStore } from "~/stores/global";
import imgLoginLitgh from "~/public/img/logo_ligth_new.png";

const useGlobal = useGlobalStore();
const useUser = useUserStore();

const nav1 = ref();

const items = [
  {
    label: "Panel de control",
    // icon: "i-heroicons-cog-8-tooth",
    to: `/dashboard/comprador`,
  },
  {
    label: "Lotes de cafe",
    to: "/lotes",
  },
  {
    label: "Lotes favoritos",
    to: "/dashboard/comprador/favoritos",
  },

  /* 
  {
    label: "Solicitudes",
    to: `/dashboard/comprador/solicitudes`,
    // icon: "i-heroicons-book-open",
  },
  {
    label: "Planificadores",
    // icon: "i-heroicons-megaphone",
    to: `/dashboard/comprador/planificadores`,
  }, */
  {
    label: "Muestras",
    // icon: "i-heroicons-signal",
    to: `/dashboard/comprador/muestras`,
  },
  {
    label: "Pedidos",
    // icon: "i-heroicons-arrow-left-on-rectangle",
    to: `/dashboard/comprador/pedidos`,
  } /* ,
  {
    label: "Facturas",
    // icon: "i-heroicons-arrow-left-on-rectangle",
    to: `/dashboard/comprador/facturas`,
  } */,
];

const mobileMenuOpen = ref(false);
</script>
