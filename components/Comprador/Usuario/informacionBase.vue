<template>
<div class="h-full my-auto mt-14">
    <div
      class=" rounded-xl shadow w-fit h-fit mx-auto  bg-white  overflow-auto font-raleway"
    >
      <h1 class="px-8 pt-4 uppercase text-gray-500 text-xs font-bold">
        INFORMACIÓN BÁSICA
      </h1>
      <UForm
        :schema="schema"
        :state="state"
        @submit="onSubmit"
        class="flex flex-col p-8"
      >
        <div class="grid grid-cols-5 gap-8">
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
              label="Apellido"
              name="apellido"
              class="col-span-1"
            >
              <UInput
                placeholder="Apellido"
                icon=""
                v-model="state.apellido"
                size="xl"
              />
            </UFormGroup>
            <UFormGroup required class="col-span-2" label="Correo" name="email">
              <UInput
                placeholder="ejemplo@gmai.com"
                icon="i-heroicons-envelope"
                v-model="state.email"
                size="xl"
              />
            </UFormGroup>
  
            <UFormGroup
              class="col-span-2"
              label="Contraseña"
              name="contraseña"
              :help="state.password ? '' : 'Puedes agregar tu contraseña aqui'"
            >
              <UInput
                placeholder="*************"
                icon=""
                v-model="state.password"
                type="password"
                size="xl"
              />
            </UFormGroup>
          </div>

          <!-- logo  -->
          <div class="p-4 col-span-2">
            <span class="text-gray-500 font-semibold">Logo del Comercio</span>

            <div
              class="relative flex flex-col justify-center items-center border rounded-xl h-64 w-full shadow-inner bg-gray-100"
            >
              <button type="button" v-if="(state.picture || imgUser) "
                @click="clickInputFile"
                class="absolute top-4 right-4 p-2 rounded-full flex justify-center items-center border bg-white shadow hover:brightness-95 cursor-pointer"
              >
                <UIcon
                  name="i-heroicons-camera"
                  class="text-primary-600 h-9 w-9"
                  
                />
              </button>
              <div class="w-full flex justify-center items-center">
                <USkeleton
                  class="h-48 w-48 bg-dark"
                  :ui="{rounded: 'rounded-full'}"
                  v-show="!loadingImg"
                />
                <div v-show="loadingImg">
                  <div
                    v-show="!state.picture && !imgUser"
                    class="py-8 rounded-xl w-full  flex flex-col justify-center items-center text-gray-700 px-12"
                  >
                    <UIcon name="i-heroicons-photo" class="text-8xl" dynamic />
                    <UButton type="button" @click="clickInputFile" class="font-semibold"
                      >Subir una nueva imagen</UButton>
                    <input ref="inputImgUser" type="file" @change="handleFileUpload" class="hidden" />
                  </div>
                  <img v-show="imgUser" :src="imgUser" class="rounded-full h-48 w-48 shadow" />
                  <img
                    v-show="state.picture && !imgUser"
                    onload="loadingImg = false"
                    :src="state.picture"
                    class="rounded-full h-48 w-48 shadow"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <span
              class="text-xs text-gray-500 font-semibold mx-auto w-[max-content] flex"
              >Al menos 200 por 200 píxeles. Tamaño máximo 6MB.</span
            >
          </div>
          <!-- /logo  -->

        </div>
        <div class="flex flex-col " >
          <UButton
            class="w-fit self-end px-3 py-[10px] font-bold"
            :ui="{
              variant: {
                solid: 'bg-{color}-600',
              },
            }"
            type="submit"
            :loading="loading"
            @click="onSubmit"
          >
            Guardar cambios
          </UButton>
          <UProgress :value="porcentaje" :color="color" class="col-span-4">
              <template #indicator="{percent}">
                <div
                  class="text-right"
                  :style="{width: `${percent < 10 && faseUpload !== 'none' ? percent + 15: percent}%`}"
                >
                  <span v-if="faseUpload === 'none'" class="text-gray-500 w-fit"
                    >Esperando...</span
                  >
                  <span
                    v-else-if="faseUpload === 'Subiendo Imagenes...'"
                    class="text-blue-500 w-fit"
                    >{{ faseUpload }}</span
                  >
                  <span
                    v-else-if="faseUpload === 'Subiendo Lote...'"
                    class="text-amber-500 w-fit"
                    >{{ faseUpload }}</span
                  >
                  <span
                    v-else-if="faseUpload === 'Actualizando datos del usuario...'"
                    class="text-orange-500"
                    >{{ faseUpload }}</span
                  >
                  <span
                    v-else-if="faseUpload === 'Subida Completada'"
                    class="text-primary-500 "
                    >✔ Subida completada.</span
                  >
                  <span
                    v-else-if="faseUpload === 'error'"
                    class="text-red-500 font-bold min-w-14"
                    >X Hubo un error.</span
                  >
                </div>
              </template>
          </UProgress>
        </div>
      </UForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {object, string, type InferType} from "yup";
import type {FormSubmitEvent} from "#ui/types";
import type {User} from "~/interfaces/Users";
import axios from "axios";
import { toast } from "vue3-toastify";

const useUser = useUserStore();
const loading = ref(false);
const loadingImg = ref(true);
const imgUser = ref()


const schema = object({
  nombre: string().required("Este campo es requerido"),
  apellido: string().required("Este campo es requerido"),
  email: string().email().required("Este campo es requerido"),
  password: string().min(8, "La contraseña debe tener 8 caracteres").optional()
});

