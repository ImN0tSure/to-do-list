<script setup>
import {computed, defineEmits, ref} from 'vue'

const emit = defineEmits(['sortList'])
const sortDirection = ref('asc')
const sortDirectionIcon = computed(() => {
  return sortDirection.value === 'asc'
      ? '▼'
      : '▲'
})
const sortField = ref('end_date')
const sort = (field) => {
  if (field === sortField.value) {
    sortDirection.value = sortDirection.value === 'asc'
        ? 'desc'
        : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'desc'
  }

  emit('sortList', sortField.value, sortDirection.value)

}
</script>

<template>
  <div class="tasks__row header">
    <div
        class="name"
        @click="sort('name')"
    >
      Задача <span v-if="sortField === 'name'">{{ sortDirectionIcon }}</span>
    </div>
    <div class="status">Статус</div>
    <div class="priority">Приоритет</div>
    <div
        class="time"
        @click="sort('end_date')"
    >
      Осталось <span v-if="sortField === 'end_date'">{{ sortDirectionIcon }}</span>
    </div>
  </div>
</template>

<style scoped>
.header {
  background: #f06292;
  font-size: 1.2em;
}

.name, .status, .priority, .time {
  color: white;
}
</style>