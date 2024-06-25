<template>
  <header class="w-screen transition-all dark:bg-dark bg-white px-6 sm:p-0 border-b rounded-md shadow-sm">
    <nav
      class="flex items-center justify-between py-4 px-6 lg:px-16"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <NuxtLink to="/" class="-m-1.5 p-1.5">
          <span class="sr-only">Arabica</span>
          <img
            class="h-16 w-auto"
            src="/img/ARABICA_LOGO_LIGTH.png"
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
          <li v-for="item, index in links" :key="index">
            <ULink 
              :to="item.to"
              active-class="text-primary"
              inactive-class="text-lg font-semibold leading-6 text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary"
            >
              {{ item.label }}
            </ULink>
          </li>
          <li><BotonSecondary :contenido="ruta === 'login' ? 'Registrate' : 'Inicia Sesión'" :link="`/auth/${ruta}`" /></li>
        </ul>
      </div>


     <!--  <PopoverGroup class="hidden lg:flex lg:gap-x-9 items-center">
        <Popover class="relative">
          <PopoverButton
            class="flex items-center gap-x-1 text-lg font-semibold leading-6 text-gray-900 dark:text-white dark:hover:text-primary hover:text-primary focus-visible:outline-none"
          >
            Producto
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
              class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white dark:bg-dark shadow-lg ring-1 ring-gray-900/5"
            >
              <div class="p-4">
                <div
                  v-for="item in products"
                  :key="item.name"
                  class="group relative flex items-center gap-x-6 rounded-lg p-4 text-lg leading-6 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div
                    class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white dark:group-hover:bg-dark dark:bg-dark dark:text-white"
                  >
                    <component
                      :is="item.icon"
                      class="h-6 w-6 text-gray-600 dark:text-white group-hover:text-primary dark:hover:text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="flex-auto">
                    <NuxtLink
                      :to="item.href"
                      class="block font-semibold text-gray-900 dark:text-white dark:hover:bg-gray-800"
                    >
                      {{ item.name }}
                      <span class="absolute inset-0" />
                    </NuxtLink>
                    <p class="mt-1 dark:text-gray-400 text-gray-600">
                      {{ item.description }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 divide-x divide-gray-900/5">
                <NuxtLink
                  v-for="item in callsToAction"
                  :key="item.name"
                  :to="item.href"
                  class="group flex items-center justify-center gap-x-2.5 p-3 text-lg font-semibold leading-6 text-gray-900 dark:bg-dark dark:text-white dark:hover:bg-gray-800 hover:bg-gray-100"
                >
                  <component
                    :is="item.icon"
                    class="h-5 w-5 flex-none text-gray-400 dark:group-hover:text-primary dark:hover:text-primary"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </NuxtLink>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>

        <NuxtLink
          to="/about"
          class="text-lg font-semibold leading-6 text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary"
          >Sobre Nosotros</NuxtLink
        >
        <NuxtLink
          to="/guia"
          class="text-lg font-semibold leading-6 text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary"
          >Como Funciona</NuxtLink
        >
        <NuxtLink
          to="/ayuda"
          class="text-lg font-semibold leading-6 text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary"
          >Ayuda</NuxtLink
        >

        <!-- cambio de modo --
        <!-- <BotonesCambioModo/> -->

        <!-- login --
        <div
          v-if="!useUser.logged"
          class="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-x-9"
        >
          <BotonSecondary link="/auth/login" contenido="Iniciar Sesión" />
          <BotonPrimary link="/auth/registro" contenido="Registrar" />
        </div>
        <div v-if="useUser.logged">
          <Avatar />
        </div>
      </PopoverGroup> -->
    </nav>

    <div>
      <USlideover v-model="mobileMenuOpen">
        <UCard
          class="flex flex-col flex-1 "
          :ui="{
            body: {base: 'flex-1'},
            ring: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          }"
        >
          <template #header>
            <div class="flex items-center justify-between px-8">
              <NuxtLink to="/" class="">
                <span class="sr-only">Arabica</span>
                <img class="h-14 w-auto" src="/img/ARABICA_LOGO_LIGTH.png" alt="" />
              </NuxtLink>

              <UButton
                color="gray"
                variant="ghost"
                size="sm"
                icon="i-heroicons-x-mark-20-solid"
                class="-m-2.5 rounded-md p-2.5 text-dark dark:text-white"
                square
                padded
                @click="mobileMenuOpen = false"
              />
            </div>

            <Placeholder class="h-8" />
          </template>

          <UVerticalNavigation :ui="{
            size: 'text-xl',
            base: 'gap-4 ',
            padding: 'py-2',
            inactive: 'text-gray-600',
            icon: {inactive: 'text-gray-600'}
          }" :links="links" />

          <BotonSecondary 
            :contenido=" route.path.includes('registro') ? 'Inicia Sesión' : 'Registro'" 
            :link="route.path.includes('registro') ?'/auth/login':'/auth/registro'" 
            class="mt-4 mr-4 text-end" 
            @click="mobileMenuOpen = !mobileMenuOpen" 
          />

          <BotonPrimary 
            v-if="route.path.includes('forget')" 
            class="mt-4 mr-4 text-end" 
            contenido="Inicia Sesión" 
            @click="mobileMenuOpen = !mobileMenuOpen" 
            link="/auth/login"
           />
          <Placeholder class="h-full" />

          <template #body>


            <Placeholder class="h-8" />
          </template>
        </UCard>
      </USlideover>
    </div>

    <!-- <Dialog
      class="lg:hidden"
      @close="mobileMenuOpen = false"
      :open="mobileMenuOpen"
    >
      <div class="fixed inset-0 z-10" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto dark:bg-dark bg-white px-6 py-6 sm:max-w-sm sm:ring-1 dark:sm:text-white sm:ring-gray-900/10"
      >
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="-m-1.5">
            <span class="sr-only">Arabica</span>
            <img
              class="h-14 w-auto"
              src="img/logo_ligth.png"
              alt=""
            />
          </NuxtLink>

          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-dark dark:text-white"
            @click="mobileMenuOpen = false"
          >
            <span class="sr-only">Cerrar menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="my-10 flow-root border-t border-t-gray-500/10">
          <div class="-my-6 divide-y divide-gray-500/10 mt-2">
            <div class="space-y-2 py-6">
              <Disclosure as="div" class="-mx-3" v-slot="{open}">
                <DisclosureButton
                  class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 dark:text-white dark:hover:bg-gray-800 hover:bg-gray-50"
                >
                  Product
                  <ChevronDownIcon
                    :class="[open ? 'rotate-180' : '', 'h-5 w-5 flex-none']"
                    aria-hidden="true"
                  />
                </DisclosureButton>
                <DisclosurePanel class="mt-2 space-y-2">
                  <DisclosureButton
                    v-for="item in [...products, ...callsToAction]"
                    :key="item.name"
                    as="a"
                    :href="item.href"
                    class="block rounded-lg py-2 pl-6 pr-3 text-lg font-semibold leading-7 text-gray-900 dark:text-white dark:hover:bg-gray-800 hover:bg-gray-50"
                    >{{ item.name }}</DisclosureButton
                  >
                </DisclosurePanel>
              </Disclosure>
              <NuxtLink
                href="#"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white dark:hover:bg-gray-800 hover:bg-gray-50"
                >Features</NuxtLink
              >
              <NuxtLink
                href="#"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white dark:hover:bg-gray-800 hover:bg-gray-50"
                >Marketplace</NuxtLink
              >
              <NuxtLink
                href="#"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white dark:hover:bg-gray-800 hover:bg-gray-50"
                >Company</NuxtLink
              >
            </div>
            <div class="flex justify-between pl-3 py-10">
              <BotonPrimary
                v-if="!useUser.logged"
                contenido="Iniciar Sesión"
                link="/auth/login"
              />
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog> -->
  </header>

