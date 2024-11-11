<script lang="ts" setup>
import Range from "~/components/Lotes/Range.vue";
import type { FiltersSearch } from "~/interfaces/FiltersSearch";

const emit = defineEmits<{
  (e: "filter-changed", filters: any): void;
  (e: "clean"): void;
}>();

const props = defineProps({
  handleOrigin: {
    type: [Function],
    required: true,
  },

  filtersSearch: {
    type: [Object],
    required: true,
  },
  filterActive: {
    type: [Boolean],
    required: true,
  },
});

interface Filters {
  origin: boolean;
  points: boolean;
  price: boolean;
  process: boolean;
  certifications: boolean;
}

/* watch(
  () => props.filtersSearch,
  (val, oldVal) => {
    console.log(val);
  },
  { deep: true }
); */

const filtersShowActive = ref<Filters>({
  origin: false,
  points: false,
  price: false,
  process: false,
  certifications: false,
});

const handleShowFilter = (param: keyof Filters) => {
  filtersShowActive.value[param] = !filtersShowActive.value[param];
};

const handleFilter = (param: string, value: any = undefined) => {
  console.log(param, value);
  const updatedFilters: any = {};
  updatedFilters[param] = value;
  if (param === "samplesAvailable" && value === false) {
    updatedFilters[param] = undefined;
  }

  emit("filter-changed", updatedFilters);
};

const existProcess = (param: string) => {
  if (props.filtersSearch.process && props.filtersSearch.process.length > 0) {
    return props.filtersSearch.process.includes(param);
  } else {
    return false;
  }
};
const existCert = (param: string) => {
  if (
    props.filtersSearch.certifications &&
    props.filtersSearch.certifications.length > 0
  ) {
    return props.filtersSearch.certifications.includes(param);
  } else {
    return false;
  }
};

const activeFilters: any = computed(() => {
  const activeFilter: Partial<FiltersSearch> = {};

  for (const key in props.filtersSearch) {
    if (
      props.filtersSearch.hasOwnProperty(key) &&
      props.filtersSearch[key] !== undefined
    ) {
      activeFilter[key as keyof FiltersSearch] = props.filtersSearch[key];
    }
  }

  return activeFilter;
});

const handleRangePoints = (value: any) => {
  handleFilter("points", value);
};
const handleRangePrice = (value: any) => {
  handleFilter("price", value);
};

const handlerCheckProcess = (process: string) => {
  let value;
  let processActive = existProcess(process);

  if (props.filtersSearch.process && props.filtersSearch.process.length > 0) {
    value = [...props.filtersSearch.process];
  } else {
    value = [];
  }

  if (processActive === false) {
    value.push(process);
  } else {
    value = props.filtersSearch.process.filter(
      (item: string) => item != process
    );
  }

  if (value.length === 0) {
    value = undefined;
  }

  handleFilter("process", value);
};
const handlerCheckCertification = (cert: string) => {
  let value;
  let certActive = existCert(cert);

  if (
    props.filtersSearch.certifications &&
    props.filtersSearch.certifications.length > 0
  ) {
    value = [...props.filtersSearch.certifications];
  } else {
    value = [];
  }

  console.log(certActive);
  if (certActive === false) {
    value.push(cert);
  } else {
    value = props.filtersSearch.certifications.filter(
      (item: string) => item != cert
    );
    console.log(value);
  }

  if (value.length === 0) {
    value = undefined;
  }

  handleFilter("certifications", value);
};

const cleanFilters = () => {
  emit("clean");

  filtersShowActive.value = {
    origin: false,
    points: false,
    price: false,
    process: false,
    certifications: false,
  };
};
</script>

