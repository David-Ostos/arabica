<template>
  <div class="flex flex-col gap-8">
    <div>
      <div
        class="shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-md py-5 px-4"
      >
        <div class="flex justify-between border-b pb-4">
          <h2 class="uppercase font-medium text-sm text-gray-600">equipo</h2>
          <UIcon
            name="i-ph-pencil-fill"
            class="text-primary justify-self-stretch text-xl cursor-pointer"
            dynamic
            @click="isOpenModalEquipo = true"
          />
        </div>
        <div
          class="grid grid-cols-3 gap-2 py-4 w-full overflow-x-hidden h-[144px] overflow-y-auto"
        >
          <div
            v-if="equipo && equipo.length > 0"
            v-for="(item, index) in equipo"
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
            <UCard class="h-[650px] overflow-auto"
              :ui="{
                ring: '',
                divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                width: 'sm:max-w-2xl',
              }"
            >
              <template #header>
                <div class="flex items-center justify-between">
                  <h3 @click="console.log(equipo)"
                    class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
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

              <div>
                <div class="flex justify-between items-center">
                  <h1
                    v-if="equipo!.length === 0"
                    class="text-gray-700 text-sm font-medium"
                  >
                    No hay Integrantes
                  </h1>
                  <h1
                    @click=""
                    v-else-if="equipo!.length === 1"
                    class="text-gray-700 text-sm font-medium"
                  >
                    1 Integrante
                  </h1>
                  <h1 v-else class="text-gray-700 text-sm font-medium">
                    {{ equipo!.length }} Integrantes
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
                <div v-for="(item, index) in equipo" class="grid grid-cols-12 relative">
                  <ProductorPerfilModalEquipo
                    :equipo="item"
                    :index="index"
                    class="col-span-11 self-start"
                  />
                  <div class="col-span-1 row-span-1 absolute top-24 right-10">
                    <UIcon
                      name="i-clarity-remove-line"
                      class="text-rose-500 text-3xl absolute bottom-2 cursor-pointer"
                      dynamic
                      @click="equipo?.splice(index,1)"
                    />
                  </div>
                </div>
              </div>
            </UCard>
          </UModal>
        </div>
      </div>
    </div>

    <div>
      <div
        class="shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-md py-5 px-4"
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
            v-if="certificaciones && certificaciones.length > 0"
            v-for="(item, index) in certificaciones"
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
                    class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
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
                    v-if="certificaciones!.length === 0"
                    class="text-gray-700 text-sm font-medium"
                  >
                    No hay certificados
                  </h1>
                  <h1
                    @click=""
                    v-else-if="certificaciones!.length === 1"
                    class="text-gray-700 text-sm font-medium"
                  >
                    1 Certificado
                  </h1>
                  <h1 v-else class="text-gray-700 text-sm font-medium">
                    {{ certificaciones!.length }} Certificados
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
                    v-for="(item, index) in certificaciones"
                    :certificaciones="item"
                    :index="index"
                  />
                </div>
                <UButton
                  type="button"
                  class="w-fit self-end px-3 h-10 font-bold"
                  @click=""
                >
                  <UIcon
                    name="i-ic-baseline-add-circle-outline"
                    class="text-white text-2xl font-bold"
                    dynamic
                  />
                  Guardar
                </UButton>
              </div>
            </UCard>
          </UModal>
        </div>
      </div>
    </div>

    <div>
      <div
        class="shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-md py-5 px-4"
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
            v-if="premios && premios.length > 0"
            v-for="(item, index) in premios"
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
                    class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
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
                    v-if="premios!.length === 0"
                    class="text-gray-700 text-sm font-medium"
                  >
                    No hay premios
                  </h1>
                  <h1
                    @click=""
                    v-else-if="premios!.length === 1"
                    class="text-gray-700 text-sm font-medium"
                  >
                    1 Premio
                  </h1>
                  <h1 v-else class="text-gray-700 text-sm font-medium">
                    {{ premios!.length }} Premios
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
                    v-for="(item, index) in premios"
                    :certificaciones="item"
                    :index="index"
                  />
                </div>
                <UButton
                  type="button"
                  class="w-fit self-end px-3 h-10 font-bold"
                  @click=""
                >
                  <UIcon
                    name="i-ic-baseline-add-circle-outline"
                    class="text-white text-2xl font-bold"
                    dynamic
                  />
                  Guardar
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
import { toast } from "vue3-toastify";
import type {
  Certificaciones,
  Equipo,
  Premios,
} from "~/interfaces/PerfilProductor";
import type { Schema } from "yup";

const useProductor = useProductorStore();

const loading = ref(false)

const isOpenModalEquipo = ref(false);
const isOpenModalPremios = ref(false);
const isOpenModalCertificaciones = ref(false);

const certificaciones = ref([] as Certificaciones[]);
const certificacionesOriginal = ref([] as Certificaciones[]);

const equipo = ref([] as Equipo[]);
const equipoOriginal = ref([] as Equipo[]);
const disableBotonEquipo = ref(false)

const premiosOriginal = ref([] as Premios[]);
const premios = ref([] as Premios[]);


onMounted(() => {
  cargarDatos();
});

function cargarDatos() {
  
  certificaciones.value = useProductor.perfilProductor.certificaciones ?? [];
  certificacionesOriginal.value = JSON.parse(
    JSON.stringify(useProductor.perfilProductor.certificaciones)
  );

  equipo.value = useProductor.perfilProductor.equipo ?? [];
  equipoOriginal.value = JSON.parse(
    JSON.stringify(useProductor.perfilProductor.equipo)
  );

  premios.value = useProductor.perfilProductor.premios ?? []
  premiosOriginal.value = JSON.parse(
    JSON.stringify(useProductor.perfilProductor.premios)
  );

}

watch(isOpenModalCertificaciones, (nuevoValor) => {
  if (nuevoValor) {
    // Al abrir el modal, crear una copia fresca
    certificaciones.value = JSON.parse(
      JSON.stringify(certificacionesOriginal.value)
    );
  }
});

function cerrarModalCertificaciones() {
  isOpenModalCertificaciones.value = false;
  // Restablecer a los datos originales sin afectar el store
  certificaciones.value = JSON.parse(
    JSON.stringify(certificacionesOriginal.value)
  );
}

function pushCertificado() {
  certificaciones.value?.push({
    certificacion: "",
    picture: "",
    year: "",
  });
}

watch(isOpenModalEquipo, (nuevoValor) => {
  if (nuevoValor) {
    // Al abrir el modal, crear una copia fresca
    equipo.value = JSON.parse(JSON.stringify(equipoOriginal.value));
  }
});

function cerrarModalEquipo() {
  isOpenModalEquipo.value = false;
  // Restablecer a los datos originales sin afectar el store
  equipo.value = JSON.parse(JSON.stringify(equipoOriginal.value));
}

function pushEquipo() {
  const hayObjetosVacios = equipo.value?.some(miembro => 
    Object.values(miembro).some(valor => 
      valor === "" || valor === null || valor === undefined
    )
  );

  if (hayObjetosVacios) {
    // Si hay objetos con campos vacíos, mostramos un mensaje de error
    toast.error("Por favor, complete todos los campos del equipo antes de agregar un nuevo miembro.");
    return; // Salimos de la función sin agregar un nuevo objeto
  }
  equipo.value?.push({
    _id: "",
    nombre: "",
    apellido: "",
    rol: "",
    picture: "",
  });

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
  premios.value?.push({
    _id: "",
    nombre: "",
    year: "",
  });
}


</script>

<style></style>
