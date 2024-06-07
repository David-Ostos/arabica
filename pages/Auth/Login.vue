<template>
  <div class="h-full w-full py-8  dark:bg-dark ">
    <div
      class="flex rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl"
    >
      <div
        class="hidden lg:block lg:w-1/2 bg-cover bg-[url('/../img/login.jpeg')]"
      ></div>
      <div class="w-full p-8 lg:w-1/2 bg-white">
        <h2 class="text-2xl font-semibold text-gray-700 text-center">
          Bienvenido
        </h2>
        <p class="text-xl text-gray-600 text-center">Inicia Sesión!</p>
        <div class="mt-4 flex items-center justify-between">
          <!--  <span class="border-b w-1/5 lg:w-1/4"></span>
          <a href="#" class="text-xs text-center text-gray-500 uppercase"
            >or login with email</a
          > -->
          <!-- <span class="border-b w-1/5 lg:w-1/4"></span> -->
        </div>
        <div class="mt-4">
          <label class="block text-gray-700 text-sm font-bold mb-2"
            >Email</label
          >
          <input
            class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            type="email"
          />
        </div>
        <div class="mt-4">
          <div class="flex justify-between">
            <label class="block text-gray-700 text-sm font-bold mb-2"
              >Contraseña</label
            >
            <a href="#" class="text-xs text-gray-500"
              >Olvidaste la contraseña?</a
            >
          </div>
          <input
            class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            type="password"
          />
        </div>

        <!-- google -->

        <BotonGoogle class="text-center w-full rounded-md pt-6" />

        <!-- /google -->

        <div class="mt-8 w-fit mx-auto">
          <button
            class="bg-gray-700 text-white font-bold py-2 px-[90px] w-full rounded hover:bg-gray-600"
          >
            Inicia Sesión
          </button>
        </div>

        <div class="mt-4 flex items-center justify-between">
          <span class="border-b w-1/5 md:w-1/4"></span>
          
          <!-- registrate -->
          <RouterLink to="/auth/registro" class="text-xs text-gray-500 uppercase">o registrate</RouterLink>
          <!-- /registrate -->

          <span class="border-b w-1/5 md:w-1/4"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import BotonGoogle from "~/components/Botones/BotonGoogle.vue";

definePageMeta({
  layout: "auth",
});

let email = ref("");
let password = ref("");
</script>

<style scoped lang="scss">
a {
  color: #4e73df;
  text-decoration: none;
  background-color: transparent;
}
.cardT {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid #e3e6f0;
  border-radius: 0.35rem;
}
.card-body {
  flex: 1 1 auto;
  min-height: 1px;
  padding: 0;
}
form.user1 .custom-checkbox label {
  line-height: 1.5rem;
}
form.user1 .form-control-user {
  font-size: 0.8rem;
  border-radius: 10rem;
  padding: 1.5rem 1rem;
}
form.user1 .btn-user {
  font-size: 0.8rem;
  border-radius: 10rem;
  padding: 0.75rem 1rem;
}
.form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #6e707e;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #d1d3e2;
  border-radius: 0.35rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.custom-control {
  position: relative;
  z-index: 1;
  display: block;
  min-height: 1.5rem;
  padding-left: 1.5rem;
}

#customCheck {
  box-sizing: border-box;
  padding: 0;
}
.custom-control-input {
  position: absolute;
  left: 0;
  z-index: -1;
  width: 1rem;
  height: 1.25rem;
  opacity: 0;
}
.custom-control-label {
  position: relative;
  margin-bottom: 0;
  vertical-align: top;
  color: #858796;
}
.custom-checkbox .custom-control-label::before {
  border-radius: 0.35rem;
}
.custom-control-label::before,
.custom-file-label,
.custom-select {
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}
.custom-control-label::before {
  position: absolute;
  top: 0.25rem;
  left: -1.5rem;
  display: block;
  width: 1rem;
  height: 1rem;
  pointer-events: none;
  content: "";
  background-color: #fff;
  border: #b7b9cc solid 1px;
}

.custom-control-label::after {
  position: absolute;
  top: 0.25rem;
  left: -1.5rem;
  display: block;
  width: 1rem;
  height: 1rem;
  content: "";
  background: 50%/50% 50% no-repeat;
}

.btn:not(:disabled):not(.disabled) {
  cursor: pointer;
}

.btn-block {
  display: block;
  width: 100%;
}
.btn-primary {
  color: #fff;
  background-color: #4e73df;
  border-color: #4e73df;
}

hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: content-box;
  height: 0;
  overflow: visible;
}

.btn-block + .btn-block {
  margin-top: 0.5rem;
}
.btn-facebook {
  color: #fff;
  background-color: #3b5998;
  border-color: #fff;
}
</style>
