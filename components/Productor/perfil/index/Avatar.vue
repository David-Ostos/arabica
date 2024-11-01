<template>
  <div class="modalEdit" v-if="openEdit">
    <div class="container-info-edit">
      <div class="flex justify-between">
        <h1>Editar información</h1>

        <button @click="openEdit = false">
          <span class="i-heroicons-x-mark"></span>
        </button>
      </div>

      <UForm
        :schema="schema"
        :state="state"
        @submit="onSubmit"
        class="flex flex-col p-8"
      >
        <div class="grid gap-8">
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
              size="xl"
              label="Redes"
              name="redes"
              class="col-span-2"
              help="Sólo inserte su nombre de usuario, no el enlace completo, ejemplo 'nombre_usuario'"
              :ui="{
                help: 'text-sm ',
              }"
            >
              <div class="grid grid-cols-3 gap-4">
                <div v-for="item in state.redes" class="col-span-1">
                  <UFormGroup
                    :label="item.name"
                    :ui="{
                      label: { base: 'capitalize' },
                    }"
                  >
                    <div class="w-full grid grid-cols-12">
                      <div
                        v-if="item.linkbase !== 'web'"
                        class="col-span-3 w-full border rounded-l-md shadow-sm bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white"
                      >
                        <div class="flex items-center h-full mx-auto w-fit">
                          <UIcon
                            :name="item.icon!"
                            dynamic
                            class="text-2xl"
                            @click="console.log(state.redes)"
                          />
                        </div>
                      </div>
                      <div
                        class="col-span-9"
                        :class="{ 'col-span-12': item.linkbase === 'web' }"
                      >
                        <UInput
                          v-if="item.linkbase !== 'web'"
                          v-model="item.linkUsuario"
                          size="xl"
                          :ui="{
                            rounded: 'rounded-l-none',
                          }"
                          placeholder="usuario"
                        />
                        <UInput
                          v-else
                          v-model="item.linkUsuario"
                          size="xl"
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
                <div class="cursor-pointer relative col-span-3">
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
                      <li
                        v-show="filterCodeTelefono().length === 0"
                        class="mx-2"
                      >
                        <span class="text-sm text-gray-400"
                          >No se encuentra...</span
                        >
                      </li>
                    </ul>
                  </div>
                </div>
                <UInput
                  class="col-span-9"
                  placeholder="1234567..."
                  icon=""
                  :ui="{
                    rounded: 'rounded-l-none',
                  }"
                  v-model="state.numeroTelefonico!.numero"
                  size="xl"
                />
              </div>

              <!-- <span
                class="text-red-500 text-sm text-center ml-[20px]"
                v-if="numeroTelefonicoValidado"
                >El numero de telefono ya esta registrado</span
              > -->
            </UFormGroup>
          </div>
        </div>

        <div class="my-4" name="direccion">
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
      </UForm>
    </div>
  </div>

  <div class="">
    <div class="-mt-16 relative w-fit">
      <Avatar
        class="ring-4 ring-offset-[3px] ring-primary bg-white"
        clases="h-[120px] w-[120px]"
        clases-icon="text-3xl"
        :picture="picture"
        alt="Avatar"
      />
      <div
        class="text-2xl absolute bottom-1 right-0 flex p-[6px] bg-slate-200 rounded-full cursor-pointer hover:bg-slate-300 transition-all duration-300"
      >
        <UIcon name="i-heroicons-camera-solid" />
      </div>
    </div>
    <div class="my-4">
      <h2
        v-if="useProductor.perfilProductor.nombre !== undefined"
        class="text-2xl font-bold relative w-fit pr-8 capitalize"
      >
        {{ useProductor.perfilProductor.nombre }}
        <UIcon
          class="cursor-pointer text-xl text-primary absolute top-0 right-0"
          name="i-ph-pencil-fill"
          dynamic
          @click="openEdit = true"
        />
      </h2>
      <div class="flex gap-4">
        <p class="flex items-center gap-2 text-lg text-secundary capitalize">
          <UIcon name="i-openmoji-flag-peru" dynamic />
          {{ useProductor.perfilProductor.origen }}
        </p>
        <p class="flex items-center gap-2 text-lg text-secundary capitalize">
          <UIcon name="i-bxs-leaf" class="text-primary" dynamic />
          {{ useProductor.perfilProductor.tipoProductor }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { object, string, type InferType } from "yup";
import { useGlobalStore } from "../../../../stores/global";
const useUser = useUserStore();
const useProductor = useProductorStore();
const useGlobal = useGlobalStore();

const openEdit = ref(false);
const picture = ref();
const pictureTrue = ref(false);
const codeCountry = useGlobal.codeCountry;
const razonSocialValidado = ref(false);
const isActiveCodePhone = ref(false);

const schema = object({
  nombre: string().required("Este campo es requerido"),
  numeroTelefonico: object({
    code: string().required(),
    bandera: string(),
    numero: string().required("Requerido"),
  }).required("Requerido"),
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
});

const searchQuery = ref("");
type Schema = InferType<typeof schema>;

const state: any = reactive({
  nombre: useProductor.perfilProductor.nombre,
  numeroTelefonico: {
    code: useProductor.perfilProductor.numeroTelefonico?.code,
    bandera: useProductor.perfilProductor.numeroTelefonico?.bandera,
    numero: useProductor.perfilProductor.numeroTelefonico?.numero,
  },
  redes: [
    {
      name: "perfil de facebook",
      linkbase: "facebook.com/",
      linkUsuario: useProductor.perfilProductor?.redes
        ? useProductor.perfilProductor?.redes[0]?.linkUsuario
        : "",
      icon: "i-mdi-facebook",
    },
    {
      name: "perfil de instagram",
      linkbase: "instagram.com/",
      linkUsuario: useProductor.perfilProductor?.redes
        ? useProductor.perfilProductor?.redes[1]?.linkUsuario
        : "",
      icon: "i-mdi-instagram",
    },
    {
      name: "URL de pagina ",
      linkbase: "web",
      linkUsuario: useProductor.perfilProductor?.redes
        ? useProductor.perfilProductor?.redes[2]?.linkUsuario
        : "",
      icon: "",
    },
  ],
  direccion: {
    ciudad: useProductor.perfilProductor?.direccion?.ciudad,
    codigoPostal: useProductor.perfilProductor?.direccion?.codigoPostal,
    direccion1: useProductor.perfilProductor?.direccion?.direccion1,
    direccion2: useProductor.perfilProductor?.direccion?.direccion2,
  },
});

onMounted(() => {
  if (useProductor.perfilProductor.logo) {
    picture.value = useProductor.perfilProductor.logo;
    pictureTrue.value = true;
  } else {
    picture.value = "/img/avatar.png";
    pictureTrue.value = false;
  }
});

const filterCodeTelefono = () => {
  if (!searchQuery.value) return codeCountry;
  return codeCountry.filter((code: any) => {
    return (
      code.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      code.code.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
};

const data = reactive({
  nombre: undefined,
  origen: undefined,
  tipoProductor: undefined,
});

const onSubmit = () => {};
</script>

<style scoped lang="scss">
.modalEdit {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  margin: 0 auto;
  z-index: 50;
  padding-top: 4rem;
  background-color: rgba(0, 0, 0, 0.25);

  .container-info-edit {
    min-width: 80%;
    background-color: #fff;
    border-radius: 12px;
    padding: 1rem;
    overflow: auto;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.3);

    h1 {
      font-size: 1.3em;
      font-weight: 600;
      color: #515151;
    }
  }
}
</style>
