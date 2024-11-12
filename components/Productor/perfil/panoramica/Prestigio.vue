<template>
  <div class="flex flex-col gap-8">
    <div>
      <div
        class="shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:-text-dar ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-md py-5 px-4"
      >
        <div class="flex justify-between border-b pb-4">
          <h2 class="uppercase font-medium text-sm text-gray-600">equipo</h2>
          <UIcon
            name="i-ph-pencil-fill"
            class="text-primary justify-self-stretch text-xl cursor-pointer"
            dynamic
            @click="openEquipo()"
          />
        </div>
        <div
          class="grid grid-cols-3 gap-2 py-4 w-full overflow-x-hidden h-[144px] overflow-y-auto"
        >
          <div
            v-if="
              useProductor.perfilProductor.equipo &&
              useProductor.perfilProductor.equipo.length > 0
            "
            v-for="(item, index) in useProductor.perfilProductor.equipo"
            class="flex gap-2 col-span-1 py-2 relative w-full"
          >
            <img :src="item.picture" alt="" class="h-10 w-10 rounded-full" />
            <div class="flex flex-col w-full">
              <span
                class="capitalize text-sm font-semibold text-gray-700 truncate w-full max-w-36"
                >{{ item.nombre }} {{ item.apellido }}</span
              >
              <span
                class="capitalize text-xs text-gray-700 truncate w-full max-w-36"
                >{{ item.rol }}</span
              >
            </div>
            <div
              aria-hidden="true"
              v-if="index !== 0 && index % 3 === 0"
              class="absolute -top-1 left-0 right-0 h-[1px] w-screen bg-gray-200"
            ></div>
          </div>
          <div
            v-else
            class="col-span-3 col-start-2 flex items-center justify-center"
          >
            <span class="w-full text-gray-600">Ningún equipo añadido</span>
          </div>
        </div>
      </div>

      <!-- Modal de equipo -->

      <div>
        <div>
          <UModal
            :ui="{
              width: 'sm:max-w-2xl',
            }"
            prevent-close
            v-model="isOpenModalEquipo"
          >
            <UCard
              class="h-full"
              :ui="{
                ring: '',
                divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                width: 'sm:max-w-2xl',
              }"
            >
              <template #header>
                <div class="flex items-center justify-between">
                  <h3
                    class="text-base font-semibold leading-6 text-gray-900 dark:-text-dar"
                  >
                    Agregar Integrantes del Equipo
                  </h3>
                  <UButton
                    color="gray"
                    variant="ghost"
                    icon="i-heroicons-x-mark-20-solid"
                    class="-my-1"
                    :disabled="disableBotonEquipo"
                    @click="cerrarModalEquipo"
                  />
                </div>
              </template>

              <div class="h-full">
                <div class="flex justify-between items-center">
                  <h1
                    v-if="useProductor.equipoUpdate!.length === 0"
                    class="text-gray-700 text-sm font-medium"
                  >
                    No hay Integrantes
                  </h1>
                  <h1
                    @click=""
                    v-else-if="useProductor.equipoUpdate!.length === 1"
                    class="text-gray-700 text-sm font-medium"
                  >
                    1 Integrante
                  </h1>
                  <h1 v-else class="text-gray-700 text-sm font-medium">
                    {{ useProductor.equipoUpdate!.length }} Integrantes
                  </h1>
                  <UButton
                    type="button"
                    class="w-fit self-end px-3 h-10 font-bold"
                    @click="pushEquipo()"
                  >
                    <UIcon
                      name="i-ic-baseline-add-circle-outline"
                      class="text-white text-2xl font-bold"
                      dynamic
                    />
                    Agregar Integrante
                  </UButton>
                </div>

                <div class="overflow-auto h-[320px] my-4 pb-8" ref="equipoContainer">
                  <div
                    v-for="(item, index) in useProductor.equipoUpdate" :key="index"
                    class="grid grid-cols-12 relative"
                    :ref="el => { if (el) equipoRefs[index] = el as HTMLElement}"
                  >
                    <ProductorPerfilModalEquipo
                      :equipo="item"
                      :index="index"
                      class="col-span-11 self-start"
                    />
                  </div>
                </div>

                <div></div>
                <UButton
                  type="button"
                  class="w-full flex justify-center px-3 h-10 font-bold"
                  @click="onSumitEquipoUpdate()"
                  :loading="loadindUnpate"
                >
                  Actualizar los mienbros del equipo
                </UButton>
                <UProgress
                  :value="porcentaje"
                  :color="color"
                  class="col-span-9 mt-2"
                  :class="{hidden: !progreso}"
                >
                  <template #indicator="{percent}">
                    <div
                      class="text-right"
                      :style="{
                        width: `${
                          percent < 10 && faseUpload !== 'none'
                            ? percent + 15
                            : percent
                        }%`,
                      }"
                    >
                      <span
                        v-if="faseUpload === 'none'"
                        class="text-gray-500 w-fit"
                        >Esperando...</span
                      >
                      <span
                        v-else-if="faseUpload === 'Subiendo Imagen...'"
                        class="text-blue-500 w-fit"
                        >{{ faseUpload }}</span
                      >
                      <span
                        v-else-if="faseUpload === 'Actualizando datos...'"
                        class="text-orange-500"
                        >{{ faseUpload }}</span
                      >
                      <span
                        v-else-if="faseUpload === 'Subida Completada'"
                        class="text-primary-500"
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
            </UCard>
          </UModal>
        </div>
      </div>
    </div>

    <div>
      <div
        class="shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:-text-dar ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-md py-5 px-4"
      >
        <div class="flex justify-between border-b pb-4">
          <h2 class="uppercase font-medium text-sm text-gray-600">
            Certificaciones
          </h2>
          <UIcon
            name="i-ph-pencil-fill"
            class="text-primary justify-self-stretch text-xl cursor-pointer"
            dynamic
            @click="isOpenModalCertificaciones = true"
          />
        </div>
        <div
          class="grid grid-cols-3 gap-2 w-full py-4 overflow-x-hidden h-[144px] overflow-y-auto"
        >
          <div
            v-if="useProductor.perfilProductor.certificaciones && useProductor.perfilProductor.certificaciones.length > 0"
            v-for="(item, index) in useProductor.perfilProductor.certificaciones"
            class="flex gap-2 col-span-1 py-2 relative w-full"
          >
            <img :src="item.picture" alt="" class="h-10 w-10 rounded-full" />
            <div class="flex flex-col">
              <span class="capitalize text-sm font-semibold text-gray-700">{{
                item.certificacion
              }}</span>
              <span
                class="capitalize text-xs text-gray-700 truncate w-full max-w-36"
                >{{ item.year }}</span
              >
            </div>
            <div
              aria-hidden="true"
              v-if="index !== 0 && index % 3 === 0"
              class="absolute -top-1 left-0 right-0 h-[1px] w-screen bg-gray-200"
            ></div>
          </div>
          <div
            v-else
            class="col-span-3 col-start-2 flex items-center justify-center"
          >
            <span class="w-full text-gray-600"
              >No se han añadido certificados</span
            >
          </div>
        </div>
      </div>
      <!-- Modal de certificados -->
      <div>
        <div>
          <UModal
            :ui="{
              width: 'sm:max-w-2xl',
            }"
            prevent-close
            v-model="isOpenModalCertificaciones"
          >
            <UCard
              :ui="{
                ring: '',
                divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                width: 'sm:max-w-2xl',
              }"
            >
              <template #header>
                <div class="flex items-center justify-between">
                  <h3
                    class="text-base font-semibold leading-6 text-gray-900 dark:-text-dar"
                  >
                    Agregar Certificados
                  </h3>
                  <UButton
                    color="gray"
                    variant="ghost"
                    icon="i-heroicons-x-mark-20-solid"
                    class="-my-1"
                    @click="cerrarModalCertificaciones"
                  />
                </div>
              </template>

              <div>
                <div class="flex justify-between items-center">
                  <h1
                    v-if="useProductor.certificacionesUpdate!.length === 0"
                    class="text-gray-700 text-sm font-medium"
                  >
                    No hay certificados
                  </h1>
                  <h1
                    @click=""
                    v-else-if="useProductor.certificacionesUpdate!.length === 1"
                    class="text-gray-700 text-sm font-medium"
                  >
                    1 Certificado
                  </h1>
                  <h1 v-else class="text-gray-700 text-sm font-medium">
                    {{ useProductor.certificacionesUpdate!.length }} Certificados
                  </h1>
                  <UButton
                    type="button"
                    class="w-fit self-end px-3 h-10 font-bold"
                    @click="pushCertificado()"
                  >
                    <UIcon
                      name="i-ic-baseline-add-circle-outline"
                      class="text-white text-2xl font-bold"
                      dynamic
                    />
                    Agregar certificado
                  </UButton>
                </div>
                <div>
                  <ProductorPerfilModalCertificados
                    v-for="(item, index) in useProductor.certificacionesUpdate"
                    :certificaciones="item"
                    :index="index"
                  />
                </div>
                <UButton
                  type="button"
                  :loading="loadingCertificadoUpdate"
                  class="w-full mt-8 flex justify-center self-end px-3 h-10 font-bold"
                  @click="onSumitCertificadosUpdate"
                >
                  <UIcon
                    name="i-ic-baseline-add-circle-outline"
                    class="text-white text-2xl font-bold"
                    dynamic
                  />
                  Actualizar los certificados
                </UButton>
              </div>
            </UCard>
          </UModal>
        </div>
      </div>
    </div>

    <div>
      <div
        class="shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:-text-dar ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-md py-5 px-4"
      >
        <div class="flex justify-between border-b pb-4">
          <h2 class="uppercase font-medium text-sm text-gray-600">Premios</h2>
          <UIcon
            name="i-ph-pencil-fill"
            class="text-primary justify-self-stretch text-xl cursor-pointer"
            dynamic
            @click="isOpenModalPremios = true"
          />
        </div>
        <div
          class="grid grid-cols-3 gap-2 w-full overflow-x-hidden py-4 h-[144px] overflow-y-auto"
        >
          <div
            v-if="useProductor.perfilProductor.premios && useProductor.perfilProductor.premios.length > 0"
            v-for="(item, index) in useProductor.perfilProductor.premios"
            class="flex gap-2 col-span-1 py-2 relative w-full"
          >
            <div class="flex flex-col">
              <span class="capitalize text-sm font-semibold text-gray-700">{{
                item.nombre
              }}</span>
              <span
                class="capitalize text-xs text-gray-700 truncate w-full max-w-36"
                >{{ item.year }}</span
              >
            </div>
            <div
              aria-hidden="true"
              v-if="index !== 0 && index % 3 === 0"
              class="absolute -top-1 left-0 right-0 h-[1px] w-screen bg-gray-200"
            ></div>
          </div>
          <div
            v-else
            class="col-span-3 col-start-2 flex items-center justify-center"
          >
            <span class="w-full text-gray-600"
              >No se han añadido certificados</span
            >
          </div>
        </div>
      </div>

      <!-- Modal de premios -->
      <div>
        <div>
          <UModal
            :ui="{
              width: 'sm:max-w-2xl',
            }"
            prevent-close
            v-model="isOpenModalPremios"
          >
            <UCard
              :ui="{
                ring: '',
                divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                width: 'sm:max-w-2xl',
              }"
            >
              <template #header>
                <div class="flex items-center justify-between">
                  <h3
                    class="text-base font-semibold leading-6 text-gray-900 dark:-text-dar"
                  >
                    Agregar Premios
                  </h3>
                  <UButton
                    color="gray"
                    variant="ghost"
                    icon="i-heroicons-x-mark-20-solid"
                    class="-my-1"
                    @click="cerrarModalPremios"
                  />
                </div>
              </template>

              <div>
                <div class="flex justify-between items-center">
                  <h1
                    v-if="useProductor.premiosUpdate!.length === 0"
                    class="text-gray-700 text-sm font-medium"
                  >
                    No hay premios
                  </h1>
                  <h1
                    @click=""
                    v-else-if="useProductor.premiosUpdate!.length === 1"
                    class="text-gray-700 text-sm font-medium"
                  >
                    1 Premio
                  </h1>
                  <h1 v-else class="text-gray-700 text-sm font-medium">
                    {{ useProductor.premiosUpdate!.length }} Premios
                  </h1>
                  <UButton
                    type="button"
                    class="w-fit self-end px-3 h-10 font-bold"
                    @click="pushPremios()"
                  >
                    <UIcon
                      name="i-ic-baseline-add-circle-outline"
                      class="text-white text-2xl font-bold"
                      dynamic
                    />
                    Agregar premios
                  </UButton>
                </div>
                <div>
                  <ProductorPerfilModalPremios
                    v-for="(item, index) in useProductor.premiosUpdate"
                    :premio="item"
                    :index="index"
                  />
                </div>
                <UButton
                  type="button"
                  :loading="loadingPremios"
                  class="w-fit self-end px-3 h-10 font-bold"
                  @click="onSumitPremios"
                >
                  <UIcon
                    name="i-ic-baseline-add-circle-outline"
                    class="text-white text-2xl font-bold"
                    dynamic
                  />
                  Actualizar los premios
                </UButton>
              </div>
            </UCard>
          </UModal>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {toast} from "vue3-toastify";
