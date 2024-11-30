<script lang="ts" setup>
const props = defineProps({
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  value: {
    type: Array,
    default: () => [80, 90],
  },
  step: {
    type: Number,
    default: 0.01,
  },
});

const emit = defineEmits(["rangeValue"]);

const fromValue = ref<number>(Number(props.value[0]));
const toValue = ref<number>(Number(props.value[1]));

const fromTooltipPosition = ref(0);
const toTooltipPosition = ref(0);

watch(fromValue, (newValue) => {
  if (newValue > toValue.value) {
    fromValue.value = toValue.value;
  }
  emit("rangeValue", [fromValue.value, toValue.value]);
});

watch(toValue, (newValue) => {
  if (newValue < fromValue.value) {
    toValue.value = fromValue.value;
  }
  emit("rangeValue", [fromValue.value, toValue.value]);
});
</script>

<template>
  <div class="range_container">
    <div class="sliders_control">
      <div class="flex justify-between mb-3">
        <div :style="{ left: fromTooltipPosition + 'px' }">
          {{ fromValue }}
        </div>

        <div :style="{ right: toTooltipPosition + 'px' }">
          {{ toValue }}
        </div>
      </div>

      <input
        id="fromSlider"
        type="range"
        :value="fromValue"
        :min="min"
        :max="max"
        @input="fromValue = parseInt($event.target?.value)"
      />

      <input
        id="toSlider"
        type="range"
        :value="toValue"
        :min="min"
        :max="max"
        @input="toValue = parseInt($event.target?.value)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.range_container {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 10px auto;
}

.sliders_control {
  position: relative;
  min-height: 50px;
}

.form_control {
  position: relative;
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  color: #635a5a;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  pointer-events: all;
  width: 24px;
  height: 24px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 1px #c6c6c6;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  -webkit-appearance: none;
  pointer-events: all;
  width: 24px;
  height: 24px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 1px #c6c6c6;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb:hover {
  background: #f7f7f7;
}

input[type="range"]::-webkit-slider-thumb:active {
  box-shadow: inset 0 0 3px #387bbe, 0 0 9px #387bbe;
  -webkit-box-shadow: inset 0 0 3px #387bbe, 0 0 9px #387bbe;
}

input[type="number"] {
  color: #8a8383;
  width: 50px;
  height: 30px;
  font-size: 20px;
  border: none;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  opacity: 1;
}

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  height: 2px;
  width: 100%;
  position: absolute;
  background-color: #c6c6c6;
  pointer-events: none;
}

#fromSlider {
  height: 0;
  z-index: 1;
}

.tooltip {
  position: absolute;
  top: -30px;
  left: 0;
  background-color: #333;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  transform: translateX(-50%);

  transition: opacity 0.2s;
}

#fromSlider:hover ~ .fromTooltip,
#toSlider:hover ~ .toTooltip {
  opacity: 1;
}
</style>
