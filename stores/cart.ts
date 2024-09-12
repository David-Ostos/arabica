import { defineStore } from "pinia";
import type { Lotes } from "~/interfaces/Lotes";

export const useCartStore = defineStore("cart", () => {
  const cart: Ref<Lotes[]> = ref([]);

  async function addItemCart(item: Lotes) {
    cart.value.push(item);
  }

  async function deleteItemCart(id: string) {
    cart.value.splice(
      cart.value.findIndex((item) => item._id === id),
      1
    );
  }

  return {
    cart,
    addItemCart,
    deleteItemCart,
  };
});