type Schema = InferType<typeof schema>;

const state: User = reactive({
  _id: useUser.dataUser._id,
  nombre: useUser.dataUser.nombre,
  apellido: useUser.dataUser.apellido,
  email: useUser.dataUser.email,
  password: useUser.dataUser.password,
  picture: useUser.dataUser.picture,
});

const filesSave = ref() ;
const faseUpload = ref(
  "none" as
    | "none"
    | "Subiendo Imagenes..."
    | "Subiendo Lote..."
    | "Actualizando datos del usuario..."
    | "Subida Completada"
    | "error"
);
const color = computed(() => {
  switch (true) {
    case faseUpload.value === "none":
      return "gray";
    case faseUpload.value === "Subiendo Imagenes...":
      return "blue";
    case faseUpload.value === "Subiendo Lote...":
      return "amber";
    case faseUpload.value === "Actualizando datos del usuario...":
      return "orange";
    case faseUpload.value === "error":
      return "red";
    default:
      return "primary";
  }
});

const porcentaje = ref(0);
const inputImgUser = ref()


const clickInputFile = (event:any)=>{
  console.log(inputImgUser.value);
  inputImgUser.value.click();
}

async function handleFileUpload(event: any) {

  filesSave.value = event.target.files;

  const files = [...event.target.files];

  imgUser.value = [];

  // Array para almacenar las promesas de lectura de archivos
  const imagePromises = [];
  const verificar = [...files];
  const archivosPermitidos = [
    "image/gif",
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/webp",
    "image/*",
  ];

  console.log(files);
  const cumpleConTipos = verificar.every((file: any) => {
    return archivosPermitidos.includes(file.type);
  });

  console.log(cumpleConTipos);

  if (cumpleConTipos) {
    if (files.length > 0 && files.length <= 4) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        // Crea una promesa para cada lectura de archivo
        const imagePromise = new Promise((resolve, reject) => {
          reader.onload = () => {
            const dataURL = reader.result;
            resolve(dataURL);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        imagePromises.push(imagePromise);
      }

      // Espera a que todas las promesas se resuelvan (imágenes cargadas)
      const imagesData = await Promise.all(imagePromises);
      imgUser.value = imagesData;
    } else {
      toast.error(
        "Solo se aceptan archivos de formato .gif, .png, .jpg, .jpeg, webp"
      );
    }
  } else {
    toast.error(
      "Solo se aceptan archivos de formato .gif, .png, .jpg, .jpeg, webp"
    );
  }
}

async function uploadFiles(files: any) {
  console.log(files);
  let status;
  if (files) {
    const formData = new FormData();
    formData.append("files[]", files[0]);
    

    try {
      // @ts-ignore
      await axios(
        // @ts-ignore
        {
          url: `${import.meta.env.VITE_URL_API}/api/assets/upload`,
          method: "POST",
          mode: "cors",
          headers: {
            "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
          },
          data: formData,
          onUploadProgress: (progressEvent) => {
            console.log(progressEvent);
            faseUpload.value = "Subiendo Imagenes...";
            const progressPercent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total!
            );
            porcentaje.value = progressPercent;
            // Actualiza tu interfaz con el porcentaje de progreso
          },
        }
      )
        .then((res) => {
          console.log(res.data);
          state.picture = `https://cockpit.arabicagc.com/storage/uploads${res.data.assets[0].path}`
          return (status = {status: true, tipo: "success"});
        })
        .catch((e) => {
          console.log(e);
          faseUpload.value = "error";
          if (e.code === "ERR_NETWORK") {
            toast.info("Problemas en la conexion intente mas tarde.");
            return (status = {status: false, tipo: "otros"});
          } else {
            return (status = {status: false, tipo: "error"});
          }
        });
    } catch (e) {
      console.log(e);
      faseUpload.value = "error";

      return (status = {status: false, tipo: "error"});
    }
  } else {
    toast.error("No hay imagenes para subir.");
    return (status = {status: false, tipo: "otros"});
  }
  return status;
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  loading.value = true
  console.log(state);
  let uploadImgStatus;
  if(imgUser.value){
    uploadImgStatus = await uploadFiles(filesSave.value)
  }else{
    uploadImgStatus = {status: true}
  }
  console.log(event.data);
  if(uploadImgStatus!.status){
    try {
        // @ts-ignore
      await axios(
        // @ts-ignore
        {
          url: `${import.meta.env.VITE_URL_API}/api/content/item/usuarios?fields={"_state": false,"_modified": false,"_mby": false,"_created": false,"_cby": false,"verificacion": false,}`,
          method: "POST",
          mode: "cors",
          headers: {
            "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
          },
          data: {data: state},
          onUploadProgress: (progressEvent) => {
            console.log(progressEvent);
            faseUpload.value = "Actualizando datos del usuario...";
            const progressPercent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total!
            );
            porcentaje.value = progressPercent;
            // Actualiza tu interfaz con el porcentaje de progreso
          },
        }
      )
      .then((res) =>{
        toast.success("Se han actualizado los datos del usuario satisfactoriamente.")
        useUser.dataUser.picture = state.picture
        faseUpload.value = 'Subida Completada' 
        imgUser.value = ''
        loading.value = false
      })
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<style scoped>
.h-formulario {
  height: calc(100vh - 200px);
}
</style>
