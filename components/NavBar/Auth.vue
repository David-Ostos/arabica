<template>
  <header
    class=" w-full transition-all dark:bg-white dark:text-dar bg-white px-6 sm:p-0 border-b rounded-md shadow-sm"
  >
    <nav
      class="flex items-center justify-between py-4 px-6 lg:px-16"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <NuxtLink to="/" class="-m-1.5 p-1.5">
          <span class="sr-only">Arabica</span>
          <img class="h-16 w-auto" src="/img/ARABICA_LOGO_LIGTH.png" alt="" />
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
              :to="item.to"
              active-class="text-primary"
              inactive-class="text-lg font-semibold leading-6 text-gray-900 dark:-text-dar hover:text-primary dark:hover:text-primary"
            >
              {{ item.label }}
            </ULink>
          </li>
          <li>
            <BotonSecondary
              v-if="route.path.includes('login')"
              contenido="Registrate"
              link="/auth/registro"
            />
            <BotonSecondary
              v-if="route.path.includes('registro')"
              contenido="Inicia Sesión"
              link="/auth/login"
            />
          </li>
        </ul>
      </div>
    </nav>

    <div>
      <USlideover v-model="mobileMenuOpen">
        <UCard
          class="flex flex-col flex-1"
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
                <img
                  class="h-14 w-auto"
                  src="/img/ARABICA_LOGO_LIGTH.png"
                  alt=""
                />
              </NuxtLink>

              <UButton
                color="gray"
                variant="ghost"
                size="sm"
                icon="i-heroicons-x-mark-20-solid"
                class="-m-2.5 rounded-md p-2.5 text-dar dark:-text-dar"
                square
                padded
                @click="mobileMenuOpen = false"
              />
            </div>

          </template>

          <UVerticalNavigation
            :ui="{
              size: 'text-xl',
              base: 'gap-4 ',
              padding: 'py-2',
              inactive: 'text-gray-600',
              icon: {inactive: 'text-gray-600'},
            }"
            :links="links"
          />

          <BotonSecondary
            :contenido="
              route.path.includes('registro') ? 'Inicia Sesión' : 'Registro'
            "
            :link="
              route.path.includes('registro') ? '/auth/login' : '/auth/registro'
            "
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

          <template #body>
          </template>
        </UCard>
      </USlideover>
    </div>
</header>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {Bars3Icon} from "@heroicons/vue/24/outline";
import BotonPrimary from "../Botones/BotonPrimary.vue";
import BotonSecondary from "../Botones/BotonSecondary.vue";

const scrolled = ref(false);
const route = useRoute();

const ruta = ref();

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


const links = [
  {
    label: "Sobre nosotros",
    // avatar: {
    //   src: 'https://avatars.githubusercontent.com/u/739984?v=4'
    // }
    icon: "i-heroicons-heart",
    to: "/about",
  },
  {
    label: "Como funciona",
    icon: "i-heroicons-hand-thumb-up",
    to: "/guia",
  },
  {
    label: "Ayuda",
    icon: "i-heroicons-question-mark-circle",
    // to: `${route.path.startsWith('/dev') ? '/dev' : ''}/components/vertical-navigation`
    to: "/ayuda",
  },
];

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
