<script lang="ts" setup>

definePageMeta({
  layout: 'comprador'
})

import axios from "axios";
import { ref } from "vue";
import { useFavoritosStore } from "~/stores/favoritos";
const favIDs: any = ref([]);
const fav: any = ref([]);

const useGlobal = useGlobalStore()
const {isScreenSmall} = useGlobalComposable()

const containerStyles = computed(() => {
  if(isScreenSmall.value){
    return `height: calc(100vh - ${useGlobal.heightNavComprador}px)`
  }else{
    return `height: calc(100vh - (${useGlobal.heightNavComprador}px + ${useGlobal.heightFooterProductor}px) )`
  }
});
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
  console.log(favIDs.value)
  if (favIDs.value.length > 0) {
    getFavorites();
  }
  //obtener fav
});
</script>

<template>
  <div :style="containerStyles">
    <div  class=" h-full mx-8 sm:mx-20 " >
      <div v-if="fav.length > 0">
        <h2 class="main-title">Tus lotes favoritos</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mx-4 mb-10">
          <div v-for="item in fav" class="col-span-1  relative">
            <LotesCard :item="item" />
          </div>
        </div>
      </div>
  
      <div v-else :class="`flex justify-center items-center  h-full `">
        <h3 class="text-4xl text-gray-300 w-fit mx-8 text-center sm:text-start" >No has añadido favoritos a tu lista</h3>
      </div>
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
