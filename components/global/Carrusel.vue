<template>
  <div @click="console.log(sortedImages)" class="carousel-container" :class="{ 'single-column': columns === 1 }">
    <button @click="prev" class="carousel-button prev" :disabled="currentIndex === 0">
      <i class="i-heroicons-chevron-left-20-solid"></i>
    </button>
    <div class="carousel-content" :style="{ gridTemplateColumns: `repeat(${columns}, 1fr)` }">
      <div v-for="index in visibleItemsCount" :key="index" class="carousel-item">
        <img 
          class=" h-72 w-full object-cover"
          v-if="sortedImages[currentIndex + index - 1]" 
          :src="sortedImages[currentIndex + index - 1].link" 
          :alt="`Image ${sortedImages[currentIndex + index - 1].position}`"
        />
      </div>
    </div>
    <button @click="next" class="carousel-button next" :disabled="currentIndex + visibleItemsCount >= sortedImages.length">
      <i class="i-heroicons-chevron-right-20-solid"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface ImageItem {
  _id: string;
  position: number;
  link: string;
}

interface CarouselProps {
  images: ImageItem[];
  columns?: number;
  rows?: number;
  visibleItems?: number;
}

const props = withDefaults(defineProps<CarouselProps>(), {
  columns: 1,
  rows: 1,
  visibleItems: 4,
});

const currentIndex = ref(0);

const visibleItemsCount = computed(() => {
  return Math.min(props.visibleItems, props.columns * props.rows);
});

const sortedImages = computed(() => {
  return [...props.images].sort((a, b) => a.position - b.position);
});

onMounted(() => {
  console.log(sortedImages.value)
});

const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value -= visibleItemsCount.value;
  }
};

const next = () => {
  if (currentIndex.value + visibleItemsCount.value < sortedImages.value.length) {
    currentIndex.value += visibleItemsCount.value;
  }
};
</script>

<style scoped>
.carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.carousel-content {
  display: grid;
  gap: 1rem;
  transition: transform 0.3s ease;
}

.carousel-item {
  overflow: hidden;
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 1rem;
  cursor: pointer;
  z-index: 10;
}

.carousel-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.carousel-button.prev {
  left: 0;
}

.carousel-button.next {
  right: 0;
}

.single-column .carousel-content {
  grid-template-columns: 1fr !important;
}

@media (max-width: 768px) {
  .carousel-content {
    grid-template-columns: 1fr !important;
  }
}
</style>