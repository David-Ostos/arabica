<template>
  <div
    class="font-roboto lg:pt-10 sm:bg-gray-100 rounded-xl sm:shadow sm:border relative"
    @click=""
  >
    <div class="flex justify-center">
      <h3 class="text-center my-auto w-[750px] text-black font-bold text-3xl">
        Para poder acceder a nuestra plataforma necesita terminar su perfil,
        rellene los datos del formulario.
      </h3>
    </div>
    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4 lg:border rounded-xl shadow-inner py-8 md:mx-20 my-8 bg-white"
      @submit="onSubmit"
      :validate="validations"
    >
      <div
        v-show="isActiveCodePhone"
        class="left-0 bottom-0 h-screen w-screen fixed overflow-hidden z-40"
        @click="isActiveCodePhone = !isActiveCodePhone"
      ></div>

      <div class="sm:grid m-4 sm:m-0 sm:grid-cols-2 md:mx-8 gap-4">
        <UFormGroup
          label="¿Cómo se llama tu negocio?"
          size="xl"
          name="nombre"
          class="col-span-1 w-full"
          required
        >
          <UInput
            :class="
              nombreValidado
                ? '[&_input]:focus:ring-red-500 [&_input]:!ring-red-500'
                : ''
            "
            v-model="state.nombre"
            :ui="{}"
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
          label="¿Cuándo se fundó tu negocio?"
          name="fechaOrigen"
          class="col-span-1"
        >
          <div class=" relative">
            <button
              type="button"
              class="relative z-0 flex justify-between items-center px-4 h-11 w-full border shadow rounded-md"
              :class="selectActiveYear ? 'rounded-b-none' : ''"
              @click="selectActiveYear = !selectActiveYear"
            >
              <span>{{ state!.fechaOrigen }}</span>
              <UIcon
                name="i-ic-baseline-keyboard-arrow-down"
                class="transition-all duration-300"
                :class="selectActiveYear ? 'rotate-180' : ''"
                dynamic
              />
            </button>
            <div
              class="w-full absolute z-10 top-[43px] transition-all duration-500 bg-white overflow-auto rounded-b-md"
              :class="
                selectActiveYear ? 'h-56 border ' : 'h-0 rounded-md border-none'
              "
            >
              <UInput
                class="px-1 pt-2 border-t"
                size="xl"
                placeholder="Busca tu certificado..."
                @input="filterYear()"
                v-model="searchQueryYear"
              />
              <ul class="m-4 text-gray-800">
                <li
                  v-for="item in filterYear()"
                  @click="
                    state.fechaOrigen = item;
                    selectActiveYear = false;
                  "
                  class="mb-2 p-1 ring-primary hover:ring rounded-md cursor-pointer"
                >
                  {{ item }}
                </li>
                <li
                  v-show="filterYear().length === 0"
                  class="mb-2 p-1 rounded-md opacity-0"
                  :class="{'opacity-100': filterYear().length === 0}"
                >
                  No se a encontrado la busqueda...
                </li>
              </ul>
            </div>
          </div>
        </UFormGroup>

        <UFormGroup
          required
          size="xl"
          label="Origen"
          name="origen"
          class="col-span-1"
        >
          <USelectMenu
            :options="['Perú']"
            v-model="state.origen"
            :ui="{}"
            placeholder="Perú"
          />
        </UFormGroup>

        <UFormGroup
          label="R.U.C"
          size="xl"
          name="ruc"
          class="col-span-1"
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

        <div class="col-span-2 my-4" name="direccion">
          <h1 class="mb-2 font-medium text-gray-700 mx-4">Dirección:</h1>
          <div
            class="col-span-2 gap-4 grid grid-cols-3 shadow border bg-gray-100 p-8 rounded-xl"
          >
            <UFormGroup
              label="Dirección del negocio"
              size="xl"
              name="direccion.direccion1"
              class="col-span-3"
              required
            >
              <UInput
                v-model="state.direccion!.direccion1"
                placeholder="Jr. Unión 234, Cusco"
              />
            </UFormGroup>

            <UFormGroup
              label="Linea 2 de dirección"
              size="xl"
              name="direccion.direccion2"
              class="col-span-3"
              required
            >
              <UInput
                v-model="state.direccion!.direccion2"
                placeholder="Linea 2 de dirección..."
              />
            </UFormGroup>

            <div class="col-span-1 relative">
              <div
                class="bg-white shadow-inner w-10 h-10 rounded-full border-2 absolute bottom-0 left-0"
              ></div>
            </div>

            <UFormGroup
              label="Ciudad"
              size="xl"
              name="direccion.ciudad"
              class="col-span-1"
              required
            >
              <UInput v-model="state.direccion!.ciudad" placeholder="Cusco" />
            </UFormGroup>

            <UFormGroup
              label="Codigo Postal"
              size="xl"
              name="direccion.codigoPostal"
              class="col-span-1"
              required
            >
              <UInput
                v-model="state.direccion!.codigoPostal"
                placeholder="2006"
              />
            </UFormGroup>
          </div>
        </div>

        <UFormGroup
          required
          size="xl"
          label="Redes"
          name="reder"
          class="col-span-2"
          help="Sólo inserte su nombre de usuario, no el enlace completo, ejemplo 'nombre_usuario'"
          :ui="{
            help: 'text-sm ',
          }"
        >
          <div class="sm:grid grid-cols-3 gap-4">
            <div v-for="item in state.redes" class="col-span-1">
              <UFormGroup
                :label="item.name"
                :ui="{
                  label: {base:'capitalize'}
                }"
              >
                <div class="w-full grid grid-cols-12">
                  <div 
                    class="col-span-3 w-full border rounded-l-md shadow-sm bg-gray-100 dark:bg-gray-900 text-gray-900 dark:-text-dar"
                  >
                    <div class="flex items-center h-full mx-auto w-fit" >
                      <UIcon
                        :name="item.icon!"
                        dynamic
                        class="text-2xl"
                      />
                    </div>
                  </div>
                  <div class="col-span-9">
                    <UInput
                      
                      v-model="item.linkUsuario"
                      size="xl"
                      :ui="{
                        rounded: 'rounded-l-none',
                      }"
                      placeholder="usuario"
                    />
                  </div>
                </div>
              </UFormGroup>
            </div>
          </div>
        </UFormGroup>

        <UFormGroup
          required
          size="xl"
          label="Número de Telefóno"
          name="numeroTelefonico"
          class="col-span-1"
          ><!-- @input="agregarGuiones" -->

          <div
            class="relative z-50 grid grid-cols-12 w-full focus-visible:ring-2 ring-primary group rounded-md"
          >
            <div class="cursor-pointer relative col-span-4 sm:col-span-3">
              <div
                @click="
                  isActiveCodePhone = !isActiveCodePhone;
                  console.log(isActiveCodePhone);
                "
                class="grid grid-cols-3 gap-1 justify-center items-center w-full h-full border rounded-r-none rounded-md border-[#d1d5db] shadow cursor-pointer"
              >
                <div
                  v-if="state.numeroTelefonico!.code && state.numeroTelefonico!.bandera"
                  class="col-span-2 grid grid-cols-2"
                >
                  <span class="col-span-1 ml-1">{{
                    state.numeroTelefonico!.bandera
                  }}</span>
                  <span class="col-span-1">{{
                    state.numeroTelefonico!.code
                  }}</span>
                </div>
                <div class="col-span-2 grid grid-cols-2" v-else>
                  <span class="col-span-1 ml-1">{{
                    codeCountry[42].bandera
                  }}</span>
                  <span class="col-span-1">{{ codeCountry[42].code }}</span>
                </div>
                <UIcon
                  :class="isActiveCodePhone ? 'rotate-180' : ''"
                  class="col-span-1 text-lg h-fit w-fit justify-self-center"
                  name="ic:baseline-keyboard-arrow-down"
                  dynamic
                />
              </div>
              <div
                v-show="isActiveCodePhone"
                class="absolute top-10 bg-white z-50 border rounded-b-md"
              >
                <UInput
                  autocomplete="nope"
                  @input="filterCodeTelefono()"
                  v-model="searchQuery"
                  placeholder="Buscar..."
                  :ui="{
                    rounded: 'rounded-b-md rounded-none',
                  }"
                  class="mb-2"
                />
                <ul class="bg-white h-fit max-h-40 w-fit overflow-auto">
                  <li
                    v-for="item in filterCodeTelefono()"
                    class="bg-white mb-2 mx-2 gap-1 flex justify-start"
                    @click="
                      state.numeroTelefonico!.bandera = item.bandera;
                      state.numeroTelefonico!.code = item.code;
                      isActiveCodePhone = !isActiveCodePhone;
                    "
                  >
                    <span>{{ item.bandera }}</span>
                    <span>{{ item.code }}</span>
                  </li>
                  <li v-show="filterCodeTelefono().length === 0" class="mx-2">
                    <span class="text-sm text-gray-400"
                      >No se encuentra...</span
                    >
                  </li>
                </ul>
              </div>
            </div>
            <UInput
              class="col-span-8 sm:col-span-9"
              placeholder="1234567..."
              icon=""
              :ui="{
                rounded: 'rounded-l-none',
              }"
              v-model="state.numeroTelefonico!.numero"
              size="xl"
            />
          </div>

          <span
            class="text-red-500 text-sm text-center ml-[20px]"
            v-if="numeroTelefonicoValidado"
            >El numero de telefono ya esta registrado</span
          >
        </UFormGroup>

        <div class="col-span-2 flex justify-center items-center">
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
      </div>
    </UForm>
  </div>
