<script setup>
import {onMounted, ref} from "vue";

const now = new Date()
const hours = ref(String(now.getHours()).padStart(2, '0'))
const minutes = ref(String(now.getMinutes()).padStart(2, '0'))
const intervalId = ref('')

function updateClock() {
  const now = new Date()

  hours.value = String(now.getHours()).padStart(2, '0')
  minutes.value = String(now.getMinutes()).padStart(2, '0')
}

onMounted(() => {
  intervalId.value = setInterval(() => {
    updateClock()
  }, 1000)
})
</script>

<template>
  <div class="clock">{{ hours }}:{{ minutes }}</div>
</template>

<style scoped>
.clock {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.4em;
  font-weight: 600;
  color: white;
  text-shadow: 1px 1px 3px #d83979;
}
</style>