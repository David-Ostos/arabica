<template>
  <section
    class="bg-gray-100 dark:bg-dark min-h-screen flex box-border justify-center items-center"
  >
    <div class="bg-white dark:bg-stone-800  rounded-2xl flex max-w-4xl p-5 items-center">
      <div class="md:w-1/2 px-8">
        <h2 class="font-bold text-3xl text-white text-center mb-4">Regístrate en <B class="text-primary">{{ nombreWeb }}</B></h2>

        <TipoUser/>

        <UForm
          class="w-full  p-5 rounded-lg lg:rounded-l-none sm:px-8 space-y-4 pt-6 pb-8 mb-4 "
          :schema="schema"
          :state="state"
          @submit="onSubmit"
          >
              <!-- nombre y apellido-->
              <div class="flex justify-between gap-4 max-w-[540px] mx-auto ">
                <UFormGroup  label="Nombre" name="nombre" required>
                  <UInput
                    v-model="state.nombre"
                    placeholder="Nombre"
                    size="xl"
                    :required="true"
                    icon="i-heroicons-user"
                    class="[&_input]:dark:bg-stone-800"
                  />
                </UFormGroup>

                <UFormGroup  label="Apellido" name="apellido" required>
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
                <UFormGroup  label="Email" name="email" required>
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
                <UFormGroup  label="Password" name="password" required>
                  <UInput
                    v-model="state.password"
                    type="password"
                    placeholder="***************"
                    size="xl"
                    icon="i-heroicons-lock-closed"
                    class="[&_input]:dark:bg-stone-800"
                  />
                </UFormGroup>

                <UFormGroup  label="Confirmar Password" name="password" required>
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

              <BotonPrimary class="text-center text-white pt-4" contenido="Registrar Cuenta" />
              
              <!-- /boton registro -->
            </UForm>

        <!-- <form action="" class="flex flex-col gap-4">
          <input
            class="p-2 mt-8 rounded-xl border"
            type="email"
            name="email"
            placeholder="Email"
          />
          <div class="relative">
            <input
              class="p-2 rounded-xl border w-full"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="gray"
              id="togglePassword"
              class="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer z-20 opacity-100"
              viewBox="0 0 16 16"
            >
              <path
                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
              ></path>
              <path
                d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
              ></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-eye-slash-fill absolute top-1/2 right-3 -z-1 -translate-y-1/2 cursor-pointer hidden"
              id="mama"
              viewBox="0 0 16 16"
            >
              <path
                d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"
              ></path>
              <path
                d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"
              ></path>
            </svg>
          </div>
          <button
            class="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
            type="submit"
          >
            Login
          </button>
        </form> -->
        
        <div class=" items-center text-gray-100">
          <hr class="border-gray-300" />
          <p class="text-center text-sm ">O</p>
          <hr class="border-gray-300" />
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
                  class="inline-block text-sm align-baseline dark:hover:text-primary-300 hover:text-primary-500"
                  to="/auth/forget"
                >
                  ¿Olvidaste la contraseña?
                </NuxtLink>
              </div>
              <div class="text-center ">
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
import {ref} from "vue";
import {useUserStore} from "@/stores/user";
import TipoUser from "~/components/Auth/Registro/TipoUser.vue";
import {object, string, type InferType} from "yup";
import type {FormSubmitEvent} from "#ui/types";
import BotonPrimary from "~/components/Botones/BotonPrimary.vue";


definePageMeta({
  layout: 'auth'
})

const useuser = useUserStore();
const router = useRouter();

const nombreWeb = import.meta.env.VITE_NOMBRE_1
const nombre = ref("");
const apellido = ref("");
const email = ref("");
const phone = ref("");
const password = ref("");
const rePassword = ref("");

const createUser = async () => {
  const name = ref(nombre.value + " " + apellido.value);

  if (password.value !== rePassword.value) {
    alert("Las contraseñas no coinciden");
    return false;
  } else if (rePassword.value === "" || password.value === "") {
    alert("ingrese la contraseña");
    return false;
  }
  // const response = await store.register(name.value, email.value, phone.value, password.value);

  //   if (!response) {
  //     nombre.value ='';
  //     apellido.value ='';
  //     email.value ='';
  //     phone.value ='';
  //     password.value ='';
  //     rePassword.value ='';
  //   } else {
  //     router.push('/');
  //   }
};

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

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data);
}

</script>
