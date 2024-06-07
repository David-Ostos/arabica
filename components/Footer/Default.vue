<template>
    <footer class="relative dark:bg-dark bg-gray-200 pt-8 pb-6 ">
      <div
        class="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
        style="transform: translateZ(0)"
      >
        <svg
          class="absolute bottom-0 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
        >
          <!-- <polygon
            class="text-gray-200 fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon> -->
        </svg>
      </div>
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap text-center lg:text-left">
          <div class="w-full lg:w-6/12 px-4">
            <h4 class="text-3xl font-semibold">¡Buscanos en nuestras redes sociales!</h4>
            <h5 class="text-lg mt-0 mb-2 text-gray-600">
              Contactanos en cualquiera de estas plataformas.
            </h5>
            <div class="mt-6 lg:mb-0 mb-6">
              <button
                v-for="client, index in clients" :key="index"
                class="bg-white  shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
                :class="client.color"
              >
                
                <UIcon :name="client.logo" class="text-2xl" :class="client.color" dynamic/>
              </button>
  
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="flex flex-wrap items-top mb-6">
              <div class="w-full lg:w-4/12 px-4 ml-auto">
                <span
                  class="block uppercase text-gray-500 text-sm font-semibold mb-2"
                >
                  Useful Links
                </span>
                <ul class="list-unstyled">
                  <li>
                    <a
                      class="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm"
                      href=""
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      class="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm"
                      href=""
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      class="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm"
                      href=""
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <a
                      class="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm"
                      href=""
                    >
                      Free Products
                    </a>
                  </li>
                </ul>
              </div>
              <div class="w-full lg:w-4/12 px-4">
                <span
                  class="block uppercase text-gray-500 text-sm font-semibold mb-2"
                >
                  Other Resources
                </span>
                <ul class="list-unstyled">
                  <li>
                    <a
                      class="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm"
                      href=""
                    >
                      MIT License
                    </a>
                  </li>
                  <li>
                    <a
                      class="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm"
                      href=""
                    >
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a
                      class="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm"
                      href=""
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      class="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm"
                      href=""
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr class="my-6 border-gray-300" />
        <div
          class="flex flex-wrap items-center md:justify-between justify-center"
        >
          <div class="w-full md:w-4/12 px-4 mx-auto text-center">
            <div class="text-sm text-gray-500 font-semibold py-1">
              Copyright © {{ date }} David <b class="text-primary">Ostos</b>.
            </div>
          </div>
        </div>
      </div>
    </footer>

</template>
<script setup lang="ts">
const clients = ref([
  {
    color: "text-blue-400",
    logo: 'i-bxl-facebook',
    link: "",
  },
  {
    color: "text-pink-600",
    logo: 'i-bxl-instagram',
    link: "",
  },
  {
    color: "text-primary-400",
    logo: "i-bxl-whatsapp",
    link: "",
  },/* text-gray-800 */
]);

const date = new Date().getFullYear();
</script>