</template>
<script setup lang="ts">
import {number, object, string, type InferType} from "yup";
import type {FormError, FormSubmitEvent} from "#ui/types";

import type {localStoreDataUser} from "~/interfaces/localStore.dataUser";
import {toast} from "vue3-toastify";
import axios from "axios";
import type {PerfilComprador} from "~/interfaces/PerfilComprador";

const useUser = useUserStore();
const useGlobal = useGlobalStore();
const useComprador = useCompradorStore();
const useModal = useShowModalsStore();

const isActiveCodePhone = ref(false);

const faltaTipo = ref(false);
const load = ref(false);

const nombreValidado = ref(false);
const rucValidado = ref(false);
const razonSocialValidado = ref(false);
const correoValidado = ref(false);
const numeroTelefonicoValidado = ref(false);

const codeCountry = useGlobal.codeCountry;

const searchQuery = ref("");

const searchQueryYear = ref("");

const years = useGlobal.years;
const selectActiveYear = ref(false);

const filterYear = () => {
  if (!searchQueryYear.value) return years;

  const searchTerm = searchQueryYear.value.toLowerCase();
  return years.filter((code: any) => {
    return code.toString().toLowerCase().includes(searchTerm);
  });
};

const filterCodeTelefono = () => {
  if (!searchQuery.value) return codeCountry;
  return codeCountry.filter((code) => {
    return (
      code.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      code.code.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
};

const schema = object({
  nombre: string()
    .lowercase()
    .trim()
    .required("Requerido")
    .min(10, "Debe tener minimo 10 caracteres"),
  origen: string().required("El origen es requerido"),
  fechaOrigen: string().required("La fecha de cuando se fundo es requerida"),
  ruc: number()
    .required("El R.U.C es requerido.")
    .positive()
    .integer()
    .typeError("El R.U.C debe ser un número de 11 digitos"),
  direccion: object({
    ciudad: string().required("Requerido"),
    codigoPostal: string().required("Requerido"),
    direccion1: string()
      .min(10, "Debe tener minimo 10 caracteres")
      .required("Requerido"),
    direccion2: string()
      .min(4, "Debe tener minimo 4 caracteres")
      .required("Requerido"),
  }).required("Requerido"),
  numeroTelefonico: object({
    code: string().required(),
    bandera: string(),
    numero: string().required("Requerido"),
  }).required("Requerido"),
});

type Schema = InferType<typeof schema>;

const state: PerfilComprador = reactive({
  nombre: undefined,
  fechaOrigen: undefined,
  origen: "Perú",
  ruc: undefined,
  correo: useUser.dataUser.email,
  direccion: {
    ciudad: undefined,
    codigoPostal: undefined,
    direccion1: undefined,
    direccion2: undefined,
  },
  numeroTelefonico: {
    numero: undefined,
    code: undefined,
    bandera: undefined,
  },
  idUsuario: {
    email: useUser.dataUser.email,
    _id: useUser.dataUser._id,
  },
  loteslikes: [],
  redes: [
    {
      name:"perfil de facebook",
      linkbase: "facebook.com/",
      linkUsuario: "",
      icon: "i-mdi-facebook",
    },
    {
      name:"perfil de instagram",
      linkbase: "instagram.com/",
      linkUsuario: "",
      icon: "i-mdi-instagram",
    },
    {
      name:"URL de pagina ",
      linkbase: "web",
      linkUsuario: "",
      icon: "i-mdi-web",
    },
  ],
});

const validations = (stat: any): FormError[] => {
  let errors = [] as any;

  if (stat.tipoProductor === "") {
    faltaTipo.value = true;
    errors.push({
      path: "tipoProductor",
      message: "No has seleccionado el tipo de cuenta.",
    });
  }

  if (stat.ruc !== undefined && stat.ruc.length !== 11) {
    errors.push({
      path: "ruc",
      message: "El R.U.C debe tener 11 digitos.",
    });
  }
  if (!stat.numeroTelefonico.code) {
    errors.push({
      path: "numeroTelefonico",
      message: "Debe seleccionar un código de país.",
    });
  }

  return errors;
};

console.log(useUser.dataUser);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  load.value = true;
  let datosDuplicados = false;
  // Do something with event.data
  let data: any = convertirAminusculas(event.data);

  try {
    const fetchVerificarUser = await fetch(
      `${
        import.meta.env.VITE_URL_API
      }/api/content/items/compradores?fields={"nombre": true,"ruc": true,"razonSocial": true,"correo": true,"numeroTelefonico": true}`,
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
      (productor: any) =>
        productor.nombre.toLowerCase() === state.nombre!.toLowerCase()
    );
    const verificarRuc = responseVerificacion.some(
      (productor: any) => productor.ruc === state.ruc
    );

    const verificarNumeroTelefonico = responseVerificacion.some(
      (productor: any) =>
        productor.numeroTelefonico.numero === state.numeroTelefonico!.numero
    );

    if (verificarNombre) {
      toast.info(
        "El nombre de perfil ya esta registrado, por favor utilice otro."
      );
      nombreValidado.value = true;
      datosDuplicados = true;
    }

    if (verificarRuc) {
      toast.info("EL R.U.C ya esta registrado, por favor utilice otro.");
      datosDuplicados = true;
      rucValidado.value = true;
    }


    if (verificarNumeroTelefonico) {
      toast.info(
        "EL numero de telefono ya esta registrado, por favor utilice otro."
      );

      datosDuplicados = true;
      numeroTelefonicoValidado.value = true;
    }

    if (!datosDuplicados) {
      nombreValidado.value = false;
      rucValidado.value = false;
      razonSocialValidado.value = false;
      correoValidado.value = false;
      numeroTelefonicoValidado.value = false;

      // @ts-ignore
      await axios(
        // @ts-ignore
        {
          url: `${
            import.meta.env.VITE_URL_API
          }/api/content/item/compradores?fields={_state: false,_modified:false,_mby: false,_created: false,_cby: false}`,
          method: "POST",
          mode: "cors",
          headers: {
            "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
          },
          data: {data},
        }
      ).then(async (res) => {
        delete res.data._state;
        delete res.data._modified;
        delete res.data._mby;
        delete res.data._created;
        delete res.data._cby;
        useComprador.perfilComprador = res.data;

        // Se reutiliza la variable 'data' para hacer la inyecciond e datos nuevos al ususario
        data = {
          _id: useUser.dataUser._id,
          perfilBase: true,
          perfilComprador: {
            _model: "compradores",
            _id: res.data._id,
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
        console.log(resUpdate);

        const dataUserSaved: localStoreDataUser = await JSON.parse(
          localStorage.getItem("dataUser") ?? "{}"
        );

        dataUserSaved.perfilBase = true;
        localStorage.removeItem("dataUser");
        localStorage.setItem("dataUser", JSON.stringify(dataUserSaved));

        useUser.dataUser.perfilBase = true;
        toast.success("El perfil de comprador se ha creado.");
        useModal.showModalCompradorPerfilCompleto= false;
      });
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
</script>
