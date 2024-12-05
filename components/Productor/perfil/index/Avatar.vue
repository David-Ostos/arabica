<template>


<div class="">
    <div class="-mt-16 relative w-fit">
      <Avatar
        @click="isOpenModalAvatar = true"
        class="ring-4 ring-offset-[3px] ring-primary bg-white"
        clases=" h-[90px] w-[90px] md:h-[120px] md:w-[120px]"
        clases-icon="text-3xl"
        :picture="picture"
        alt="Avatar"
      />
      <div
        class="hidden text-2xl absolute bottom-1 right-0 md:flex p-[6px] bg-slate-200 rounded-full cursor-pointer hover:bg-slate-300 transition-all duration-300"
      >
        <UIcon name="i-heroicons-camera-solid"  />
      </div>
    </div>
    <div class="my-4">
      <div class="flex gap-2">
        <h2
          v-if="useProductor.perfilProductor.nombre !== undefined"
          class="text-2xl font-bold relative w-fit  capitalize "
        >
          {{ useProductor.perfilProductor.nombre }}
        </h2>
        <UIcon
        class="cursor-pointer text-xl text-primary"
        name="i-ph-pencil-fill"
        dynamic
        @click="openEdit = true"
        />

      </div>
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


  <!-- modal edit datos basicos mobile -->
  <UModal v-if="isScreenSmall" fullscreen v-model="openEdit" :ui="{
    width: 'w-screen sm:max-w-screen ',
    height:'w-screen h-screen'
  }">
    
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between ">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Editar información
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="openEdit = false" />
          </div>
        </template>

        <UForm
        :schema="schema"
        :state="state"
        @submit="onSubmitDatos"
        class="flex flex-col mb-12 p-4 md:p-8"
      >
        <div class="grid gap-8">
          <div class="grid grid-cols-2 col-span-3 gap-8 h-fit capitalize">
            <UFormGroup
              required
              class="col-span-2 md:col-span-1 h-fit"
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
                <div v-for="item in state.redes as Redes[]" class="col-span-3 md:col-span-1 ">
                  <UFormGroup
                    :label="verificarPerfil(item.tipoRed as PerfilTipo).name"
                    :ui="{
                      label: { base: 'capitalize' },
                    }"
                  >
                    <div class="w-full grid grid-cols-12">
                      <div
                        class="col-span-3 w-full border rounded-l-md shadow-sm bg-gray-100 dark:bg-gray-900 text-gray-900 dark:-text-dar"
                      >
                        <div class="flex items-center h-full mx-auto w-fit">
                          <UIcon
                            :name="item.icon!"
                            dynamic
                            class="text-2xl"
                          />
                        </div>
                      </div>
                      <div
                        class="col-span-9"
                        :class="{ 'col-span-12': item.linkbase === 'web' }"
                      >
                        <UInput
                          v-model="item.linkUsuario"
                          size="xl"
                          :placeholder="verificarPerfil(item.tipoRed as PerfilTipo).msj"
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
              class="col-span-2 md:col-span-1 "
              ><!-- @input="agregarGuiones" -->

              <div
                class="relative z-50 grid grid-cols-12 w-full focus-visible:ring-2 ring-primary group rounded-md"
              >
                <div class="cursor-pointer relative col-span-5 md:col-span-3">
                  <div
                    @click="
                      isActiveCodePhone = !isActiveCodePhone;
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
                  class="col-span-7 md:col-span-9"
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
          <h1 class="mb-2 font-medium md:text-gray-700 mb:mx-4">Dirección:</h1>
          <div
            class="col-span-2 gap-4 grid grid-cols-4 md:grid-cols-3 mb:shadow mb:border mb:bg-gray-100 mb:p-8 rounded-xl"
          >
            <UFormGroup
              label="Dirección del negocio"
              size="xl"
              name="direccion.direccion1"
              class="col-span-4 mb:col-span-3"
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
              class="col-span-4 mb:col-span-3"
              required
            >
              <UInput
                v-model="state.direccion!.direccion2"
                placeholder="Linea 2 de dirección..."
              />
            </UFormGroup>

            <div class="hidden md:block col-span-1 relative">
              <div class=" bg-white shadow-inner w-10 h-10 rounded-full border-2 absolute bottom-0 left-0"></div>
            </div>

            <UFormGroup
              label="Ciudad"
              size="xl"
              name="direccion.ciudad"
              class="col-span-2 mb:col-span-1"
              required
            >
              <UInput v-model="state.direccion!.ciudad" placeholder="Cusco" />
            </UFormGroup>

            <UFormGroup
              label="Codigo Postal"
              size="xl"
              name="direccion.codigoPostal"
              class="col-span-2 mb:col-span-1"
              required
            >
              <UInput
                v-model="state.direccion!.codigoPostal"
                placeholder="2006"
              />
            </UFormGroup>
          </div>
        </div>

        <UButton block :loading="loading" type="submit" class="mt-4" color="primary" size="xl">Actualizar Datos</UButton>

      </UForm>
      </UCard>

  </UModal>
  <!-- !modal edit datos basicos mobile-->

  <!-- !modal edit datos basicos pc-->
  <UModal :ui="{
    width: 'sm:max-w-3xl'
  }" v-if="!isScreenSmall" v-model="openEdit" >
    
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between  ">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Editar información
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="openEdit = false" />
          </div>
        </template>

        <UForm
        :schema="schema"
        :state="state"
        @submit="onSubmitDatos"
        class="flex flex-col mb-12 px-8"
      >
        <div class="grid gap-8">
          <div class="grid grid-cols-2  gap-8 h-fit capitalize">
            <UFormGroup
              required
              class="col-span-2 h-fit"
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
                help: 'text-sm -mt-2 px-4 py-2 bg-gray-100 rounded-b-md ',
              }"
            >
              <div class="grid grid-cols-3 p-4 rounded-t-md bg-gray-100  gap-4">
                <div v-for="item in state.redes as Redes[]" class="col-span-3 md:col-span-1 ">
                  <UFormGroup
                    :label="verificarPerfil(item.tipoRed as PerfilTipo).name"
                    :ui="{
                      label: { base: 'capitalize' },
                    }"
                  >
                    <div class="w-full grid grid-cols-12">
                      <div
                        class="col-span-3 w-full border rounded-l-md shadow-sm bg-gray-100 dark:bg-gray-900 text-gray-900 dark:-text-dar"
                      >
                        <div class="flex items-center h-full mx-auto w-fit">
                          <UIcon
                            :name="item.icon!"
                            dynamic
                            class="text-2xl"
                          />
                        </div>
                      </div>
                      <div
                        class="col-span-9"
                        :class="{ 'col-span-12': item.linkbase === 'web' }"
                      >
                        <UInput
                          v-model="item.linkUsuario"
                          size="xl"
                          :placeholder="verificarPerfil(item.tipoRed as PerfilTipo).msj"
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
              class="col-span-2 "
              ><!-- @input="agregarGuiones" -->

              <div
                class="relative z-50 grid grid-cols-12 w-full focus-visible:ring-2 ring-primary group rounded-md"
              >
                <div class="cursor-pointer relative col-span-3">
                  <div
                    @click="
                      isActiveCodePhone = !isActiveCodePhone;
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
          <h1 class="mb-2 font-medium text-gray-700 mb:mx-4">Dirección:</h1>
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

            <div class=" col-span-1 relative">
              <div class=" bg-white shadow-inner w-10 h-10 rounded-full border-2 absolute bottom-0 left-0"></div>
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

        <UButton block :loading="loading" type="submit" class="mt-4" color="primary" size="xl">
          Actualizar datos
        </UButton>

      </UForm>
      </UCard>

  </UModal>
  <!-- !modal edit datos basicos pc-->

  <!-- modal vista y edicion de imagen del perfil -->
  <div>
    <UModal
      v-model="isOpenModalAvatar"
      :ui="{
        width: 'sm:max-w-fit',
        container: 'items-center'
      }"
    >
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Imagen de perfil 
            </h3> 
            <div class="flex gap-2 items-center">
              <UTooltip text="Editar foto del perfil" :shortcuts="['⌘', 'O']">
                <UIcon name="i-ph-pencil-fill" class="-my-1" @click="onSubmitImg" dynamic />
              </UTooltip>
  
              <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpenModalAvatar = false" />
            </div>           
          </div>
        </template>
        <div>
          <img
            :src="picture"
            class="max-h-[600px] object-contain rounded-3xl shadow-xl"
            alt=""
          />
        </div>
      </UCard>
    </UModal>
  </div>
  <!-- /modal vista y edicion de imagen del perfil -->

