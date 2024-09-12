import axios from "axios";
import { defineStore } from "pinia";
import type { Lotes } from "~/interfaces/Lotes";

export const useFavoritosStore = defineStore("favoritos", () => {
  const favoritos: Ref<any[]> = ref([]);

  async function addItemFavorito(item: any) {
    favoritos.value.push(item);
  }

  async function deleteItemFavorito(id: string) {
    favoritos.value.splice(
      favoritos.value.findIndex((item) => item._id === id),
      1
    );
  }

  async function getFavoritos(id: string) {
    console.log(id);
    if (!id) return;
    try {
      await axios
        .get(
          `${
            import.meta.env.VITE_URL_API
          }/api/content/items/favoritos?filter={userID: '${id}'}`,
          {
            headers: {
              "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
            },
          }
        )
        .then(async (res) => {
          favoritos.value = res.data;
          console.log(favoritos.value);
        });
    } catch (err) {
      console.log(err);
    }
  }

  return {
    favoritos,
    addItemFavorito,
    deleteItemFavorito,
    getFavoritos,
  };
});
