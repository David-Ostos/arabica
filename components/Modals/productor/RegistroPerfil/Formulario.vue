<script setup lang="ts">
import {number, object, string, type InferType} from "yup";
import type {FormError, FormSubmitEvent} from "#ui/types";
import { useShowModalsStore } from '../../../../stores/showModals';
import type { PerfilProductor } from "~/interfaces/PerfilProductor";

const useUser = useUserStore();
const useModal = useShowModalsStore();
const useProductor = useProductorStore()

const faltaTipo = ref(false);
const load = ref(false);

const nombreValidado = ref(false);
const rucValidado = ref(false);
const razonSocialValidado = ref(false);
const correoValidado = ref(false);
const numeroTelefonicoValidado = ref(false);

const tipoP = (tipo: string) => {
  faltaTipo.value = false;
  state.tipoProductor = tipo;
  validations(state);
};

const schema = object({
  nombre: string()
    .required("Requerido")
    .min(10, "Debe tener minimo 10 caracteres"),
  origen: string().required("Requerido"),
  ruc: number()
    .required("Requerido")
    .positive()
    .integer()
    .typeError("El R.U.C debe ser un número de 11 digitos"),
  razonSocial: string()
    .required("Requerido")
    .min(5, "debe tener un minimo de 5 caracteres"),
  direccion: string()
    .required("Requerido")
    .min(10, "debe tener un minimo de 10 caracteres"),
  correo: string().email("correo invalido").required("Requerido"),
  numeroTelefonico: number().required("Requerido"),
});

type Schema = InferType<typeof schema>;

const state = reactive({
  nombre: undefined,
  origen: undefined,
  ruc: undefined,
  razonSocial: undefined,
  direccion: undefined,
  correo: useUser.dataUser.email,
  numeroTelefonico: undefined,
  tipoProductor: "",
  idUsuario: {
    email: useUser.dataUser.email,
    _id: useUser.dataUser._id,
  },
  imgPortada:'',
  descripcion: ''
});

const validations = (stat: any): FormError[] => {
  let errors = [];

  if (stat.tipoProductor === "") {
    faltaTipo.value = true;
    errors.push({
      path: "tipoProductor",
      message: "No has seleccionado el tipo de cuenta.",
    });
  } else {
    errors = [];
  }

  if (stat.ruc !== undefined && stat.ruc.length !== 11) {
    errors.push({
      path: "ruc",
      message: "El R.U.C debe tener 11 digitos.",
    });
  }

  return errors;
};

