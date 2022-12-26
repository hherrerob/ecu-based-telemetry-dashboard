<template>
  <router-view />
</template>

<script setup lang="ts">
console.log("[App.vue]", `Loaded Electron ${process.versions.electron}!`)
</script>