import type {
  Certificaciones,
  Equipo,
  Premios,
} from "~/interfaces/PerfilProductor";
import axios from "axios";

const useProductor = useProductorStore();

const loading = ref(false);
const loadindUnpate = ref(false);

const isOpenModalEquipo = ref(false);
const isOpenModalPremios = ref(false);
const isOpenModalCertificaciones = ref(false);

const certificaciones = ref([] as Certificaciones[]);
const certificacionesOriginal = ref([] as Certificaciones[]);

const equipo = ref([] as Equipo[]);
const equipoOriginal = ref([] as Equipo[]);
const equipoUpdate = ref([] as Equipo[]);
const equipoContainer = ref<HTMLElement | null>(null)
const equipoRefs = ref<HTMLElement[]>([])
const disableBotonEquipo = ref(false);
const loadingUpdateEquipo = ref(false);

const premiosOriginal = ref([] as Premios[]);
const premios = ref([] as Premios[]);

const progreso = ref(false);

const fileSave = ref(),
  imgIntegrante = ref();
const faseUpload = ref(
  "none" as
    | "none"
    | "Subiendo Imagen..."
    | "Actualizando datos..."
    | "Subida Completada"
    | "error"
);
const color = computed(() => {
  switch (true) {
    case faseUpload.value === "none":
      return "gray";
    case faseUpload.value === "Subiendo Imagen...":
      return "blue";
    case faseUpload.value === "Actualizando datos...":
      return "orange";
    case faseUpload.value === "error":
      return "red";
    default:
      return "primary";
  }
});

