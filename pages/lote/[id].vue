<template>
  <ModalsNotificacion v-if="openModal" @close="closeModal" titulo="Registro del usuario incompleto"
    contenido-one="Debes registrarte e introducir todos los datos requeridos para poder pedir alguna muestra o agregar algun producto al carrito."
    contenido-two="" icon="info" texto-boton="Terminar el registro" :to="`/dashboard/${useUser.dataUser.tipoUser}`" />
  <div class="my-20">
    <!-- modal muestra -->
    <div>
      <UModal v-model="modalMuestra" prevent-close :ui="{
        width: 'sm:max-w-[550px]',
      }">
        <UCard :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-semibold leading-6 text-gray-800 dark:-text-dar">
                Solicitud de Muestras
              </h3>
              <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                @click="modalMuestra = false" />
            </div>
          </template>

          <div class="mx-4 sm:mx-8">
            <div class=" ">
              <UCarousel  :items="lote.galeria"
                v-slot="{ item }"
                :ui="{ 
                  item: 'basis-full md:basis-1/2 lg:basis-1/3 cursor-grab', 
                  container : 'gap-2 w-full',
                  indicators: { wrapper: 'bg-dar w-fit mx-auto rounded-full p-1', inactive: 'border border-primary bg-gray-300 dark:bg-gray-800'} 
                }" indicators class=""
                arrows>


                  <div v-if="item.link" class="">
                    <img :src="item.link" class="  object-cover w-full h-52 " draggable="true" />
                  </div>


              </UCarousel>
            </div>

            <div class="">
              <!-- datos de muestra -->

              <div class=" h-full pb-4 text-gray-800 dark:-text-dar rounded-xl">
                <LotesAcordionMuestra :items="itemMuestra" />
              </div>
            </div>

            <div>
              <!--  precio y boton  -->

              <div v-if="lote.muestra?.muestra" class=" text-gray-800 ">
                <div v-if="lote.muestra?.muestraGratis" class="capitalize flex items-center gap-2 justify-between">
                  <span class="font-bold sm:text-lg w-fit">Precio de muestra:</span> 
                  <span class="font-medium text-primary-600 w-fit sm:text-lg ">muestra gratis</span>
                </div>
                <p v-else class="capitalize flex items-center gap-2 justify-between">
                  <span class="font-bold text-lg">Precio de muestra:</span> 
                  <span class="font-medium text-lg">{{
                    lote.precio }}
                    UDS / LB</span>
                </p>
              </div>
              <div class="mt-8 text-center text-xl font-bold">
                <UButton size="xl">SOLICITAR MUESTRA</UButton>
              </div>

            </div>
          </div>
        </UCard>
      </UModal>
    </div>
    <!-- /modal muestra -->

        <!-- modal galeria -->
    <div>
      <UModal v-model="modalGaleria" prevent-close :ui="{
        width: 'sm:max-w-[750px]',
      }">
        <UCard :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-semibold leading-6 text-gray-800 dark:-text-dar">
                Solicitud de Muestras
              </h3>
              <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                @click="modalGaleria = false" />
            </div>
          </template>

          <div class="mx-4 sm:mx-8 ">
            <div class=" ">
              <UCarousel v-slot="{ item }" :items="lote.galeria"
                :ui="{  item: 'basis-full justify-center mx-8 rounded-md' }" 
                indicators
                :prev-button="{
                  color: 'gray',
                  icon: 'i-heroicons-arrow-left-20-solid',
                  class: '-start-11'
                }"
                :next-button="{
                  color: 'gray',
                  icon: 'i-heroicons-arrow-right-20-solid',
                  class: '-end-11'
                }" 
                arrows>
                <div v-if="item.link" class="">
                  <img :src="item.link" class=" rounded-md object-cover w-full h-[600px]" draggable="false" />
                </div>

                <div v-else class="border  w-full h-full rounded-xl flex items-center">
                  <UIcon :name="item.img" class="rounded-xl h-28 w-full object-cover opacity-55" alt="" />
                </div>
              </UCarousel>
            </div>
          </div>
        </UCard>
      </UModal>
    </div>
    <!-- /modal galeria -->


    <div class="flex flex-col sm:grid grid-cols-7 gap-8 mx-4 sm:mx-20">
      <!-- Galeria del lote -->
      <div v-if="!isScreenSmall" @click="modalGaleria = true"
        ref="containerGaleria"
        class="col-span-4 h-screen-topBar-footer overflow-hidden h-ful shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-800 dark:-text-dar ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-xl p-4" >
        <div class="grid grid-cols-2 justify-center gap-4" >
          <div v-if="lote.galeria" v-for="galeria, index in lote.galeria" :key="index"
          :class="{'col-span-2 w-full': index === 0, 'col-span-1': index !== 0}" class="mx-auto aspect-ratio">
            <div >
              <img :style="index === 0 ? containerGaleria1 : containerGaleriaAll" :src="galeria.link" class="rounded-xl min-w-72 w-full object-cover" alt="" />
            </div>

        </div>

        </div>
      </div>
      <!-- /Galeria del lote -->

      <!-- card del lote -->
      <div
        class="col-span-3 h-screen-topBar-footer p-8 rounded-xl border flex flex-col justify-between py-8 shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-800 dark:-text-dar ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400">
        <div class="">
          <div class="flex items-center justify-between mb-8">
            <div class="overflow-hidden rounded-xl h-24 w-24">
              <USkeleton v-show="!loadingImg" class="h-24 w-24 rounded-xl" :ui="{
                background: 'bg-secundary',
              }" />

              <div class="h-24 w-24 rounded-xl">
                <img v-show="lote.productor!.picture" :src="lote.productor!.picture" @load="loadingImg = true"
                  class="rounded-xl" alt="" />
                <div v-show="!lote.productor!.picture" class="flex justify-center items-center h-24 bg-gray-300 rounded-xl border border-gray-700">
                  <UIcon name="i-heroicons-photo" class="rounded-xl text-gray-700 h-16 w-16" />
                </div>
              </div>
            </div>

            <div class="text-4xl flex gap-4 items-center cursor-pointer">
              <UIcon v-if="!like && useUser.dataUser.perfilBase" name="i-heroicons-heart" class="cursor-pointer"
                @click="addFavorite" />
              <UIcon v-if="like && useUser.dataUser.perfilBase" class="text-rose-500 cursor-pointer"
                name="i-heroicons-heart-16-solid" @click="deleteFavorite" />
              <UIcon class="text-3xl text-gray-500" name="i-heroicons-arrow-up-tray" @click="copiarUrl" />
            </div>
          </div>

          <div class="flex flex-col gap-3">
            <h2
              class="font-bold text-base md:text-2xl text-gray-700 line-clamp-2 hover:line-clamp-none transition-all duration-1000 capitalize">
              {{ lote.nombre }}
            </h2>
            <NuxtLink :to="`/perfil/${lote.productor?._id}`"
              class="cursor-pointer flex items-center text-xl text-primary-600 font-bold gap-1 hover:text-primary">
              <p class="capitalize">
                <!-- <span class="text-gray-700" >Producido por :</span> -->
                {{ lote.productor!.nombre }}
              </p>
              <UIcon class="" name="i-heroicons-check-badge-20-solid" />
            </NuxtLink>
          </div>
        </div>
        <UDivider class="" />
        <div v-if="lote.muestra?.muestra" class="flex flex-col gap-3 text-center">
          <div v-if="lote.muestra?.muestraGratis" class="solicitar-muestra">
            <span class="uppercase font-bold text-stone-600 text-1xl">Puedes solicitar muestra Gratis.</span>

            <BotonSecondary class="mx-auto mt-4" @click="onClickMuestra" contenido="SOLICITAR MUESTRA" />
          </div>
          <div v-else class="solicitar-muestra">
            <span class="uppercase font-bold text-stone-700 text-1xl">Puedes solicitar tu muestra</span>

            <BotonSecondary class="mx-auto mt-4" @click="onClickMuestra" contenido="SOLICITAR MUESTRA" />
          </div>
        </div>
        <div class="flex flex-col gap-3 text-center" v-else>
          <span class="uppercase font-bold text-stone-600 text-1xl">Este lote no posee muestra</span>
        </div>
        <UDivider class="" />

        <p
          class="text-center uppercase mb-4 text-3xl text-gray-700 whitespace-nowrap leading-tight rounded-xl font-bold tracking-wider">
          {{ lote.precio!.toString().replace(".", ",") }} usd / lb
        </p>

        <UButton v-if="!exist" class="text-center py-2 text-4xl mx-auto justify-center w-full uppercase btn-addCart"
          @click="addCart">lo quiero
        </UButton>
        <UButton v-else class="text-center py-2 text-4xl mx-auto justify-center w-full capitalize"
          @click="useCart.deleteItemCart(lote._id!)" color="red">Eliminar del Carrito
        </UButton>
      </div>
      <!-- /card del lote -->

      <!-- Galeria del lote mobile -->
      <div v-if="isScreenSmall"
        class="col-span-4 h-screen-topBar-footer overflow-hidden h-ful shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-800 dark:-text-dar ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-xl p-4">
        <div class="grid grid-cols-4 col-span-2 grid-rows-4 gap-4 h-full">
          <div class="row-span-2 col-span-4">
            <img :src="galeria[0].link" class="rounded-xl h-full w-full object-cover" alt="" />
          </div>

          <div class="flex justify-around items-center row-span-2 gap-4 col-span-4 h-full w-full">
            <div v-for="img in galeria.slice(1)"
              class="h-full w-full flex items-center justify-between overflow-hidden rounded-xl">
              <div v-if="img.enty === true" class="border px-4 h-56 w-56 rounded-xl flex items-center">
                <UIcon :name="img.img" class="rounded-xl h-28 w-full object-cover opacity-55" alt="" />
              </div>
              <div v-else class="rounded-xl">
                <img :src="img.link" class="rounded-xl h-72 w-56 object-cover" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /Galeria del lote mobile -->

      <!-- datos del lote  -->
      <div
        class="col-span-4 h-screen overflow-hidden p-4 border h-ful shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-800 dark:-text-dar ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-xl">
        <LotesAcordion :items="item" />
      </div>
      <!-- ubicación -->
      <div
        class="col-span-3 h-screen p-4 border h-ful shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-800 dark:-text-dar ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-xl">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16138252.902658958!2d-85.72576594757281!3d-9.06347592792652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c850c05914f5%3A0xf29e011279210648!2zUGVyw7o!5e0!3m2!1ses!2sve!4v1721330794106!5m2!1ses!2sve"
          class="border-none rounded-md w-full h-full" allowfullscreen loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Lotes } from "~/interfaces/Lotes";
