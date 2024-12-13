<template>
  <div>
    <UPopover :popper="{ arrow: true }">
      <UButton color="white" label="Ordenar" trailing-icon="i-heroicons-chevron-down-20-solid" />
      <template #panel>
        <div class="p-4">
          <URadioGroup v-model="selected" legend="Ordenar por" :options="options" @change="sortLotes" />
        </div>
      </template>
    </UPopover>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  sortFunction: (sortType: string) => void;
  initialSort: string;
}>();

const emit = defineEmits<{
  (e: 'updateSort', sortType: string): void
}>();

const options = [
  { value: 'disponibilidad', label: 'Disponibilidad' },
  { value: 'precioMenor', label: 'Precio: de menor a mayor' },
  { value: 'precioMayor', label: 'Precio: de mayor a menor' },
  { value: 'puntuacionMenor', label: 'Puntuación: de menor a mayor' },
  { value: 'puntuacionMayor', label: 'Puntuación: de mayor a menor' }
];

const selected = ref(props.initialSort);
onUpdated(()=>{
  selected.value = props.initialSort;
})

const sortLotes = () => {
  props.sortFunction(selected.value);
  emit('updateSort', selected.value);
};

</script>

<style scoped></style>