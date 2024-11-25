<template>
  <div class=" h-full my-auto ">
    <div class="bg-white m-4 md:m-10 p-4 md:p-8 rounded-xl border ">
      <div class=" max-w-fit flex flex-col gap-8">
        <h1 class="uppercase text-gray-600 font-bold md:font-medium md:text-xs"> eliminar cuenta</h1>
        <div class="flex flex-col gap-4">
          <p class="text-gray-800" >Ten en cuenta que no podrás recuperar ninguno de tus datos ni reactivar tu cuenta.</p>
          <p class="text-gray-800" >Haz clic en "Eliminar cuenta" si aún quieres borrar tu cuenta.</p>
        </div>
        <p class="text-gray-800 flex gap-1 items-center text-sm md:text-base "><UIcon class="text-rose-500" name="i-material-symbols-warning-outline-rounded" dynamic/> <b class="font-bold" > Precaución:</b> esto no se puede deshacer.</p>
        <UButton color="red" class="w-fit py-3 px-4" @click="isOpenModal = true" >
          Eliminar cuenta
        </UButton>
      </div>
    </div>
  </div>

  <!-- Modal de eliminar cuenta -->
  <div>
    <UModal v-model="isOpenModal" :ui="{
      container: 'items-center'
    }">
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
  layout: 'productor',
  middleware: 'productor'
})
const useUser = useUserStore()
const useProductor = useProductorStore()


const isOpenModal = ref(false)
const isLoadingModal = ref(false)

console.log(useProductor.perfilProductor._id)
console.log(useProductor.perfilProductor)
useProductor.perfilProductor.lotes?.forEach((lote)=>{
      console.log(lote._id);
    })

const eliminarCuenta =async ()=>{
  isLoadingModal.value = true
  
  await Promise.all(
    useProductor.perfilProductor.lotes!.map(async (lote) => {
      try {
        // @ts-ignore
        const response = await axios(
            // @ts-ignore
            {
              url: `${import.meta.env.VITE_URL_API}/api/content/item/lotes/${
                lote._id
              }`,
              method: "DELETE",
              mode: "cors",
              headers: {
                "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
              },
            }
          );
        return response.data;
      } catch (error) {

        toast.info('Problemas de conexión y no se pudo eliminar un lote, vuelva a intentarlo por favor.')

        console.error(`Error al eliminar lote ${lote._id}:`, error);
        
        throw error;
      }
    })
  )
  .then(async(res)=>{
    try {
      // @ts-ignore
      await axios(
          // @ts-ignore
          {
            url: `${import.meta.env.VITE_URL_API}/api/content/item/productores/${useProductor.perfilProductor._id}`,
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
    } catch (error) {
      console.log(error);
    }

  })
  .finally(()=>{
    isLoadingModal.value = false
    isOpenModal.value = false
  })
}

</script>

<style>

</style>