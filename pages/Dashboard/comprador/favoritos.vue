<script lang="ts" setup>

definePageMeta({
  layout: 'comprador'
})

import axios from "axios";
import { ref } from "vue";
import { useFavoritosStore } from "~/stores/favoritos";
const favIDs: any = ref([]);
const fav: any = ref([]);



const useFavoritos = useFavoritosStore();

const getFavorites = async () => {
  if (favIDs.value.length > 0) {
    for (let i of favIDs.value) {
      await axios
        .get(
          `${import.meta.env.VITE_URL_API}/api/content/item/lotes/${i.loteID}`,
          {
            headers: {
              "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
            },
          }
        )
        .then((res) => {
          fav.value.push(res.data);
        });
    }
  }
};

onMounted(() => {
  favIDs.value = useFavoritos.favoritos;

  if (favIDs.value.length > 0) {
    getFavorites();
  }
  //obtener fav
});
</script>

<template>
  <div class="min-h-screen">
    <div v-if="fav.length > 0">
      <h2 class="main-title">Tus lotes favoritos</h2>
      <div class="flex flex-wrap gap-4 justify-center mr-4 mb-10">
        <div v-for="item in fav" class="w-[30%] mb-4 relative">
          <LotesCard :item="item" />
        </div>
      </div>
    </div>

    <div v-else class="not-fav">
      <h3>No has añadido favoritos a tu lista</h3>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-title {
  padding: 0.5rem;
  font-size: 1.5em;
  font-weight: 700;
}
.not-fav {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 80vh;

  h3 {
    font-size: 2.5em;
    color: #bcbcbc;
  }
}
</style>
