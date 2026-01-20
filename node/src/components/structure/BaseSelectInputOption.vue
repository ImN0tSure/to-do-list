<script setup>
import {defineProps} from 'vue'

const props = defineProps({
  optionValue: {
    type: [String, Number],
    default: ''
  },
  optionText: {
    type: [String, Number],
    default: ''
  }
})
</script>

<template>
  <option :value="optionValue">
    {{ optionText }}
  </option>
</template>

<style scoped>

</style>