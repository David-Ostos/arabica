<template>
  <div class="bg-[url('img/bg-testimonio.png')] py-20">
    <div class="flex flex-col justify-center items-center">
      <span class="text-primary text-center uppercase">Testimonios</span>

      <h2 class="text-xl md:text-6xl font-bold md:leading-[1.2] my-4">Observen sus historias</h2>

      <UCarousel
        ref="carouselRef"
        v-slot="{item}"
        :items="items"
        :ui="{item: 'basis-full'}"
        class="mx-20"
        indicators
      >
        <div class="mb-20 mt-8 ">
          <p class="leading-7 text-[#7a7a7a] font-raleway text-2xl text-center font-semibold">{{ item.testimonio }}</p>

          <div class="flex justify-center items-center mt-8 gap-4">
            <UAvatar size="xl" :src="item.avatar" alt="Avatar" />

            <div class="text-start">

              <p class="text-[#03764d] font-semibold ">
                {{ item.name }}
              </p>

              <p class="uppercase text-[#333333] tracking-widest font-semibold ">
                {{ item.rol }}
              </p>
            </div>
          </div>
        </div>
      </UCarousel>
    </div>
  </div>
</template>

<script lang="ts" setup>
import user1 from "~/public/img/testimonio_1.jpg";
import user2 from "~/public/img/testimonio_2.jpg";
import user3 from "~/public/img/testimonio_3.jpg";

const carouselRef = ref();

onMounted(() => {
  setInterval(() => {
    if (!carouselRef.value) return;

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0);
    }

    carouselRef.value.next();
  }, 30000);
});

const items = [
  {
    name: "Martha Linarez",
    avatar: user1,
    testimonio: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius officia id, voluptatum doloremque aut at laudantium saepe enim temporibus nostrum? Libero earum quae nisi ipsa porro alias atque beatae ratione? 
    Neque mollitia, similique tempore quod doloribus alias soluta quis culpa quidem veritatis quos inventore explicabo dolorem eius incidunt fugiat totam, corporis aut omnis asperiores ullam autem doloremque quasi? Quaerat, nemo!`,
    rol: "Productor",
  },
  {
    name: "Jose Diaz",
    avatar: user2,
    testimonio: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius officia id, voluptatum doloremque aut at laudantium saepe enim temporibus nostrum? Libero earum quae nisi ipsa porro alias atque beatae ratione? 
    Neque mollitia, similique tempore quod doloribus alias soluta quis culpa quidem veritatis quos inventore explicabo dolorem eius incidunt fugiat totam, corporis aut omnis asperiores ullam autem doloremque quasi? Quaerat, nemo!`,
    rol: "Productor",
  },
  {
    name: "Kevin Smith",
    avatar: user3,
    testimonio: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius officia id, voluptatum doloremque aut at laudantium saepe enim temporibus nostrum? Libero earum quae nisi ipsa porro alias atque beatae ratione? 
    Neque mollitia, similique tempore quod doloribus alias soluta quis culpa quidem veritatis quos inventore explicabo dolorem eius incidunt fugiat totam, corporis aut omnis asperiores ullam autem doloremque quasi? Quaerat, nemo!`,
    rol: "Tostador",
  },
];
</script>

<style></style>
