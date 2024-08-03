<script setup lang="ts">
import TipoUserModal from './components/Modals/TipoUser.modal.vue';
import {useUserStore} from "@/stores/user";

const useUser = useUserStore();
const useLotes = useLotesStore();
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
await useLotes.getDataLotes()

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
::-webkit-scrollbar {
    width: 9px;
  }

::-webkit-scrollbar-track {
    background: white;
    border-radius: 17px;
  }
  
::-webkit-scrollbar-thumb {
    background: #22c55e;
    border-radius: 17px;
    border:0px solid #555777;
  }
                

</style>
