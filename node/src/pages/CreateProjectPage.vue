<script setup>
import {reactive, ref} from 'vue'
import BaseInput from "../components/structure/BaseInput.vue";
import BaseTextarea from "../components/structure/BaseTextarea.vue";
import BaseButton from "../components/structure/BaseButton.vue";
import {useProjectStore} from "../stores/projectStore.js";
import VueSpinner from "../components/structure/VueSpinner.vue";

const projectStore = useProjectStore()

const newProject = reactive({
  name: '',
  description: '',
  end_date: ''
})

const storeProject = () => {
  projectStore.storeProject(newProject)
}

</script>

<template>
  <h2>
    Создать новый проект
  </h2>
  <BaseInput
      name="name"
      placeholder="Введите название проекта"
      :with-label="true"
      label="Название проекта"
      v-model="newProject.name"
  />
  <BaseTextarea
      name="description"
      placeholder="Введите описание задачи"
      :with-label="true"
      label="Описание задачи"
      v-model="newProject.description"
  />
  <BaseInput
      type="date"
      name="end_date"
      :with-label="true"
      label="Дата окончания (не обязательно)"
      v-model="newProject.end_date"
  />
  <VueSpinner v-if="projectStore.status === 'loading'"/>
  <BaseButton
      v-else
      size="m"
      text="Сохранить"
      class="date-time"
      @click="storeProject"
  />
</template>

<style scoped>
h2 {
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