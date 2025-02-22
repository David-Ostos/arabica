<template>
  <div class="bg-white dark:text-dar h-screen w-full py-8 dark:bg-white">
    <div
      class="flex rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl sm:pt-10"
    >
      <div
        class="hidden lg:block lg:w-1/2 bg-cover bg-[url('/../img/login.jpeg')]"
      ></div>
      <div class="w-full p-4 md:p-8 lg:w-1/2 bg-white">
        <h2 class="text-2xl font-semibold text-gray-700 text-center">
          Bienvenido
        </h2>
        <p class="text-xl text-gray-600 text-center">Inicia Sesión!</p>

        <UForm
          class="w-full  rounded-lg lg:rounded-l-none sm:px-8 space-y-4 pt-6 pb-8 mb-4"
          :schema="schema"
          :state="state"
          :validations="validations"
          @submit="onSubmit"
        >
          <!-- email -->
          <div class="max-w-[540px] mx-auto">
            <div
              v-if="noMatche === true"
              class="flex gap-1 items-center text-center border-red-500 border rounded-md text-red-500 text-sm p-4 mb-4 my-2 w-fit mx-auto"
            >
              <UIcon
                name="i-heroicons-exclamation-triangle"
                class="!text-yellow-500"
              />
              <p>Contraseña o correo incorrecto</p>
            </div>

            <UFormGroup
              label="Email"
              name="email"
              required
              :class="
                noMatche === true
                  ? ' [&_input]:focus:!ring-red-500 [&_input]:!ring-red-500 [&_input]:!text-red-500 [&_input]:placeholder:!text-red-500 [&_span]:!text-red-500 [&_p]:!block [&_label]:!text-red-500 '
                  : ''
              "
            >
              <UInput
                v-model="state.email"
                placeholder="Email"
                size="xl"
                icon="i-heroicons-envelope"
                class="[&_input]:dark:bg-white"
              />
            </UFormGroup>
          </div>
          <!-- /email -->

          <!-- password -->
          <div class="max-w-[540px] mx-auto">
            <UFormGroup
              label="Password"
              name="password"
              required
              :class="
                noMatche === true
                  ? ' [&_input]:focus:!ring-red-500 [&_input]:!ring-red-500 [&_input]:!text-red-500 [&_input]:placeholder:!text-red-500 [&_span]:!text-red-500 [&_p]:block [&_label]:text-red-500 '
                  : ''
              "
            >
              <UInput
                v-model="state.password"
                type="password"
                placeholder="***************"
                size="xl"
                icon="i-heroicons-lock-closed"
                class="[&_input]:dark:bg-white"
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
          <div class="mt-8 w-fit mx-auto">
            <UButton
              :loading="loading"
              type="submit"
              class=""
              size="xl"
              label="Inicia Sesión"
            >
            </UButton>
          </div>
        </UForm>

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
import type {FormError, FormSubmitEvent} from "#ui/types";
import BotonGoogle from "~/components/Botones/BotonGoogle.vue";
import { toast } from 'vue3-toastify';
/* import Swal from 'sweetalert2'; */

const useUser = useUserStore();
const router = useRouter();
const loading = ref(false)


const noMatche = ref(false);

const schema = object({
  email: string().email("Invalid email").required("Requerido"),
  password: string()
    .min(8, "Must be at least 8 characters")
    .required("Requerido"),
});

const validations = (stat: any): FormError[] => {
  const errors = [];
  noMatche.value === false
  
  if (stat.password !== stat.rePassword) {
    errors.push({
      path: "password",
      message: "Las contraseñas no coinciden",
    });
  }
  return errors;
}; 

type Schema = InferType<typeof schema>;

const state: {email?: string, password?: string} = reactive({
  email: undefined,
  password: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  state.email = state!.email?.toLowerCase()
  state.password = state.password?.toLowerCase()
  loading.value = true
  try {
    const response = await fetch(
      `${import.meta.env.VITE_URL_API}/api/content/item/usuarios?filter={email:'${
        event.data.email.toLowerCase()}'}&fields={_state: false, _modified: false, _mby: false, _created: false, _cby: false}`,
      {
        cache: "no-cache",
        mode: "cors",
        headers: {
          "api-key": import.meta.env.VITE_COCKPIT_API_KEY
        }
      }
    );
    if (response.status === 404) {

      toast.warn('El correo no esta registrado. Si no tienes cuenta, registrate.',{
        onClick(event) {
          router.push("/auth/registro");
        },
      })
    } else if (response.status === 200) {
      const dataUserFetch = await response.json();
      if (!dataUserFetch.tipoLogin.includes("backend")) {
        toast.warning('El correo fue registrado por google. Has iniciado sesión utilizando Google y aún no has establecido una contraseña propia. Por favor, inicia sesión mediante Google y procede a crear una nueva contraseña en la sección de perfil de tu cuenta.')
      } else if (event.data.password !== dataUserFetch.password) {
        toast.warn('La contraseña o el correo no coinciden')
        noMatche.value = true;
      }else {
        /* 

        localStorage.clear();
        localStorage.setItem("dataUser", JSON.stringify(dataUserSaved));
        useUser.logged = true
        useUser.dataUser = dataUserFetch; */

        const dataUserSaved = {
          email: state.email,
        };

        localStorage.clear();
        localStorage.setItem("dataUser", JSON.stringify(dataUserSaved));

        await useUser.fetchDataUser().then(()=> router.push(`/dashboard/${dataUserFetch.tipoUser}`))
      }
    }
  } catch (error) {
    console.log(error);
  } finally{
  loading.value = false
  }
}
</script>

<style scoped lang="scss"></style>
