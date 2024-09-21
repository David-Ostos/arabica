<script lang="ts" setup>
import Range from "~/components/Lotes/Range.vue";
import type { FiltersSearch } from "~/interfaces/FiltersSearch";

const emit = defineEmits<{
  (e: "filter-changed", filters: any): void;
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
  bags: boolean;
  points: boolean;
  price: boolean;
  identification: boolean;
  process: boolean;
  certifications: boolean;
  month: boolean;
  species: boolean;
  taste: boolean;
  acidity: boolean;
}

watch(
  () => props.filtersSearch,
  (val, oldVal) => {
    console.log(val);
    console.log(oldVal);
  },
  { deep: true }
);

const filtersShowActive = ref<Filters>({
  origin: false,
  bags: false,
  points: false,
  price: false,
  identification: false,
  month: false,
  species: false,
  taste: false,
  process: false,
  certifications: false,
  acidity: false,
});

const handleShowFilter = (param: keyof Filters) => {
  filtersShowActive.value[param] = !filtersShowActive.value[param];
};

const handleFilter = (param: string, value: any = undefined) => {
  console.log(param, value);
  const updatedFilters: any = {};
  updatedFilters[param] = value;
  if (param == "samplesAvailable" && value == false) {
    updatedFilters[param] = undefined;
  }

  emit("filter-changed", updatedFilters);
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
</script>

<template>
  <div class="flex flex-col mt-2 gap-6 h-full">
    <h3 class="title">Filtros</h3>
    <div v-if="props.filterActive">
      <div class="border-t"></div>
      <div class="container-filter-actives">
        <h3 class="filter-actives">Filtros activos:</h3>
        <ul>
          <li v-for="(value, key) in activeFilters" :key="key">
            <p v-if="String(key) == 'samplesAvailable'">
              {{ "Muestras disponibles:" }}
            </p>
            <p v-if="String(key) == 'origin'">
              {{ "Origen:" }}
            </p>
            <!-- {{ key }}: -->
            <span v-if="Array.isArray(value)">
              {{ value.join(", ") }}
            </span>
            <span v-else>
              <p v-if="value == true">Si</p>
              <p v-else>
                {{ value }}
              </p>
            </span>
          </li>
        </ul>
      </div>
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

    <!-- <div class="container-check">
      <input type="checkbox" />
      <div class="check-box">
        <label>En envió compartido</label>
        <span
          >Para pedidos de menos de 50 bolsas, sugerimos utilizar Envíos
          compartidos. <a>Mas información</a></span
        >
      </div>
    </div>

    <div class="container-check">
      <input type="checkbox" />

      <div class="check-box">
        <label>Spot y a flote</label>
      </div>
    </div> -->

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
            props.filtersSearch.origin == undefined
              ? "Seleccionar orígenes"
              : props.filtersSearch.origin[0]
          }}
        </button>
      </div>
    </div>

    <div class="border-t"></div>

    <!-- <div class="container-filters-box">
      <div class="header-filter-title">
        <h3>BOLSAS REQUERIDAS</h3>
        <button v-if="filtersShowActive.bags" @click="handleShowFilter('bags')">
          <span class="i-heroicons-minus"></span>
        </button>
        <button v-else @click="handleShowFilter('bags')">
          <span class="i-heroicons-plus"></span>
        </button>
      </div>

      <div v-if="filtersShowActive.bags" class="flex gap-5 bags-required">
        <button>1-5</button>
        <button>6-10</button>
        <button>11-20</button>
        <button>21-50</button>
      </div>
    </div>

    <div class="border-t"></div> -->

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
        <Range @rangeValue="handleRangePoints" :min="70" :max="90" />
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
        <Range :min="0" :max="20" @rangeValue="handleRangePrice" />
      </div>
    </div>
    <div class="border-t"></div>

    <!-- <div class="container-filters-box">
      <div class="header-filter-title">
        <h3>IDENTIFICACIÓN DEL LOTE</h3>
        <button
          v-if="filtersShowActive.identification"
          @click="handleShowFilter('identification')"
        >
          <span class="i-heroicons-minus"></span>
        </button>
        <button v-else @click="handleShowFilter('identification')">
          <span class="i-heroicons-plus"></span>
        </button>
      </div>

      <div v-if="filtersShowActive.identification" class="flex">
        <input type="text" />
      </div>
    </div>
    <div class="border-t"></div> -->

    <!-- <div class="container-filters-box">
      <div class="header-filter-title">
        <h3>MES DE LLEGADA</h3>
        <button
          v-if="filtersShowActive.month"
          @click="handleShowFilter('month')"
        >
          <span class="i-heroicons-minus"></span>
        </button>
        <button v-else @click="handleShowFilter('month')">
          <span class="i-heroicons-plus"></span>
        </button>
      </div>

      <div v-if="filtersShowActive.month" class="flex">
        <input type="text" />
      </div>
    </div>
    <div class="border-t"></div> -->

    <!-- <div class="container-filters-box">
      <div class="header-filter-title">
        <h3>ESPECIES</h3>
        <button
          v-if="filtersShowActive.species"
          @click="handleShowFilter('species')"
        >
          <span class="i-heroicons-minus"></span>
        </button>
        <button v-else @click="handleShowFilter('species')">
          <span class="i-heroicons-plus"></span>
        </button>
      </div>

      <div v-if="filtersShowActive.species" class="flex">
        <div class="container-check">
          <input type="checkbox" />
          <div class="check-box">
            <label>Arabica</label>
          </div>
        </div>
      </div>
    </div>
    <div class="border-t"></div> -->

    <!-- <div class="container-filters-box">
      <div class="header-filter-title">
        <h3>SABOR</h3>
        <button
          v-if="filtersShowActive.taste"
          @click="handleShowFilter('taste')"
        >
          <span class="i-heroicons-minus"></span>
        </button>
        <button v-else @click="handleShowFilter('taste')">
          <span class="i-heroicons-plus"></span>
        </button>
      </div>

      <div v-if="filtersShowActive.taste" class="flex">
        <div class="container-check">
          <div>
            <input type="checkbox" />
            <div class="check-box">
              <label>Baya</label>
            </div>
          </div>
          <div>
            <input type="checkbox" />
            <div class="check-box">
              <label>Cítrico</label>
            </div>
          </div>
          <div>
            <input type="checkbox" />
            <div class="check-box">
              <label>Nuez/Chocolate</label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="border-t"></div> -->

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
            <input type="checkbox" />
            <div class="check-box">
              <label>Lavado</label>
            </div>
          </div>
          <div class="item-list">
            <input type="checkbox" />
            <div class="check-box">
              <label>Lavado anaeróbico</label>
            </div>
          </div>
          <div class="item-list">
            <input type="checkbox" />
            <div class="check-box">
              <label>Lavado oxidación</label>
            </div>
          </div>
          <div class="item-list">
            <input type="checkbox" />
            <div class="check-box">
              <label>Lavado fermentación láctica</label>
            </div>
          </div>

          <div class="item-list">
            <input type="checkbox" />
            <div class="check-box">
              <label>Yellow honey</label>
            </div>
          </div>

          <div class="item-list">
            <input type="checkbox" />
            <div class="check-box">
              <label>Red honey</label>
            </div>
          </div>
          <div class="item-list">
            <input type="checkbox" />
            <div class="check-box">
              <label>Black honey</label>
            </div>
          </div>
          <div class="item-list">
            <input type="checkbox" />
            <div class="check-box">
              <label>Natural</label>
            </div>
          </div>
          <div class="item-list">
            <input type="checkbox" />
            <div class="check-box">
              <label>Natural anaeróbico</label>
            </div>
          </div>
          <div class="item-list">
            <input type="checkbox" />
            <div class="check-box">
              <label>Experimental</label>
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
            <input type="checkbox" />
            <div class="check-box">
              <label>Organic</label>
            </div>
          </div>
          <div class="item-list">
            <input type="checkbox" />
            <div class="check-box">
              <label>Fair Trade</label>
            </div>
          </div>
          <div class="item-list">
            <input type="checkbox" />
            <div class="check-box">
              <label>FairTrade Organic</label>
            </div>
          </div>
          <div class="item-list">
            <input type="checkbox" />
            <div class="check-box">
              <label>Rain Forest</label>
            </div>
          </div>
          <div class="item-list">
            <input type="checkbox" />
            <div class="check-box">
              <label>IMocert</label>
            </div>
          </div>
          <div class="item-list">
            <input type="checkbox" />
            <div class="check-box">
              <label>Jas</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="border-t"></div>

    <!-- <div class="container-filters-box">
      <div class="header-filter-title">
        <h3>ACIDEZ</h3>
        <button
          v-if="filtersShowActive.acidity"
          @click="handleShowFilter('acidity')"
        >
          <span class="i-heroicons-minus"></span>
        </button>
        <button v-else @click="handleShowFilter('acidity')">
          <span class="i-heroicons-plus"></span>
        </button>
      </div>

      <div v-if="filtersShowActive.acidity" class="flex">
        <button>Bajo</button>
        <button>Medio</button>
        <button>Alto</button>
      </div>
    </div> -->
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
</style>
