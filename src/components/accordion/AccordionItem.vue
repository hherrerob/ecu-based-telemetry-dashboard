<template>
  <div class="accordion-item">
    <AccordionHeader :target="target">{{ title }}</AccordionHeader>
    <AccordionBody :target="target">
      <slot />
    </AccordionBody>
  </div>
</template>

<script setup lang="tsx">
import AccordionHeader from './AccordionHeader.vue'
import AccordionBody from './AccordionBody.vue'

interface Props {
  target: number
  title: string
}

const { target, title } = defineProps<Props>()
</script>
