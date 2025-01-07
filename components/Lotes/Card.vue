<template>
  <div v-if="item" class="relative z-0 mx-auto w-auto">
    <NuxtLink
      :to="`/lote/${item._id}`"
      class="relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full"
    >
      <div class="shadow  rounded-lg bg-white">
        <div
          class="flex justify-center relative rounded-t-lg overflow-hidden h-40"
        >
          <div
            class="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full"
          >
            <div
              v-if="item.galeria && item.galeria.length === 0"
              class="absolute inset-0 bg-black opacity-10 flex justify-center items-center"
            >
              <UIcon name="i-heroicons-photo" class="text-white text-[150px]" />
            </div>
            <div v-else class="absolute inset-0">
              <USkeleton
                v-if="loadingImg"
                class="w-full h-full"
                :ui="{
                  background: 'bg-secundary',
                }"
              />
              <img
                :src="item.galeria![0].link"
                alt=""
                @load="loadingImg = false"
              />
            </div>
          </div>

          

          <!-- <span
            class="absolute top-0 left-0 inline-flex mt-3 ml-3 px-3 py-2 rounded-lg z-10 bg-red-500 text-sm font-medium text-white select-none"
          >
            Destacado
          </span> -->
        </div>
        <div class="p-4">
          <div class="mt-1 mb-1 transition-all duration-1000 capitalize ">
            <UTooltip
              :text="item.nombre"
              :popper="{ placement: 'bottom-start' }"
              :ui="{
                background: 'bg-dar',
                color: 'text-white',
              }"
              class="w-full"
            >
              <h2
                class="font-bold text-base md:text-lg w-full truncate text-gray-600 transition-all duration-1000"
              >
                {{ item.nombre }}
              </h2>
            </UTooltip>
            <div
              class="font-medium items-center text-sm truncate text-gray-700 transition-all duration-600"
            >
              <div class="flex gap-1">
                <p class="mb-2">
                  {{ item.productor!.nombre }}
                </p>
                <UIcon
                  name="i-heroicons-check-badge-20-solid"
                  class="text-base text-primary-500"
                />
              </div>
            </div>
            <div>
              <div
                v-if="item.muestra?.muestra && item.muestra.muestraGratis"
                class="text-primary-600 hover:text-primary-700 items-center w-full flex text-xs"
              >
                <UIcon name="i-heroicons-check-20-solid" class="text-lg" />
                <p class="uppercase">Muestra gratis disponible</p>
              </div>
              <div
                v-else-if="item.muestra?.muestra && !item.muestra.muestraGratis"
                class="text-stone-600 hover:text-stone-700 font-bold flex items-center text-xs"
              >
                <UIcon name="i-heroicons-check-20-solid" class="text-lg" />
                <p class="uppercase">Muestra disponible en {{ item.muestra.precio }}$ por {{ item.muestra.cantidad }}/LB</p>
              </div>
              <div
                v-else-if="!item.muestra?.muestra"
                class="text-red-600 hover:text-red-700 font-bold flex items-center text-xs"
              >
                <UIcon name="i-heroicons-x-circle-20-solid" class="text-lg" />
                <p class="uppercase">Muestra no disponible</p>
              </div>
            </div>
          </div>
          <div class="border-t pt-2">
            <div class="pb-4">
              <p
              v-for="campo, key in campos" 
                class="flex justify-between p-2 text-sm text-gray-700 capitalize"
              >
                <span class="mt-2 xl:mt-0 font-bold"> {{ key }}: </span>
                <div class="flex gap-1">
                  <span v-if="campo.value === 'perú'" >{{ campo.icon }}</span>
                  <span>{{ campo.value }}</span>
                </div>
              </p>
            </div>
            <div class="grid grid-cols-1 pt-4 border-t">
              <!-- <div class="flex items-center">
                <div class="relative">
                  <Avatar
                    :picture="
                      useUser.dataUser.picture ? useUser.dataUser.picture : ''
                    "
                  />
                </div>
              </div> -->
  
              <div class="flex justify-end wrap-footer">
                <p
                  class="inline-block font-semibold text-gray-700 whitespace-nowrap leading-tight rounded-xl"
                >
                  <span class="text-xl uppercase"> $ </span>
                  <span class="text-xl"
                    >{{ item.precio!.toString().replace(".", ",") }} USD/<b
                      class="text-base"
                      >kg</b
                    ></span
                  >
                </p>
  
                <p class="block capitalize">En Origen</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import type { Lotes } from "~/interfaces/Lotes";
const props = defineProps<{ item: Lotes }>();

interface Campos {
  pais:{
    icon: string,
    value: string
  },
  origen:{
    icon: string,
    value: string
  },
  proceso:{
    icon: string,
    value: string
  },
  puntaje:{
    icon: string,
    value: string
  },
  cantidad:{
    icon: string,
    value: string
  }
}
const campos:Ref<Campos > = ref({} as Campos);

const loadingImg = ref(true);

console.log(props)

  campos.value ={
      pais: {
        icon: "🇵🇪",
        value: props.item.pais!,
      },
      origen: {
        icon: "🇵🇪",
        value: props.item.origen!,
      },
      proceso: {
        icon: "",
        value: props.item.proceso!,
      },
      puntaje: {
        icon: "",
        value: props.item.puntaje!.toFixed(2),
      },
      cantidad: {
        icon: "",
        value: '195 x 70 kg',
      },
    }

</script>

<style>
.title-id {
  font-size: 0.8em;
}

.wrap-footer {
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: end;
  align-items: end;
}
</style>
