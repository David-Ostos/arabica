<template>
  <div class="h-screen w-full py-8 dark:bg-dark">
    <div
      class="flex rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl sm:pt-10"
    >
      <div
        class="hidden lg:block lg:w-1/2 bg-cover bg-[url('/../img/login.jpeg')]"
      ></div>
      <div class="w-full p-8 lg:w-1/2 bg-white">
        <h2 class="text-2xl font-semibold text-gray-700 text-center">
          Bienvenido
        </h2>
        <p class="text-xl text-gray-600 text-center">Inicia Sesión!</p>
        
        <UForm
          class="w-full p-5 rounded-lg lg:rounded-l-none sm:px-8 space-y-4 pt-6 pb-8 mb-4"
          :schema="schema"
          :state="state"
          @submit="onSubmit"
        >
          <!-- email -->
          <div class="max-w-[540px] mx-auto">
            <UFormGroup label="Email" name="email" required>
              <UInput
                v-model="state.email"
                placeholder="Email"
                size="xl"
                icon="i-heroicons-envelope"
                class="[&_input]:dark:bg-stone-800"
              />
            </UFormGroup>
          </div>
          <!-- /email -->

          <!-- password -->
          <div class="max-w-[540px] mx-auto">
            <UFormGroup label="Password" name="password" required>
              <UInput
                v-model="state.password"
                type="password"
                placeholder="***************"
                size="xl"
                icon="i-heroicons-lock-closed"
                class="[&_input]:dark:bg-stone-800 z-10"
              />
            </UFormGroup>
            <NuxtLink
            class="inline-block text-sm align-baseline !text-primary hover:!text-primary-700"
            to="/auth/forget"
          >
            ¿Olvidaste la contraseña?
          </NuxtLink>
          </div>
          <!-- /password -->
        </UForm>

        <div class="mt-8 w-fit mx-auto">
          <button
            class="bg-primary text-white font-bold py-2 px-[100px] w-full rounded hover:bg-primary-600"
          >
            Inicia Sesión
          </button>
        </div>
        <div class="mt-4 flex items-center justify-between">
          <span class="border-b w-1/6 md:w-1/5"></span>

          <p class="text-center text-gray-700">O Inicia Sessión con Google</p>

          <span class="border-b w-1/6 md:w-1/5"></span>
        </div>

        <!-- google -->
        <div
          class="flex justify-center mx-auto px-12 py-4 items-center gap-4 w-fit rounded-full"
        >
          <BotonGoogle />
          <!-- <p >Inicia Sessión con Google</p> -->
        </div>

        <!-- /google -->
        <div class="mt-4 flex items-center justify-between">
          <span class="border-b w-1/5 md:w-1/4"></span>


          <!-- registrate -->
          <NuxtLink
            to="/auth/registro"
            class="text-xs !text-primary hover:!text-primary-700 uppercase"
            >¿No tienes cuenta? Registrate</NuxtLink
          >
          <!-- /registrate -->

          <span class="border-b w-1/5 md:w-1/4"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {object, string, type InferType} from "yup";
import type {FormSubmitEvent} from "#ui/types";
import BotonGoogle from "~/components/Botones/BotonGoogle.vue";
import TipoUserModal from "~/components/Modals/TipoUser.modal.vue";

definePageMeta({
  layout: "auth",
});


const schema = object({
  email: string().email("Invalid email").required("Requerido"),
  password: string()
    .min(8, "Must be at least 8 characters")
    .required("Requerido"),
});

type Schema = InferType<typeof schema>;

const state = reactive({
  email: undefined,
  password: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data);
}

let email = ref("");
let password = ref("");
</script>

<style scoped lang="scss">

</style>
