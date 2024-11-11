import { defineStore } from "pinia";
import type { Lotes } from "~/interfaces/Lotes";

export const useCartStore = defineStore("cart", () => {
  const cart: Ref<Lotes[]> = ref([]);
  const muestras: Ref<Lotes[]> = ref([])

  async function addItemCart(item: Lotes) {
    cart.value.push(item);
  }

  async function addItemMuestraCart(item: Lotes) {
    muestras.value.push(item);
  }

  async function deleteItemCart(id: string) {
    cart.value.splice(
      cart.value.findIndex((item) => item._id === id),
      1
    );
  }

  async function deleteItemMuestraCart(id: string) {
    muestras.value.splice(
      muestras.value.findIndex((item) => item._id === id),
      1
    );
  }

  return {
    cart,
    muestras,
    addItemCart,
    addItemMuestraCart,
    deleteItemCart,
    deleteItemMuestraCart,
  };
});
