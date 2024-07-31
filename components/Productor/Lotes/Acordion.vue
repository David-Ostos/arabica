<template>
    <div class="flex flex-col ">
      <div v-for="item in items" :key="item.id" class="transition-height duration-500 ease-in-out w-auto flex flex-col">
        <div class="bg-white rounded-xl mb-1 p-4 cursor-pointer"
        @click="toggle(item.id)"
        >
          <button
          class="flex justify-between  w-full items-center transition-all duration-500 text-primary z-10 relative"
          >
          <h2 class="">
            {{ item.label }}
          </h2>
          <UIcon :class="item.isActive? 'rotate-180' : ''" class="text-xl transform transition-all duration-500 ease-in-out"  name="i-material-symbols-keyboard-arrow-up-rounded" dynamic />
        </button>
        </div>
          <div v-for="key in Object.keys(item.contenido)" :class="item.isActive ? 'h-auto opacity-100 ' : 'h-0 opacity-0'">
              <div  class="flex justify-between mx-8 mb-2 pb-2 border-b h-auto transform delay-150 transition-height duration-500 ease-in-out  text-[#6B7280] overflow-hidden text-lg z-0 relative capitalize">
                <p  class=""> {{ key}}:</p>
                <p> {{ item.contenido[key] }}</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  items: Object,
});
;
const items = ref(props.items);

console.log(items.value);

const toggle = (id: string) => {
  items.value!.forEach((item: any) => {
    if (item.id === id) item.isActive =!item.isActive;
  });
};
</script>

<style></style>
