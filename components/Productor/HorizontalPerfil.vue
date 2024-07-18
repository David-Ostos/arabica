<template>
  <transition
    v-show="!useUser.dataUser.verificado"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
    enter-active-class="transition duration-300"
    leave-active-class="transition duration-300"
    class="block transition duration-300 font-roboto  rounded-b-xl bg-primary-500  pb-4 pt-6 shadow-xl z-50"
  >
   <NuxtLink to="/dashboard/productor" class=" font-bold text-white text-center hover:bg-primary-600">No estas verificado, una vez veriﬁcado podrás comenzar a ofrecer tu café en nuestra plataforma, <span  class=" ml-2 capitalize bg-white rounded-full text-primary py-1 px-2">¡ verificate !</span ></NuxtLink>
  </transition>
</template>

<script lang="ts" setup>
const useUser = useUserStore()


</script>

<style>

</style>