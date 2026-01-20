<script setup>
import TaskListRow from "./TaskListRow.vue";
import {computed, defineProps, ref} from 'vue'
import TaskListRowHeader from "./TaskListRowHeader.vue";
import router from "../router/index.js";

const props = defineProps({
  header: {
    type: String,
    default: 'Задачи на сегодня'
  },
  tasks: {
    type: Array,
    default: []
  },
  changeable: {
    type: Boolean,
    default: false
  },
  opened: {
    type: Boolean,
    default: false
  }
})

const listOpened = ref(props.opened)

const toggleListDisplay = () => {
  listOpened.value = !listOpened.value
}

const showTask = (projectUrl, taskId) => {
  router.push('/cabinet/project/' + projectUrl + '/tasks/' + taskId)
}

const listArrow = computed(() => {
  return listOpened.value ? '▲' : '▼'
})

const sortDirection = ref('asc')
const sortField = ref('end_date')

const sortedTasks = computed(() => {
  return [...props.tasks].sort((a, b) => {
    return sortDirection.value === 'asc'
        ? String(a[sortField.value]).localeCompare(b[sortField.value])
        : String(b[sortField.value]).localeCompare(a[sortField.value])
  })
})

const sortTasks = (field, direction) => {
  sortField.value = field
  sortDirection.value = direction
}

</script>

<template>
  <div class="task-list">
    <div class="task-list__header">
      <div
          class="edit-button"
          v-if="props.changeable === true"
          @click="$emit('redactTasklist')"
      >Редактировать
      </div>
      <h2>{{ header }}</h2>
      <span
          class="toggle-arrow"
          @click="toggleListDisplay()"
      >{{ listArrow }}</span>
    </div>
    <div class="tasks" v-show="listOpened">
      <TaskListRowHeader
        @sort-list="sortTasks"
      />
      <TaskListRow
          v-for="task in sortedTasks"
          :name="task.name"
          :in-progress="!!task.inProgress"
          :priority="task.priority"
          :time="task.time"
          :id="task.id"
          @click="showTask(task.projectUrl, task.id)"
          :project-url="task.projectUrl"
      />
    </div>
  </div>

</template>

<style lang=scss>
.task-list {
  margin-bottom: 20px;

  &__header {
    display: flex;
    position: relative;
    overflow: hidden;
    justify-content: space-between;
    align-items: center;
    background: #f06292;
    padding: 20px;
    border-radius: 25px;
    box-shadow: 0 4px 8px rgba(240, 98, 146, 0.2);
    font-size: 1.5em;
    font-weight: 600;
    color: #fff;
    transition: background 0.3s ease;
    margin-bottom: 20px;

    &:hover .edit-button {
      top: 35px;
    }
  }

}

.tasks {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
  text-align: center;

  &__row {
    display: flex;
    border-radius: 25px;
    padding: 15px;
    margin-bottom: 10px;
    box-shadow: 1px 1px 4px #d83979;
    font-weight: 600;
    align-items: center;
  }
}

.name {
  flex-basis: 55%;
  text-align: left;
}

.status, .priority, .time {
  flex-basis: 19%;
}

.toggle-arrow {
  font-size: 1.2em;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.edit-button {
  position: absolute;
  left: 0;
  top: 0;
  transform: translateY(-100%);
  background: #fff;
  color: #9e1b56;
  border: none;
  padding: 8px 15px;
  border-radius: 20px 0;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Comic Neue', cursive, Arial, sans-serif;
  box-shadow: 0 3px 6px rgba(216, 57, 121, 0.6);
  transition: top 0.3s ease;
  font-size: 14px;

  &:hover {
    background: #d83979;
    color: #fff;
  }
}

</style>