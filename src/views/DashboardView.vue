<template>

</template>

<script setup lang="tsx">
import { ipcRenderer } from 'electron'
import { Ref, ref } from 'vue'

const accData: Ref<Nullable<any[]>> = ref(null)

const GET_DATA_EVENT = 'get-data'
ipcRenderer.invoke(GET_DATA_EVENT, ['Accelerometer', 2]).then((data) => {
  console.log(data)
  accData.value = data
})
</script>
