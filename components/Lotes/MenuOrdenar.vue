<template>
  <div>
    <UPopover :popper="{ arrow: true }">
          <UButton color="white" label="Ordenar" trailing-icon="i-heroicons-chevron-down-20-solid" />

          <template #panel>
            <div class="p-4">

              <URadioGroup v-model="selected" legend="Choose something" :options="options" />


            </div>
          </template>
        </UPopover>
  </div>
</template>

<script lang="ts" setup>
import type { Lotes } from '~/interfaces/Lotes';


interface Props {

}

// const props = defineProps<{items: Props}>()
const emits = defineEmits<{
  // (e: 'close', value: boolean): void
}>()

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  disponibilidad: boolean;
  puntuacion: number;
  cosecha: string; // formato: "YYYY-MM-DD"
}

const closeMenu = () =>{
  // emits('close', false)
}

const options = [{
  value: 'disponibilidad',
  label: 'Disponibilidad'
}, {
  value: 'precioMenor',
  label: 'precio: de menor a mayor'
}, {
  value: 'precioMayor',
  label: 'precio: de mayor a menor'
}, {
  value: 'puntuacionMayor',
  label: 'puntuacion: de menor a mayor'
}, {
  value: 'puntuacionMenor',
  label: 'puntuacion: de mayor a menor'
}, {
  value: 'masReciente',
  label: 'cosecha mas reciente'
}]

const selected = ref('disponibilidad')


type TipoOrden = 
  | "disponibilidad"
  | "precio-asc"
  | "precio-desc"
  | "puntuacion-asc"
  | "puntuacion-desc"
  | "cosecha-reciente";

const ordenarProductos = (productos: Producto[], tipoOrden: TipoOrden): Producto[] => {
  const productosOrdenados = [...productos]; // Crear copia para no mutar el original

  switch (tipoOrden) {
    case "disponibilidad":
      return productosOrdenados.sort((a, b) => {
        // Productos disponibles primero
        return Number(b.disponibilidad) - Number(a.disponibilidad);
      });

    case "precio-asc":
      return productosOrdenados.sort((a, b) => a.precio - b.precio);

    case "precio-desc":
      return productosOrdenados.sort((a, b) => b.precio - a.precio);

    case "puntuacion-asc":
      return productosOrdenados.sort((a, b) => a.puntuacion - b.puntuacion);

    case "puntuacion-desc":
      return productosOrdenados.sort((a, b) => b.puntuacion - a.puntuacion);

    case "cosecha-reciente":
      return productosOrdenados.sort((a, b) => {
        const fechaA = new Date(a.cosecha);
        const fechaB = new Date(b.cosecha);
        return fechaB.getTime() - fechaA.getTime();
      });

    default:
      return productosOrdenados;
  }
};

// Ejemplo de uso:
const productos: Producto[] = [
  {
    id: 1,
    nombre: "Producto 1",
    precio: 100,
    disponibilidad: true,
    puntuacion: 4.5,
    cosecha: "2023-01-15"
  },
  {
    id: 2,
    nombre: "Producto 2",
    precio: 50,
    disponibilidad: false,
    puntuacion: 3.8,
    cosecha: "2024-02-20"
  },
  {
    id: 3,
    nombre: "Producto 3",
    precio: 75,
    disponibilidad: true,
    puntuacion: 4.2,
    cosecha: "2023-12-10"
  }
];


</script>

<style>

</style>