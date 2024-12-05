<template>
  <div
    class="font-roboto lg:pt-10 sm:bg-gray-100 rounded-xl sm:shadow sm:border relative"
    @click=""
  >
    <div class="flex justify-center">
      <h3 class="text-center my-auto w-[750px] text-black font-bold text-3xl">
        Para poder acceder a nuestra plataforma necesita terminar su perfil,
        rellene los datos del formulario.
      </h3>
    </div>
    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4 lg:border rounded-xl shadow-inner py-8 md:mx-20 my-8 bg-white"
      @submit="onSubmit"
      :validate="validations"
    >
      <div
        v-show="isActiveCodePhone"
        class="left-0 bottom-0 h-screen w-screen fixed overflow-hidden z-40"
        @click="isActiveCodePhone = !isActiveCodePhone"
      ></div>
      <UFormGroup
        :ui="{
          error: 'block text-center',
        }"
        name="tipoProductor"
        required
      >
        <ModalsProductorRegistroPerfilFormularioTipoProductor
          v-model="state.tipoProductor"
          @click="faltaTipo = false"
          @tipoProductor="tipoP"
          :class="
            faltaTipo
              ? 'text-red-500 [&_button]:!border-red-500 [&_button]:hover:!border-primary'
              : ''
          "
        />
      </UFormGroup>

      <div class="sm:grid flex flex-col m-4 sm:m-0 sm:grid-cols-2 md:mx-8 gap-4">
        <UFormGroup
          label="Nombre del Perfil"
          size="xl"
          name="nombre"
          class="col-span-1"
          required
        >
          <UInput
            :class="
              nombreValidado
                ? '[&_input]:focus:ring-red-500 [&_input]:!ring-red-500'
                : ''
            "
            v-model="state.nombre"
            :ui="{}"
            placeholder="CENTRAL DE COOPERATIVAS COCLA Ltda. N° 281"
          />

          <span
            class="text-red-500 text-sm text-center ml-[20px]"
            v-if="nombreValidado"
            >Este nombre ya esta registrado</span
          >
        </UFormGroup>

        <UFormGroup
          required
          size="xl"
          label="Origen"
          name="origen"
          class="col-span-1"
        >
          <USelectMenu
            :options="['Perú']"
            v-model="state.origen"
            :ui="{}"
            placeholder="Perú"
          />
        </UFormGroup>

        <UFormGroup
          label="R.U.C / D.N.I"
          size="xl"
          name="ruc"
          class="col-span-1"
          required
        >
          <UInput
            :class="
              rucValidado
                ? '[&_input]:focus:ring-red-500 [&_input]:!ring-red-500'
                : ''
            "
            v-model="state.ruc"
            :ui="{
              form: '!pl-[3.8rem]',
            }"
            placeholder="13452587452"
            ><template #leading>
              <span class="text-gray-500 dark:text-gray-400 text-base"
                >R.U.C:
              </span>
            </template>
          </UInput>

          <span
            class="text-red-500 text-sm text-center ml-[20px]"
            v-if="rucValidado"
            >EL R.U.C o D.N.I ya esta registrado</span
          >
        </UFormGroup>

        <UFormGroup
          required
          size="xl"
          label="Razón social / Nombre completo"
          name="razonSocial"
          class="col-span-1"
        >
          <UInput
            :class="
              razonSocialValidado
                ? '[&_input]:focus:ring-red-500 [&_input]:!ring-red-500'
                : ''
            "
            v-model="state.razonSocial"
            :ui="{}"
            placeholder="ASSOCIACION DNI.CAT"
          >
          </UInput>

          <span
            class="text-red-500 text-sm text-center ml-[20px]"
            v-if="razonSocialValidado"
            >La razón social o nombre ya esta registrada</span
          >
        </UFormGroup>

        <div class="col-span-2 my-4 " name="direccion">
          <h1 class="hidden sm:block mb-2 font-medium text-gray-700 mx-4">Dirección:</h1>
          <div
            class="col-span-2 gap-4 grid grid-cols-3 sm:shadow sm:border sm:bg-gray-100 sm:p-8 rounded-xl"
          >
            <UFormGroup
              label="Dirección del negocio"
              size="xl"
              name="direccion.direccion1"
              class="col-span-3"
              required
            >
              <UInput
                v-model="state.direccion!.direccion1"
                placeholder="Jr. Unión 234, Cusco"
              />
            </UFormGroup>

            <UFormGroup
              label="Linea 2 de dirección"
              size="xl"
              name="direccion.direccion2"
              class="col-span-3"
              required
            >
              <UInput
                v-model="state.direccion!.direccion2"
                placeholder="Linea 2 de dirección..."
              />
            </UFormGroup>

            <div class="hidden sm:block col-span-1 relative">
              <div
                class="bg-white shadow-inner w-10 h-10 rounded-full border-2 absolute bottom-0 left-0"
              ></div>
            </div>

            <UFormGroup
              label="Ciudad"
              size="xl"
              name="direccion.ciudad"
              class="col-span-1"
              required
            >
              <UInput v-model="state.direccion!.ciudad" placeholder="Cusco" />
            </UFormGroup>

            <UFormGroup
              label="Codigo Postal"
              size="xl"
              name="direccion.codigoPostal"
              class="col-span-1"
              required
            >
              <UInput
                v-model="state.direccion!.codigoPostal"
                placeholder="2006"
              />
            </UFormGroup>
          </div>
        </div>

        <UFormGroup
          required
          size="xl"
          label="Número de Telefóno"
          name="numeroTelefonico"
          class="col-span-1"
          ><!-- @input="agregarGuiones" -->

          <div
            class="relative z-50 grid grid-cols-12 w-full focus-visible:ring-2 ring-primary group rounded-md"
          >
            <div class="cursor-pointer relative col-span-4 sm:col-span-3">
              <div
                @click="
                  isActiveCodePhone = !isActiveCodePhone;
                "
                class="grid grid-cols-3 gap-1 justify-center items-center w-full h-full border rounded-md border-[#d1d5db] shadow cursor-pointer"
              >
                <div
                  v-if="state.numeroTelefonico!.code && state.numeroTelefonico!.bandera"
                  class="col-span-2 grid grid-cols-2"
                >
                  <span class="col-span-1 ml-1">{{
                    state.numeroTelefonico!.bandera
                  }}</span>
                  <span class="col-span-1">{{
                    state.numeroTelefonico!.code
                  }}</span>
                </div>
                <div class="col-span-2 grid grid-cols-2" v-else>
                  <span class="col-span-1 ml-1">{{
                    codeCountry[42].bandera
                  }}</span>
                  <span class="col-span-1">{{ codeCountry[42].code }}</span>
                </div>
                <UIcon
                  :class="isActiveCodePhone ? 'rotate-180' : ''"
                  class="col-span-1 text-lg h-fit w-fit justify-self-center"
                  name="ic:baseline-keyboard-arrow-down"
                  dynamic
                />
              </div>
              <div
                v-show="isActiveCodePhone"
                class="absolute top-10 bg-white z-50 border rounded-b-md"
              >
                <UInput
                  autocomplete="nope"
                  @input="filterCodeTelefono()"
                  v-model="searchQuery"
                  placeholder="Buscar..."
                  :ui="{
                    rounded: 'rounded-b-md rounded-none',
                  }"
                  class="mb-2"
                />
                <ul class="bg-white h-fit max-h-40 w-fit overflow-auto">
                  <li
                    v-for="item in filterCodeTelefono()"
                    class="bg-white mb-2 mx-2 gap-1 flex justify-start"
                    @click="
                      state.numeroTelefonico!.bandera = item.bandera;
                      state.numeroTelefonico!.code = item.code;
                      isActiveCodePhone = !isActiveCodePhone;
                    "
                  >
                    <span>{{ item.bandera }}</span>
                    <span>{{ item.code }}</span>
                  </li>
                  <li v-show="filterCodeTelefono().length === 0" class="mx-2">
                    <span class="text-sm text-gray-400"
                      >No se encuentra...</span
                    >
                  </li>
                </ul>
              </div>
            </div>
            <UInput
              class="col-span-8 sm:col-span-9"
              placeholder="1234567..."
              icon=""
              v-model="state.numeroTelefonico!.numero"
              size="xl"
            />
          </div>

          <span
            class="text-red-500 text-sm text-center ml-[20px]"
            v-if="numeroTelefonicoValidado"
            >El numero de telefono ya esta registrado</span
          >
        </UFormGroup>

        <UFormGroup
          requiredstring
          :ui="{
            label: {
              base: 'ml-[20px]',
            },
            help: 'text-xs sm:text-sm mx-[12px] text-justify',
          }"
          size="xl"
          label="Correo Electronico"
          name="correo"
          class="col-span-1"
          help="Este correo es al que le va a llegar la información de la plataforma, si es diferente del que utiliza para iniciar sesión debe cambiarlo"
        >
          <UInput
            :class="
              correoValidado
                ? '[&_input]:focus:ring-red-500 [&_input]:!ring-red-500'
                : ''
            "
            v-model="state.correo"
            :ui="{}"
          >
          </UInput>

          <span
            class="text-red-500 text-sm text-center ml-[20px]"
            v-if="correoValidado"
            >El correo electronico ya esta registrado</span
          >
        </UFormGroup>

        <div class="col-span-2 flex justify-center items-center">
          <UButton
            :ui="{rounded: 'rounded-full'}"
            icon="i-heroicons-pencil-square"
            class="mt-8"
            size="xl"
            type="submit"
            :loading="load"
          >
            Enviar
          </UButton>
        </div>
      </div>
    </UForm>
  </div>
