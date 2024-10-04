<template>
  <div class="bg-white m-10 p-8 rounded-xl border">
    <div class=" max-w-fit flex flex-col gap-8">
      <h1 class="uppercase text-gray-600 font-medium text-xs"> eliminar cuenta</h1>
      <div>
        <p class="text-gray-800" >Ten en cuenta que no podrás recuperar ninguno de tus datos ni reactivar tu cuenta.</p>
        <p class="text-gray-800" >Haz clic en "Eliminar cuenta" si aún quieres borrar tu cuenta.</p>
      </div>
      <p class="text-gray-800 flex gap-1 items-center"><UIcon class="text-rose-500" name="i-material-symbols-warning-outline-rounded" dynamic/> <b class="font-bold" > Precaución:</b> esto no se puede deshacer.</p>
      <UButton color="red" class="w-fit py-3 px-4" @click="isOpenModal = true" >
        Eliminar cuenta
      </UButton>
    </div>
  </div>

  <!-- Modal de eliminar cuenta -->
  <div>
    <UModal v-model="isOpenModal">
      <div class="p-8">
        <div class="flex flex-col gap-4 items-center text-center">
          <UIcon name="i-heroicons-x-circle" class="text-rose-500 text-6xl" />
          <div>
            <h1 class="text-2xl font-semibold">
              Estas seguro de querer eliminar la cuenta?
            </h1>
            <p>Al eliminar ya no podra recuperarla.</p>
          </div>
          <UButton
            @click="eliminarCuenta"
            color="red"
            :loading="isLoadingModal"
            class="w-fit ring-2 ring-offset-2 ring-rose-500"
            >Eliminar</UButton
          >
        </div>
      </div>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { toast } from 'vue3-toastify';

definePageMeta({
  layout: 'comprador',
  middleware: 'comprador'
})
const useUser = useUserStore()
const useComprador = useCompradorStore()

const isOpenModal = ref(false)
const isLoadingModal = ref(false)

const eliminarCuenta =async ()=>{
  isLoadingModal.value = true
  
    try {
      // @ts-ignore
      await axios(
          // @ts-ignore
          {
            url: `${import.meta.env.VITE_URL_API}/api/content/item/productores/${useComprador.perfilComprador._id}`,
            method: "DELETE",
            mode: "cors",
            headers: {
              "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
            }
          }
        )
        .then(res =>{
          console.log(res.data);
        })
    } catch (error) {
      console.log(error);
    }
  
    try {
      // @ts-ignore
      await axios(
          // @ts-ignore
          {
            url: `${import.meta.env.VITE_URL_API}/api/content/item/usuarios/${useUser.dataUser._id}`,
            method: "DELETE",
            mode: "cors",
            headers: {
              "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
            }
          }
        )
        .then((res)=>{
          console.log(res.data);
          toast.success('Se a eliminado el usuario', {
            onClose: (()=>{
              useUser.logout()
              setTimeout(() => {
                window.location.reload();
              }, 5000);
            }) 
          
        })
      })
      .finally(()=>{
        isLoadingModal.value = false
        isOpenModal.value = false
      })
    } catch (error) {
      console.log(error);
    }

  }

</script>

<style>

</style>