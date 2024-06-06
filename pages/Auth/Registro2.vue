<template>
  <!-- source: https://gist.github.com/nraloux/bce10c4148380061781b928cdab9b193 -->
  <!-- I have added support for dark mode and improved UI -->

  <div class="sm:pt-24 bg-white dark:bg-gray-900">
    <!-- Container -->
    <div class="mx-auto">
      <div class="flex justify-center px-6 py-12">
        <!-- Row -->
        <div class="w-full xl:w-3/4 lg:w-11/12 flex">
          <!-- Col -->
          <div
            class="w-full h-auto bg-gray-400 dark:bg-gray-800 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
            style="background-image: url('../img/registro.jpg')"
          ></div>
          <!-- Col -->
          <div
            class="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none"
          >
            <h3 class="py-4 text-2xl text-center text-gray-800 dark:text-white">
              ¡Registratre en <b class="text-primary">{{ nombreWeb }}</b
              >!
            </h3>
            <UForm
              class="px-8 space-y-4 pt-6 pb-8 mb-4 bg-white dark:bg-dark rounded"
              :schema="schema"
              :state="state"
              @submit="onSubmit"
            >
              <!-- tipo de usuario -->

              <TipoUser />

              <!-- /tipo de usuario -->

              <!-- nombre y apellido-->
              <div class="flex justify-between max-w-[540px] mx-auto">
                <UFormGroup label="Nombre" name="nombre" required>
                  <UInput
                    v-model="state.nombre"
                    placeholder="Nombre"
                    size="xl"
                    :required="true"
                  />
                </UFormGroup>

                <UFormGroup label="Apellido" name="apellido" required>
                  <UInput
                    v-model="state.apellido"
                    placeholder="Apellido"
                    size="xl"
                    :required="true"
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
                  />
                </UFormGroup>
              </div>
              <!-- /email -->

              <!-- password -->
              <div class="flex justify-between max-w-[540px] mx-auto">
                <UFormGroup label="Password" name="password" required>
                  <UInput
                    v-model="state.password"
                    type="password"
                    placeholder="***************"
                    size="xl"
                  />
                </UFormGroup>

                <UFormGroup label="Password" name="password" required>
                  <UInput
                    v-model="state.rePassword"
                    type="password"
                    placeholder="***************"
                    size="xl"
                  />
                </UFormGroup>
              </div>
              <!-- /password -->

              <BotonPrimary class="text-center" contenido="Registrar Cuenta" />
              <div class="mb-6 text-center"></div>
              <hr class="mb-6 border-t" />
              <div class="text-center">
                <NuxtLink
                  class="inline-block text-sm text-dark dark:text-primary align-baseline dark:hover:text-primary-300 hover:text-primary-500"
                  to="/auth/forget"
                >
                  ¿Olvidaste la contraseña?
                </NuxtLink>
              </div>
              <div class="text-center">
                <NuxtLink
                to="/auth/login"
                  class="inline-block text-sm text-primary dark:text-primary align-baseline dark:hover:text-primary-300 hover:text-primary-500"
                >
                  ¿Tienes cuenta? ¡Inicia Sesión!
                </NuxtLink>
              </div>
            </UForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

body {
  margin: 0;
  font-family: Nunito, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    Segoe UI Symbol, "Noto Color Emoji" !important;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #858796;
  text-align: left;
  background-color: #fff;
}
a {
  color: #4e73df;
  text-decoration: none;
  background-color: transparent;
}
form.user .custom-checkbox.small label {
  line-height: 1.5rem;
}
form.user .form-control-user {
  font-size: 0.8rem;
  border-radius: 10rem;
  padding: 1.5rem 1rem;
}
form.user .btn-user {
  font-size: 0.8rem;
  border-radius: 10rem;
  padding: 0.75rem 1rem;
}
</style>

<script setup lang="ts">
import {ref} from "vue";
import {useUserStore} from "@/stores/user";
import {object, string, type InferType} from "yup";
import type {FormSubmitEvent} from "#ui/types";
import TipoUser from "~/components/Auth/Registro/TipoUser.vue";
import BotonPrimary from "~/components/Botones/BotonPrimary.vue";

const useuser = useUserStore();
const router = useRouter();

const nombreWeb = import.meta.env.VITE_NOMBRE_1;

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
  //     router.push({ name: 'home' });
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