const porcentaje = ref(100);

onMounted(() => {
  cargarDatos();
});

function cargarDatos() {
  certificaciones.value = useProductor.perfilProductor.certificaciones ?? [];
  useProductor.certificacionesUpdate = useProductor.perfilProductor.certificaciones ?? [] ;
  certificacionesOriginal.value = JSON.parse(
    JSON.stringify(useProductor.perfilProductor.certificaciones)
  );

  equipo.value = useProductor.perfilProductor.equipo ?? [];
  equipoUpdate.value = useProductor.perfilProductor.equipo ?? [];
  equipoOriginal.value = JSON.parse(
    JSON.stringify(useProductor.perfilProductor.equipo)
  );

  premios.value = useProductor.perfilProductor.premios ?? [];
  premiosOriginal.value = JSON.parse(
    JSON.stringify(useProductor.perfilProductor.premios)
  );
}

type TipoPrestigio = Equipo| Certificaciones| Premios

function validacionesArray<T extends TipoPrestigio>(
  arrayOriginal: T[],
  arrayActualizado: T[],
  cerrarModal: () => void,
): boolean {
  console.log({arrayOriginal, arrayActualizado});
  // Validación 1: Comprobar si hay cambios
  if (JSON.stringify(arrayOriginal) === JSON.stringify(arrayActualizado)) {
    toast.info("No hay cambios");
    setTimeout(() => {
      cerrarModal();
    }, 1000);
    return false;
  }
  const hayObjetosVacios = arrayActualizado.some((item) =>
    Object.values(item).some(
      (valor) => valor === "" || valor === null || valor === undefined
    )
  );

  if (hayObjetosVacios) {
    toast.warn("Por favor, complete todos los campos.");
    return false;
  }

  return true;
}