<template>
  <div class="flex flex-col mt-2 gap-6 h-full">
    <h3 class="title">Filtros</h3>
    <div v-if="props.filterActive">
      <div class="border-t"></div>
      <div class="container-filter-actives">
        <h3 class="filter-actives">Filtros activos:</h3>
        <ul class="container-item-filter">
          <li
            v-for="(value, key) in activeFilters"
            :key="key"
            class="item-filter-active"
          >
            <p v-if="String(key) === 'samplesAvailable'">
              {{ "Muestras disponibles:" }}
            </p>
            <p v-if="String(key) === 'origin'">
              {{ "Origen:" }}
            </p>
            <p v-if="String(key) === 'points'">
              {{ "Puntaje:" }}
            </p>
            <p v-if="String(key) === 'price'">
              {{ "Precio:" }}
            </p>
            <p v-if="String(key) === 'process'">
              {{ "Proceso:" }}
            </p>
            <p v-if="String(key) === 'certifications'">
              {{ "Certificaciones:" }}
            </p>

            <span v-if="Array.isArray(value)">
              {{ value.join(", ") }}
            </span>
            <span v-else>
              <p v-if="value === true">Si</p>
              <p v-else>
                {{ value }}
              </p>
            </span>
          </li>
        </ul>
      </div>

      <button @click="cleanFilters" class="clean-filter">
        Limpiar filtros
      </button>
    </div>

    <div class="border-t"></div>

    <div class="container-check">
      <input
        type="checkbox"
        @change="
          handleFilter(
            'samplesAvailable',
            !props.filtersSearch.samplesAvailable
          )
        "
        :checked="props.filtersSearch.samplesAvailable"
      />
      <div class="check-box">
        <label>Muestras disponibles</label>
      </div>
    </div>

    <div class="border-t"></div>

    <div class="container-filters-box">
      <div class="header-filter-title">
        <h3>ORÍGENES</h3>
        <button
          v-if="filtersShowActive.origin"
          @click="handleShowFilter('origin')"
        >
          <span class="i-heroicons-minus"></span>
        </button>
        <button v-else @click="handleShowFilter('origin')">
          <span class="i-heroicons-plus"></span>
        </button>
      </div>

      <div v-if="filtersShowActive.origin">
        <button class="origin-button" @click="props.handleOrigin()">
          {{
            props.filtersSearch.origin === undefined
              ? "Seleccionar orígenes"
              : props.filtersSearch.origin[0]
          }}
        </button>
      </div>
    </div>

    <div class="border-t"></div>

    <div class="container-filters-box">
      <div class="header-filter-title">
        <h3>PUNTAJE</h3>
        <button
          v-if="filtersShowActive.points"
          @click="handleShowFilter('points')"
        >
          <span class="i-heroicons-minus"></span>
        </button>
        <button v-else @click="handleShowFilter('points')">
          <span class="i-heroicons-plus"></span>
        </button>
      </div>

      <div v-if="filtersShowActive.points" class="flex">
        <Range
          @rangeValue="handleRangePoints"
          :min="70"
          :max="90"
          :value="
            props.filtersSearch.points === undefined
              ? [70, 90]
              : props.filtersSearch.points
          "
        />
      </div>
    </div>
    <div class="border-t"></div>

    <div class="container-filters-box">
      <div class="header-filter-title">
        <h3>PRECIO</h3>
        <button
          v-if="filtersShowActive.price"
          @click="handleShowFilter('price')"
        >
          <span class="i-heroicons-minus"></span>
        </button>
        <button v-else @click="handleShowFilter('price')">
          <span class="i-heroicons-plus"></span>
        </button>
      </div>

      <div v-if="filtersShowActive.price" class="flex gap-5 bags-required">
        <Range
          :min="0"
          :max="20"
          :value="
            props.filtersSearch.price === undefined
              ? [0, 20]
              : props.filtersSearch.price
          "
          @rangeValue="handleRangePrice"
        />
      </div>
    </div>
    <div class="border-t"></div>

    <div class="container-filters-box">
      <div class="header-filter-title">
        <h3>PROCESO</h3>
        <button
          v-if="filtersShowActive.process"
          @click="handleShowFilter('process')"
        >
          <span class="i-heroicons-minus"></span>
        </button>
        <button v-else @click="handleShowFilter('process')">
          <span class="i-heroicons-plus"></span>
        </button>
      </div>

      <div v-if="filtersShowActive.process" class="flex">
        <div class="container-check container-list">
          <div class="item-list">
            <input
              type="checkbox"
              :checked="existProcess('Lavado')"
              @change="handlerCheckProcess('Lavado')"
            />
            <div class="check-box">
              <label>Lavado</label>
            </div>
          </div>
          <div class="item-list">
            <input
              type="checkbox"
              :checked="existProcess('Lavado anaeróbico')"
              @change="handlerCheckProcess('Lavado anaeróbico')"
            />
            <div class="check-box">
              <label>Lavado anaeróbico</label>
            </div>
          </div>
          <div class="item-list">
            <input
              type="checkbox"
              :checked="existProcess('Lavado oxidación')"
              @change="handlerCheckProcess('Lavado oxidación')"
            />
            <div class="check-box">
              <label>Lavado oxidación</label>
            </div>
          </div>
          <div class="item-list">
            <input
              type="checkbox"
              :checked="existProcess('Lavado fermentación láctica')"
              @change="handlerCheckProcess('Lavado fermentación láctica')"
            />
            <div class="check-box">
              <label>Lavado fermentación láctica</label>
            </div>
          </div>

          <div class="item-list">
            <input
              type="checkbox"
              :checked="existProcess('Yellow honey')"
              @change="handlerCheckProcess('Yellow honey')"
            />
            <div class="check-box">
              <label>Yellow honey</label>
            </div>
          </div>

          <div class="item-list">
            <input
              type="checkbox"
              :checked="existProcess('Red honey')"
              @change="handlerCheckProcess('Red honey')"
            />
            <div class="check-box">
              <label>Red honey</label>
            </div>
          </div>
          <div class="item-list">
            <input
              type="checkbox"
              :checked="existProcess('Back honey')"
              @change="handlerCheckProcess('Back honey')"
            />
            <div class="check-box">
              <label>Black honey</label>
            </div>
          </div>
          <div class="item-list">
            <input
              type="checkbox"
              :checked="existProcess('Natural')"
              @change="handlerCheckProcess('Natural')"
            />
            <div class="check-box">
              <label>Natural</label>
            </div>
          </div>
          <div class="item-list">
            <input
              type="checkbox"
              :checked="existProcess('Natural anaeróbico')"
              @change="handlerCheckProcess('Natural anaeróbico')"
            />
            <div class="check-box">
              <label>Natural anaeróbico</label>
            </div>
          </div>
          <div class="item-list">
            <input
              type="checkbox"
              :checked="existProcess('Experimental')"
              @change="handlerCheckProcess('Experimental')"
            />
            <div class="check-box">
              <label>Experimental</label>
            </div>
          </div>
          <div class="item-list">
            <input
              type="checkbox"
              :checked="existProcess('Honey')"
              @change="handlerCheckProcess('Honey')"
            />
            <div class="check-box">
              <label>Honey</label>
            </div>
          </div>
          <div class="item-list">
            <input
              type="checkbox"
              :checked="existProcess('Moche')"
              @change="handlerCheckProcess('Moche')"
            />
            <div class="check-box">
              <label>Moche</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="border-t"></div>

    <div class="container-filters-box">
      <div class="header-filter-title">
        <h3>CERTIFICACIONES</h3>
        <button
          v-if="filtersShowActive.certifications"
          @click="handleShowFilter('certifications')"
        >
          <span class="i-heroicons-minus"></span>
        </button>
        <button v-else @click="handleShowFilter('certifications')">
          <span class="i-heroicons-plus"></span>
        </button>
      </div>

      <div v-if="filtersShowActive.certifications" class="flex">
        <div class="container-check container-list">
          <div class="item-list">
            <input
              type="checkbox"
              :checked="existCert('Organic')"
              @change="handlerCheckCertification('Organic')"
            />
            <div class="check-box">
              <label>Organic</label>
            </div>
          </div>
          <div class="item-list">
            <input
              type="checkbox"
              :checked="existCert('Fair Trade')"
              @change="handlerCheckCertification('Fair Trade')"
            />
            <div class="check-box">
              <label>Fair Trade</label>
            </div>
          </div>
          <div class="item-list">
            <input
              type="checkbox"
              :checked="existCert('FairTrade Organic')"
              @change="handlerCheckCertification('FairTrade Organic')"
            />
            <div class="check-box">
              <label>FairTrade Organic</label>
            </div>
          </div>
          <div class="item-list">
            <input
              type="checkbox"
              :checked="existCert('Rain Forest')"
              @change="handlerCheckCertification('Rain Forest')"
            />
            <div class="check-box">
              <label>Rain Forest</label>
            </div>
          </div>
          <div class="item-list">
            <input
              type="checkbox"
              :checked="existCert('IMocert')"
              @change="handlerCheckCertification('IMocert')"
            />
            <div class="check-box">
              <label>IMocert</label>
            </div>
          </div>
          <div class="item-list">
            <input
              type="checkbox"
              :checked="existCert('Jas')"
              @change="handlerCheckCertification('Jas')"
            />
            <div class="check-box">
              <label>Jas</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="border-t"></div>
  </div>
