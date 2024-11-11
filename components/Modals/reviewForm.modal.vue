<template>

<script setup lang="ts">
const isOpen = ref(false)
</script>

<template>
  <div>

    <UModal v-model="props.isOpen" prevent-close>
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Deja tu reseña
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="closeModal" />
          </div>
        </template>
        
        <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
          <div class="p-8">
            <!-- <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">Deja tu reseña</div> -->
            <form @submit.prevent="submitReview" class="mt-6">
              <div class="mb-4">
                <label for="rating" class="block text-gray-700 text-sm font-bold mb-2">Puntuación:</label>
                <div class="flex items-center">
                  <template v-for="star in 5" :key="star">
                    <input 
                      type="radio" 
                      :id="`star${star}`" 
                      :value="star" 
                      v-model="rating"
                      class="hidden"
                    />
                    <label 
                      :for="`star${star}`" 
                      class="cursor-pointer text-3xl"
                      :class="{ 'text-yellow-400': star <= rating, 'text-gray-300': star > rating }"
                      @mouseenter="hoverRating = star"
                      @mouseleave="hoverRating = rating"
                    >
                      ★
                    </label>
                  </template>
                </div>
              </div>
              <div class="mb-4">
                <label for="comment" class="block text-gray-700 text-sm font-bold mb-2">Comentario:</label>
                <textarea 
                  id="comment" 
                  v-model="comment" 
                  rows="3" 
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Escribe tu comentario aquí"
                ></textarea>
              </div>
              <div class="flex items-center justify-between">
                <button 
                  type="submit" 
                  class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  :disabled="!isValid"
                >
                  Enviar Reseña
                </button>
              </div>
            </form>
          </div>
        </div>

      </UCard>
    </UModal>
  </div>
</template>



</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
interface Review {
  _id: string,
  isOpen: boolean,
  user: string,
  idProductor: string,
  idUsuario: string,
  idLote: string
}



const props = defineProps<Review>()

const rating = ref(0)
const hoverRating = ref(0)
const comment = ref('')

const isValid = computed(() => rating.value > 0 && comment.value.trim().length > 0)

const emit = defineEmits(['review-submitted','close-review'])

const submitReview = () => {
  if (isValid.value) {
    emit('review-submitted', {
      rating: rating.value,
      comment: comment.value.trim()
    })
    // Resetear el formulario
    rating.value = 0
    comment.value = ''
  }
}

const closeModal= () => {
  emit('close-review', false)
}

</script>