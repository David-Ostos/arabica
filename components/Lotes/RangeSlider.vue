<template>
  <div class="w-full">
    <div class="flex justify-between mb-2">
      <span class="text-sm text-gray-600">{{ formatValue(modelValue[0]) }}</span>
      <span class="text-sm text-gray-600">{{ formatValue(modelValue[1]) }}</span>
    </div>
    
    <div
      class="relative w-full h-2 bg-gray-200 rounded-full"
      ref="sliderTrack"
      @mousedown="initializeSlider"
      @touchstart="initializeSlider"
    >
      <!-- Barra de progreso -->
      <div
        class="absolute h-full bg-primary rounded-full"
        :style="{
          left: `${((modelValue[0] - min) / (max - min)) * 100}%`,
          right: `${100 - ((modelValue[1] - min) / (max - min)) * 100}%`
        }"
      ></div>

      <!-- Control deslizante mínimo -->
      <div
        class="absolute w-5 h-5 -mt-1.5 -ml-2.5 bg-white border-2 border-primary rounded-full cursor-pointer"
        :style="{ left: `${((modelValue[0] - min) / (max - min)) * 100}%` }"
        @mousedown.stop="startDragging('min', $event)"
        @touchstart.stop="startDragging('min', $event)"
      ></div>

      <!-- Control deslizante máximo -->
      <div
        class="absolute w-5 h-5 -mt-1.5 -ml-2.5 bg-white border-2 border-primary rounded-full cursor-pointer"
        :style="{ left: `${((modelValue[1] - min) / (max - min)) * 100}%` }"
        @mousedown.stop="startDragging('max',$event)"
        @touchstart.stop="startDragging('max',$event)"
      ></div>
    </div>
  </div>
  <div>
  </div>
</template>

<script lang="ts" setup>
import type { Lotes } from '~/interfaces/Lotes';

interface Props {
  modelValue: [number, number];
  min: number;
  max: number;
  step?: number;
  name: string;
  formatValue?: (value: number) => string;
}


const props = withDefaults(defineProps<Props>(), {
  step: 1,
  formatValue: (value: number) => value.toString()
});
const modelValueCopy: [number, number] = [...props.modelValue]


const emits = defineEmits<{
  (e: 'update:modelValue', value: [number,number], valueDefault: [number, number] , name: string ): void,
}>()

const sliderTrack = ref<HTMLElement | null>(null);
const activeThumb = ref<'min' | 'max' | null>(null);

const calculateValue = (clientX: number): number => {
  if (!sliderTrack.value) return props.min;

  const rect = sliderTrack.value.getBoundingClientRect();
  const percentage = (clientX - rect.left) / rect.width;
  const rawValue = props.min + (props.max - props.min) * percentage;
  
  // Ajustar al paso más cercano
  const steppedValue = Math.round(rawValue / props.step) * props.step;
  
  // Limitar al rango min-max
  return Math.min(Math.max(steppedValue, props.min), props.max);
};

const updateValue = (clientX: number) => {
  if (!activeThumb.value) return;

  const newValue = calculateValue(clientX);
  const [currentMin, currentMax] = props.modelValue;

  if (activeThumb.value === 'min') {
    if (newValue <= currentMax) {
      emits('update:modelValue', [newValue, currentMax], modelValueCopy, props.name);
    }
  } else {
    if (newValue >= currentMin) {
      emits('update:modelValue', [currentMin, newValue], modelValueCopy , props.name);
    }
  }
};

const startDragging = (thumb: 'min' | 'max', event: MouseEvent | TouchEvent) => {
  event.preventDefault();
  activeThumb.value = thumb;
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('touchmove', onDrag);
  document.addEventListener('mouseup', stopDragging);
  document.addEventListener('touchend', stopDragging);
};

const onDrag = (event: MouseEvent | TouchEvent) => {
  const clientX = 'touches' in event 
    ? event.touches[0].clientX 
    : event.clientX;
  updateValue(clientX);
};

const stopDragging = () => {
  activeThumb.value = null;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('touchmove', onDrag);
  document.removeEventListener('mouseup', stopDragging);
  document.removeEventListener('touchend', stopDragging);
};

const initializeSlider = (event: MouseEvent | TouchEvent) => {
  const clientX = 'touches' in event 
    ? event.touches[0].clientX 
    : event.clientX;
  const newValue = calculateValue(clientX);
  const [currentMin, currentMax] = props.modelValue;
  
  // Determinar qué control mover basado en la distancia
  const distToMin = Math.abs(newValue - currentMin);
  const distToMax = Math.abs(newValue - currentMax);
  
  if (distToMin <= distToMax) {
    activeThumb.value = 'min';
  } else {
    activeThumb.value = 'max';
  }
  
  updateValue(clientX);
};

onUnmounted(() => {
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('touchmove', onDrag);
  document.removeEventListener('mouseup', stopDragging);
  document.removeEventListener('touchend', stopDragging);
});

</script>

<style>

</style>