async function onSubmit(event: FormSubmitEvent<Schema>) {
  load.value = true;
  let datosDuplicados = false;
  // Do something with event.data
  let data: any = event.data;

  try {
    const fetchVerificarUser = await fetch(
      `${
        import.meta.env.VITE_URL_API
      }/api/content/items/productores?fields={"nombre": true,"origen": false,"ruc": true,"razonSocial": true,"direccion": false,"correo": true,"numeroTelefonico": true,"tipoProductor": false,"idUsuario":false }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
        },
      }
    );
    const responseVerificacion = await fetchVerificarUser.json();

    const verificarNombre = responseVerificacion.some(
      (productor: any) => productor.nombre === state.nombre
    );
    const verificarRuc = responseVerificacion.some(
      (productor: any) => productor.ruc === state.ruc
    );
    const verificarRazonSocial = responseVerificacion.some(
      (productor: any) => productor.razonSocial === state.razonSocial
    );
    const verificarCorreo = responseVerificacion.some(
      (productor: any) => productor.correo === state.correo
    );
    const verificarNumeroTelefonico = responseVerificacion.some(
      (productor: any) => productor.numeroTelefonico === state.numeroTelefonico
    );

    if (verificarNombre) {
      nombreValidado.value = true;
      datosDuplicados = true;
    }

    if (verificarRuc) {
      datosDuplicados = true;
      rucValidado.value = true;
    }

    if (verificarRazonSocial) {
      datosDuplicados = true;
      razonSocialValidado.value = true;
    }

    if (verificarCorreo) {
      datosDuplicados = true;
      correoValidado.value = true;
    }

    if (verificarNumeroTelefonico) {
      datosDuplicados = true;
      numeroTelefonicoValidado.value = true;
    }

    if (!datosDuplicados) {
      nombreValidado.value = false;
      rucValidado.value = false;
      razonSocialValidado.value = false;
      correoValidado.value = false;
      numeroTelefonicoValidado.value = false;

      const response = await fetch(
        `${import.meta.env.VITE_URL_API}/api/content/item/productores`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
          },
          body: JSON.stringify({data}),
        }
      );
      const res = await response.json();

      useProductor.perfilProductor = data


      // Se reutiliza la variable 'data' para hacer la inyecciond e datos nuevos al ususario
      data = {
        _id: useUser.dataUser._id,
        perfilBase: true,
        perfilProductor: {
          _model: "productores",
          _id: res._id,
        },
      };


      const update = await fetch(
        `${import.meta.env.VITE_URL_API}/api/content/item/usuarios`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
          },
          body: JSON.stringify({data}),
        }
      );

      const resUpdate = await update.json();

      useUser.dataUser.perfilBase = true;
      useModal.showModalProductorPerfilCompleto = false

    }
  } catch (error) {
    console.log(error);
  }
  load.value = false;
}

function agregarGuiones(cadena: any) {
  console.log(cadena.data);
  return cadena.data.replace(/(\d{3})/g, "$1-");
}
const prueba = [
  "CENTRAL DE COOPERATIVAS COCLA Ltda. N° 281",
  "Cusco",
  "13452587452",
  "ASSOCIACION DNI.CAT",
  "Jr. Unión 234, Cusco",
  "985909993",
];
</script>

<template>
  <div class="font-roboto">
    <div class="flex justify-center lg:mt-5">
      <h3 class="text-center my-auto w-[750px] text-black font-bold text-3xl">
        Para poder acceder a nuestra plataforma necesita terminar su perfil, rellene
        los datos del formulario.
      </h3>
    </div>
    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4 lg:border rounded-xl shadow-sm py-8 md:mx-20 my-8"
      @submit="onSubmit"
      :validate="validations"
    >
      <UFormGroup
        :ui="{
          error: 'block text-center',
        }"
        name="tipoProductor"
        required
      >
        <ModalsProductorRegistroPerfilFormularioTipoProductor
          v-model="state.tipoProductor"
          @click="faltaTipo = false"
          @tipoProductor="tipoP"
          :class="
            faltaTipo
              ? 'text-red-500 [&_button]:!border-red-500 [&_button]:hover:!border-primary'
              : ''
          "
        />
      </UFormGroup>

      <div class="flex justify-center items-center flex-col">
        <div class="flex flex-col md:flex-row justify-between gap-4 my-6">
          <UFormGroup
            label="Nombre del Perfil"
            size="xl"
            name="nombre"
            class="w-80 lg:w-96"
            required
            :ui="{
              label: {
                base: 'ml-[20px]',
              },
            }"
          >
            <UInput
              :class="
                nombreValidado
                  ? '[&_input]:focus:ring-red-500 [&_input]:!ring-red-500'
                  : ''
              "
              v-model="state.nombre"
              :ui="{
                rounded: 'rounded-full',
              }"
              placeholder="CENTRAL DE COOPERATIVAS COCLA Ltda. N° 281"
            />

            <span
              class="text-red-500 text-sm text-center ml-[20px]"
              v-if="nombreValidado"
              >Este nombre ya esta registrado</span
            >
          </UFormGroup>

          <UFormGroup
            required
            size="xl"
            :ui="{
              label: {
                base: 'ml-[20px]',
              },
            }"
            label="Origen"
            name="origen"
            class="w-80 lg:w-96"
          >
            <UInput
              v-model="state.origen"
              :ui="{
                rounded: 'rounded-full',
              }"
              placeholder="Cusco"
            />
          </UFormGroup>
        </div>

        <div class="flex flex-col md:flex-row justify-between gap-4 my-6">
          <UFormGroup
            :ui="{
              label: {
                base: 'ml-[20px]',
              },
            }"
            label="R.U.C"
            size="xl"
            name="ruc"
            class="w-80 lg:w-96"
            required
          >
            <UInput
              :class="
                rucValidado
                  ? '[&_input]:focus:ring-red-500 [&_input]:!ring-red-500'
                  : ''
              "
              v-model="state.ruc"
              :ui="{
                rounded: 'rounded-full',
                form: '!pl-[3.8rem]',
              }"
              placeholder="13452587452"
              ><template #leading>
                <span class="text-gray-500 dark:text-gray-400 text-base"
                  >R.U.C:
                </span>
              </template>
            </UInput>

            <span
              class="text-red-500 text-sm text-center ml-[20px]"
              v-if="rucValidado"
              >EL R.U.C ya esta registrado</span
            >
          </UFormGroup>

          <UFormGroup
            required
            size="xl"
            :ui="{
              label: {
                base: 'ml-[20px]',
              },
            }"
            label="Razón Social"
            name="razonSocial"
            class="w-80 lg:w-96"
          >
            <UInput
              :class="
                razonSocialValidado
                  ? '[&_input]:focus:ring-red-500 [&_input]:!ring-red-500'
                  : ''
              "
              v-model="state.razonSocial"
              :ui="{
                rounded: 'rounded-full',
              }"
              placeholder="ASSOCIACION DNI.CAT"
            >
            </UInput>

            <span
              class="text-red-500 text-sm text-center ml-[20px]"
              v-if="razonSocialValidado"
              >La Razón Social ya esta registrada</span
            >
          </UFormGroup>
        </div>

        <div class="flex flex-col md:flex-row justify-between gap-4 my-6">
          <UFormGroup
            label="Dirección"
            size="xl"
            :ui="{
              label: {
                base: 'ml-[20px]',
              },
            }"
            name="direccion"
            class="w-80 lg:w-96"
            required
          >
            <UInput
              v-model="state.direccion"
              :ui="{
                rounded: 'rounded-full',
              }"
              placeholder="Jr. Unión 234, Cusco"
            >
            </UInput>
          </UFormGroup>

          <UFormGroup
            required
            :ui="{
              label: {
                base: 'ml-[20px]',
              },
              help: 'text-xs sm:text-sm mx-[12px] text-justify',
            }"
            size="xl"
            label="Correo Electronico"
            name="correo"
            class="w-80 lg:w-96"
            help="Este correo es al que le va a llegar la información de la plataforma, si es diferente del que utiliza para iniciar sesión debe cambiarlo"
          >
            <UInput
              :class="
                correoValidado
                  ? '[&_input]:focus:ring-red-500 [&_input]:!ring-red-500'
                  : ''
              "
              v-model="state.correo"
              :ui="{
                rounded: 'rounded-full',
              }"
            >
            </UInput>

            <span
              class="text-red-500 text-sm text-center ml-[20px]"
              v-if="correoValidado"
              >El correo electronico ya esta registrado</span
            >
          </UFormGroup>
        </div>
        <UFormGroup
          required
          size="xl"
          label="Número de Telefóno"
          name="numeroTelefonico"
          class="w-80 lg:w-96"
          :ui="{
            label: {
              base: 'ml-[20px]',
            },
          }"
          ><!-- @input="agregarGuiones" -->
          <UInput
            :class="
              numeroTelefonicoValidado
                ? '[&_input]:focus:ring-red-500 [&_input]:!ring-red-500'
                : ''
            "
            v-model="state.numeroTelefonico"
            :ui="{
              rounded: 'rounded-full',
            }"
            placeholder="+51 985909993"
          >
          </UInput>

          <span
            class="text-red-500 text-sm text-center ml-[20px]"
            v-if="numeroTelefonicoValidado"
            >El numero de telefono ya esta registrado</span
          >
        </UFormGroup>

        <UButton
          :ui="{rounded: 'rounded-full'}"
          icon="i-heroicons-pencil-square"
          class="mt-8"
          size="xl"
          type="submit"
          :loading="load"
        >
          Enviar
        </UButton>
      </div>
    </UForm>
  </div>
</template>
