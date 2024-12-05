<template>
  <div class="flex flex-col gap-8">
    <div
      class="flex gap-1 items-center justify-between shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:-text-dar ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-full py-2 px-3"
    >
      <div>
        <p>
          Historia de
          <b class="text-primary capitalize">{{
            useProductor.perfilProductor.nombre
          }}</b>
        </p>
      </div>
      <UIcon
        name="i-ph-pencil-fill"
        class="cursor-pointer text-primary self-stretch  text-xl p-1 box-content"
        dynamic
        @click="isOpen = true"
      />
    </div>
    <div class="">
      <UTextarea
        :ui="{
          base: 'disabled:cursor-text h-[333px] overflow-auto',
        }"
        class="shadow-md"
        size="sm"
        disabled
        color="gray"
        variant="outline"
        placeholder="Todavia no has proporcionado tu descripción..."
        :model-value="useProductor.perfilProductor.descripcion"
      />
    </div>
    <ProductorPerfilPanoramicaImagenesDestacadas />
  </div>

  <!-- Modals -->

  <div>
    <div>
      <UModal v-model="isOpen">
        <UCard
          :ui="{
            ring: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          }"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <h3
                class="text-base font-semibold leading-6 text-gray-900 dark:-text-dar"
              >
                Editar Historia
              </h3>
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-x-mark-20-solid"
                class="-my-1"
                @click="isOpen = false"
              />
            </div>
          </template>

          <UForm
            :schema="schema"
            :state="state"
            class="space-y-4"
            @submit="onSubmit"
          >
            <UFormGroup label="Nombre" name="email">
              <UInput class="capitalize" v-model="state.nombre" />
            </UFormGroup>

            <UFormGroup label="Descripcíon" name="password">
              <UTextarea v-model="state.descripcion" type="password" />
            </UFormGroup>

            <UButton :loading="isLoading" type="submit"> Guardar </UButton>
          </UForm>
        </UCard>
      </UModal>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {object, string, type InferType} from "yup";
import type {FormSubmitEvent} from "#ui/types";
import axios from "axios";
import {toast} from "vue3-toastify";
const useUser = useUserStore();
const useProductor = useProductorStore();

const isOpen = ref(false);
const isLoading = ref(false);

const schema = object({
  nombre: string().required("Requerido"),
  descripcion: string()
    .min(20, "Debe tener por lo menos 20 caracteres")
    .optional(),
});

type Schema = InferType<typeof schema>;

  onUpdated(()=>{
    if(!isOpen.value){
      state.nombre = useProductor.perfilProductor.nombre;
      state.descripcion = useProductor.perfilProductor.descripcion;
      isLoading.value = false
    }
  })
const state = reactive({
  nombre: useProductor.perfilProductor.nombre,
  descripcion: useProductor.perfilProductor.descripcion,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data

  const {nombre, descripcion} = event.data;
  const descripcionSinEspacio = descripcion?.trim();

  isLoading.value = true;

  if (
    nombre === useProductor.perfilProductor.nombre &&
    descripcion === useProductor.perfilProductor.descripcion
  ) {
    isLoading.value = false;
    isOpen.value = false;
    toast.success("Se conservaron los mismos datos.");
    return false;
  } else {
    try {
      let productorExistente = false;
      let id ;

      try {
        const resGet = await axios.get(
          `${
            import.meta.env.VITE_URL_API
          }/api/content/item/productores?filter={'nombre': '${nombre
            .trim()
            .toLowerCase()}'}&fields={'_id':true}`,
          {
            headers: {
              "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
            },
          }
        );
        if (resGet.data) {
          productorExistente = true;
          id = resGet.data
        }
      } catch (error) {
        {
          if (axios.isAxiosError(error) && error.response?.status !== 404) {
            // Si es un error diferente a 404, lo manejamos como excepción
            throw error;
          }
          // Si es 404, simplemente continuamos (el productor no existe)
        }
      }

      if (productorExistente && id._id !== useProductor.perfilProductor._id ) {
        toast.error("El nombre del productor ya está en uso.");
        isLoading.value = false;
        return false;
      } else {
        // @ts-ignore
        await axios(
          // @ts-ignore
          {
            url: `${import.meta.env.VITE_URL_API}/api/content/item/productores`,
            method: "POST",
            mode: "cors",
            headers: {
              "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
            },
            data: {
              data: {
                _id: useProductor.perfilProductor._id,
                nombre: nombre.trim().toLowerCase(),
                descripcion: descripcionSinEspacio,
              },
            },
          }
        )
          .then((res) => {
            useProductor.perfilProductor.nombre = nombre;
            useProductor.perfilProductor.descripcion = descripcionSinEspacio;
            isLoading.value = false;
            isOpen.value = false;
            toast.success("Se han actualizado los datos.");
          })
          .catch((err) => {
            console.log(err);
            isLoading.value = false;
          });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<style></style>
