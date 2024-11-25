<template>
    <div
      v-if="lotes.length > 0"
      class="md:pt-5 md:pb-10 transition-width ease-in-out duration-700 w-1 mx-auto flex-grow h-screen-topBar-footer overflow-auto min-[450px]:scrollbar-show max-[449px]:scrollbar-hide"
    >
      <!-- estos son los lotes visibles-->

      <div class="">
        <div
          class="flex gap-1 items-center my-4 md:mb-8 md:py-4 cursor-pointer text-gray-800 hover:!text-primary-600 transition-all duration-100 w-fit"
          @click="desplegar = !desplegar"
        >
          <h1 v-if="lotesVisibles.length > 1" class="font-bold text-base md:text-lg" @click="">
            {{ lotesVisibles.length }} Lotes Activos
          </h1>
          <h1 v-if="lotesVisibles.length <= 1" class="font-bold text-base md:text-lg" @click="">
            {{ lotesVisibles.length }} Lote Activo
          </h1>

          <div>
            <UIcon
              v-if="lotesVisibles.length !== 0"
              :class="desplegar ? 'rotate-180' : ''"
              name="i-material-symbols-keyboard-arrow-up-rounded"
              class="text-xl"
              dynamic
            />
            <UIcon
              v-if="lotesVisibles.length === 0"
              name="i-openmoji-hyphen-minus"
              dynamic
            />
          </div>

        </div>
        <div
          :class="[desplegar ? 'opacity-0 hidden ' : 'opacity-100']"
          class="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-between mr-4 transition-all ease-in-out duration-500 overflow-x-hidden "
        >
          <div
            v-for="item in lotesVisibles"
            class="col-span-1 mb-4 relative group "
          >
            <div
              class="absolute top-7 right-7 z-50 bg-white rounded-full flex text-3xl justify-center items-center transition-all ease-in-out duration-300 transform group-hover:-translate-y-2"
            >
              <UIcon
                v-if="isEdit"
                name="i-material-symbols-light-build-circle-outline"
                @click="toast.info(`Se va a editar el lote ${item.nombre}`, {
                  onClose(props) {
                      $router.push(`lotes/edit/${item._id}`)
                  },
                })"
                class="text-cyan-500 cursor-pointer hover:bg-white hover:scale-110 rounded-full"
                dynamic
              />

              <UIcon
                v-if="isRemove"
                name="i-heroicons-x-circle"
                @click="removeLote(item._id! ,item.nombre!)"
                class="text-rose-600 cursor-pointer hover:bg-white hover:scale-110 rounded-full"
                dynamic
              />

              <UIcon
                v-if="isShow"
                name="i-ic-baseline-remove-circle-outline"
                @click="ocultarLote(item._id!, item.ocultar!, item.nombre!)"
                class="text-secundary cursor-pointer hover:bg-white hover:scale-110 rounded-full"
                dynamic
              />
            </div>
            <LotesCard :item="item" />
          </div>
        </div>
      </div>

      <!-- estos son los lotes ocultos -->

      <div class="border-t">
        <div
          class="flex gap-1 items-center mt-6 mb-4 md:mb-8 md:py-4 cursor-pointer text-gray-800 hover:!text-primary-600 transition-all duration-100 w-fit"
          @click="updateState('hiddenOcultos', true)"
        >
          <h1 v-if="lotesVisibles.length > 1" class="font-bold text-base md:text-lg" @click="">
            {{ lotesOcultos.length }} Lotes Ocultos
          </h1>
          <h1 v-if="lotesVisibles.length === 1" class="font-bold text-base md:text-lg" @click="">
            {{ lotesOcultos.length }} Lote Oculto
          </h1>
          <div>
            <UIcon
              v-if="lotesOcultos.length !== 0"
              :class="hiddenOcultos ? 'rotate-180' : ''"
              name="i-material-symbols-keyboard-arrow-up-rounded"
              class="text-xl"
              dynamic
            />
            <UIcon
              v-if="lotesOcultos.length === 0"
              name="i-openmoji-hyphen-minus"
              dynamic
            />
          </div>

        </div>
        <div
          :class="hiddenOcultos ? 'opacity-0 hidden ' : 'opacity-100'"
          class="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-between transition-all ease-in-out duration-500"
        >
          <div
            v-for="item in lotesOcultos"
            class="col-span-1- mb-4 relative group"
          >
            <div
              class="absolute top-7 right-7 z-50 bg-white rounded-full flex text-3xl justify-center items-center transition-all ease-in-out duration-300 transform group-hover:-translate-y-2"
            >
              <UIcon
                v-if="isEdit"
                name="i-material-symbols-light-build-circle-outline"
                @click="
                toast.info(`Se va a editar el lote ${item.nombre}`, {
                  onClose(props) {
                      $router.push(`lotes/edit/${item._id}`)
                  },
                })"
                class="text-cyan-500 cursor-pointer hover:bg-white hover:scale-110 rounded-full"
                dynamic
              />

              <UIcon
                v-if="isRemove"
                name="i-heroicons-x-circle"
                @click="
                removeLote(item._id! , item.nombre!)
                "
                class="text-rose-600 cursor-pointer hover:bg-white hover:scale-110 rounded-full"
                dynamic
              />

              <UIcon
                v-if="isShow"
                name="i-hugeicons-plus-sign-circle"
                @click="ocultarLote(item._id!, item.ocultar!, item.nombre!)"
                class="text-primary cursor-pointer hover:bg-white hover:scale-110 rounded-full"
                dynamic
              />
            </div>
            <LotesCard class="opacity-55" :item="item" />
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts" setup>
import { toast } from 'vue3-toastify';
import type { Lotes } from '~/interfaces/Lotes';

const props = defineProps<{
  lotes: Lotes[],
  lotesVisibles: Lotes[],
  lotesOcultos: Lotes[],
  isEdit : boolean,  
  isRemove : boolean,
  isOpenModal : boolean,
  isShow : boolean,
  hiddenOcultos: boolean,
}>()

const emit = defineEmits<{
  (e: 'updateState', key: string, value: boolean): void
  (e: 'ocultarLote', id: string, ocultar: boolean, nombre: string): void
  (e: 'dataDeleteModal',id: string, nombre: string): void
}>()

const desplegar = ref(false)

const updateState = (key: string, value: boolean) => {
  emit('updateState', key, value)
}

const ocultarLote = (id: string, ocultar: boolean, nombre: string) => {
  emit('ocultarLote', id, ocultar, nombre)
}

const router = useRouter()

const editLote = (id: string, nombre: string) => {
  toast.info(`Se va a editar el lote ${nombre}`, {
    onClose: () => router.push(`lotes/edit/${id}`)
  })
}

const removeLote = (id: string, nombre: string) => {
  updateState('isOpenModal', true)
  emit('dataDeleteModal', id ,nombre )
}

</script>

<style>

</style>