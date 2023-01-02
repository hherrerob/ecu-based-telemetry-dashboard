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
                @tick="onTick"
                @change="onChange" />
          </b-col>
        </b-row>
      </b-container>
    </Navbar>

    <b-container
        v-if="selectedSession && dataToRender !== null"
        class="mt-2"
        fluid>
      <AccordionContainer>
        <AccordionItem
            v-for="(t, index) in telemetryData"
            :title="t.name"
            :target="index +1">
          <LineChart
              :id="index +1"
              :min="t.metadata.min"
              :max="t.metadata.max"
              :unitOfMeasure="t.metadata.unit"
              :data="dataToRender[t.name]" />
        </AccordionItem>
      </AccordionContainer>
    </b-container>
  </div>
</template>

<script setup lang="tsx">
import { computed, onMounted, Ref, ref, watch } from 'vue'
import AccordionContainer from '../components/accordion/AccordionContainer.vue'
import AccordionItem from '../components/accordion/AccordionItem.vue'
import Navbar from '../components/Navbar.vue'
import AutoSlider from '../components/AutoSlider.vue'
import LineChart from '../components/charts/LineChart.vue'
import { NUMBER_OF_ITEMS_TO_KEEP_IN_MEMORY, STEP } from '../constants'
import { cropLastItemsOfArray, prepareTelemetryDataForCharts } from '../composition/useTelemetryDataUtils'
import { getSessions, getTelemetryData, setDatabase } from '../composition/useIpcCommunication'

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

let telemetryData: any[] = []
let dataToRender: Ref<Nullable<any>> = ref(null)

watch(() => selectedSessionId.value, () => {
  dataToRender.value = null
  if (selectedSessionId.value) {
    getTelemetryData(selectedSessionId.value).then((data) => {
      telemetryData = data
      dataToRender.value = prepareTelemetryDataForCharts(telemetryData)
    })
  }
})

const onTick = (currentMs: number) => {
  if (!selectedSession.value) return
  const index = Math.floor(currentMs / STEP)

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

const onChange = (currentMs: number) => {
  dataToRender.value = prepareTelemetryDataForCharts(telemetryData)
}

onMounted(() => {
  setDatabase('D:\\telemetry.db', 'telemetry.db')
      .then((dbLoaded) => {
        console.log(dbLoaded)  // TODO: Remove
        getSessions().then((y) => {
          allSessions.value = y
        })
      })
})
</script>
