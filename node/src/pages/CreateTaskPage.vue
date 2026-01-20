<script setup>
import {useRoute} from 'vue-router';
import BaseButton from "../components/structure/BaseButton.vue";
import BaseInput from "../components/structure/BaseInput.vue";
import {computed, onMounted, reactive} from 'vue'
import BaseTextarea from "../components/structure/BaseTextarea.vue";
import {useProjectStore} from "../stores/projectStore.js";
import {useParticipantStore} from "../stores/participantStore.js";
import {useTasklistStore} from "../stores/tasklistStore.js";
import BaseSelectInput from "../components/structure/BaseSelectInput.vue";
import {useTaskStore} from "../stores/taskStore.js";
import VueSpinner from "../components/structure/VueSpinner.vue";

const projectStore = useProjectStore()
const tasklistStore = useTasklistStore()
const participantStore = useParticipantStore()
const taskStore = useTaskStore()
const route = useRoute()

const newTask = reactive({
  name: '',
  description: '',
  executor_id: null,
  tasklist_id: null,
  end_date: '',
  end_time: '',
  priority: null,
  in_progress: null
})

const executorOptions = computed(() => {
  const data = {}
  if (participantStore?.participants?.length > 0) {
    participantStore.participants.forEach(({name, surname, user_id}) => {
      data[user_id] = `${name} ${surname}`
    })
  }
  return data
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

const storeTask = () => {
  taskStore.storeTask(newTask)
}

onMounted(async () => {
  projectStore.currentProject = route.params.url

  try {
    await Promise.all([
      tasklistStore.getTasklists(),
      participantStore.getParticipants()
    ])
  } catch (e) {
    console.error(e)
  }
})

</script>

<template>
  <div>
    <h2 class="header">Новая задача</h2>
    <BaseInput
        name="name"
        placeholder="Введите заголовок задачи"
        :with-label="true"
        label="Заголовок задачи"
        v-model="newTask.name"
    />
    <BaseTextarea
        name="description"
        placeholder="Введите описание задачи"
        :with-label="true"
        label="Описание задачи"
        v-model="newTask.description"
    />
    <BaseSelectInput
        name="executor"
        :with-label="true"
        label="Исполнитель"
        :options="executorOptions"
        v-model="newTask.executor_id"
    />
    <BaseSelectInput
        name="tasklist"
        :with-nullable="false"
        :with-label="true"
        label="Список"
        :options="tasklistOptions"
        v-model="newTask.tasklist_id"
    />
    <BaseInput
        type="date"
        name="end-date"
        :with-label="true"
        label="Дата окончания"
        v-model="newTask.end_date"
        class="date-time"
    />
    <BaseInput
        type="time"
        name="end-time"
        :with-label="true"
        label="Время окончания"
        v-model="newTask.end_time"
        class="date-time"
    />
    <BaseSelectInput
        name="priority"
        :with-nullable="false"
        :with-label="true"
        label="Приоритет"
        :options="taskStore.priorities"
        v-model="newTask.priority"
    />
    <VueSpinner v-if="taskStore.status === 'loading'"/>
    <BaseButton
        v-else
        size="m"
        text="Сохранить"
        class="date-time"
        @click="storeTask"
    />
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
</style>