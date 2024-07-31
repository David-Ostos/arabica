<template>
  <div class="w-1/2">
    <div>
      <div v-for="items in prestigio">
        <div v-for="key in Object.keys(items)" class="mb-4">
          <div
            class="shadow-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded-md py-5 px-4 text-center"
          >
          <div class="flex justify-between mb-4 border-b pb-4">
            <h2 class="capitalize font-medium text-xl">{{ key }}</h2>
            <UIcon
              name="i-ph-pencil-fill"
              class="text-primary justify-self-stretch text-xl cursor-pointer"
              dynamic
            />
          </div>
          <div class="flex items-center justify-center gap-4">
            <div
              v-for="item in items[key].slice(0, 4)"
              class="border rounded-md flex flex-col items-center p-2"
            >
              <Avatar
                v-if="key === 'equipo'"
                :picture="item.img !== '' ? item.img : '' "
              />
              <img v-else :src="item.img" alt="" class="rounded-xl w-32" />

              <div
                v-for="field in Object.keys(item)"
                :key="field"
                @click="console.log(field)"
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
  </div>
</template>

<script lang="ts" setup>
const useProductor = useProductorStore();

const prestigio: any = [
  {
    equipo: [
      {
        nombre: "Martha Linarez",
        rol: "C.E.O",
        redes: "https://fb.com",
        img: "/img/testimonio_1.jpg",
      },
      {
        nombre: "Gregory Ruíz",
        rol: "Presidente",
        redes: "https://fb.com",
        img: "/img/testimonio_2.jpg",
      },
      {
        nombre: "Pedro Perez",
        rol: "Ing. Mantenimiento",
        redes: "https://fb.com",
        img: "/img/testimonio_3.jpg",
      },
      {
        nombre: "José Páez",
        rol: "Vendedor",
        redes: "https://fb.com",
        img: "https://th.bing.com/th/id/R.b4bd5d2a219c125ff398096d3008820d?rik=71kngvnT7fJyRg&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f8%2fYoung-Man-PNG-Free-Image.png&ehk=AY5O6uW9z0l%2f2x%2b8jMlmBQEBBk2zJItBgmenSV82w6g%3d&risl=&pid=ImgRaw&r=0",
      },
    ],
    premios: [
      {
        nombre: "Premio nobel",
        categoria: "Premiun",
        img: "https://th.bing.com/th/id/OIP.IHK2huhUOmWOm2WpbLqiCQHaEc?rs=1&pid=ImgDetMain",
      },
    ],
    certificaciones: [
      {
        nombre: "Certificado de Productividad premiun",
        categoria: "Productividad",
        img: "https://aprendeloya.co/wp-content/uploads/2022/08/CERTIFICADO-1-2.jpg",
      },
    ],
  },
];

/* [
  {
    equipo: useProductor.perfilProductor.equipo,
    premios: useProductor.perfilProductor.premios,
    certificaciones: useProductor.perfilProductor.certificaciones,
  },
]; */

console.log(prestigio);
</script>

<style></style>
