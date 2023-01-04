<template>
  <div class="h-100">
    <div id="map" class="h-100 border-radius" />
  </div>
</template>

<script setup lang="tsx">
import { onMounted } from 'vue'
import { LatLngExpression } from 'leaflet'
import LiveMapManager from './index'

interface Props {
  initialPosition: LatLngExpression
}

const { initialPosition } = defineProps<Props>()

let liveMapManager: LiveMapManager

const move = (moveTo: LatLngExpression) => {
  if (liveMapManager) {
    liveMapManager.move(moveTo)
  }
}

const reset = () => {
  liveMapManager = new LiveMapManager(initialPosition)
}

defineExpose({move, reset})

onMounted(() => {
  liveMapManager = new LiveMapManager(initialPosition)
})
</script>

<style>
</style>
