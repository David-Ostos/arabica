<template>
  <section
    class="bg-gray-100 dark:bg-dark min-h-screen flex box-border justify-center items-center py-6"
  >
    <div
      class="bg-white dark:bg-stone-800 rounded-2xl flex max-w-4xl p-5 items-center"
    >
      <div class="md:w-1/2 px-8">
        <UForm
          class="w-full px-5 rounded-lg lg:rounded-l-none sm:px-8 space-y-4 pb-4 mb-4"
          :schema="schema"
          :state="state"
          @submit="onSubmit"
          :validate="validations"
        >
          <h2 class="font-bold text-3xl text-dark text-center mb-4">
            Regístrate en <B class="text-primary">{{ nombreWeb }}</B>
          </h2>
          <div
            :class="faltaTipo ? ' border-2 border-red-500 py-4 rounded-md' : ''"
          >
            <TipoUser
              @tipo-user="tipoU"
              class="px-2"
              v-model="state.tipoUser"
              @click="faltaTipo = false"
            />
            <p
              v-if="faltaTipo"
              class="text-sm text-red-500 text-center pb-4 -m-4"
            >
              Selecciona un tipo
            </p>
          </div>
          <div class="flex items-center justify-between">
            <span class="border-b md:w-1/2"></span>
            <span class="border-b md:w-1/2"></span>
          </div>

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
                :type="selected ? 'text' : 'password'"
                placeholder="***************"
                size="xl"
                icon="i-heroicons-lock-closed"
                class="[&_input]:dark:bg-stone-800"
              />
            </UFormGroup>

            <UFormGroup label="Confirmar Password" name="rePassword" required>
              <UInput
                v-model="state.rePassword"
                :type="selected ? 'text' : 'password'"
                placeholder="***************"
                size="xl"
                class="[&_input]:dark:bg-stone-800 line-clamp-1"
                icon="i-heroicons-lock-closed"
              />
            </UFormGroup>
          </div>
          <!-- /password -->

          <div>
            <UCheckbox
              icon="i-heroicons-eye"
              v-model="selected"
              name="mostrar"
              label="Mostrar"
              @click="selected = !selected"
            />
          </div>

          <!-- boton registro -->
          <div class="text-center text-white pt-4">
            <UButton
              class="hvr-ripple-out hover:!bg-primary inline-flex items-center justify-center px-4 py-2 text-base font-bold bg-primary dark:bg-primary-600 text-center rounded-lg before:dark:border-primary-600 before:border-primary before:border-4 before:border-solid text-white lg:px-7 cursor-pointer"
              type="submit"
              >Registrar Cuenta
            </UButton>
          </div>
          <!-- /boton registro -->
        </UForm>
        <div class="flex items-center justify-between">
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
        <div class="text-center">
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
import type {FormError, FormSubmitEvent} from "#ui/types";
import BotonPrimary from "~/components/Botones/BotonPrimary.vue";
import type {User} from "~/interfaces/Users";
import BotonGoogle from "~/components/Botones/BotonGoogle.vue";

definePageMeta({
  layout: "auth",
});

const useUser = useUserStore();
const router = useRouter();
const ShowModalsStore = useShowModalsStore();
const toast = useToast();

const selected = ref(false);

const faltaTipo = ref(false);

const tipoUser: Ref<"comprador" | "productor" | undefined> = ref(undefined);

const tipoU = (tipo: "comprador" | "productor") => {
  console.log(tipo);
  tipoUser.value = tipo;
};
const nombreWeb = import.meta.env.VITE_NOMBRE_1;

const schema = object({
  nombre: string().required("Requerido"),
  apellido: string().required("Requerido"),
  email: string().email("Email invalido").required("Requerido"),
  password: string()
    .min(8, "La contraseña debe tener 8 caracteres")
    .required("Requerido"),
  rePassword: string()
    .min(8, "La contraseña debe tener 8 caracteres")
    .required("Requerido"),
});

type Schema = InferType<typeof schema>;

let state: User = reactive({
  email: undefined,
  nombre: undefined,
  apellido: undefined,
  password: undefined,
  rePassword: undefined,
  tipoUser: tipoUser.value,
  tipoLogin: ["backend"],
  verificado: false
});

const validations = (stat: any): FormError[] => {
  const errors = [];
  if (tipoUser.value === undefined) {
    faltaTipo.value = true;
    errors.push({
      path: "tipoUser",
      message: "No has seleccionado el tipo de cuenta.",
    });
  }

  if (stat.password !== stat.rePassword) {
    errors.push({
      path: "password",
      message: "Las contraseñas no coinciden",
    });
  }
  return errors;
};

async function onSubmit(event: any) {
  state.nombre = state.nombre!.toLowerCase();
  state.apellido = state.apellido!.toLowerCase();
  delete state.rePassword;
  state.tipoUser = tipoUser.value;

  faltaTipo!.value = false;
  try {
    verificarEmail(state);
    return;
  } catch (error) {
    console.log(error);
  }
}

async function verificarEmail(data: User) {
  //AQUI HACES UN FETCH PARA VERIFICAR EL EMAIL
  try {
    const correoVerificado = await fetch(
      `${
        import.meta.env.VITE_URL_API
      }/api/content/item/usuarios?filter={email:'${data.email}'}`,
      {
        cache: "no-cache",
      }
    );
    if (correoVerificado.status === 200) {
      toast.add({
        id: "email_repetido",
        title: "Email ya registrado",
        description: "El correo ya esta registrado intenta con otro correo.",
        icon: "i-heroicons-exclamation-circle",
        timeout: 5000,
        color: "yellow",
      });
      return;
    } else {
      const dataUserSaved = {
        email: data.email,
        picture: undefined,
        tipoUser: tipoUser.value,
        logged : true
      }

      localStorage.clear();
      localStorage.setItem("dataUser", JSON.stringify(dataUserSaved));

      // console.log({data})

      try {
        const response = fetch(
    `https://prueba.arabicagc.com/api/content/item/usuarios`,
    {
      method: "POST",
      headers: {
        "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          data
      }),
    }
  );
  if ((await response).status === 412) {
    console.log(response);
    return;
  } else {
    useUser.dataUser = data;
    // console.log(useUser.dataUser);
    router.push(`/dashboard/${data.tipoUser}`);
  }
      } catch (error) {
        console.log(error)
      }
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped>
@-webkit-keyframes hvr-ripple-out {
  100% {
    top: -12px;
    right: -12px;
    bottom: -12px;
    left: -12px;
    opacity: 0;
  }
}
@keyframes hvr-ripple-out {
  100% {
    top: -12px;
    right: -12px;
    bottom: -12px;
    left: -12px;
    opacity: 0;
  }
}
.hvr-ripple-out {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
}
.hvr-ripple-out:before {
  content: "";
  position: absolute;
  border-radius: 12px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
}
.hvr-ripple-out:hover:before,
.hvr-ripple-out:focus:before,
.hvr-ripple-out:active:before {
  -webkit-animation-name: hvr-ripple-out;
  animation-name: hvr-ripple-out;
}
</style>
