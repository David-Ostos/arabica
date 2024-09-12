<script setup lang="ts">
import { useCartStore } from "~/stores/cart";

const useCart = useCartStore();
</script>

<template>
  <div class="container-cart shadow-md">
    <h6 class="title-cart">Carrito de compras</h6>

    <div v-if="useCart.cart.length > 0">
      <div class="list-items">
        <div class="item" v-for="(item, index) in useCart.cart" :key="index">
          <div class="container-img-item" v-if="item.galeria">
            <img :src="item?.galeria[0]?.link" />
          </div>
          <div class="container-info">
            <p class="item-name">{{ item.nombre }}</p>
            <p v-if="item.productor" class="item-productor">
              {{ item.productor?.nombre }}
            </p>
            <p class="item-price">{{ item.precio }} USD / LB</p>
          </div>

          <div class="options-item">
            <button @click="useCart.deleteItemCart(item._id!)">
              <span class="i-heroicons-trash"></span>
            </button>
          </div>
        </div>
      </div>

      <div class="container-buy">
        <button>COMPRAR</button>
      </div>
    </div>

    <div v-else class="cart-empty">
      <p>Su carrito esta vació</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container-cart {
  width: 95%;
  position: fixed;
  right: 10px;
  background-color: #fff;
  height: 85vh;
  padding: 0.5rem;
  z-index: 5;
  border-radius: 12px;
}

.title-cart {
  font-weight: 500;
  font-size: 1.3em;
  padding: 0.5rem;
  color: #333;
}

.cart-empty {
  display: flex;
  color: #bcbcbc;
  font-weight: 500;
  font-size: 1.1em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
}

.list-items {
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  height: 65vh;
  overflow: auto;
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    background-color: #eeeeee78;
    padding: 0.5rem;
    width: 100%;
    border-radius: 10px;
    .container-img-item {
      width: 20%;
      min-width: 80px;

      img {
        border-radius: 8px;
        width: 100%;
        object-fit: contain;
      }
    }

    .container-info {
      width: 65%;
      .item-name {
        font-weight: 600;
        color: #333;
      }

      .item-productor {
        color: rgb(74, 222, 128);
        font-size: 0.9em;
        margin-bottom: 0.3rem;
        font-weight: 700;
      }
      .item-price {
        font-size: 1.2em;
        color: #374151;
        font-weight: 800;
      }
    }
  }
}

.options-item {
  width: 15%;
  display: flex;

  justify-content: center;
  align-items: center;

  button {
    background-color: rgb(244, 82, 82);
    color: #fff;
    width: 45px;
    height: 45px;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      font-size: 1.3em;
    }
  }
}

.container-buy {
  width: 100%;
  align-items: center;
  justify-content: center;

  button {
    background-color: rgb(74, 222, 128);
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.5rem;
    border-radius: 12px;
    color: #fff;
    font-weight: 600;
    font-size: 1.3em;
  }
}

@media (min-width: 700px) {
  .container-cart {
    width: 60%;
  }
}
@media (min-width: 900px) {
  .container-cart {
    width: 45%;
  }
}
</style>
