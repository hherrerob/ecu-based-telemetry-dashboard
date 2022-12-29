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

const emit = defineEmits(['tick'])

interface Props {
  min: number
  max: number
  disabled: boolean
}
const props = defineProps<Props>()

watch(() => props, () => {
  reset()
}, { deep: true })

const currentMs: Ref<number> = ref(0)
let isPaused: Ref<boolean> = ref(true)
let isBeingDragged = false

const interval = setInterval(() => {
  if (!isPaused.value && !isBeingDragged && currentMs.value < props.max) currentMs.value++
}, 1)

const playPause = () => {
  isPaused.value = !(isPaused.value)
}

const reset = () => {
  isPaused.value = true
  currentMs.value = props.min
  clearInterval(interval)
}

const onDrag = () => {
  isBeingDragged = true
}

const onChange = () => {
  isBeingDragged = false
}

const onUpdate = () => {
  emit('tick', currentMs.value)
}

const formattedCurrentMs = computed(() => {
  return formatMsToReadableString(currentMs.value)
})
</script>

<style src="@vueform/slider/themes/default.css"></style>
<style>
.button-min-size {
  min-width: 38px;
}
</style>