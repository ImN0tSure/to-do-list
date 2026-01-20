<script setup>
import { defineProps } from 'vue'
import { useProjectStore } from "../stores/projectStore.js"

const projectStore = useProjectStore()

const props = defineProps({
  projectUrl: {
    type: String,
    default: ''
  },
  projectName: {
    type: String,
    default: ''
  }
})

</script>

<template>
  <li class="project-list__item">
    {{ projectName }}
  </li>
</template>

<style scoped>
.project-list__item {
  background: #fce7f0;
  margin-bottom: 15px;
  padding: 12px 18px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  color: #7a2350;
  box-shadow: 1px 1px 4px #d83979;
  transition: background-color 0.3s ease, transform 0.15s ease;
}

.project-list__item:hover, .active {
  background: #f06292;
  color: white;
  box-shadow: 2px 2px 8px #d83979;
  transform: scale(1.05);
}

</style>