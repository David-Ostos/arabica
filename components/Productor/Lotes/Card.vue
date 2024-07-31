<template>
	<div class="relative mx-auto w-auto">
		<NuxtLink :to="`/lote/${item._id}`"
			class="relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full">
			<div class="shadow p-4 rounded-lg bg-white">
				<div class="flex justify-center relative rounded-lg overflow-hidden h-52">
					<div class="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
						<div v-if="item.galeria.length === 0"
							class="absolute inset-0 bg-black opacity-10 flex justify-center items-center">
							<UIcon name="i-heroicons-photo" class="text-white text-[150px]" />
						</div>
						<div v-else class="absolute inset-0 ">
							<USkeleton v-if="loadingImg" class="w-full h-full" :ui="{
								background: 'bg-secundary'
							}" />
							<img :src="item.galeria[0]" alt="" @load="loadingImg = false"/>
						</div>
					</div>

					<!-- <div class="absolute flex justify-center bottom-0 mb-3">
			<div class="flex bg-white px-4 py-1 space-x-5 rounded-lg overflow-hidden shadow">
			  <p class="flex items-center font-medium text-gray-800">
				<svg class="w-5 h-5 fill-current mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M480,226.15V80a48,48,0,0,0-48-48H80A48,48,0,0,0,32,80V226.15C13.74,231,0,246.89,0,266.67V472a8,8,0,0,0,8,8H24a8,8,0,0,0,8-8V416H480v56a8,8,0,0,0,8,8h16a8,8,0,0,0,8-8V266.67C512,246.89,498.26,231,480,226.15ZM64,192a32,32,0,0,1,32-32H208a32,32,0,0,1,32,32v32H64Zm384,32H272V192a32,32,0,0,1,32-32H416a32,32,0,0,1,32,32ZM80,64H432a16,16,0,0,1,16,16v56.9a63.27,63.27,0,0,0-32-8.9H304a63.9,63.9,0,0,0-48,21.71A63.9,63.9,0,0,0,208,128H96a63.27,63.27,0,0,0-32,8.9V80A16,16,0,0,1,80,64ZM32,384V266.67A10.69,10.69,0,0,1,42.67,256H469.33A10.69,10.69,0,0,1,480,266.67V384Z"></path></svg>
				3 + 1
			  </p>

			  <p class="flex items-center font-medium text-gray-800">
				<svg class="w-5 h-5 fill-current mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 512"><path d="M423.18 195.81l-24.94-76.58C387.51 86.29 356.81 64 322.17 64H157.83c-34.64 0-65.34 22.29-76.07 55.22L56.82 195.8C24.02 205.79 0 235.92 0 271.99V400c0 26.47 21.53 48 48 48h16c26.47 0 48-21.53 48-48v-16h256v16c0 26.47 21.53 48 48 48h16c26.47 0 48-21.53 48-48V271.99c0-36.07-24.02-66.2-56.82-76.18zm-310.99-66.67c6.46-19.82 24.8-33.14 45.64-33.14h164.34c20.84 0 39.18 13.32 45.64 33.13l20.47 62.85H91.72l20.47-62.84zM80 400c0 8.83-7.19 16-16 16H48c-8.81 0-16-7.17-16-16v-16h48v16zm368 0c0 8.83-7.19 16-16 16h-16c-8.81 0-16-7.17-16-16v-16h48v16zm0-80.01v32H32v-80c0-26.47 21.53-48 48-48h320c26.47 0 48 21.53 48 48v48zM104.8 248C78.84 248 60 264.8 60 287.95c0 23.15 18.84 39.95 44.8 39.95l10.14.1c39.21 0 45.06-20.1 45.06-32.08 0-24.68-31.1-47.92-55.2-47.92zm10.14 56c-3.51 0-7.02-.1-10.14-.1-12.48 0-20.8-6.38-20.8-15.95S92.32 272 104.8 272s31.2 14.36 31.2 23.93c0 7.17-10.53 8.07-21.06 8.07zm260.26-56c-24.1 0-55.2 23.24-55.2 47.93 0 11.98 5.85 32.08 45.06 32.08l10.14-.1c25.96 0 44.8-16.8 44.8-39.95 0-23.16-18.84-39.96-44.8-39.96zm0 55.9c-3.12 0-6.63.1-10.14.1-10.53 0-21.06-.9-21.06-8.07 0-9.57 18.72-23.93 31.2-23.93s20.8 6.38 20.8 15.95-8.32 15.95-20.8 15.95z"></path></svg>
				2
			  </p>

			  <p class="flex items-center font-medium text-gray-800">
				<svg class="w-5 h-5 fill-current mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M504,256H64V61.25a29.26,29.26,0,0,1,49.94-20.69L139.18,65.8A71.49,71.49,0,0,0,128,104c0,20.3,8.8,38.21,22.34,51.26L138.58,167a8,8,0,0,0,0,11.31l11.31,11.32a8,8,0,0,0,11.32,0L285.66,65.21a8,8,0,0,0,0-11.32L274.34,42.58a8,8,0,0,0-11.31,0L251.26,54.34C238.21,40.8,220.3,32,200,32a71.44,71.44,0,0,0-38.2,11.18L136.56,18A61.24,61.24,0,0,0,32,61.25V256H8a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8H32v96c0,41.74,26.8,76.9,64,90.12V504a8,8,0,0,0,8,8h16a8,8,0,0,0,8-8V480H384v24a8,8,0,0,0,8,8h16a8,8,0,0,0,8-8V474.12c37.2-13.22,64-48.38,64-90.12V288h24a8,8,0,0,0,8-8V264A8,8,0,0,0,504,256ZM228.71,76.9,172.9,132.71A38.67,38.67,0,0,1,160,104a40,40,0,0,1,40-40A38.67,38.67,0,0,1,228.71,76.9ZM448,384a64.07,64.07,0,0,1-64,64H128a64.07,64.07,0,0,1-64-64V288H448Z"></path></svg>
				3
			  </p>
			</div>
		  </div> -->

					<span
						class="absolute top-0 left-0 inline-flex mt-3 ml-3 px-3 py-2 rounded-lg z-10 bg-red-500 text-sm font-medium text-white select-none">
						Destacado
					</span>
				</div>

				<div class="my-4 h-[84px] transition-all duration-1000">
					<h2
						class="font-bold text-base md:text-lg text-gray-700 line-clamp-2 hover:line-clamp-none transition-all duration-1000">
						{{ item.nombre }}
					</h2>
					<div class="flex justify-between font-medium items-center text-sm  text-gray-700  mt-2 gap-1  transition-all duration-600">
						<div class="flex gap-1  ">
							<p class=" ">
								{{ item.productor.nombre }} 
							</p>
							<UIcon name="i-heroicons-check-badge-20-solid" class="text-base text-primary-500" />
						</div>
						<div>
							<div v-if="item.pruebaGratis" class=" text-primary-600 hover:text-primary-700 items-center flex text-xs">
								<UIcon name="i-heroicons-check-20-solid" class="text-lg" />
								<p class="uppercase">Muestra gratis disponible</p>
							</div>
							<div v-else class=" text-red-600 hover:text-red-700 font-bold flex items-center text-xs">
								<UIcon name="i-heroicons-x-circle-20-solid" class="text-lg" />
								<p class="uppercase">Muestra gratis no disponible</p>
							</div>
						</div>
					</div>
				</div>
				<div v-for="campo in campos" class="border-t pt-2"> 
					<div class="pb-4">
						<p v-for="key in Object.keys(campo)" class="flex justify-between p-2 text-sm text-gray-700 capitalize">
							<span class="mt-2 xl:mt-0 font-bold">
								{{ key }}:
							</span>
							<span >{{ campo[key].nombre }}</span>
						</p>
					</div>
					<div class="grid grid-cols-2 pt-4 border-t">
						<div class="flex items-center">
							<div class="relative">
								<Avatar :picture="useUser.dataUser.picture ? useUser.dataUser.picture : ''"/>
							</div>
	
						</div>
	
						<div class="flex justify-end  ">
							<p class="inline-block font-semibold text-gray-700 whitespace-nowrap leading-tight rounded-xl">
								<span class="text-xl uppercase"> $ </span>
								<span class="text-xl">{{ item.precio.toString().replace('.', ',') }} USD/<b class="text-base">kg</b></span>
							</p>
						</div>
					</div>
				</div>

			</div>
		</NuxtLink>
	</div>
</template>

<script lang="ts" setup>
import type { Lotes } from "~/interfaces/Lotes";
const useUser = useUserStore()
const props = defineProps<{ item: Lotes }>();
const campos = ref();

const loadingImg = ref(true)

onMounted(() => {
	campos.value = [
		{
			origen: {
				icon: "",
				nombre: props.item.origen,
			},
			proceso: {
				icon: "",
				nombre: props.item.proceso,
			},
			puntaje: {
				icon: "",
				nombre: props.item.score,
			},
			cantidad: {
				icon: "",
				nombre: props.item.lotsQuantity,
			},
		},
	];
});
</script>

<style></style>
