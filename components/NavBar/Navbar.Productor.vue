<template>
  <div class="relative z-50">
    <header
    ref="nav1"
    class="fixed w-screen top-0 z-50 transition-all text-dark bg-white dark:bg-dark border-b-2 rounded-xl shadow-md"
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
  </header>

  <div 
    :class="!useUser.dataUser.verificado ? 'mt-[58px]' : 'mt-[65px]'">
    <!-- <ProductorHorizontalPerfil class=""/> -->
    <UHorizontalNavigation
      v-if="!$route.path.includes('perfil')"
      :links="items"
      class=" hidden sm:flex  !justify-center border-b border-gray-200  dark:border-gray-800 shadow-md rounded-b-xl"
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
    
  }/* ,{
    label: 'Productores',
    to: `/dashboard/productor/productores`,
    // icon: 'i-heroicons-book-open',
    
  } , {
    label: 'Inventario',
    // icon: 'i-heroicons-megaphone',
    to: `/dashboard/productor/inventario`,
    
  }, {
    label: 'Solicita',
    // icon: 'i-heroicons-signal',
    to: `/dashboard/productor/solicita`,
  } , {
    label: 'Pedidos de Muestra',
    // icon: 'i-heroicons-arrow-left-on-rectangle',
    to: `/dashboard/productor/pedidos_muestras`,    
  }, {
    label: 'Ventas',
    // icon: 'i-heroicons-arrow-left-on-rectangle',
    to: `/dashboard/productor/ventas`,    
  }, {
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