watch(isOpenModalCertificaciones, (nuevoValor) => {
  if (nuevoValor) {
    // Al abrir el modal, crear una copia fresca
    useProductor.perfilProductor.certificaciones = JSON.parse(
      JSON.stringify(certificacionesOriginal.value)
    );
  }
});

function cerrarModalCertificaciones() {
  isOpenModalCertificaciones.value = false;
  // Restablecer a los datos originales sin afectar el store
  useProductor.perfilProductor.certificaciones = JSON.parse(
    JSON.stringify(certificacionesOriginal.value)
  );
}

function pushCertificado() {
  if(!useProductor.certificacionesUpdate){
    useProductor.certificacionesUpdate = []
  }
  useProductor.certificacionesUpdate.push({
    certificacion: "",
    picture: "",
    year: "",
    _id: ""
  });
}

watch(isOpenModalEquipo, (nuevoValor) => {
  if (nuevoValor) {
    // Al abrir el modal, crear una copia fresca
    useProductor.equipoUpdate = JSON.parse(JSON.stringify(equipoOriginal.value));
  }
});

const loadingCertificadoUpdate = ref(false)

async function onSumitCertificadosUpdate(){
  loadingCertificadoUpdate.value = true
  const validacion = validacionesArray(certificacionesOriginal.value, useProductor.certificacionesUpdate, cerrarModalCertificaciones);

  if(validacion){
    const resAddPrestigio = await addPrestigio("certificaciones", useProductor.certificacionesUpdate)
        useProductor.perfilProductor.certificaciones = useProductor.certificacionesUpdate
        cargarDatos()
        toast.success('Los certificados han sido actualizados.', {
          onClose() {
            isOpenModalCertificaciones.value = false
            loadingCertificadoUpdate.value = false
          },
        })
  }
}

