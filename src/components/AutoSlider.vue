<template>
  <div class="w-100 d-flex justify-content-evenly align-items-center">
    <b-button variant="dark"
              class="button-min-size"
              :disabled="disabled"
              @click="playPause">
      <i class="fa-solid"
         :class="isPaused ? 'fa-play' : 'fa-pause'"/>
    </b-button>

    <p style="color: white;" class="px-3">{{ formattedCurrentMs }}</p>

    <div class="w-100">
      <Slider
          v-model="currentMs"
          :min="min"
          :max="max"
          :tooltips="false"
          :disabled="disabled"
          @change="onChange"
          @update="onUpdate"
          @slide="onDrag" />
    </div>
  </div>
</template>

<script setup lang="tsx">
import Slider from '@vueform/slider'
import { computed, ref, Ref, watch } from 'vue'
import { formatMsToReadableString } from '../composition/useFormatMsToReadableString'

const emit = defineEmits(['play', 'pause', 'tick', 'change'])

interface Props {
  min: number
  max: number
  step: number
  disabled: boolean
}
const props = defineProps<Props>()

watch(() => props, () => {
  reset()
}, { deep: true })

const currentMs: Ref<number> = ref(0)
let isPaused: Ref<boolean> = ref(true)
let isBeingDragged = false

setInterval(() => {
  if (!(isPaused.value) && !isBeingDragged && currentMs.value < props.max)
    currentMs.value += props.step
}, props.step)

const playPause = () => {
  isPaused.value = !(isPaused.value)

  emit(isPaused.value ? 'pause' : 'play')
}

const reset = () => {
  isPaused.value = true
  currentMs.value = props.min
}

const onDrag = () => {
  isBeingDragged = true
}

const onChange = () => {
  isBeingDragged = false
  emit('change', currentMs.value)
}

const onUpdate = () => {
  emit('tick', currentMs.value)
}

const formattedCurrentMs = computed(() => {
  return formatMsToReadableString(currentMs.value)
})
</script>

<style src="@vueform/slider/themes/default.css"></style>
<style lang="scss">
.button-min-size {
  min-width: 38px;
}

.slider-connect {
  background: #4d9eff;
}
</style>