</template>

<style scoped lang="scss">
.title {
  font-weight: 700;
  color: #515151;
  font-size: 1.1em;
}

.container-filter-actives {
  padding: 0.5rem;
  .filter-actives {
    font-weight: 700;
    color: #515151;
    font-size: 1em;
  }

  .container-item-filter {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .item-filter-active {
    display: flex;
    flex-wrap: wrap;
    width: fit-content;
    padding: 10px;
    border-radius: 20px;
    align-items: center;
    gap: 5px;
    background-color: rgba(74, 222, 128, 0.598);
    p {
      font-size: 0.75em;
      font-weight: 600;
      color: #515151;
    }

    span {
      font-size: 0.75em;
      color: #797979;
    }
  }
}

.container-check {
  display: flex;
  width: 100%;
  justify-content: start;
  gap: 10px;

  input {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
    cursor: pointer;
    background-color: #fff;
    width: 25px;
    height: 25px;
    appearance: none;
    border: 1.2px solid #d0d0d0;
    border-radius: 5px;
    transition: background-color 0.1s ease-in-out;
    &:checked {
      background-color: rgb(74, 222, 128);
    }
  }

  .check-box {
    display: flex;
    flex-direction: column;
    width: 80%;

    label {
      font-weight: 500;
      font-size: 1em;
      color: #333;
    }

    span {
      font-size: 0.8em;
      color: #797979;
      line-height: normal;

      a {
        text-decoration: underline;
        color: #515151;
      }
    }
  }
}

.container-filters-box {
  .header-filter-title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      font-weight: 600;
    }
  }
}

.origin-button {
  width: 100%;
  border: 2px solid #cecece;
  padding: 0.5rem;
  border-radius: 8px;
  margin-top: 0.5rem;
  color: #515151;
  font-weight: 500;
  background-color: #dedede;
}

.container-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0.5rem 0;

  .item-list {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
}

.clean-filter {
  width: 90%;
  display: flex;
  color:white;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  background-color: rgb(74, 222, 128);
  border-radius: 10px;
}
</style>