function openEquipo() {
  isOpenModalEquipo.value = true;
  useProductor.equipoUpdate = useProductor.perfilProductor.equipo ?? [];
}

function cerrarModalEquipo() {
  isOpenModalEquipo.value = false;
  // Restablecer a los datos originales sin afectar el store
  useProductor.equipoUpdate = JSON.parse(JSON.stringify(equipoOriginal.value));
}

function pushEquipo() {
  const hayObjetosVacios = useProductor.equipoUpdate?.some((miembro) =>
    Object.values(miembro).some(
      (valor) => valor === "" || valor === null || valor === undefined
    )
  );

  if (hayObjetosVacios) {
    // Si hay objetos con campos vacíos, mostramos un mensaje de error
    toast.error(
      "Por favor, complete todos los campos del equipo antes de agregar un nuevo miembro."
    );
    return; // Salimos de la función sin agregar un nuevo objeto
  }

  useProductor.equipoUpdate.push({
    _id: "",
    nombre: "",
    apellido: "",
    rol: "",
    picture: "",
  });

    // Esperar a que Vue actualice el DOM
    nextTick(() => {
    // Obtener el índice del nuevo elemento
    const newIndex = useProductor.equipoUpdate.length - 1;
    // Obtener el elemento del DOM
    const newElement = equipoRefs.value[newIndex];
    
    if (newElement && equipoContainer.value) {
      // Calcular la posición de desplazamiento
      const containerRect = equipoContainer.value.getBoundingClientRect();
      const elementRect = newElement.getBoundingClientRect();
      const scrollTo = elementRect.top - containerRect.top + equipoContainer.value.scrollTop;
      
      // Desplazar suavemente al nuevo elemento
      equipoContainer.value.scrollTo({
        top: scrollTo,
        behavior: 'smooth'
      });
    }
  });
  
}