import { toast } from "vue3-toastify";
import { useCartStore } from "../../stores/cart";
import { useUserStore } from "../../stores/user";
import axios from "axios";
import { useFavoritosStore } from "~/stores/favoritos";
import BotonSecondary from "~/components/Botones/BotonSecondary.vue";

definePageMeta({
  layout: "lote",
});

const exist = ref(false);

const { isScreenSmall } = useGlobalComposable()

const copiarUrl = (): any => {
  const url = window.location.href;
  navigator.clipboard
    .writeText(url)
    .then(() => {
      toast.success("¡URL copiada al porta papeles!");
    })
    .catch((err) => {
      toast.error("Error al copiar la URL:", err);
    });
};

const like = ref(false);

const route = useRoute();
const useCart = useCartStore();
const useUser = useUserStore();
const useLotes = useLotesStore();
const useFavoritos = useFavoritosStore();

const modalMuestra = ref(false);
const modalGaleria = ref(false);

const containerGaleria = ref()
const heightGaleria = ref(0)
const widthGaleria = ref(0)
const containerGaleria1 = computed(()=>{
  return {
    height: `calc((${heightGaleria.value}px / 2) - 1.5rem)`,
    width: `100%`
  }
})

const containerGaleriaAll = computed(()=>{
  return{
    height: `calc((${heightGaleria.value}px / 2) - 1.5rem)`,
    width: `calc((${widthGaleria.value}px / 2) )`
  }
})

