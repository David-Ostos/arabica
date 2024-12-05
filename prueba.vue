<template>
  <div class="w-1/2">
    <div>
      <div v-for="items in prestigio">
        <div v-for="key in Object.keys(items).slice(0, 3)">
          <div class="flex justify-between mb-4">
            <h3 class="capitalize font-medium text-xl">{{ key }}</h3>
            <UIcon
              name="i-ph-pencil-fill"
              class="text-primary justify-self-stretch text-xl"
              dynamic
            />
          </div>
          <div
            class="flex items-center justify-center gap-4 shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:-text-dar ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-md py-5 text-center"
          >
            <div
              v-for="item in items[key].slice(0, 3)"
              :key="item.nombre || item.categoria"
              class="border rounded-md flex flex-col items-center p-2"
            >
              <img
                v-if="key === 'equipo'"
                :src="item.img"
                alt=""
                class="rounded-full w-16 h-16 object-cover object-top"
              />
              <img v-else :src="item.img" alt="" class="rounded-xl w-32" />

              <div
                v-for="field in Object.keys(item)"
                :key="field"
                class="w-32"
              >
                <h3 v-if="field === 'nombre'" class="capitalize truncate">
                  {{ item[field] }}
                </h3>
                <p
                  v-if="
                    field !== 'img' && field !== 'redes' && field !== 'nombre'
                  "
                  class=" h-14"
                >
                  {{ item[field] }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const useUser = useUserStore();

const prestigio: any = [
  // ... tu definición de datos
];

</script>

<style></style>
