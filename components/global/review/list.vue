<template>
  <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
    <div class="p-8">
      <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">Reseñas</div>
      <ul class="divide-y divide-gray-200">
        <li v-for="review in reviews" :key="review.id" class="py-4">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <span class="text-yellow-400 text-xl">{{ '★'.repeat(review.rating) }}</span>
              <span class="text-gray-300 text-xl">{{ '★'.repeat(5 - review.rating) }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">
                {{ review.comment }}
              </p>
              <p class="text-sm text-gray-500">
                {{ new Date(review.createdAt).toLocaleDateString() }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  reviews: {
    type: Array,
    required: true
  }
})
</script>