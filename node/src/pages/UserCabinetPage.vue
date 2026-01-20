<script setup>
import TaskList from "../components/TaskList.vue"
import {onMounted} from 'vue'
import VueSpinner from "../components/structure/VueSpinner.vue";
import {useTaskStore} from "../stores/taskStore.js";

const taskStore = useTaskStore()

onMounted(() => {
  taskStore.getTasksForToday()
})

</script>

<template>

  <VueSpinner size="l" v-if="taskStore.status === 'loading'"/>
  <div v-if="taskStore.status === 'success'">
    <TaskList
        v-if="taskStore.tasks.length > 0"
        :tasks="taskStore.tasks"
        :opened=true
    />
    <p v-else>Задач на сегодня нет</p>
  </div>
  <div v-if="taskStore.status === 'error'">Ошибка загрузки. Смотрите консоль.</div>

</template>

<style scoped>
.content {
  flex-grow: 1;
  background: #ffd0e0;
  border-radius: 40px;
  padding: 40px 50px;
  box-shadow: 0 6px 20px rgba(240, 98, 146, 0.35);
  display: flex;
  flex-direction: column;
  width: 82%;
}

</style>