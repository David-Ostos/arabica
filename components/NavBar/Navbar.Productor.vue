<template>

  <ModalsNotificacion v-if="useModals.openModalNotificacion" @close="closeModal"
    titulo="Registro del usuario incompleto" :contenido-one="useModals.textoModalNotidicaciones" contenido-two=""
    icon="info" texto-boton="Terminar el registro" :to="`/dashboard/${useUser.dataUser.tipoUser}`" />

    

  <div ref="navRef" :class="[!scrolled  ? 'bg-white !text-dar md:bg-transparent md:!text-white' : 'bg-white border-b text-dar  shadow-sm', {
    ' !text-dar bg-white dark:bg-white rounded-b-xl shadow-md ': scrolled,
  }, navShow  ? 'opacity-100' : 'opacity-0']" class="fixed w-screen top-0 z-50 transition-all duration-300 opacity-0 ">
    <div class=" bg-white dark:bg-white">
      <div class="mx-auto z-50">
        <header
          class=" w-screen top-0 z-50 transition-all text-dar bg-white dark:bg-white border-b-2 rounded-xl shadow-md">
          <div class=" container  mx-auto py-1  px-12 flex justify-between items-center">
            <div class="flex ">
              <NuxtLink to="/" class="-m-1.5 p-1.5">
                <span class="sr-only">Arabica</span>
                <img class="h-14 w-auto" :src="imgLoginLitgh" alt="Logo Arabica" />
              </NuxtLink>
            </div>

            <SearchComprador class="hidden md:block" />

            <div class=" hidden md:flex justify-center items-center gap-2">
              <BotonesBotonSecondary v-if="!useUser.dataUser.perfilBase" contenido="Completar Registro"
                :link="`/dashboard/${useUser.dataUser.tipoUser}`"
                @click="useModal.showModalCompradorPerfilCompleto = true" />
              <UChip :text="useCart.cart.length" size="2xl">
                <div class="p-2 rounded-lg  bg-primary flex justify-center items-center cursor-pointer"
                  @click="activeCart">
                  <UIcon class="text-white text-xl font-bold" name="i-material-symbols-shopping-cart" dynamic />
                </div>
              </UChip>
              <DropdownsNavBarAvatarProductor />
            </div>

            <div class="flex gap-4 md:hidden">
              <UChip :text="useCart.cart.length" size="xl">
                <div class="p-2  rounded-lg  bg-primary flex justify-center items-center cursor-pointer"
                  @click="activeCart">
                  <UIcon class="text-white text-base md:text-xl  font-bold" name="i-material-symbols-shopping-cart"
                    dynamic />
                </div>
              </UChip>
              <button type="button" class="p-1 border rounded-md inline-flex items-center justify-center"
                @click="mobileMenuOpen = true">
                <span class="sr-only">Abrir menu</span>
                <Bars3Icon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>


          </div>


        </header>

        <div v-if="validarRuta()" :class="['hidden md:block w-full bg-white']">
          <!-- <ProductorHorizontalPerfil class=""/> -->
          <UHorizontalNavigation :links="items"
            class=" flex !justify-center border-b border-gray-200 mx-auto dark:border-gray-800 shadow-md rounded-b-xl"
            :ui="{}" />

        </div>
      </div>
      <Cart v-if="showCart" />
    </div>

  </div>
  <USlideover side="left" v-model="mobileMenuOpen" :ui="{ width: 'w-[80%] max-w-[80%]' }">
    <UCard class="flex flex-col flex-1"
      :ui="{ backgound: 'dark:bg-white', body: { base: 'flex-1' }, ring: '', divide: '' }">
      <template #header>
        <div class="flex items-center justify-between">
          <img class="h-14 w-auto" :src="imgLogoLitgh" alt="" />
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
            @click="mobileMenuOpen = false" />
        </div>
      </template>

      <LazyMobileNavigationVerticalNavigation @close="closeSlide" />

    </UCard>
  </USlideover>


</template>

<script setup lang="ts">
import { ref } from "vue";
import { useGlobalStore } from "~/stores/global";
import imgLoginLitgh from '~/public/img/logo_ligth_new.png'
import { Bars3Icon } from "@heroicons/vue/24/outline";

// import imgLogo from "/img/Arabica-Green-coffee.png";
import imgLogoLitgh from "/img/logo_ligth_new.png";
import { useRoute } from "vue-router";

const useGlobal = useGlobalStore();
const useUser = useUserStore()
const useModal = useShowModalsStore()
const useModals = useShowModalsStore()
const useCart = useCartStore()

const route = useRoute()



const navRef = ref()

const updateHeight = () => {
  if (navRef.value) {
    useGlobal.heightNavProductor = navRef.value.offsetHeight
  }
}
onMounted(() => {
  if (navRef.value) {
    // Configurar ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === navRef.value) {
          updateHeight()
        }
      }
    })

    resizeObserver.observe(navRef.value)

    // Configurar Intersection Observer para detectar cuando el componente entra en el viewport
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateHeight()
        }
      })
    })

    intersectionObserver.observe(navRef.value)

    // Limpiar observadores cuando el componente se desmonte
    onUnmounted(() => {
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
    })
  }

  // Actualizar altura inicial
  updateHeight()
})

const mobileMenuOpen = ref(false);

const closeSlide = (data: boolean) => {
  mobileMenuOpen.value = data
}

const validarRuta = () => {
  if (route.path.includes('usuario')) {
    return false
  }
  if (route.path.includes('perfil')) {
    return false
  }
  return true
}

const showCart = ref(false);
const activeCart = () => {
  //activar modal cart
  showCart.value = !showCart.value;
};

const closeModal = (close: boolean) => {
  useModals.openModalNotificacion = close
}

const items = [{
  label: 'Panel de control',
  // icon: 'i-heroicons-cog-8-tooth',
  to: `/dashboard/productor`,
}, {
  label: 'Lotes de Café',
  to: `/dashboard/productor/lotes`,
  // disabled: !useUser.dataUser.perfilBase,
  // labelClass: 'cursor-not-allowed hover:cursor-not-allowed  opacity-50 pointer-events-none',
  // click: ()=> {
  //   if(!useUser.dataUser.perfilBase) {toast.info('Para poder acceder a favoritos, necesitas completar tu perfil.')}
  // }
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
  useGlobal.heightNavProductor = navRef.value.clientHeight;
});


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
  if(route.path.includes('/dashboard/productor')){
    navShow.value = true;
  }else{
    scrolled.value = window.scrollY > 50;
  
    var st = window.scrollY || document.documentElement.scrollTop;
    if (st > lastScrollTop.value) {
      // El scroll se está moviendo hacia abajo
  
      navShow.value = false;
  
    } else {
      // El scroll se está moviendo hacia arriba
      navShow.value = true;
  
    }
    lastScrollTop.value = st;
  }
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
