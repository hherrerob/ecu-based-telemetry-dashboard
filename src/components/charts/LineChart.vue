<template>
  <apexchart type="line" :height="250" :options="chartOptions" :series="data" />
</template>

<script setup lang="tsx">
import { computed } from 'vue'
import { formatMsToReadableString } from '../../composition/useFormatMsToReadableString'

interface Props {
  id: number
  unitOfMeasure: string
  min: number
  max: number
  data: any[]
}
const props = defineProps<Props>()

const chartOptions = computed(() => {
  return {
    chart: {
      animations: {
        enabled: false
      },
      id: props.id,
      name: `chartName-${props.id}`,
      group: 'telemetry',
    },
    colors: ['#4d9eff', '#ffdd00', '#44be2b', '#FD7014', '#FF0000'],
    xaxis: {
      labels: {
        formatter: formatMsToReadableString
      }
    },
    yaxis: {
      title: {
        text: props.unitOfMeasure
      },
      min: props.min,
      max: props.max,
      labels: {
        formatter: (value: number) => { return value.toFixed(2) }
      }
    },
    markers: {
      size: 0
    }
  }
})
</script>
