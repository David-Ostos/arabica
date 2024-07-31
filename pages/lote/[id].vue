<template>
  <div class="my-10">
    <div class="grid grid-cols-7 gap-8 mx-20">
      <!-- Galeria del lote -->
      <div class="col-span-4 h-screen-topBar-footer overflow-hidden h-ful shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-xl p-4">
        <div
          class="grid grid-cols-4 col-span-2 grid-rows-4 gap-4 h-full"
        >
          <div class="row-span-2 col-span-4">
            <img
              :src="galeria[0]"
              class="rounded-xl h-full w-full object-cover"
              alt=""
            />
          </div>

          <div
            class="flex justify-around items-center row-span-2 gap-4 col-span-4 h-full w-full"
          >
            <div
              v-for="img in galeria.slice(1)"
              class="h-full w-full flex items-center justify-between"
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
                  :src="img"
                  class="rounded-xl h-full w-full object-cover"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- card del lote -->
      <div
        class="col-span-3 h-screen-topBar-footer p-4 rounded-xl border flex flex-col justify-between h-ful shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 "
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
                  v-if="lote.productor.picture"
                  :src="lote.productor.picture"
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
                v-if="like === true"
                name="i-heroicons-heart"
                class="cursor-pointer"
                @click="like = !like"
              />
              <UIcon
                v-if="like === false"
                class="text-rose-500 cursor-pointer"
                name="i-heroicons-heart-16-solid"
                @click="like = !like"
              />
              <UIcon
                class="text-3xl text-gray-500"
                name="i-heroicons-arrow-up-tray"
              />
            </div>
          </div>

          <div class="flex flex-col gap-10">
            <h2
              class="font-bold text-base md:text-2xl text-gray-700 line-clamp-2 hover:line-clamp-none transition-all duration-1000"
            >
              {{ lote.nombre }}
            </h2>
            <div
              class="flex items-center text-xl text-primary-600 font-bold gap-1 hover:text-primary"
            >
              <p class="">
                {{ lote.productor.nombre }}
              </p>
              <UIcon class="" name="i-heroicons-check-badge-20-solid" />
            </div>
          </div>
        </div>
        <UDivider class="" />
        <div class="flex flex-col gap-10">
          <p
            class="uppercase text-4xl text-gray-700 whitespace-nowrap leading-tight rounded-xl font-bold tracking-wider"
          >
            {{ lote.precio.toString().replace(".", ",") }} usd / lb
          </p>
          <span v-if="lote.pruebaGratis"class="uppercase font-bold text-stone-700 text-2xl"
            >Puedes solicitar muestra Gratis.</span
            >
            <span v-if="!lote.pruebaGratis"class="uppercase font-bold text-stone-700 text-2xl"
            >solicitar muestra</span>
        </div>
        <UButton class="text-center py-2 text-4xl mx-auto justify-center w-full"
          >OFERTAR</UButton
        >
      </div>
      <!-- /card del lote -->

      <!-- datos del lote  -->
      <div
        class="col-span-4 h-screen-topBar-footer overflow-hidden p-4 border h-ful shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-xl "
      >
      <ProductorLotesAcordion :items="item"/>
      </div>
      <!-- ubicación -->
      <div class="col-span-3 h-screen-topBar-footer p-4  border h-ful shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-xl ">
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
import type {Lotes} from "~/interfaces/Lotes";

definePageMeta({
  layout: "lote",
})

const like = ref(false);

const route = useRoute();
const useLotes = useLotesStore();

console.log(route.params.id);
const loadingImg = ref(false);

const lotes: Lotes[] = useLotes.lotes.filter(
  (lote) => lote._id === route.params.id
);
const lote = ref(lotes[0]);
const galeria = ref();

console.log(lote.value);

if (lote.value.galeria.length === 0) {
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
} else if (lote.value.galeria.length < 4) {
  galeria.value = [
    ...lote.value.galeria,
    ...Array(4 - lote.value.galeria.length).fill({
      img: "i-heroicons-photo",
      enty: true,
    }),
  ];
} else if (lote.value.galeria.length === 4) {
  galeria.value = lote.value.galeria;
}


const item = [{
  id:"1",
  label: 'DATOS DEL CAFÉ',
  slot:'datos',
  contenido:{
    origen: lote.value.origen,
    productor: lote.value.productor.nombre,
    variedad: lote.value.variedad,
    proceso: lote.value.proceso,
    puntaje: lote.value.score,
  },
  isActive: true
},{ 
  id:"2",
  label: 'ANÁLISIS SENSORIAL',
  slot: 'analisis',
  contenido: {
    catador: '-',
    puntaje: '-',
    'análisis sensorial': '-',
    'gráfico araña sensorial': '-',
  },
  isActive: true
},/* {
    id:"3",
    label: 'HISTORIA DEL CAFÉ',
    slot: 'historia',
    contenido: lote.value.descripcion,
    isActive: true
  }, */
]

</script>

<style></style>
