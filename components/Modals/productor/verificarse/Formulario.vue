<script setup lang="ts">
import {number, object, string, type InferType} from "yup";
import type {FormError, FormSubmitEvent} from "#ui/types";

const useUser = useUserStore();

const faltaTipo = ref(false);

const tipoP = (tipo: string) => {
  faltaTipo.value = false
  state.tipoProductor = tipo;
  validations(state)
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
  tipoProductor: '',
});

const validations = (stat: any): FormError[] => {
  let errors = [];
  
  if (stat.tipoProductor === '') {
    faltaTipo.value = true;
    errors.push({
      path: "tipoProductor",
      message: "No has seleccionado el tipo de cuenta.",
    });
  }else{
    errors = []
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
  // Do something with event.data
  console.log(event.data);
  console.log(state);
}

function agregarGuiones(cadena: any) {
  console.log(cadena.data);
  return cadena.data.replace(/(\d{3})/g, '$1-');
}

</script>

<template>
  <div class="font-roboto">
    <div class="flex justify-center lg:mt-5">
      <h3 class="text-center my-auto w-[750px] text-black font-bold text-3xl">
        Para poder disfrutar de nuestra plataforma necesita verificarse, rellene
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
        <ModalsProductorVerificarseFormularioTipoProductor
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
                base : 'ml-[20px]'
              }
            }"
          >
            <UInput
              v-model="state.nombre"
              :ui="{
                rounded: 'rounded-full',
              }"
              placeholder="CENTRAL DE COOPERATIVAS COCLA Ltda. N° 281"
            />
          </UFormGroup>
          <UFormGroup
            required
            size="xl":ui="{
              label: {
                base : 'ml-[20px]'
              }
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
                base : 'ml-[20px]'
              }
            }" label="R.U.C" size="xl" name="ruc" class="w-80 lg:w-96" required>
            <UInput
              class=""
              v-model="state.ruc"
              :ui="{
                rounded: 'rounded-full',
                form: '!pl-[3.8rem]',
              }"
              placeholder="13452587452"
              ><template #leading>
                <span class="text-gray-500 dark:text-gray-400 text-base">R.U.C: </span>
              </template>
            </UInput>
          </UFormGroup>
          <UFormGroup
            required
            size="xl":ui="{
              label: {
                base : 'ml-[20px]'
              }
            }"
            label="Razón Social"
            name="razonSocial"
            class="w-80 lg:w-96"
          >
            <UInput
              v-model="state.razonSocial"
              :ui="{
                rounded: 'rounded-full',
              }"
              placeholder="ASSOCIACION DNI.CAT"
            >
            </UInput>
          </UFormGroup>
        </div>

        <div class="flex flex-col md:flex-row justify-between gap-4 my-6">
          <UFormGroup
            label="Dirección"
            size="xl":ui="{
              label: {
                base : 'ml-[20px]'
              }
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
                base : 'ml-[20px]',
              },
              help: 'text-xs sm:text-base mx-[12px] text-justify'
            }"
            size="xl"
            label="Correo Electronico"
            name="correo"
            class="w-80 lg:w-96"
            
            help="Este correo es al que le va a llegar la información de la plataforma, si es diferente del que utiliza para iniciar sesión debe cambiarlo"
          >
            <UInput
              v-model="state.correo"
              :ui="{
                rounded: 'rounded-full',
              }"
            >
            </UInput>
          </UFormGroup>
        </div>
        <UFormGroup
          required
          size="xl"
          label="Número de Telefóno"
          name="numeroTelefonico"
          class="w-80 lg:w-96":ui="{
              label: {
                base : 'ml-[20px]'
              }
            }"
        ><!-- @input="agregarGuiones" -->
          <UInput
            v-model="state.numeroTelefonico"
            
            :ui="{
              rounded: 'rounded-full',
            }"
            placeholder="+51 985909993"
          >
          </UInput>
        </UFormGroup>

        <UButton
          :ui="{rounded: 'rounded-full'}"
          icon="i-heroicons-pencil-square"
          class="mt-8"
          size="xl"
          type="submit"
        >
          Enviar
        </UButton>
      </div>
    </UForm>
  </div>
</template>
