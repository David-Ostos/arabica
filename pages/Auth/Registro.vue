<template>
  <section
    class="bg-gray-100 dark:bg-dark min-h-screen flex box-border justify-center items-center py-6"
  >
    <div
      class="bg-white dark:bg-stone-800 rounded-2xl flex max-w-4xl p-5 items-center"
    >
      <div class="md:w-1/2 px-8">
        <h2 class="font-bold text-3xl text-white text-center mb-4">
          Regístrate en <B class="text-primary">{{ nombreWeb }}</B>
        </h2>

        <TipoUser @tipo-user="tipoU" />

        <UForm
          class="w-full p-5 rounded-lg lg:rounded-l-none sm:px-8 space-y-4 pt-6 pb-8 mb-4"
          :schema="schema"
          :state="state"
        >
          <!-- nombre y apellido-->
          <div class="flex justify-between gap-4 max-w-[540px] mx-auto">
            <UFormGroup label="Nombre" name="nombre" required>
              <UInput
                v-model="state.nombre"
                placeholder="Nombre"
                size="xl"
                :required="true"
                icon="i-heroicons-user"
                class="[&_input]:dark:bg-stone-800"
              />
            </UFormGroup>

            <UFormGroup label="Apellido" name="apellido" required>
              <UInput
                v-model="state.apellido"
                placeholder="Apellido"
                size="xl"
                icon="i-heroicons-user"
                :required="true"
                class="[&_input]:dark:bg-stone-800"
              />
            </UFormGroup>
          </div>
          <!-- /nombre y apellido -->

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
          <div class="flex justify-between max-w-[540px] gap-4 mx-auto">
            <UFormGroup label="Password" name="password" required>
              <UInput
                v-model="state.password"
                type="password"
                placeholder="***************"
                size="xl"
                icon="i-heroicons-lock-closed"
                class="[&_input]:dark:bg-stone-800"
              />
            </UFormGroup>

            <UFormGroup label="Confirmar Password" name="password" required>
              <UInput
                v-model="state.rePassword"
                type="password"
                placeholder="***************"
                size="xl"
                class="[&_input]:dark:bg-stone-800"
                icon="i-heroicons-lock-closed"
              />
            </UFormGroup>
          </div>
          <!-- /password -->

          <!-- boton registro -->

          <BotonPrimary
            class="text-center text-white pt-4"
            contenido="Registrar Cuenta"
          />

          <!-- /boton registro -->
        </UForm>
        <div class="items-center text-dark ">
          <hr class="border-dark" />
          <p class="text-center text-sm py-1">O</p>
          <hr class="border-dark" />
        </div>
        <button
          class="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 dark:text-dark hover:bg-[#60a8bc4f] font-medium"
        >
          <svg
            class="mr-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="25px"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>

          Inicia Sessión con Google
        </button>
        <div class="text-center mt-4">
          <NuxtLink
            to="/auth/login"
            class="inline-block text-sm align-baseline dark:hover:text-primary-300 hover:text-primary-500"
          >
            ¿Tienes cuenta? ¡Inicia Sesión!
          </NuxtLink>
        </div>
      </div>
      <div class="md:block hidden w-1/2">
        <img
          class="rounded-2xl max-h-[1600px]"
          src="/img/registro.jpg"
          alt="login form image"
        />
      </div>
    </div>
  </section>
</template>
<style scoped></style>

<script setup lang="ts">
import {useUserStore} from "@/stores/user";
import TipoUser from "~/components/Auth/Registro/TipoUser.vue";
import {object, string, type InferType} from "yup";
import type {FormSubmitEvent} from "#ui/types";
import BotonPrimary from "~/components/Botones/BotonPrimary.vue";

definePageMeta({
  layout: "auth",
});

const useuser = useUserStore();
const router = useRouter();

const tipoUser:Ref<'comprador' | 'productor' | ''> = ref('') 

const tipoU = (tipo: 'comprador'| 'productor') =>{
  console.log(tipo);
}
const nombreWeb = import.meta.env.VITE_NOMBRE_1;

const schema = object({
  nombre: string().required("Requerido"),
  apellido: string().required("Requerido"),
  email: string().email("Invalid email").required("Requerido"),
  password: string()
    .min(8, "Must be at least 8 characters")
    .required("Requerido"),
  rePassword: string()
    .min(8, "Must be at least 8 characters")
    .required("Requerido"),
});

type Schema = InferType<typeof schema>;

const state = reactive({
  email: undefined,
  nombre: undefined,
  apellido: undefined,
  password: undefined,
  rePassword: undefined,
});

async function onSubmit(event: any) {
  // Do something with event.data
  console.log(event.data);
}
</script>
