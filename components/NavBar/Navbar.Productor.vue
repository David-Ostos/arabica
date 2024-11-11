<template> 

  <ModalsNotificacion v-if="useModals.openModalNotificacion" @close="closeModal" titulo="Registro del usuario incompleto" 
    :contenido-one="useModals.textoModalNotidicaciones" 
    contenido-two="" icon="info"  
    texto-boton="Terminar el registro"
    :to="`/dashboard/${useUser.dataUser.tipoUser}`"
  />

  
  <div class="hidden md:block">
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

        <div class="flex justify-center items-center gap-2">
            <BotonesBotonSecondary v-if="!useUser.dataUser.perfilBase" contenido="Completar Registro" :link="`/dashboard/${useUser.dataUser.tipoUser}`" @click="useModal.showModalCompradorPerfilCompleto = true" />
            <UChip :text="useCart.cart.length" size="2xl">
              <div class="p-2 rounded-lg  bg-primary flex justify-center items-center cursor-pointer" @click="activeCart">
                <UIcon class="text-white text-xl font-bold" name="i-material-symbols-shopping-cart" dynamic />
              </div>
            </UChip>
            <DropdownsNavBarAvatarProductor />
          </div>
        </div>
      </header>
      
      <div 
      :class="!useUser.dataUser.verificado ? 'mt-[65px]' : 'mt-[65px]'">
      <!-- <ProductorHorizontalPerfil class=""/> -->
      <UHorizontalNavigation
        v-if="!$route.path.includes('perfil')"
        :links="items"
        class=" hidden sm:flex  !justify-center border-b border-gray-200  dark:border-gray-800 shadow-md rounded-b-xl"
        :ui="{}"
      />
    
    </div>
    </div>
    <Cart v-if="showCart" />
  </div>

  <BottonBar class=" md:hidden"/>


</template>

<script setup lang="ts">
import {ref} from "vue";
import {useGlobalStore} from "~/stores/global";
import imgLoginLitgh from '~/public/img/logo_ligth_new.png'

const useGlobal = useGlobalStore();
const useUser = useUserStore()
const useModal = useShowModalsStore()
const useModals = useShowModalsStore()
const useCart = useCartStore()

const scrolled = ref(false);
const nav1 = ref();
const mobileMenuOpen = ref(false);


const showCart = ref(false);
const activeCart = () => {
  //activar modal cart
  showCart.value = !showCart.value;
};

const closeModal = (close: boolean)=>{
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
