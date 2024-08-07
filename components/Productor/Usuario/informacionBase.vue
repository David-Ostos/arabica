<template>
<div class="h-full my-auto mt-14">
    <div
      class=" rounded-xl shadow w-fit h-fit mx-auto  bg-white  overflow-auto font-raleway"
    >
      <h1 class="px-8 pt-4 uppercase text-gray-500 text-xs font-bold">
        INFORMACIÓN BÁSICA
      </h1>
      <UForm
        :schema="schema"
        :state="state"
        @submit="onSubmit"
        class="flex flex-col p-8"
      >
        <div class="grid grid-cols-5 gap-8">
          <div class="grid grid-cols-2 col-span-3 gap-8 h-fit capitalize">
            <UFormGroup
              required
              class="col-span-1 h-fit"
              label="Nombre"
              name="nombre"
            >
              <UInput
                placeholder="Nombre"
                size="xl"
                icon=""
                class="capitalize"
                :ui="{}"
                v-model="state.nombre"
              />
            </UFormGroup>
            <UFormGroup
              required
              label="Apellido"
              name="apellido"
              class="col-span-1"
            >
              <UInput
                placeholder="Apellido"
                icon=""
                v-model="state.apellido"
                size="xl"
              />
            </UFormGroup>
            <UFormGroup required class="col-span-2" label="Correo" name="email">
              <UInput
                placeholder="ejemplo@gmai.com"
                icon="i-heroicons-envelope"
                v-model="state.email"
                size="xl"
              />
            </UFormGroup>
  
            <UFormGroup
              required
              class="col-span-2"
              label="Contraseña"
              name="contraseña"
              :help="state.password ? '' : 'Puedes agregar tu contraseña aqui'"
            >
              <UInput
                placeholder="*************"
                icon=""
                v-model="state.password"
                type="password"
                size="xl"
              />
            </UFormGroup>
          </div>

          <div class="col-span-2 p-4">
            <span class="text-gray-500 font-semibold">Avatar</span>

            <div
              class="relative flex flex-col justify-center items-center border- rounded-xl h-64 w-full shadow- -inner bg-gray-1000"
            >
              <div
                v-if="state.picture"
                class="absolute top-4 right-4 p-2 rounded-full flex justify-center items-center border bg-white shadow hover:brightness-95 cursor-pointer"
              >
                <UIcon
                  name="i-heroicons-camera"
                  class="text-primary-600 h-9 w-9"
                />
              </div>
              <div class="w-full">
                <USkeleton
                  class="h-48 w-48 bg-dark"
                  :ui="{rounded: 'rounded-full'}"
                  v-show="!loadingImg"
                />
                <div v-show="loadingImg">
                  <div
                    v-if="!state.picture"
                    class="py-8 rounded-xl w-full border shadow-inner bg-gray-100 flex flex-col justify-center items-center text-gray-700"
                  >
                    <UIcon name="i-heroicons-photo" class="text-8xl" dynamic />
                    <UButton class="font-semibold"
                      >Subir una nueva imagen</UButton
                    >
                  </div>
                  <img
                    v-else
                    onload="loadingImg = false"
                    :src="state.picture"
                    class="rounded-full h-48 w-48 shadow"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <span class="text-xs text-gray-500 font-semibold mx-auto w-[max-content] flex"
              >Al menos 200 por 200 píxeles. Tamaño máximo 6MB.</span
            >
          </div>

        </div>
        <UButton
          class="w-fit self-end px-3 py-[10px] font-bold"
          :ui="{
            variant: {
              solid: 'bg-{color}-600',
            },
          }"
          type="submit"
          :loading="loading"
        >
          Guardar cambios
        </UButton>
      </UForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {object, string, type InferType} from "yup";
import type {FormSubmitEvent} from "#ui/types";
import type {User} from "~/interfaces/Users";

const useUser = useUserStore();
const loading = ref(false);
const loadingImg = ref(true);


const schema = object({
  nombre: string().required("Este campo es requerido"),
  apellido: string().required("Este campo es requerido"),
  email: string().email().required("Este campo es requerido"),
});

type Schema = InferType<typeof schema>;

const state: User = reactive({
  nombre: useUser.dataUser.nombre,
  apellido: useUser.dataUser.apellido,
  email: useUser.dataUser.email,
  password: useUser.dataUser.password,
  picture: useUser.dataUser.picture,
});


async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data);
}
</script>

<style scoped>
.h-formulario {
  height: calc(100vh - 200px);
}
</style>