</template>
<script setup lang="ts">
import {number, object, string, type InferType} from "yup";
import type {FormError, FormSubmitEvent} from "#ui/types";
import type {
  Direccion,
  PerfilProductor,
  TipoProductor,
} from "~/interfaces/PerfilProductor";
import type {localStoreDataUser} from "~/interfaces/localStore.dataUser";
import {toast} from "vue3-toastify";
import axios from "axios";

const useUser = useUserStore();
const useGlobal = useGlobalStore();
const useProductor = useProductorStore();
const useModal = useShowModalsStore();

const isActiveCodePhone = ref(false);

const faltaTipo = ref(false);
const load = ref(false);

const nombreValidado = ref(false);
const rucValidado = ref(false);
const razonSocialValidado = ref(false);
const correoValidado = ref(false);
const numeroTelefonicoValidado = ref(false);

const codeCountry = [
  {
    code: "+93",
    bandera: "🇦🇫",
    name: "afghanistan",
  },
  {
    code: "+358",
    bandera: "🇫🇮",
    name: "finland",
  },
  {
    code: "+355",
    bandera: "🇦🇱",
    name: "albania",
  },
  {
    code: "+213",
    bandera: "🇩🇿",
    name: "algeria",
  },
  {
    code: "+1684",
    bandera: "🇦🇸",
    name: "american samoa",
  },
  {
    code: "+244",
    bandera: "🇦🇴",
    name: "angola",
  },
  {
    code: "+376",
    bandera: "🇦🇩",
    name: "andorra",
  },
  {
    code: "+1264",
    bandera: "🇦🇮",
    name: "anguilla",
  },
  {
    code: "+672",
    bandera: "🇳🇫",
    name: "norfolk island",
  },
  {
    code: "+54",
    bandera: "🇦🇷",
    name: "argentina",
  },
  {
    code: "+1268",
    bandera: "🇦🇬",
    name: "antigua and barbuda",
  },
  {
    code: "+374",
    bandera: "🇦🇲",
    name: "armenia",
  },
  {
    code: "+297",
    bandera: "🇦🇼",
    name: "aruba",
  },
  {
    code: "+61",
    bandera: "🇨🇨",
    name: "cocos (keeling) islands",
  },
  {
    code: "+43",
    bandera: "🇦🇹",
    name: "austria",
  },
  {
    code: "+994",
    bandera: "🇦🇿",
    name: "azerbaijan",
  },
  {
    code: "+1242",
    bandera: "🇧🇸",
    name: "bahamas",
  },
  {
    code: "+973",
    bandera: "🇧🇭",
    name: "bahrain",
  },
  {
    code: "+880",
    bandera: "🇧🇩",
    name: "bangladesh",
  },
  {
    code: "+1246",
    bandera: "🇧🇧",
    name: "barbados",
  },
  {
    code: "+375",
    bandera: "🇧🇾",
    name: "belarus",
  },
  {
    code: "+32",
    bandera: "🇧🇪",
    name: "belgium",
  },
  {
    code: "+501",
    bandera: "🇧🇿",
    name: "belize",
  },
  {
    code: "+229",
    bandera: "🇧🇯",
    name: "benin",
  },
  {
    code: "+1441",
    bandera: "🇧🇲",
    name: "bermuda",
  },
  {
    code: "+975",
    bandera: "🇧🇹",
    name: "bhutan",
  },
  {
    code: "+591",
    bandera: "🇧🇴",
    name: "bolivia, plurinational state of",
  },
  {
    code: "+387",
    bandera: "🇧🇦",
    name: "bosnia and herzegovina",
  },
  {
    code: "+267",
    bandera: "🇧🇼",
    name: "botswana",
  },
  {
    code: "+55",
    bandera: "🇧🇷",
    name: "brazil",
  },
  {
    code: "+246",
    bandera: "🇮🇴",
    name: "british indian ocean territory",
  },
  {
    code: "+673",
    bandera: "🇧🇳",
    name: "brunei darussalam",
  },
  {
    code: "+359",
    bandera: "🇧🇬",
    name: "bulgaria",
  },
  {
    code: "+226",
    bandera: "🇧🇫",
    name: "burkina faso",
  },
  {
    code: "+257",
    bandera: "🇧🇮",
    name: "burundi",
  },
  {
    code: "+855",
    bandera: "🇰🇭",
    name: "cambodia",
  },
  {
    code: "+237",
    bandera: "🇨🇲",
    name: "cameroon",
  },
  {
    code: "+1",
    bandera: "🇺🇸",
    name: "united states",
  },
  {
    code: "+238",
    bandera: "🇨🇻",
    name: "cape verde",
  },
  {
    code: "+ 345",
    bandera: "🇰🇾",
    name: "cayman islands",
  },
  {
    code: "+236",
    bandera: "🇨🇫",
    name: "central african republic",
  },
  {
    code: "+235",
    bandera: "🇹🇩",
    name: "chad",
  },
  {
    code: "+56",
    bandera: "🇨🇱",
    name: "chile",
  },
  {
    code: "+86",
    bandera: "🇨🇳",
    name: "china",
  },
  {
    code: "+57",
    bandera: "🇨🇴",
    name: "colombia",
  },
  {
    code: "+269",
    bandera: "🇰🇲",
    name: "comoros",
  },
  {
    code: "+242",
    bandera: "🇨🇬",
    name: "congo",
  },
  {
    code: "+243",
    bandera: "🇨🇩",
    name: "congo, the democratic republic of the congo",
  },
  {
    code: "+682",
    bandera: "🇨🇰",
    name: "cook islands",
  },
  {
    code: "+506",
    bandera: "🇨🇷",
    name: "costa rica",
  },
  {
    code: "+225",
    bandera: "🇨🇮",
    name: "cote d'ivoire",
  },
  {
    code: "+385",
    bandera: "🇭🇷",
    name: "croatia",
  },
  {
    code: "+53",
    bandera: "🇨🇺",
    name: "cuba",
  },
  {
    code: "+357",
    bandera: "🇨🇾",
    name: "cyprus",
  },
  {
    code: "+420",
    bandera: "🇨🇿",
    name: "czech republic",
  },
  {
    code: "+45",
    bandera: "🇩🇰",
    name: "denmark",
  },
  {
    code: "+253",
    bandera: "🇩🇯",
    name: "djibouti",
  },
  {
    code: "+1767",
    bandera: "🇩🇲",
    name: "dominica",
  },
  {
    code: "+1849",
    bandera: "🇩🇴",
    name: "dominican republic",
  },
  {
    code: "+593",
    bandera: "🇪🇨",
    name: "ecuador",
  },
  {
    code: "+20",
    bandera: "🇪🇬",
    name: "egypt",
  },
  {
    code: "+503",
    bandera: "🇸🇻",
    name: "el salvador",
  },
  {
    code: "+240",
    bandera: "🇬🇶",
    name: "equatorial guinea",
  },
  {
    code: "+291",
    bandera: "🇪🇷",
    name: "eritrea",
  },
  {
    code: "+372",
    bandera: "🇪🇪",
    name: "estonia",
  },
  {
    code: "+251",
    bandera: "🇪🇹",
    name: "ethiopia",
  },
  {
    code: "+500",
    bandera: "🇬🇸",
    name: "south georgia and the south sandwich islands",
  },
  {
    code: "+298",
    bandera: "🇫🇴",
    name: "faroe islands",
  },
  {
    code: "+679",
    bandera: "🇫🇯",
    name: "fiji",
  },
  {
    code: "+33",
    bandera: "🇫🇷",
    name: "france",
  },
  {
    code: "+594",
    bandera: "🇬🇫",
    name: "french guiana",
  },
  {
    code: "+689",
    bandera: "🇵🇫",
    name: "french polynesia",
  },
  {
    code: "+241",
    bandera: "🇬🇦",
    name: "gabon",
  },
  {
    code: "+220",
    bandera: "🇬🇲",
    name: "gambia",
  },
  {
    code: "+995",
    bandera: "🇬🇪",
    name: "georgia",
  },
  {
    code: "+49",
    bandera: "🇩🇪",
    name: "germany",
  },
  {
    code: "+233",
    bandera: "🇬🇭",
    name: "ghana",
  },
  {
    code: "+350",
    bandera: "🇬🇮",
    name: "gibraltar",
  },
  {
    code: "+30",
    bandera: "🇬🇷",
    name: "greece",
  },
  {
    code: "+299",
    bandera: "🇬🇱",
    name: "greenland",
  },
  {
    code: "+1473",
    bandera: "🇬🇩",
    name: "grenada",
  },
  {
    code: "+590",
    bandera: "🇫🇷",
    name: "saint martin",
  },
  {
    code: "+1671",
    bandera: "🇬🇺",
    name: "guam",
  },
  {
    code: "+502",
    bandera: "🇬🇹",
    name: "guatemala",
  },
  {
    code: "+44",
    bandera: "🇬🇧",
    name: "united kingdom",
  },
  {
    code: "+224",
    bandera: "🇬🇳",
    name: "guinea",
  },
  {
    code: "+245",
    bandera: "🇬🇼",
    name: "guinea-bissau",
  },
  {
    code: "+595",
    bandera: "🇵🇾",
    name: "paraguay",
  },
  {
    code: "+509",
    bandera: "🇭🇹",
    name: "haiti",
  },
  {
    code: "+379",
    bandera: "🇻🇦",
    name: "holy see (vatican city state)",
  },
  {
    code: "+504",
    bandera: "🇭🇳",
    name: "honduras",
  },
  {
    code: "+852",
    bandera: "🇭🇰",
    name: "hong kong",
  },
  {
    code: "+36",
    bandera: "🇭🇺",
    name: "hungary",
  },
  {
    code: "+354",
    bandera: "🇮🇸",
    name: "iceland",
  },
  {
    code: "+91",
    bandera: "🇮🇳",
    name: "india",
  },
  {
    code: "+62",
    bandera: "🇮🇩",
    name: "indonesia",
  },
  {
    code: "+98",
    bandera: "🇮🇷",
    name: "iran, islamic republic of persian gulf",
  },
  {
    code: "+964",
    bandera: "🇮🇶",
    name: "iraq",
  },
  {
    code: "+353",
    bandera: "🇮🇪",
    name: "ireland",
  },
  {
    code: "+972",
    bandera: "🇮🇱",
    name: "israel",
  },
  {
    code: "+39",
    bandera: "🇮🇹",
    name: "italy",
  },
  {
    code: "+1876",
    bandera: "🇯🇲",
    name: "jamaica",
  },
  {
    code: "+81",
    bandera: "🗾",
    name: "japan",
  },
  {
    code: "+962",
    bandera: "🇯🇴",
    name: "jordan",
  },
  {
    code: "+77",
    bandera: "🇰🇿",
    name: "kazakhstan",
  },
  {
    code: "+254",
    bandera: "🇰🇪",
    name: "kenya",
  },
  {
    code: "+686",
    bandera: "🇰🇮",
    name: "kiribati",
  },
  {
    code: "+850",
    bandera: "🇰🇵",
    name: "korea, democratic people's republic of korea",
  },
  {
    code: "+82",
    bandera: "🇰🇷",
    name: "korea, republic of south korea",
  },
  {
    code: "+965",
    bandera: "🇰🇼",
    name: "kuwait",
  },
  {
    code: "+996",
    bandera: "🇰🇬",
    name: "kyrgyzstan",
  },
  {
    code: "+856",
    bandera: "🇱🇦",
    name: "laos",
  },
  {
    code: "+371",
    bandera: "🇱🇻",
    name: "latvia",
  },
  {
    code: "+961",
    bandera: "🇱🇧",
    name: "lebanon",
  },
  {
    code: "+266",
    bandera: "🇱🇸",
    name: "lesotho",
  },
  {
    code: "+231",
    bandera: "🇱🇷",
    name: "liberia",
  },
  {
    code: "+218",
    bandera: "🇱🇾",
    name: "libyan arab jamahiriya",
  },
  {
    code: "+423",
    bandera: "🇱🇮",
    name: "liechtenstein",
  },
  {
    code: "+370",
    bandera: "🇱🇹",
    name: "lithuania",
  },
  {
    code: "+352",
    bandera: "🇱🇺",
    name: "luxembourg",
  },
  {
    code: "+853",
    bandera: "🇲🇴",
    name: "macao",
  },
  {
    code: "+599",
    bandera: "🇳🇱",
    name: "netherlands antilles",
  },
  {
    code: "+63",
    bandera: "🇵🇭",
    name: "philippines",
  },
  {
    code: "+1758",
    bandera: "🇱🇨",
    name: "saint lucia",
  },
  {
    code: "+221",
    bandera: "🇸🇳",
    name: "senegal",
  },
  {
    code: "+94",
    bandera: "🇱🇰",
    name: "sri lanka",
  },
  {
    code: "+228",
    bandera: "🇹🇬",
    name: "togo",
  },
  {
    code: "+683",
    bandera: "🇳🇺",
    name: "niue",
  },
  {
    code: "+48",
    bandera: "🇵🇱",
    name: "poland",
  },
  {
    code: "+508",
    bandera: "🇵🇲",
    name: "saint pierre and miquelon",
  },
  {
    code: "+421",
    bandera: "🇸🇰",
    name: "slovakia",
  },
  {
    code: "+261",
    bandera: "🇲🇬",
    name: "madagascar",
  },
  {
    code: "+212",
    bandera: "🇲🇦",
    name: "morocco",
  },
  {
    code: "+998",
    bandera: "🇺🇿",
    name: "uzbekistan",
  },
  {
    code: "+250",
    bandera: "🇷🇼",
    name: "rwanda",
  },
  {
    code: "+239",
    bandera: "🇸🇹",
    name: "sao tome and principe",
  },
  {
    code: "+386",
    bandera: "🇸🇮",
    name: "slovenia",
  },
  {
    code: "+596",
    bandera: "🇲🇶",
    name: "martinique",
  },
  {
    code: "+258",
    bandera: "🇲🇿",
    name: "mozambique",
  },
  {
    code: "+51",
    bandera: "🇵🇪",
    name: "peru",
  },
  {
    code: "+1869",
    bandera: "🇰🇳",
    name: "saint kitts and nevis",
  },
  {
    code: "+381",
    bandera: "🇷🇸",
    name: "serbia",
  },
  {
    code: "+249",
    bandera: "🇸🇩",
    name: "sudan",
  },
  {
    code: "+690",
    bandera: "🇹🇰",
    name: "tokelau",
  },
  {
    code: "+970",
    bandera: "🇵🇸",
    name: "palestinian territory, occupied",
  },
  {
    code: "+7",
    bandera: "🇷🇺",
    name: "russia",
  },
  {
    code: "+966",
    bandera: "🇸🇦",
    name: "saudi arabia",
  },
  {
    code: "+677",
    bandera: "🇸🇧",
    name: "solomon islands",
  },
  {
    code: "+222",
    bandera: "🇲🇷",
    name: "mauritania",
  },
  {
    code: "+95",
    bandera: "🇲🇲",
    name: "myanmar",
  },
  {
    code: "+507",
    bandera: "🇵🇦",
    name: "panama",
  },
  {
    code: "+1784",
    bandera: "🇻🇨",
    name: "saint vincent and the grenadines",
  },
  {
    code: "+65",
    bandera: "🇸🇬",
    name: "singapore",
  },
  {
    code: "+597",
    bandera: "🇸🇷",
    name: "suriname",
  },
  {
    code: "+676",
    bandera: "🇹🇴",
    name: "tonga",
  },
  {
    code: "+971",
    bandera: "🇦🇪",
    name: "united arab emirates",
  },
  {
    code: "+685",
    bandera: "🇼🇸",
    name: "samoa",
  },
  {
    code: "+232",
    bandera: "🇸🇱",
    name: "sierra leone",
  },
  {
    code: "+389",
    bandera: "🇲🇰",
    name: "macedonia",
  },
  {
    code: "+264",
    bandera: "🇳🇦",
    name: "namibia",
  },
  {
    code: "+675",
    bandera: "🇵🇬",
    name: "papua new guinea",
  },
  {
    code: "+378",
    bandera: "🇸🇲",
    name: "san marino",
  },
  {
    code: "+252",
    bandera: "🇸🇴",
    name: "somalia",
  },
  {
    code: "+41",
    bandera: "🇨🇭",
    name: "switzerland",
  },
  {
    code: "+598",
    bandera: "🇺🇾",
    name: "uruguay",
  },
  {
    code: "+967",
    bandera: "🇾🇪",
    name: "yemen",
  },
  {
    code: "+248",
    bandera: "🇸🇨",
    name: "seychelles",
  },
  {
    code: "+268",
    bandera: "🇸🇿",
    name: "swaziland",
  },
  {
    code: "+674",
    bandera: "🇳🇷",
    name: "nauru",
  },
  {
    code: "+678",
    bandera: "🇻🇺",
    name: "vanuatu",
  },
  {
    code: "+356",
    bandera: "🇲🇹",
    name: "malta",
  },
  {
    code: "+27",
    bandera: "🇿🇦",
    name: "south africa",
  },
  {
    code: "+52",
    bandera: "🇲🇽",
    name: "mexico",
  },
  {
    code: "+1664",
    bandera: "🇲🇸",
    name: "montserrat",
  },
  {
    code: "+976",
    bandera: "🇲🇳",
    name: "mongolia",
  },
  {
    code: "+382",
    bandera: "🇲🇪",
    name: "montenegro",
  },
  {
    code: "+60",
    bandera: "🇲🇾",
    name: "malaysia",
  },
  {
    code: "+265",
    bandera: "🇲🇼",
    name: "malawi",
  },
  {
    code: "+223",
    bandera: "🇲🇱",
    name: "mali",
  },
  {
    code: "+230",
    bandera: "🇲🇺",
    name: "mauritius",
  },
  {
    code: "+960",
    bandera: "🇲🇻",
    name: "maldives",
  },
  {
    code: "+31",
    bandera: "🇳🇱",
    name: "netherlands",
  },
  {
    code: "+377",
    bandera: "🇲🇨",
    name: "monaco",
  },
  {
    code: "+373",
    bandera: "🇲🇩",
    name: "moldova",
  },
  {
    code: "+977",
    bandera: "🇳🇵",
    name: "nepal",
  },
  {
    code: "+692",
    bandera: "🇲🇭",
    name: "marshall islands",
  },
  {
    code: "+262",
    bandera: "🇷🇪",
    name: "reunion",
  },
  {
    code: "+691",
    bandera: "🇫🇲",
    name: "micronesia, federated states of micronesia",
  },
  {
    code: "+687",
    bandera: "🇳🇨",
    name: "new caledonia",
  },
  {
    code: "+505",
    bandera: "🇳🇮",
    name: "nicaragua",
  },
  {
    code: "+64",
    bandera: "🇳🇿",
    name: "new zealand",
  },
  {
    code: "+1670",
    bandera: "🇲🇵",
    name: "northern mariana islands",
  },
  {
    code: "+234",
    bandera: "🇳🇬",
    name: "nigeria",
  },
  {
    code: "+227",
    bandera: "🇳🇪",
    name: "niger",
  },
  {
    code: "+90",
    bandera: "🇹🇷",
    name: "turkey",
  },
  {
    code: "+680",
    bandera: "🇵🇼",
    name: "palau",
  },
  {
    code: "+92",
    bandera: "🇵🇰",
    name: "pakistan",
  },
  {
    code: "+47",
    bandera: "🇳🇴",
    name: "svalbard and jan mayen",
  },
  {
    code: "+968",
    bandera: "🇴🇲",
    name: "oman",
  },
  {
    code: "+872",
    bandera: "🇵🇳",
    name: "pitcairn",
  },
  {
    code: "+1939",
    bandera: "🇵🇷",
    name: "puerto rico",
  },
  {
    code: "+351",
    bandera: "🇵🇹",
    name: "portugal",
  },
  {
    code: "+974",
    bandera: "🇶🇦",
    name: "qatar",
  },
  {
    code: "+40",
    bandera: "🇷🇴",
    name: "romania",
  },
  {
    code: "+290",
    bandera: "🇸🇭",
    name: "saint helena, ascension and tristan da cunha",
  },
  {
    code: "+34",
    bandera: "🇪🇸",
    name: "spain",
  },
  {
    code: "+211",
    bandera: "🇸🇸",
    name: "south sudan",
  },
  {
    code: "+46",
    bandera: "🇸🇪",
    name: "sweden",
  },
  {
    code: "+963",
    bandera: "🇸🇾",
    name: "syrian arab republic",
  },
  {
    code: "+886",
    bandera: "🇹🇼",
    name: "taiwan",
  },
  {
    code: "+670",
    bandera: "🇹🇱",
    name: "timor-leste",
  },
  {
    code: "+1649",
    bandera: "🇹🇨",
    name: "turks and caicos islands",
  },
  {
    code: "+66",
    bandera: "🇹🇭",
    name: "thailand",
  },
  {
    code: "+688",
    bandera: "🇹🇻",
    name: "tuvalu",
  },
  {
    code: "+1868",
    bandera: "🇹🇹",
    name: "trinidad and tobago",
  },
  {
    code: "+216",
    bandera: "🇹🇳",
    name: "tunisia",
  },
  {
    code: "+256",
    bandera: "🇺🇬",
    name: "uganda",
  },
  {
    code: "+255",
    bandera: "🇹🇿",
    name: "tanzania, united republic of tanzania",
  },
  {
    code: "+58",
    bandera: "🇻🇪",
    name: "venezuela, bolivarian republic of venezuela",
  },
  {
    code: "+993",
    bandera: "🇹🇲",
    name: "turkmenistan",
  },
  {
    code: "+1284",
    bandera: "🇻🇬",
    name: "virgin islands, british",
  },
  {
    code: "+84",
    bandera: "🇻🇳",
    name: "vietnam",
  },
  {
    code: "+380",
    bandera: "🇺🇦",
    name: "ukraine",
  },
  {
    code: "+992",
    bandera: "🇹🇯",
    name: "tajikistan",
  },
  {
    code: "+1340",
    bandera: "🇻🇮",
    name: "virgin islands, u.s.",
  },
  {
    code: "+263",
    bandera: "🇿🇼",
    name: "zimbabwe",
  },
  {
    code: "+260",
    bandera: "🇿🇲",
    name: "zambia",
  },
  {
    code: "+681",
    bandera: "🇼🇫",
    name: "wallis and futuna",
  },
];

