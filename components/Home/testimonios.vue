<template>
  <div class="bg-[url('/img/bg-testimonio.png')] py-20" :class="`bg-[url('${bg}')]`">
    <div class="flex flex-col justify-center items-center mx-20">
      <span class="text-primary text-center uppercase">Testimonios</span>

      <h2 class="text-xl md:text-6xl font-bold md:leading-[1.2] my-4">
        Observen sus historias
      </h2>

      <UCarousel
        arrows
        :prev-button="{
          color: 'gray',
          icon: 'i-heroicons-arrow-left-20-solid',
          class: '-left-12',
        }"
        :next-button="{
          color: 'gray',
          icon: 'i-heroicons-arrow-right-20-solid',
          class: '-right-12',
        }"
        ref="carouselRef"
        v-slot="{item}"
        :items="items"
        :ui="{item: 'basis-full'}"
        class="md:mx-20 w-64 md:w-auto mx-auto"
        :class="inClick ? 'cursor-grab' : 'cursor-grabbing'"
        @mousedown="handleCursor"
        @mouseup="handleCursor"
        indicators
      >
        <div class="mb-20 mt-8">
          <p
            class="leading-7 text-[#7a7a7a] font-raleway md:text-2xl text-center font-semibold"
          >
            {{ item.testimonio }}
          </p>

          <div class="flex justify-center items-center mt-8 gap-4">
            <Avatar :picture="item.avatar"/>
            <div class="text-start">
              <p class="text-[#03764d] font-semibold">
                {{ item.name }}
              </p>

              <p class="uppercase text-[#333333] tracking-widest font-semibold">
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
import bg from "~/public/img/bg-testimonio.png"

const carouselRef = ref();

const inClick = ref(true);

function handleCursor() {
  inClick.value = !inClick.value;
}

onMounted(() => {
  setInterval(() => {
    if (!carouselRef.value) return;

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0);
    }

    carouselRef.value.next();
  }, 3000);
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
