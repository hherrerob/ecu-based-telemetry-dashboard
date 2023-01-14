<template>
  <div class="dashboard-navbar">
    <b-navbar type="dark" variant="dark">
      <slot />
    </b-navbar>
  </div>
</template>

<script setup lang="tsx">

</script>

<style>
.dashboard-navbar {
  position: sticky;
  top: 0;
  z-index: 999;

  border-bottom: 1px solid #4d9eff;
}
</style>