async function onSumitEquipoUpdate() {
  loadingUpdateEquipo.value = true;
  const validacion = validacionesArray(equipoOriginal.value, useProductor.equipoUpdate, cerrarModalEquipo);
  progreso.value = true;

  if (validacion) {
    try {
      let statusUpdate = false
      for (let i = 0; i < useProductor.equipoUpdate.length; i++) {
        try {
          if (useProductor.equipoUpdate[i].fileSave) {
            const resPictureUpdate =  await uploadFiles(useProductor.equipoUpdate[i].fileSave );
            if (resPictureUpdate?.status) {
              useProductor.equipoUpdate[i].picture = resPictureUpdate.url;
              delete useProductor.equipoUpdate[i].fileSave;
            } else {
              toast.error("Hubo un problema al subir alguna imagen.");
              statusUpdate = false
              break;
            }
          }
          statusUpdate = true
          // Si ocurre un error, puedes salir del bucle
        } catch (error) {
          console.error(`Error procesando el integrante ${i}:`, error);
          faseUpload.value = 'error'
          break; // Esto detendrá el bucle
        }
      }

      if (statusUpdate) {
        const resAddPrestigio = await addPrestigio("equipo", useProductor.equipoUpdate)
        useProductor.perfilProductor.equipo = useProductor.equipoUpdate
        faseUpload.value = "Subida Completada";
        cargarDatos()
        toast.success('Los integrantes del equipo han sido actualizados.', {
          onClose() {
            isOpenModalEquipo.value = false
          },
        })
      }


    } catch (error) {
      faseUpload.value = 'error'
      console.error(error);
      throw error
    } finally {
      loadingUpdateEquipo.value = false;
    }
  }
  progreso.value = false;
}

watch(isOpenModalPremios, (nuevoValor) => {
  if (nuevoValor) {
    // Al abrir el modal, crear una copia fresca
    premios.value = JSON.parse(JSON.stringify(premiosOriginal.value));
  }
});

function cerrarModalPremios() {
  isOpenModalPremios.value = false;
  // Restablecer a los datos originales sin afectar el store
  premios.value = JSON.parse(JSON.stringify(premiosOriginal.value));
}

function pushPremios() {
  useProductor.premiosUpdate?.push({
    _id: "",
    nombre: "",
    year: "",
  });
}

const loadingPremios = ref(false)

async function onSumitPremios(){
  loadingPremios.value = true
  const validacion = validacionesArray(premiosOriginal.value, useProductor.premiosUpdate, cerrarModalPremios);

  if(validacion){
    const resAddPrestigio = await addPrestigio("premios", useProductor.premiosUpdate)
    useProductor.perfilProductor.premios = useProductor.premiosUpdate
    cargarDatos()
    toast.success('Los premios han sido actualizados.', {
      onClose() {
        isOpenModalPremios.value = false
        loadingPremios.value = false
      },
    })
  }
}

interface UploadResult {
  status: boolean;
  tipo: string;
  url: string;
}

async function uploadFiles(file: File): Promise<UploadResult> {
  if (!file) {
    return {status: false, tipo: "otros", url: ""};
  }

  const formData = new FormData();
  formData.append("files[]", file);

  try {
    const response = await axios({
      url: `${import.meta.env.VITE_URL_API}/api/assets/upload`,
      method: "POST",
      headers: {
        "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
      },
      data: formData,
      onUploadProgress: (progressEvent) => {
        faseUpload.value = "Subiendo Imagen...";
        const progressPercent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total!
        );
        porcentaje.value = progressPercent;
      },
    });

    return {
      status: true,
      tipo: "success",
      url: `https://cockpit.arabicagc.com/storage/uploads${response.data.assets[0].path}`,
    };
  } catch (error) {
    console.error("Error al subir el archivo:", error);
    faseUpload.value = "error";
    if (axios.isAxiosError(error) && error.code === "ERR_NETWORK") {
      toast.info("Problemas en la conexión. Intente más tarde.");
      return {status: false, tipo: "otros", url: ""};
    }
    return {status: false, tipo: "error", url: ""};
  }
}

type UpdateKey = 'equipo' | 'certificaciones' | 'premios';



type UpdateValue<T extends UpdateKey> = 
  T extends 'equipo' ? Equipo[] :
  T extends 'certificaciones' ? Certificaciones[] :
  T extends 'premios' ? Premios[] :
  never;

  async function addPrestigio<T extends UpdateKey>(key: T, value: UpdateValue<T>) {
  try{
    const response = await axios({
      url: `${import.meta.env.VITE_URL_API}/api/content/item/productores`,
      method: "POST",
      headers: {
        "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
      },
      data:{data: {
        _id: useProductor.perfilProductor._id,
        [key]: value
      }}
    })
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar ${key}:`, error);
    throw error; // Re-lanzamos el error para que pueda ser manejado por el llamador si es necesario
  }
}

</script>

<style></style>
