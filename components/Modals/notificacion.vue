<script setup lang="ts">
import 'ldrs/tailChase'

type Icones = "warning"| "info" | "success" | "error" | "loading"

interface Props {
  titulo: string,
  contenidoOne: string,
  contenidoTwo: string,
  icon: Icones ,
  textoBoton: string,
  to?: string,
  onClick?: () => void,
  loading?: boolean
}

onMounted(()=>{
  functionColor()
})

const props = defineProps<Props>()
const emits = defineEmits<{
  (e: 'close', value: boolean): void,
}>()
const open = ref(true)

const color = ref('')

const closemodal = ()=>{
  emits('close', false)
}

const icons = {
  warning:'i-emojione-warning',
  info:'i-emojione-information',
  success:'i-emojione-white-heavy-check-mark',
  error:'i-heroicons-x-circle-16-solid',
  loading: 'i-heroicons-arrow-path-20-solid'
}

const functionColor = () =>{
  if(props.icon === "warning"){
    color.value = 'yellow' 
  }
  if(props.icon === "info"){
    color.value = 'sky'

}
if(props.icon === "success"){
  color.value = 'primary'

}
if(props.icon === "error"){
  color.value = 'rose'

}

}


</script>

<template>
  <div>
    <UModal v-model="open" :ui="{container: 'items-center'}" prevent-close >
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:-text-dar capitalize">
              Notificación de {{ titulo }}
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="closemodal" />
          </div>
        </template>

        <div class=" flex flex-col justify-center items-center gap-4 ">
          <div>
            <UIcon v-if="!loading" :class="['text-8xl', {'animate-spin': loading}]" :name="icons[icon]"  dynamic/>
            <l-tail-chase v-else
              size="40"
              speed="1.75"
              color="rgb(34 197 94)" 
            ></l-tail-chase>
          </div>
          <h2 class="text-2xl text-center font-bold capitalize">{{ titulo }}</h2>
          <p class="text-gray-800  text-center">{{ contenidoOne }}</p>
          <p class="text-gray-800  text-center">{{ contenidoTwo }}</p>
          <UButton v-if="!loading"  :to="to" @click="onClick" :color="color" variant="outline" size="xl" class="" > {{ textoBoton }}</UButton>
        </div>

      </UCard>
    </UModal>
  </div>
</template>