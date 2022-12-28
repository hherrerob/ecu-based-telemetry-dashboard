<template>
  <div :id="'accordion-item-collapse-' + target"
       class="accordion-collapse collapse"
       :aria-labelledby="'accordion-item-heading-' + target">
    <div class="accordion-body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="tsx">
interface Props {
  target: number
}

const { target } = defineProps<Props>()
</script>
