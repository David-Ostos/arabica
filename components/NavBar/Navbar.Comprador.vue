<template>
  <ModalsNotificacion v-if="useModals.openModalNotificacion" @close="closeModal"
    titulo="Registro del usuario incompleto" :contenido-one="useModals.textoModalNotidicaciones" contenido-two=""
    icon="info" texto-boton="Terminar el registro" :to="`/dashboard/${useUser.dataUser.tipoUser}`" />


  <div :class="[!scrolled ? 'bg-white !text-dar md:bg-transparent md:!text-white' : 'bg-white border-b text-dar  shadow-sm', {
    ' !text-dar bg-white dark:bg-white rounded-b-xl shadow-md ': scrolled,
  }, navShow ? 'opacity-100' : 'opacity-0']" class="fixed w-screen top-0 z-50 transition-all duration-300 opacity-0 ">

    <div >
      <header  ref="navRef"
        class="fixed w-screen top-0 z-50 transition-all text-dar bg-white dark:bg-white border-b-2 rounded-lg shadow-sm">
        <div class="container pt-1 sm:px-12 px-8 mx-auto">
          <div class="flex justify-between sm:justify-between items-center">
            <div class="flex">
              <NuxtLink to="/" class="-m-1.5 p-1.5">
                <span class="sr-only">Arabica</span>
                <img class="h-14" :src="imgLoginLitgh" alt="Logo Arabica" />
              </NuxtLink>
            </div>

            <SearchComprador class="hidden sm:block" />

            <div class="flex justify-center items-center gap-2">
              <BotonesBotonSecondary v-if="!useUser.dataUser.perfilBase" class="hidden sm:block"
                contenido="Completar Registro" :link="`/dashboard/${useUser.dataUser.tipoUser}`"
                @click="useModal.showModalCompradorPerfilCompleto = true" />
              <div class="flex gap-4 md:hidden">
                <UChip v-if="!useUser.dataUser.perfilBase" :text="useCart.cart.length" size="xl">
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
              <DropdownsNavBarAvatarComprador class="hidden md:block" />

            </div>

          </div>

          <!-- <SearchComprador class="sm:hidden mt-4" /> -->
        </div>
      </header>
      <div ref="nav1" >
        <UHorizontalNavigation :links="items"
          class="hidden sm:flex mt-[60px] !justify-center border-b border-gray-200 dark:border-gray-800" :ui="{}" />
      </div>
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
import imgLoginLitgh from "~/public/img/logo_ligth_new.png";
import imgLogoLitgh from "/img/logo_ligth_new.png";
import { toast } from "vue3-toastify";
import { Bars3Icon } from "@heroicons/vue/24/outline";

const useGlobal = useGlobalStore();
const useModal = useShowModalsStore()
const useUser = useUserStore();
const useModals = useShowModalsStore()
const useCart = useCartStore()

const scrolled = ref(false);

const nav1 = ref();

const navRef = ref()

const updateHeight = () => {
  if (navRef.value) {
    useGlobal.heightNavComprador = navRef.value.offsetHeight + nav1.value.offsetHeight
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

const closeSlide = (data: boolean) => {
  mobileMenuOpen.value = data
}
const showCart = ref(false);
const activeCart = () => {
  //activar modal cart
  showCart.value = !showCart.value;
};

const closeModal = (close: boolean) => {
  useModals.openModalNotificacion = close
}

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
    disabled: !useUser.dataUser.perfilBase,
    labelClass: 'cursor-not-allowed hover:cursor-not-allowed  opacity-50 pointer-events-none',
    click: () => {
      if (!useUser.dataUser.perfilBase) { toast.info('Para poder acceder a favoritos, necesitas completar tu perfil.') }
    }
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
  /* {
    label: "Muestras",
    // icon: "i-heroicons-signal",
    to: `/dashboard/comprador/muestras`,
  },
  {
    label: "Pedidos",
    // icon: "i-heroicons-arrow-left-on-rectangle",
    to: `/dashboard/comprador/pedidos`,
  } */ /* ,
  {
    label: "Facturas",
    // icon: "i-heroicons-arrow-left-on-rectangle",
    to: `/dashboard/comprador/facturas`,
  } */
];

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

  } else {
    // El scroll se está moviendo hacia arriba
    navShow.value = true;

  }
  lastScrollTop.value = st;
}

const mobileMenuOpen = ref(false);
</script>
