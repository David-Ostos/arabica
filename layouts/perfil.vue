<script lang="ts" setup>
import { ref } from "vue";
import { useGlobalStore } from "~/stores/global";

import imgLoginLitgh from "~/public/img/logo_ligth_new.png";
import BotonSecondary from "~/components/Botones/BotonSecondary.vue";
import BotonPrimary from "~/components/Botones/BotonPrimary.vue";
import Cart from "~/components/Cart/Cart.vue";
import { useCartStore } from "~/stores/cart";

const useGlobal = useGlobalStore();
const useUser = useUserStore();
const useCart = useCartStore();

//problema logged en false
/* console.log(useUser); */

const typeUser = useUser.dataUser.tipoUser;
const showCart = ref(false);
const loggedTem = true;

const scrolled = ref(false);
const nav1 = ref();
const mobileMenuOpen = ref(false);

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

          <SearchComprador />

          <ul class="flex gap-4">
            <li v-if="!loggedTem">
              <BotonSecondary link="/auth/login" contenido="Iniciar Sesión" />
            </li>
            <li v-if="loggedTem && useUser.logged" class="container-options">
              <BotonSecondary
                :link="`/dashboard/${useUser.dataUser.tipoUser}`"
                contenido="Panel de Control"
              />
              <li v-if="!loggedTem">
              <BotonSecondary link="/auth/login" contenido="Iniciar Sesión" />
            </li>

              <button
                v-if="typeUser == 'comprador'"
                class="button-cart"
                @click="activeCart"
              >
                <span class="count-cart" v-if="useCart.cart.length > 0">{{
                  useCart.cart.length
                }}</span>
                <span class="i-heroicons-shopping-cart"></span>
              </button>
            </li>
            <li v-if="loggedTem && !useUser.logged" class="container-options">
              <BotonSecondary
                link="/auth/login"
                contenido="Iniciar Seción"
              />
            </li>
          </ul>

        </div>
      </header>
    </div>

    <Cart v-if="showCart" />

    <CompradorPerfilLayout/>
          <slot  />
    <ProductorFooter />
  </div>
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