</template>

<script setup lang="ts">
import {ref} from "vue";
import {
  Bars3Icon,
} from "@heroicons/vue/24/outline";
import BotonPrimary from "../Botones/BotonPrimary.vue";
import BotonSecondary from "../Botones/BotonSecondary.vue";

const scrolled = ref(false);
const route = useRoute()

const ruta = ref()

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

function handleScroll() {
  scrolled.value = window.scrollY > 50;
}
const mobileMenuOpen = ref(false);

console.log(route.path);

if(route.path.includes('login')){
  ruta.value = 'login' 
}else if(route.path.includes('registro')){
  ruta.value = 'registro' 

}

const links = [{
  label: 'Sobre nosotros',
  // avatar: {
  //   src: 'https://avatars.githubusercontent.com/u/739984?v=4'
  // }
  icon: 'i-heroicons-heart',
  to: '/about'
}, {
  label: 'Como funciona',
  icon: 'i-heroicons-hand-thumb-up',
  to: '/guia'
}, {
  label: 'Ayuda',
  icon: 'i-heroicons-question-mark-circle',
  // to: `${route.path.startsWith('/dev') ? '/dev' : ''}/components/vertical-navigation`
  to: '/ayuda'
}, ]


/* const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  {name: "Watch demo", href: "#", icon: PlayCircleIcon},
  {name: "Contact sales", href: "#", icon: PhoneIcon},
]; */

</script>
