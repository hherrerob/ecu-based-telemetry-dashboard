<template>
  <div class="position-relative">
    <Navbar>
      <b-container fluid>
        <b-row>
          <b-col :cols="3">
            <b-form-select
                v-model="selectedSessionId"
                :options="sessionOptions" />
          </b-col>

          <b-col :cols="9">
            <AutoSlider
                :min="0"
                :max="selectedSession?.end_time ?? 0"
                :step="STEP"
                :disabled="selectedSessionId === null"
                @play="onPlay"
                @pause="onPause"
                @tick="onTick"
                @change="onChange">

              <b-button variant="dark"
                        :disabled="selectedSessionId === null"
                        :active="isPlayerInPictureInPicture"
                        @click="togglePictureInPicture">
                <i class="fa-regular fa-images" />

              </b-button>
            </AutoSlider>
          </b-col>
        </b-row>
      </b-container>
    </Navbar>

    <b-container
        v-if="selectedSession && dataToRender !== null"
        class="mt-2"
        fluid>
      <b-row>
        <b-col :cols="7">
          <b-container class="border border-radius p-0" fluid>
            <VideoPlayer
                  class="border-radius"
                  :src="selectedSession.path_to_video"
                  :controls="false"
                  fluid
                  @mounted="onVideoPlayerMounted" />
          </b-container>
        </b-col>

        <b-col :cols="5">
          <b-container class="h-100 border border-radius p-0" fluid>
            <LiveMap
                ref="liveMap"
                :initialPosition="initialPosition" />
          </b-container>
        </b-col>
      </b-row>

      <br>

      <b-row>
        <AccordionContainer>
          <template v-for="(t, index) in telemetryData">
            <AccordionItem
                v-if="t.metadata !== null"
                :title="t.name"
                :target="index +1">
              <LineChart
                  :id="index +1"
                  :min="t.metadata.min"
                  :max="t.metadata.max"
                  :unitOfMeasure="t.metadata.unit"
                  :data="dataToRender[t.name]" />
            </AccordionItem>
          </template>
        </AccordionContainer>
      </b-row>
    </b-container>
  </div>
</template>

<script setup lang="tsx">
import { computed, onMounted, Ref, ref, watch } from 'vue'
import AccordionContainer from '../components/accordion/AccordionContainer.vue'
import AccordionItem from '../components/accordion/AccordionItem.vue'
import Navbar from '../components/Navbar.vue'
import LiveMap from '../components/map/LiveMap.vue'
import AutoSlider from '../components/AutoSlider.vue'
import LineChart from '../components/charts/LineChart.vue'
import { NUMBER_OF_ITEMS_TO_KEEP_IN_MEMORY, STEP } from '../constants'
import { cropLastItemsOfArray, prepareTelemetryDataForCharts } from '../composition/useTelemetryDataUtils'
import { getSessions, getTelemetryData } from '../composition/useIpcCommunication'
import { VideoPlayer } from '@videojs-player/vue'
import { VideoJsPlayer } from 'video.js'
import { LatLngExpression } from 'leaflet'

const allSessions: Ref<any[]> = ref([])
const selectedSessionId: Ref<Nullable<any>> = ref(null)
const selectedSession = computed(() => {
  return !selectedSessionId ? null : allSessions.value.find((session) => session.id === selectedSessionId.value)
})
const sessionOptions = computed(() => {
  return [
    {value: null, text: 'Choose a session'},
    ...allSessions.value.map((session: any) => {
      return {value: session.id, text: `Session ${session.id}: ${session.video_start_time}`}
    })
  ]
})

let videoPlayer: VideoJsPlayer
const onVideoPlayerMounted = ({player}: any) => {
  videoPlayer = player
}

const initialPosition: LatLngExpression = [40.602018, -6.530945]
const liveMap: any = ref(null)

const onPlay = () => {videoPlayer.play()}
const onPause = () => {videoPlayer.pause()}
const isPlayerInPictureInPicture: Ref<Boolean> = ref(false)
const togglePictureInPicture = () => {
  if (videoPlayer.isInPictureInPicture()) {
    videoPlayer.exitPictureInPicture()
    isPlayerInPictureInPicture.value = false
  } else {
    videoPlayer.requestPictureInPicture()
    isPlayerInPictureInPicture.value = true
  }
}

let telemetryData: any[] = []
let dataToRender: Ref<Nullable<any>> = ref(null)

watch(() => selectedSessionId.value, () => {
  dataToRender.value = null

  if (isPlayerInPictureInPicture.value) videoPlayer.exitPictureInPicture()
  isPlayerInPictureInPicture.value = false

  if (selectedSessionId.value) {
    getTelemetryData(selectedSessionId.value).then((data) => {
      telemetryData = data
      dataToRender.value = prepareTelemetryDataForCharts(telemetryData)
    })
  }
})

const doStep = (index: number) => {
  doTelemetryStep(index)
  doMapStep(index)
}

const doTelemetryStep = (index: number) => {
  for (const t of telemetryData) {
    for (let i = 0; i < t.series.length; i++) {
      dataToRender.value[t.name][i].data = cropLastItemsOfArray(
          dataToRender.value[t.name][i].data, NUMBER_OF_ITEMS_TO_KEEP_IN_MEMORY)

      if (index in t.series[i].data) {
        for (const trace of t.series[i].data[index]) {
          dataToRender.value[t.name][i].data.push(trace)
        }
      }
    }
  }
}

const doMapStep = (index: number) => {
  const gpsData = telemetryData.find((t) => t.name === 'GPS')

  if (gpsData === null || gpsData === undefined || !(index in gpsData?.series))
    return

  for (const trace of gpsData.series[index]) {
    liveMap.value.move(trace)
  }
}

const onTick = (currentMs: number) => {
  if (!selectedSession.value) return

  const index = Math.floor(currentMs / STEP)

  doStep(index)
}

const onChange = (currentMs: number) => {
  dataToRender.value = prepareTelemetryDataForCharts(telemetryData)
  videoPlayer.currentTime(currentMs / 1000)
}

onMounted(() => {
  getSessions().then((sessions) => {
    allSessions.value = sessions
  })
})
</script>

<style lang="scss">
.border-radius {
  border-radius: 5px;
}

video {
  border-radius: 5px;
}
</style>
