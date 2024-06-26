<template>
  <transition
    v-show="navShow === true"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
    enter-active-class="transition duration-300"
    leave-active-class="transition duration-300"
    :class="{
      'bg-transparent !text-white': !scrolled,
      ' !text-dark bg-white dark:bg-dark rounded-xl shadow-md': scrolled,
    }"
    class="fixed w-screen top-0 z-50 transition duration-300"
  >
    <header ref="nav1">
      <nav
        class="flex items-center justify-between pt-2 px-10 lg:px-16 rounded-xl"
        aria-label="Global"
      >
        <div class="flex lg:flex-1">
          <NuxtLink to="/" class="-m-1.5 p-1.5">
            <span class="sr-only">Arabica</span>
            <img
              class="h-14 w-auto"
              :src="!scrolled ? imgLogo : imgLogoLitgh"
              alt=""
            />
          </NuxtLink>
        </div>
        <div class="flex lg:hidden">
          <button
            type="button"
            class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 backdrop-blur-lg"
            @click="mobileMenuOpen = true"
            :class="{hidden: mobileMenuOpen, 'inline-flex': !mobileMenuOpen}"
          >
            <span class="sr-only">Abrir menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div class="hidden lg:flex lg:gap-x-9 items-center">
          <ul class="flex gap-4 items-center">
            <li v-for="(item, index) in links" :key="index">
              <ULink
                v-if="!item.popover"
                :to="item.to"
                active-class="text-primary"
                inactive-class="text-lg font-semibold leading-6 hover:text-primary dark:hover:text-primary"
              >
                {{ item.label }}
              </ULink>

              <Popover v-if="item.popover" class="relative">
                <PopoverButton
                  class="flex items-center text-lg font-semibold leading-6 dark:hover:text-primary hover:text-primary focus-visible:outline-none"
                >
                  {{ item.label }}
                  <ChevronDownIcon
                    class="h-5 w-5 flex-none text-gray-400"
                    aria-hidden="true"
                  />
                </PopoverButton>

                <transition
                  enter-active-class="transition ease-out duration-200"
                  enter-from-class="opacity-0 translate-y-1"
                  enter-to-class="opacity-100 translate-y-0"
                  leave-active-class="transition ease-in duration-150"
                  leave-from-class="opacity-100 translate-y-0"
                  leave-to-class="opacity-0 translate-y-1"
                >
                  <PopoverPanel
                    class="absolute -left-8 top-full mt-8 shadow-sm rounded-t-none w-80 overflow-hidden rounded-3xl bg-white dark:bg-dark ring-gray-900/5"
                    :class="scrolled ? ' ring-0' : ' ring-1 shadow-lg '"
                  >
                    <div class="p-4">
                      <div
                        v-for="subItem in item.subItem"
                        :key="subItem.label"
                        class="group relative flex items-center py-2 gap-x-6 rounded-lg px-1 leading-6 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <div
                          class="flex p-2 flex-none items-center justify-center rounded-lg group-hover:!text-primary bg-gray-50 group-hover:bg-white dark:group-hover:bg-dark dark:bg-dark dark:text-white"
                        >
                          <UIcon
                            :name="subItem.icon"
                            class="text-lg text-gray-600 dark:text-white group-hover:text-primary dark:hover:text-primary"
                            aria-hidden="true"
                            dynamic
                          />
                        </div>
                        <div class="flex-auto">
                          <NuxtLink
                            :to="subItem.to"
                            class="block font-semibold text-gray-900 dark:text-white dark:hover:bg-gray-800 group-hover:text-primary"
                          >
                            {{ subItem.label }}
                            <span class="absolute inset-0" />
                          </NuxtLink>
                          <!-- <p class="mt-1 dark:text-gray-400 text-gray-600">
                          {{ subItem.description }}
                        </p> -->
                        </div>
                      </div>
                    </div>
                  </PopoverPanel>
                </transition>
              </Popover>
            </li>
            <li>
              <BotonSecondary link="/auth/login" contenido="Iniciar Sesión" />
            </li>
            <li>
              <BotonPrimary link="/auth/registro" contenido="Registrar" />
            </li>
            <!-- <div v-if="useUser.logged">
          <Avatar />
        </div> -->
          </ul>
        </div>
      </nav>
    </header>
  </transition>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {Popover, PopoverButton, PopoverPanel} from "@headlessui/vue";
import {Bars3Icon} from "@heroicons/vue/24/outline";
import {ChevronDownIcon} from "@heroicons/vue/20/solid";
import BotonPrimary from "../Botones/BotonPrimary.vue";
import BotonSecondary from "../Botones/BotonSecondary.vue";

import imgLogo from "/img/Arabica-Green-coffee.png";
import imgLogoLitgh from "/img/logo_ligth_new.png";

const nav1 = ref();
const mobileMenuOpen = ref(false);

const scrolled = ref(false);
const navShow = ref(true);

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
const lastScrollTop: Ref<number> = ref(0);

function handleScroll() {
  scrolled.value = window.scrollY > 50;

  var st = window.scrollY || document.documentElement.scrollTop;
  if (st > lastScrollTop.value) {
    // El scroll se está moviendo hacia abajo

    navShow.value = false;

    console.log("Scroll hacia abajo");
  } else {
    // El scroll se está moviendo hacia arriba
    navShow.value = true;

    console.log("Scroll hacia arriba");
  }
  lastScrollTop.value = st;
}

const links = [
  {
    label: "Sobre nosotros",
    // avatar: {
    //   src: 'https://avatars.githubusercontent.com/u/739984?v=4'
    // }
    icon: "i-heroicons-heart",
    to: "/about",
    popover: false,
  },
  {
    label: "Como funciona",
    icon: "i-heroicons-hand-thumb-up",
    popover: true,
    subItem: [
      {
        label: "Modelo de Comercio Directo",
        icon: "i-heroicons-chart-pie",
        to: "/guia/modelo-comercio-directo",
      },
      {
        label: "Transparencia",
        icon: "i-heroicons-clipboard-document-check",
        to: "/guia/transparencia",
      },
      {
        label: "Vende sus Cafés",
        icon: "i-material-symbols-sell-outline-sharp",
        to: "/guia/vende-sus-cafes",
      },
      {
        label: "Compra de Café",
        icon: "i-heroicons-currency-dollar",
        to: "/guia/compra-de-cafe",
      },
      {
        label: "Logistica para Compradores",
        icon: "i-material-symbols-local-shipping-outline",
        to: "/guia/logistica-para-compradores",
      },
      {
        label: "Control de Calidad",
        icon: "i-heroicons-check-badge",
        to: "/guia/control-de-calidad",
      },
    ],
  },
  {
    label: "Ayuda",
    icon: "i-heroicons-question-mark-circle",
    // to: `${route.path.startsWith('/dev') ? '/dev' : ''}/components/vertical-navigation`
    popover: true,
    subItem: [
      {
        label: "Preguntas Frecuentes",
        icon: "i-heroicons-question-mark-circle",
        to: "ayuda/faq",
      },
      {
        label: "blog",
        icon: "i-heroicons-newspaper",
        to: "/blog",
      },
    ],
  },
];
</script>
