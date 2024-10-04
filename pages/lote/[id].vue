<template>
  <div class="my-20">
    <div class="modal-muestra" v-if="modalMuestra">
      <div class="container-info-muestra">
        <div class="flex justify-between">
          <h1>Solicitar muestras</h1>
          <button @click="modalMuestra = false">
            <span class="i-heroicons-x-mark"></span>
          </button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-7 gap-8 mx-20">
      <!-- Galeria del lote -->
      <div
        class="col-span-4 h-screen-topBar-footer overflow-hidden h-ful shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-xl p-4"
      >
        <div class="grid grid-cols-4 col-span-2 grid-rows-4 gap-4 h-full">
          <div class="row-span-2 col-span-4">
            <img
              :src="galeria[0].link"
              class="rounded-xl h-full w-full object-cover"
              alt=""
            />
          </div>

          <div
            class="flex justify-around items-center row-span-2 gap-4 col-span-4 h-full w-full"
          >
            <div
              v-for="img in galeria.slice(1)"
              class="h-full w-full flex items-center justify-between overflow-hidden rounded-xl"
            >
              <div
                v-if="img.enty === true"
                class="border px-4 h-56 w-56 rounded-xl flex items-center"
              >
                <UIcon
                  :name="img.img"
                  class="rounded-xl h-28 w-full object-cover opacity-55"
                  alt=""
                />
              </div>
              <div v-else class="rounded-xl">
                <img
                  :src="img.link"
                  class="rounded-xl h-72 w-56 object-cover"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- card del lote -->
      <div
        class="col-span-3 h-screen-topBar-footer p-4 rounded-xl border flex flex-col justify-between h-ful shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
      >
        <div class="">
          <div class="flex items-center justify-between mb-8">
            <div class="overflow-hidden rounded-xl h-24 w-24">
              <USkeleton
                v-if="!loadingImg"
                class="h-24 w-24 rounded-xl"
                :ui="{
                  background: 'bg-secundary',
                }"
              />

              <div class="h-24 w-24 rounded-xl">
                <img
                  v-if="lote.productor!.picture"
                  :src="lote.productor!.picture"
                  @load="loadingImg = true"
                  class="rounded-xl"
                  alt=""
                />
                <div
                  v-else
                  class="flex justify-center items-center h-24 bg-gray-300"
                >
                  <UIcon name="i-heroicons-photo" class="rounded-xl" />
                </div>
              </div>
            </div>

            <div class="text-4xl flex gap-4 items-center">
              <UIcon
                v-if="!like"
                name="i-heroicons-heart"
                class="cursor-pointer"
                @click="addFavorite"
              />
              <UIcon
                v-if="like"
                class="text-rose-500 cursor-pointer"
                name="i-heroicons-heart-16-solid"
                @click="deleteFavorite"
              />
              <UIcon
                class="text-3xl text-gray-500"
                name="i-heroicons-arrow-up-tray"
                @click="copiarUrl"
              />
            </div>
          </div>

          <div class="flex flex-col gap-3">
            <h2
              class="font-bold text-base md:text-2xl text-gray-700 line-clamp-2 hover:line-clamp-none transition-all duration-1000"
            >
              {{ lote.nombre }}
            </h2>
            <NuxtLink :to="`/perfil/${lote.productor?._id}`"
              class="cursor-pointer flex items-center text-xl text-primary-600 font-bold gap-1 hover:text-primary"
            >
              <p class="">
                {{ lote.productor!.nombre }}
              </p>
              <UIcon class="" name="i-heroicons-check-badge-20-solid" />
            </NuxtLink>
          </div>
        </div>
        <UDivider class="" />
        <div class="flex flex-col gap-3">
          <p
            class="uppercase text-3xl text-gray-700 whitespace-nowrap leading-tight rounded-xl font-bold tracking-wider"
          >
            {{ lote.precio!.toString().replace(".", ",") }} usd / lb
          </p>

          <div v-if="lote.pruebaGratis" class="solicitar-muestra">
            <span class="uppercase font-bold text-stone-600 text-1xl"
              >Puedes solicitar muestra Gratis.</span
            >

            <button @click="modalMuestra = true">SOLICITAR MUESTRA</button>
          </div>
          <span
            v-if="!lote.pruebaGratis"
            class="uppercase font-bold text-stone-700 text-2xl"
            >no posee muestra gratis</span
          >
        </div>
        <UButton
          class="text-center py-2 text-4xl mx-auto justify-center w-full btn-addCart"
          :disabled="exist === true ? true : false"
          @click="addCart"
          >LO QUIERO</UButton
        >
      </div>
      <!-- /card del lote -->

      <!-- datos del lote  -->
      <div
        class="col-span-4 h-screen overflow-hidden p-4 border h-ful shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-xl"
      >
        <LotesAcordion :items="item" />
      </div>
      <!-- ubicación -->
      <div
        class="col-span-3 h-screen p-4 border h-ful shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-xl"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16138252.902658958!2d-85.72576594757281!3d-9.06347592792652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c850c05914f5%3A0xf29e011279210648!2zUGVyw7o!5e0!3m2!1ses!2sve!4v1721330794106!5m2!1ses!2sve"
          class="border-none rounded-md w-full h-full"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BotonPrimary from "~/components/Botones/BotonPrimary.vue";
import type { Lotes } from "~/interfaces/Lotes";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { useCartStore } from "../../stores/cart";
import { useUserStore } from "../../stores/user";
import axios from "axios";
import { useFavoritosStore } from "~/stores/favoritos";

definePageMeta({
  layout: "lote",
});

const router = useRoute();
const exist = ref(false);

const copiarUrl = () => {
  const url = window.location.href;
  navigator.clipboard
    .writeText(url)
    .then(() => {
      toast.success("¡URL copiada al portapapeles!");
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
const loadingImg = ref(false);

const lotes: Lotes[] = useLotes.lotes.filter(
  (lote) => lote._id === route.params.id
);
const lote = ref(lotes[0]);
const galeria = ref();

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
      departamento: lote.value.departamento,
      variedad: lote.value.variedad,
      proceso: lote.value.proceso,
      puntaje: lote.value.puntaje,
      productor: lote.value.productor!.nombre,
      perfil: lote.value.perfil,
      "cantidad del lote": lote.value.cantidadLote,
      pais: lote.value.pais,
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
      `${import.meta.env.VITE_URL_API}/api/content/item/favoritos/${
        existItemInFav[0]._id
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

  span {
  }

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