</template>

<script lang="ts" setup>
import { boolean, object, string, type InferType } from "yup";
import { useGlobalComposable } from '../../../../composables/useGlobal'
import { useGlobalStore } from "../../../../stores/global";
import type { FormError, FormSubmitEvent } from '#ui/types'
import type { PerfilProductor, Redes } from "~/interfaces/PerfilProductor";
import axios from "axios";
import { toast } from "vue3-toastify";
const useUser = useUserStore();
const useProductor = useProductorStore();
const useGlobal = useGlobalStore();

const openEdit = ref(false);
const picture = ref();
const pictureTrue = ref(false);
const codeCountry = useGlobal.codeCountry;
const razonSocialValidado = ref(false);
const isActiveCodePhone = ref(false);

const isOpenModalAvatar = ref(false)

const {isScreenSmall} = useGlobalComposable()

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

let state: PerfilProductor = reactive({
  _id: useProductor.perfilProductor._id,
  nombre: useProductor.perfilProductor.nombre,
  numeroTelefonico: useProductor.perfilProductor.numeroTelefonico,
  redes: useProductor.perfilProductor.redes,
  direccion: useProductor.perfilProductor?.direccion,
});
const copiaState = ref()
onMounted(() => {
  copiaState.value = JSON.parse(JSON.stringify(state))
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

type PerfilTipo = 'instagram' | 'facebook' | 'web'; 
const verificarPerfil = (tipo: PerfilTipo): {name:string, msj: string} => {
  if (tipo === 'instagram') return {name: 'perfil de instagram', msj:'Usuario'};
  if (tipo === 'facebook') return {name: 'perfil de facebook', msj:'Usuario'}; 
  if (tipo === 'web') return {name: 'URL de página web', msj:'URL de su pagina'};
  return {name: '', msj:''}
};

const loading = ref(false)


const onSubmitDatos = async (event: FormSubmitEvent<any>) => {
  if(JSON.stringify(state) === JSON.stringify(copiaState.value)) return toast.info('No has proporcionado ningún cambio.')
  loading.value = true
  state = convertirAminusculas(state);
  try {
    // @ts-ignore
    await axios({
      url: `${import.meta.env.VITE_URL_API}/api/content/item/productores?fields={_state: false,_modified:false,_mby: false,_created: false,_cby: false}`,
      method: "POST",
      mode: "cors",
      headers: {
        "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
      },
      data: {data: state}
    }).then(res =>{
      useProductor.perfilProductor.nombre = state.nombre
      useProductor.perfilProductor.numeroTelefonico = state.numeroTelefonico
      useProductor.perfilProductor.redes = state.redes
      useProductor.perfilProductor.direccion = state.direccion

    })
  } catch (error) {
    toast.error('Hubo un error en la conexión, por favor vuelvalo a intentar mas tarde.')
    console.log(error)
    throw error
  }finally{
    loading.value = false
    openEdit.value = false
  }
};

const onSubmitImg = (event: FormSubmitEvent<any>) => {
  loading.value = true

  


  loading.value = false
};

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
