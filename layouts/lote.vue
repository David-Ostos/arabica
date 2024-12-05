<script lang="ts" setup>
import { ref } from "vue";
import { useGlobalStore } from "~/stores/global";
import { Bars3Icon } from "@heroicons/vue/24/outline";
import imgLogoLitgh from "/img/logo_ligth_new.png";

import imgLoginLitgh from "~/public/img/logo_ligth_new.png";
import BotonSecondary from "~/components/Botones/BotonSecondary.vue";
import Cart from "~/components/Cart/Cart.vue";
import { useCartStore } from "~/stores/cart";

const useGlobal = useGlobalStore();
const useUser = useUserStore();
const useCart = useCartStore();

//problema logged en false

const typeUser = ref();

const scrolled = ref(false);
const nav1 = ref();
const mobileMenuOpen = ref(false);

const closeSlide = (data: boolean) => {
  mobileMenuOpen.value = data
}

const {isScreenSmall} = useGlobalComposable() 

const showCart = ref(false);
const activeCart = () => {
  //activar modal cart
  showCart.value = !showCart.value;
};

const items = [
  {
    label: "Panel de control",
    // icon: 'i-heroicons-cog-8-tooth',
    to: `/dashboard/productor`,
  },
  {
    label: "Lotes de Café",
    to: `/dashboard/productor/lotes`,
    // icon: 'i-heroicons-book-open',
  } /* ,{
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
  } */,
];

onMounted(() => {
  useGlobal.heightNavLote = nav1.value.clientHeight;
  window.addEventListener("scroll", handleScroll);
  typeUser.value = useUser.dataUser.tipoUser
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

function handleScroll() {
  scrolled.value = window.scrollY > 50;
}
</script>

<template>
  <div class="mt-14">
    <div class="relative z-50">
      <header
        ref="nav1"
        class="fixed w-screen top-0 z-50 transition-all text-dar bg-white dark:bg-white border-b-2 rounded-xl shadow-md"
      >
        <div
          class="container mx-auto py-1 px-12 flex justify-between items-center"
        >
          <div class="flex">
            <NuxtLink to="/" class="-m-1.5 p-1.5">
              <span class="sr-only">Arabica</span>
              <img
                class="h-14 w-auto"
                :src="imgLoginLitgh"
                :class="{ hidden: mobileMenuOpen === true }"
                alt="Logo Arabica"
              />
            </NuxtLink>
          </div>

          <SearchComprador v-if="!isScreenSmall" />

          <ul v-if="!isScreenSmall" class="flex items-center gap-4">
            <li>
              <UChip :text="useCart.cart.length" size="2xl">
                <div class="p-2 rounded-lg  bg-primary flex justify-center items-center cursor-pointer" @click="activeCart">
                  <UIcon class="text-white text-xl font-bold" name="i-material-symbols-shopping-cart" dynamic />
                </div>
              </UChip>
            </li>
            <li v-if="!useUser.logged" class="container-options">
              <BotonSecondary
                link="/auth/login"
                contenido="Iniciar Seción"
              />
            </li>
            <li v-if="useUser.logged" class="container-options">
              <BotonSecondary
                :link="`/dashboard/${typeUser}`"
                contenido="Panel de Control"
              />
            </li>
          </ul>

          <div v-else class=" flex gap-4 items-center">
            <UChip :text="useCart.cart.length" size="2xl">
                <div class="p-2 rounded-lg  bg-primary flex justify-center items-center cursor-pointer" @click="activeCart">
                  <UIcon class="text-white text-xl font-bold" name="i-material-symbols-shopping-cart" dynamic />
                </div>
              </UChip>
            <button  type="button" class="p-1 border rounded-md inline-flex items-center justify-center"
                  @click="mobileMenuOpen = true">
                  <span class="sr-only">Abrir menu</span>
                  <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                </button>
          </div>

          <!-- <ul class="flex gap-4">
            <li v-if="!useUser.logged">
              <BotonSecondary link="/auth/login" contenido="Iniciar Sesión" />
            </li>
            <li v-if="useUser.logged">
              <BotonSecondary
                :link="`/dashboard/${useUser.dataUser.tipoUser}`"
                contenido="Panel de Control"
              />
            </li>
          </ul> -->
        </div>
        <Cart v-if="showCart" />
      </header>
    </div>


    <slot />
    <LotesFooter />
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

<style scoped lang="scss">
.container-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.button-cart {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(74, 222, 128);
  padding: 0.5rem;
  border: 3px solid rgb(74, 222, 128);
  border-radius: 12px;
  color: white;

  &:hover {
    background-color: #fff;
    color: rgb(74, 222, 128);
  }
}

.count-cart {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: rgb(125, 240, 167);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9em;
  font-weight: 600;
}
</style>
