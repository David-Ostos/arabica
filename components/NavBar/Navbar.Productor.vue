<template>
  <div class="relative z-50">
    <header
    ref="nav1"
    class="fixed w-screen top-0 z-50 transition-all text-dark bg-white dark:bg-dark border-b-2 rounded-xl shadow-sm"
  >
    <div class="container mx-auto py-1  px-12 flex justify-between items-center" >
      <div class="flex ">
        <NuxtLink to="/" class="-m-1.5 p-1.5">
          <span class="sr-only">Arabica</span>
          <img
            class="h-14 w-auto"
            :src="imgLoginLitgh"
            :class="{hidden: mobileMenuOpen === true}"
            alt="Logo Arabica"
          />
        </NuxtLink>
      </div>

      <SearchComprador/>

      <DropdownsNavBarAvatarProductor />
    </div>
<!-- 
    <Dialog
      v-if="useUser.logged"
      class="lg:hidden"
      @close="mobileMenuOpen = false"
      :open="mobileMenuOpen"
    >
      <div class="fixed inset-0 z-10" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto dark:bg-dark bg-white px-6 py-6 sm:max-w-sm sm:ring-1 dark:sm:text-white sm:ring-gray-900/10"
      >
        <div class="flex items-center justify-between">
          <NuxtLink to="" class="-m-1.5 p-1.5">
            <span class="sr-only">Arabica</span>
            <img
              class="h-16 w-auto"
              :src="
                $colorMode.preference === 'dark'
                  ? 'img/Arabica-Green-coffee.png'
                  : 'img/logo_ligth.png'
              "
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
        <div class="mt-8 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
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
            <BotonPrimary
              v-if="!useUser.logged"
              contenido="Iniciar Sesión"
              link="/auth/login"
            />
          </div>
        </div>
      </DialogPanel>
    </Dialog> -->
    <!-- <DropdownsNavBarAvatarComprador v-if="useUser.logged"/> -->

  </header>

  <div 
    :class="!useUser.dataUser.verificado ? 'mt-[58px]' : 'mt-[65px]'">
    <ProductorHorizontalPerfil class=""/>
    <UHorizontalNavigation
      v-if="!$route.path.includes('perfil')"
      :links="items"
      class=" hidden sm:flex  !justify-center border-b border-gray-200  dark:border-gray-800 shadow-xl rounded-b-xl"
      :ui="{}"
    />
  
  </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useGlobalStore} from "~/stores/global";
import imgLoginLitgh from '~/public/img/logo_ligth_new.png'

const useGlobal = useGlobalStore();
const useUser = useUserStore()

const scrolled = ref(false);
const nav1 = ref();
const mobileMenuOpen = ref(false);


const items = [{
    label: 'Panel de control',
    // icon: 'i-heroicons-cog-8-tooth',
    to: `/dashboard/productor`,
  }, {
    label: 'Lotes de Café',
    to: `/dashboard/productor/lotes`,
    // icon: 'i-heroicons-book-open',
    
  },/* {
    label: 'Productores',
    to: `/dashboard/productor/productores`,
    // icon: 'i-heroicons-book-open',
    
  } ,*/ /* {
    label: 'Inventario',
    // icon: 'i-heroicons-megaphone',
    to: `/dashboard/productor/inventario`,
    
  }, */ /* {
    label: 'Solicita',
    // icon: 'i-heroicons-signal',
    to: `/dashboard/productor/solicita`,
  } ,*/ {
    label: 'Pedidos de Muestra',
    // icon: 'i-heroicons-arrow-left-on-rectangle',
    to: `/dashboard/productor/pedidos_muestras`,    
  }, {
    label: 'Ventas',
    // icon: 'i-heroicons-arrow-left-on-rectangle',
    to: `/dashboard/productor/ventas`,    
  }, /* {
    label: 'Clientes',
    // icon: 'i-heroicons-arrow-left-on-rectangle',
    to: `/dashboard/productor/clientes`,    
  } */
]

onMounted(() => {
  useGlobal.heightNav = nav1.value.clientHeight;
});


onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

function handleScroll() {
  scrolled.value = window.scrollY > 50;
}

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