onMounted(()=>{
  heightGaleria.value = containerGaleria.value.offsetHeight
  widthGaleria.value = containerGaleria.value.offsetWidth
})

const lotes: Lotes[] = useLotes.lotes.filter(
  (lote) => lote._id === route.params.id
);
const lote = ref(lotes[0]);

const loadingImg = ref(false);

const onClickMuestra = () => {
  if (validatePerfilBase()) {
    modalMuestra.value = true;
    return;
  }
};

const galeria = ref();

const openModal = ref(false);

const closeModal = (close: boolean) => {
  openModal.value = close;
};

const validatePerfilBase = () => {
  if (useUser.dataUser.perfilBase) return true;
  openModal.value = true;
  return false;
};

if (lote.value.galeria!.length === 0) {
  galeria.value = [
    {
      img: "i-heroicons-photo",
      enty: true,
    },
    {
      img: "i-heroicons-photo",
      enty: true,
    },
    {
      img: "i-heroicons-photo",
      enty: true,
    },
    {
      img: "i-heroicons-photo",
      enty: true,
    },
  ];
} else if (lote.value.galeria!.length < 4) {
  galeria.value = [
    ...lote.value.galeria!,
    ...Array(4 - lote.value.galeria!.length).fill({
      id: "",
      img: "i-heroicons-photo",
      enty: true,
    }),
  ];
} else if (lote.value.galeria!.length === 4) {
  galeria.value = lote.value.galeria;
}

