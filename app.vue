<script setup lang="ts">
import TipoUserModal from './components/Modals/TipoUser.modal.vue';
import {useUserStore} from "@/stores/user";


const useUser = useUserStore();

await useUser.fetchDataUser()
.catch((e) => console.log(e))

</script>

<template>
  <TipoUserModal/>
  <div class="font-roboto dark:bg-dark">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <UNotifications />
</template>
<style>

</style>
