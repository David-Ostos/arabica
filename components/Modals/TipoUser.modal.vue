<template>
  <div v-show="ShowModalsStore.showModalTipoGoogle">
    <div
      class="fixed w-screen h-lvh bg-gray-700 opacity-25 z-[55]"
      @click="ShowModalsStore.showModalTipoGoogle = false"
    ></div>
    <div class="fixed z-[60] translate-x-1/2">
      <!-- <Placeholder class="h-48" /> -->
      <!-- component -->
      <div class="flex flex-col justify-center h-screen">
        <div
          class="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white"
        >
          <div
            class="w-full bg-cover md:w-1/3 bg-white grid place-items-center"
          >
            <img src="/img/cafe1.jpg" alt="tailwind logo" class="rounded-xl" />
          </div>
          <div class="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
            <div class="flex justify-end item-center">
              <UButton
                v-if="ShowModalsStore.showModalTipoGoogle"
                :padded="false"
                icon="i-heroicons-x-mark-20-solid"
                size="sm"
                color="black"
                square
                variant="link"
                @click="ShowModalsStore.showModalTipoGoogle = false"
              />
            </div>

            <h3
              class="font-black text-gray-800 md:text-3xl text-xl text-center"
            >
              No estas registrado aún.
            </h3>

            <TipoUser @tipo-user="tipoU" />

            <BotonSecondary
              class="text-center text-dark"
              contenido="Regitrar"
              :loading="loading"
              @click="registrar"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useShowModalsStore} from "../../stores/showModals";
import TipoUser from "~/components/Auth/Registro/TipoUser.vue";
import BotonSecondary from "../Botones/BotonSecondary.vue";
import {useRouter} from "vue-router";

const ShowModalsStore = useShowModalsStore();
const useUser = useUserStore();
const router = useRouter();

const loading = ref(false)


const tipoUser = ref("" as "comprador" | "productor");
const tipoU = (tipo: "comprador" | "productor") => {
  if (tipo === "comprador" || tipo === "productor") tipoUser.value = tipo;
};

const registrar = async () => {
  loading.value = true;
  useUser.dataUser.tipoUser = tipoUser.value;

  localStorage.clear();
  localStorage.setItem("dataUser", JSON.stringify(useUser.dataUser));
  console.log(useUser.dataUser);
  const response = fetch(
    `${import.meta.env.VITE_URL_API}/api/content/item/usuarios`,
    {
      method: "POST",
      headers: {
        "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          ...useUser.dataUser,
        },
      }),
    }
  );
  if ((await response).status === 412) {
    console.log("error");
    loading.value = false;
    return;
  } else {
    await useUser.fetchDataUser();
    ShowModalsStore.showModalTipoGoogle = false;
    loading.value = false;
    console.log(`/dashboard/${useUser.dataUser.tipoUser}`);
    router.push(`/dashboard/${useUser.dataUser.tipoUser}`);
  }
};
</script>

<style></style>
