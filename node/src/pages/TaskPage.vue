<script setup>
import {useTaskStore} from "../stores/taskStore.js";
import {computed, onMounted} from "vue";
import {useRoute} from 'vue-router'
import {useProjectStore} from "../stores/projectStore.js";
import {useTasklistStore} from "../stores/tasklistStore.js";
import {useParticipantStore} from "../stores/participantStore.js";
import EditableInput from "../components/structure/EditableInput.vue";
import VueSpinner from "../components/structure/VueSpinner.vue";
import EditableBaseSelectInput from "../components/structure/EditableBaseSelectInput.vue";
import EditableTextarea from "../components/structure/EditableTextarea.vue";
import BaseButton from "../components/structure/BaseButton.vue";
import {useRoleStore} from "../stores/roleStore.js";
import {useAuthStore} from "../stores/authStore.js";
import router from "../router/index.js";

const route = useRoute()
const projectStore = useProjectStore()
const authStore = useAuthStore()
const roleStore = useRoleStore()
const participantStore = useParticipantStore()
const tasklistStore = useTasklistStore()
const taskStore = useTaskStore()


const executorOptions = computed(() => {
  const data = {}
  const currentTaskExecutorId = taskStore.currentTask.executor_id
  const currentUserId = authStore.user.id

  if (participantStore?.participants?.length > 0) {

    if (roleStore.can('task.update.executor.self') && (!currentTaskExecutorId || currentTaskExecutorId === currentUserId)) {
      participantStore.currentUserParticipant.forEach(({name, surname, user_id}) => {
        data[user_id] = `${name} ${surname}`
      })
    } else {
      participantStore.participants.forEach(({name, surname, user_id}) => {
        data[user_id] = `${name} ${surname}`
      })
    }
  }

  return data
})

const isExecutorEditable = computed(() => {
  if (roleStore.can('task.update')) {
    return true
  } else if (roleStore.can('task.update.executor.self')) {
    const currentExecutorId = taskStore.currentTask.executor_id
    return !currentExecutorId || currentExecutorId === authStore.user.id
  } else {
    return false
  }
})

const tasklistOptions = computed(() => {
  const data = {}
  if (tasklistStore?.tasklists?.length > 0) {
    tasklistStore.tasklists.forEach(({id, name}) => {
      data[id] = name
    })
  }
  return data
})

const priorityOptions = taskStore.priorities
const inProgressOptions = taskStore.inProgress

const saveTask = () => {
  taskStore.saveCurrentTask()
}

const deleteTask = async (taskId) => {
  const response = await taskStore.deleteTask(taskId)
  const projectUrl = route.params.url

  if(response) {
    router.push(`/cabinet/project/${projectUrl}`)
  }
}

onMounted(async () => {
  const projectUrl = route.params.url
  const taskId = route.params.taskId
  projectStore.currentProject = projectUrl

  try {
    await Promise.all([
      taskStore.getTasks(),
      taskStore.getTask(projectUrl, taskId),
      tasklistStore.getTasklists(),
      participantStore.getParticipants()
    ])

  } catch (e) {
    console.error(e)
  }
})
</script>

<template>
  <VueSpinner v-if="taskStore.status === 'loading'"/>
  <div v-else-if="taskStore.status === 'success'">
    <h2 class="header">Задача</h2>
    <EditableInput
        label="Задача"
        v-model="taskStore.currentTask.name"
        :is-editable="roleStore.can('task.update')"
    />
    <EditableTextarea
        label="Описание"
        v-model="taskStore.currentTask.description"
        :is-editable="roleStore.can('task.update')"
    />
    <EditableBaseSelectInput
        label="Исполнитель"
        v-model="taskStore.currentTask.executor_id"
        :options="executorOptions"
        :is-editable="isExecutorEditable"
    />
    <EditableBaseSelectInput
        label="Текущий список"
        v-model="taskStore.currentTask.tasklist_id"
        :options="tasklistOptions"
        :with-nullable="false"
        :is-editable="roleStore.can('task.update') || roleStore.can('task.update.tasklist')"
    />
    <EditableInput
        label="Дата окончания"
        type="date"
        v-model="taskStore.currentTask.end_date"
        :is-editable="roleStore.can('task.update')"
        class="date-time"
    />
    <EditableInput
        label="Время окончания"
        type="time"
        v-model="taskStore.currentTask.end_time"
        :is-editable="roleStore.can('task.update')"
        class="date-time"
    />
    <EditableBaseSelectInput
        label="Приоритет"
        v-model="taskStore.currentTask.priority"
        :options="priorityOptions"
        :with-nullable=false
        :is-editable="roleStore.can('task.update')"
    />
    <EditableBaseSelectInput
        label="Статус"
        v-model="taskStore.currentTask.in_progress"
        :options="inProgressOptions"
        :with-nullable=false
        :is-editable="roleStore.can('task.update') || roleStore.can('task.update.status')"
    />
    <div class="button-wrapper">
      <BaseButton
          size="m"
          text="Сохранить"
          @click.prevent.stop="saveTask"
          class="date-time"
      />
      <BaseButton
          v-if="roleStore.can('task.delete')"
          size="m"
          text="Удалить"
          class="delete-button"
          @click.prevent.stop="deleteTask(taskStore.currentTask.id)"
      />
    </div>

  </div>
  <div v-else-if="taskStore.status === 'error'">
    Ошибка загрузки. Смотрите консоль.
  </div>

</template>

<style lang=scss scoped>
.header {
  margin-top: 0;
  font-size: 2em;
  color: #9e1b56;
  margin-bottom: 30px;
  text-shadow: 1px 1px 3px #d83979;
}

.date-time {
  width: 20%;
}

.delete-button {
  background-color: #d13737;

  &:hover {
    background-color: #b83232;
  }
}

.button-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>