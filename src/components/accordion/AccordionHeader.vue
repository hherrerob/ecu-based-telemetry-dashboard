<template>
  <h2 :id="'accordion-item-heading-' + target"
      class="accordion-header">
    <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="'#accordion-item-collapse-' + target"
        aria-expanded="true"
        :aria-controls="'accordion-item-collapse-' + target">
      <slot />
    </button>
  </h2>
</template>

<script setup lang="tsx">
interface Props {
  target: number
}

const { target } = defineProps<Props>()
</script>
