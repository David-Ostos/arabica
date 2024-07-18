<template>
  <div>
    <NuxtLink
    :to="link"
      class="hvr-ripple-out inline-flex items-center justify-center px-4 py-2 text-base font-semibold text-center rounded-lg dark:text-white lg:px-7 cursor-pointer "
    >
    <UIcon v-if="loading" name="i-heroicons-arrow-path-20-solid" class="animate-spin"/>

      {{ contenido }}
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>

defineProps({
  link: String,
  contenido: String,
  loading: Boolean
})

</script>

<style scoped>
@-webkit-keyframes hvr-ripple-out {
  100% {
    top: -12px;
    right: -12px;
    bottom: -12px;
    left: -12px;
    opacity: 0;
  }
}
@keyframes hvr-ripple-out {
  100% {
    top: -12px;
    right: -12px;
    bottom: -12px;
    left: -12px; 
    opacity: 0;
  }
}
.hvr-ripple-out {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
}
.hvr-ripple-out:before {
  content: '';
  position: absolute;
  border: rgb(74,222,128) solid 3px;
  border-radius: 12px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
}
.hvr-ripple-out:hover:before, .hvr-ripple-out:focus:before, .hvr-ripple-out:active:before {
  -webkit-animation-name: hvr-ripple-out;
  animation-name: hvr-ripple-out;
}
</style>
