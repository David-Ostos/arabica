<template>
  <header
    ref="nav1"
    class="fixed w-screen top-0 z-50 transition-all text-dark bg-white dark:bg-dark border-b-2 rounded-lg shadow-sm"
  >
    <div class="container py-4 px-12 flex justify-between items-center">
      <div class="flex">
        <NuxtLink to="/" class="-m-1.5 p-1.5">
          <span class="sr-only">Arabica</span>
          <NuxtImg
            class="h-14 w-auto"
            src="img/logo_ligth.png"
            :class="{hidden: mobileMenuOpen === true}"
            alt="Logo Arabica"
          />
        </NuxtLink>
      </div>

      <SearchComprador />

      <DropdownsNavBarAvatarComprador />
    </div>

    <Dialog
      v-if="!useUser.logged"
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
            <NuxtImg
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
    </Dialog>

    <DropdownsNavBarAvatarComprador v-if="useUser.logged"/>

  </header>
  <div class="mt-[88px] border-b-2 rounded-md">
    <ul class="flex justify-center py-4 gap-4">
      <li
        v-for="(item, index) in items"
        :key="index"
        @click="
          console.log(
            $route.path.includes(item.label.toLowerCase()),
            $route.path
          )
        "
      >
        <NuxtLink
          class="cursor-pointer font-medium hover:!text-primary"
          :class="{
            '!text-primary border-b-2 border-primary ': $route.path.includes(
              item.label.toLowerCase()
            ),
            '!text-gray-500': !$route.path.includes(item.label.toLowerCase()),
          }"
          :to="item.link"
        >
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/vue";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/vue/20/solid";
import BotonPrimary from "../Botones/BotonPrimary.vue";
import {useGlobalStore} from "~/stores/global";

const useGlobal = useGlobalStore();
const useUser = useUserStore();

const scrolled = ref(false);
const nav1 = ref();

const navHeight = ref(0);

const items = [
  {
    label: "Panel de control",
    name: "/dashboard/comprador",
    icon: "i-heroicons-cog-8-tooth",
    link: `/dashboard/${useUser.dataUser.tipoUser}`,
  },
  {
    label: "Solicitudes",
    name: "solicitudes",
    link: `/dashboard/${useUser.dataUser.tipoUser}/productores`,
    icon: "i-heroicons-book-open",
  },
  {
    label: "Planificadores",
    name: "planificadores",
    icon: "i-heroicons-megaphone",
    link: `/dashboard/${useUser.dataUser.tipoUser}/inventario`,
  },
  {
    label: "Muestras",
    name: "muestras",
    icon: "i-heroicons-signal",
    link: `/dashboard/${useUser.dataUser.tipoUser}/solicita`,
  },
  {
    label: "Pedidos",
    name: "pedidos",
    icon: "i-heroicons-arrow-left-on-rectangle",
    link: `/dashboard/${useUser.dataUser.tipoUser}/perfil/ajustes`,
  },
  {
    label: "Facturas",
    name: "ventas",
    icon: "i-heroicons-arrow-left-on-rectangle",
    link: `/dashboard/${useUser.dataUser.tipoUser}/perfil/ajustes`,
  },
];

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

const products = [
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
];

const mobileMenuOpen = ref(false);
</script>
