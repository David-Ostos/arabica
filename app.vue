<script setup lang="ts">
import TipoUserModal from './components/Modals/TipoUser.modal.vue';
import {useUserStore} from "@/stores/user";

const useUser = useUserStore();
const router = useRouter()

router.options.scrollBehavior = (to, from) => {
  if( from.path.includes('perfil') && to.path.includes('perfil')){
    window.scrollTo({
      top: window.scrollY,
      behavior: 'smooth',
    });
  }else{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth',
    });
  }
}

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
</template>
<style>

</style>