const searchQuery = ref("");

const indiceChile = codeCountry.findIndex((code) => code.code === "+56");

const filterCodeTelefono = () => {
  if (!searchQuery.value) return codeCountry;
  return codeCountry.filter((code) => {
    return (
      code.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      code.code.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
};

const tipoP = (tipo: TipoProductor) => {
  faltaTipo.value = false;
  state.tipoProductor = tipo;
  validations(state);
};

const schema = object({
  nombre: string()
    .lowercase()
    .trim()
    .required("Requerido")
    .min(10, "Debe tener minimo 10 caracteres"),
  origen: string().required("Requerido"),
  ruc: number()
    .required("Requerido")
    .positive()
    .integer()
    .typeError("El R.U.C o D.N.I debe ser un número de 11 digitos"),
  razonSocial: string()
    .required("Requerido")
    .min(5, "debe tener un minimo de 5 caracteres"),
  direccion: object({
    ciudad: string().required("Requerido"),
    codigoPostal: string().required("Requerido"),
    direccion1: string()
      .min(10, "Debe tener minimo 10 caracteres")
      .required("Requerido"),
    direccion2: string()
      .min(4, "Debe tener minimo 4 caracteres")
      .required("Requerido"),
  }).required("Requerido"),
  correo: string().email("correo invalido").required("Requerido"),
  numeroTelefonico: object({
    code: string().required(),
    bandera: string(),
    numero: string().required("Requerido"),
  }).required("Requerido"),
});

type Schema = InferType<typeof schema>;

const state: PerfilProductor = reactive({
  nombre: undefined,
  origen: "Perú",
  ruc: undefined,
  razonSocial: undefined,
  direccion: {
    ciudad: undefined,
    codigoPostal: undefined,
    direccion1: undefined,
    direccion2: undefined,
  },
  correo: useUser.dataUser.email,
  numeroTelefonico: {
    numero: undefined,
    code: undefined,
    bandera: undefined,
  },
  tipoProductor: undefined,
  idUsuario: {
    email: useUser.dataUser.email,
    _id: useUser.dataUser._id,
  },
  imgPortada: "",
  descripcion: "",
  certificaciones: [],
  equipo: [],
  premios: [],
  logo: "",
  lotes: [],
  relaciones: [],
  redes: [
    {
      tipoRed:"facebook",
      linkbase: "facebook.com/",
      linkUsuario: "",
      icon: "i-mdi-facebook",
    },
    {
      tipoRed:"instagram",
      linkbase: "instagram.com/",
      linkUsuario: "",
      icon: "i-mdi-instagram",
    },
    {
      tipoRed:"web",
      linkbase: "",
      linkUsuario: "",
      icon: "i-mdi-web",
    },
  ],
});

const validations = (stat: any): FormError[] => {
  let errors = [] as any;

  if (stat.tipoProductor === "") {
    faltaTipo.value = true;
    errors.push({
      path: "tipoProductor",
      message: "No has seleccionado el tipo de cuenta.",
    });
  }

  if (stat.ruc !== undefined && stat.ruc.length !== 11) {
    errors.push({
      path: "ruc",
      message: "El R.U.C debe tener 11 digitos.",
    });
  }
  if (!stat.numeroTelefonico.code) {
    errors.push({
      path: "numeroTelefonico",
      message: "Debe seleccionar un código de país.",
    });
  }

  return errors;
};


async function onSubmit(event: FormSubmitEvent<Schema>) {
  load.value = true;
  let datosDuplicados = false;
  // Do something with event.data
  let data: any = convertirAminusculas(event.data);

  try {
    const fetchVerificarUser = await fetch(
      `${
        import.meta.env.VITE_URL_API
      }/api/content/items/productores?fields={"nombre": true,"ruc": true,"razonSocial": true,"correo": true,"numeroTelefonico": true,"_id": false}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
        },
      }
    );
    const responseVerificacion = await fetchVerificarUser.json();

    const verificarNombre = responseVerificacion.some(
      (productor: any) =>
        productor.nombre.toLowerCase() === state.nombre!.toLowerCase()
    );
    const verificarRuc = responseVerificacion.some(
      (productor: any) => productor.ruc === state.ruc
    );
    const verificarRazonSocial = responseVerificacion.some(
      (productor: any) =>
        productor.razonSocial.toLowerCase() === state.razonSocial!.toLowerCase()
    );
    const verificarCorreo = responseVerificacion.some(
      (productor: any) =>
        productor.correo.toLowerCase() === state.correo!.toLowerCase()
    );
    const verificarNumeroTelefonico = responseVerificacion.some(
      (productor: any) =>
        productor.numeroTelefonico.numero === state.numeroTelefonico!.numero && productor.numeroTelefonico.code === state.numeroTelefonico!.code
    );

    if (verificarNombre) {
      toast.info(
        "El nombre de perfil ya esta registrado, por favor utilice otro."
      );
      nombreValidado.value = true;
      datosDuplicados = true;
    }

    if (verificarRuc) {
      toast.info("EL R.U.C ya esta registrado, por favor utilice otro.");
      datosDuplicados = true;
      rucValidado.value = true;
    }

    if (verificarRazonSocial) {
      toast.info("La Razón Social ya esta registrado, por favor utilice otro.");

      datosDuplicados = true;
      razonSocialValidado.value = true;
    }

    if (verificarCorreo) {
      toast.info("EL correo ya esta registrado, por favor utilice otro.");

      datosDuplicados = true;
      correoValidado.value = true;
    }

    if (verificarNumeroTelefonico) {
      toast.info(
        "EL numero de telefono ya esta registrado, por favor utilice otro."
      );

      datosDuplicados = true;
      numeroTelefonicoValidado.value = true;
    }

    if (!datosDuplicados) {
      nombreValidado.value = false;
      rucValidado.value = false;
      razonSocialValidado.value = false;
      correoValidado.value = false;
      numeroTelefonicoValidado.value = false;

      // @ts-ignore
      await axios(
        // @ts-ignore
        {
          url: `${
            import.meta.env.VITE_URL_API
          }/api/content/item/productores?fields={_state: false,_modified:false,_mby: false,_created: false,_cby: false}`,
          method: "POST",
          mode: "cors",
          headers: {
            "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
          },
          data: {data},
        }
      ).then(async (res) => {
        delete res.data._state;
        delete res.data._modified;
        delete res.data._mby;
        delete res.data._created;
        delete res.data._cby;
        useProductor.perfilProductor = res.data;

        // Se reutiliza la variable 'data' para hacer la inyecciond e datos nuevos al ususario
        data = {
          _id: useUser.dataUser._id,
          perfilBase: true,
          perfilProductor: {
            _model: "productores",
            _id: res.data._id,
          },
        };

        const update = await fetch(
          `${import.meta.env.VITE_URL_API}/api/content/item/usuarios`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "api-key": import.meta.env.VITE_COCKPIT_API_KEY,
            },
            body: JSON.stringify({data}),
          }
        );

        const resUpdate = await update.json();

        const dataUserSaved: localStoreDataUser = await JSON.parse(
          localStorage.getItem("dataUser") ?? "{}"
        );

        dataUserSaved.perfilBase = true;
        localStorage.removeItem("dataUser");
        localStorage.setItem("dataUser", JSON.stringify(dataUserSaved));

        useUser.dataUser.perfilBase = true;
        useModal.showModalProductorPerfilCompleto = false;
      });
    }
  } catch (error) {
    console.log(error);
  }
  load.value = false;
}

function agregarGuiones(cadena: any) {
  return cadena.data.replace(/(\d{3})/g, "$1-");
}
const prueba = [
  "CENTRAL DE COOPERATIVAS COCLA Ltda. N° 281",
  "Cusco",
  "13452587452",
  "ASSOCIACION DNI.CAT",
  "Jr. Unión 234, Cusco",
  "985909993",
];
</script>