const item = [
  {
    id: "1",
    label: "DATOS DEL CAFÉ",
    slot: "datos",
    contenido: {
      origen: lote.value.origen,
      productores: lote.value.productores,
      variedad: Array.isArray(lote.value.variedad)
        ? lote.value.variedad.join(", ")
        : lote.value.variedad,
      proceso: lote.value.proceso,
      puntaje: lote.value.puntaje?.toFixed(2),
      productor: lote.value.productor!.nombre,
      perfil: lote.value.perfil,
      "Clasificación de Lotes": lote.value.cantidadLote,
      pais: lote.value.pais ,
    },
    isActive: true,
  },
  {
    id: "2",
    label: "ANÁLISIS SENSORIAL",
    slot: "analisis",
    contenido: {
      catador: "-",
      puntaje: "-",
      "análisis sensorial": "-",
      "gráfico araña sensorial": "-",
    },
    isActive: true,
  } /* {
    id:"3",
    label: 'HISTORIA DEL CAFÉ',
    slot: 'historia',
    contenido: lote.value.descripcion,
    isActive: true
  }, */,
];
const itemMuestra = [
  {
    id: 0,
    label: "Datos de la muestra",
    slot: "datos",
    contenido: {
      "Nombre del lote": lote.value.nombre,
      "Nombre del productor": lote.value.productor!.nombre,
      "Nombre del perﬁl": lote.value.perfil,
      Peso: "1 lb",
      Origen: lote.value.origen,
      "Código de lote": "rmx-125",
    },
    isActive: true,
  }/* ,
  {
    id: 1,
    label: "Dirección de envió",
    slot: "dirección",
    contenido: {},
    isActive: true,
  } */
];
const existItem = () => {
  const existItemInCart = useCart.cart.filter(
    (item) => item._id === lote.value._id
  );

  return existItemInCart;
};

const existFav = () => {
  const existItemInFav = useFavoritos.favoritos.filter(
    (item: any) => item.loteID === lote.value._id
  );

  return existItemInFav;
};

const addCart = async () => {
  const existInCart = existItem();
  const validate = validatePerfilBase();

  if (!validate) return;

  if (existInCart.length > 0) {
    toast.info("Ya cuenta con este lote en su carrito de compras.");
  } else {
    useCart.addItemCart(lote.value);
    exist.value = true;
  }
};

const addFavorite = async () => {
  try {
    // @ts-ignore
    await axios({
      url: `${import.meta.env.VITE_URL_API}/api/content/item/favoritos`,
      method: "POST",
      mode: "cors",
      headers: {
        "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
      },

      data: {
        data: {
          loteID: lote.value._id,
          userID: useUser.dataUser._id,
        },
      },
    }).then((res: any) => {
      //almacenar en store

      useFavoritos.addItemFavorito({
        loteID: lote.value._id,
        userID: useUser.dataUser._id,
      });
      like.value = true;

      toast.success("Se ha agregado el lote a su lista de favoritos");
    });
  } catch (e) {
    console.log(e);
  }
};

const deleteFavorite = async () => {
  const existItemInFav = await useFavoritos.favoritos.filter(
    (item: any) => item.loteID === lote.value._id
  );

  await axios
    .delete(
      `${import.meta.env.VITE_URL_API}/api/content/item/favoritos/${existItemInFav[0]._id
      }`,
      // @ts-ignore
      {
        headers: {
          "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
        },
      }
    )
    .then((res) => {
      useFavoritos.deleteItemFavorito(existItemInFav[0]._id!);
      like.value = false;

      toast.success("Se ha eliminado el lote de su lista de favoritos");
    });
};

onMounted(() => {
  if (existItem().length > 0) {
    exist.value = true;
  }

  if (existFav().length > 0) {
    like.value = true;
  }
});

/* 
const carouselRef = ref()
  onMounted(() => {
    setInterval(() => {
      if (!carouselRef.value) return

      if (carouselRef.value.page === carouselRef.value.pages) {
        return carouselRef.value.select(0)
      }

      carouselRef.value.next()
    }, 3000)
}) 
*/

// const 

watch(useCart.cart, () => {
  //no se si sea el nuxt, pero en ocaciones aunque detecta el cambio es como si ese cambio no se a terminado de aplicar en useCart.cart, por eso agregue el timeout, hay que probar si con el build funciona sin problemas y se elimina el tiempo de espera.
  setTimeout(() => {
    const existItemInCart = useCart.cart.filter(
      (item) => item._id === lote.value._id
    );

    if (existItemInCart.length == 0) {
      exist.value = false;
    }
  }, 3000);
});
</script>

<style scoped lang="scss">
.btn-addCart:disabled {
  background-color: #cecece;
}

.solicitar-muestra {
  display: flex;
  flex-direction: column;

  span {}

  button {
    font-size: 1em;
    text-align: left;
    width: fit-content;
    margin-bottom: 0.5rem;
    text-decoration: underline;
    cursor: pointer;
  }
}

.modal-muestra {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  margin: 0 auto;
  z-index: 50;
  padding-top: 4rem;
  background-color: rgba(0, 0, 0, 0.25);

  .container-info-muestra {
    min-width: 60%;
    background-color: #fff;
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.3);

    h1 {
      font-size: 1.3em;
      font-weight: 600;
      color: #515151;
    }
  }
}
</style>
