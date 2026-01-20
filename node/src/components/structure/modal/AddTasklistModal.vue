<script setup>
import {useModalStore} from "../../../stores/modalStore.js";
import BaseModal from "./BaseModal.vue";
import {computed, ref} from "vue";
import {useTasklistStore} from "../../../stores/tasklistStore.js";
import BaseInput from "../BaseInput.vue";
import BaseTextarea from "../BaseTextarea.vue";
import BaseButton from "../BaseButton.vue";
import VueSpinner from "../VueSpinner.vue";

const tasklistStore = useTasklistStore()
const modalStore = useModalStore()

// const newTasklistData = tasklistStore.newTasklist
const newTasklistData = ref({
  name: '',
  description: ''
})

const close = () => {
  newTasklistData.value.name = ''
  newTasklistData.value.description = ''
  modalStore.close()
}

const addTasklist = async () => {
  const result = await tasklistStore.createTasklist(newTasklistData.value)

  if(result) {
    close()
  }
}
</script>

<template>
  <BaseModal @close="close">
    <div class="new-tasklist">
      <h3 class="new-tasklist__header">Новый список</h3>
      <BaseInput
          :with-label="true"
          label="Название списка"
          name="name"
          placeholder="Введите название"
          class="add-tasklist-input"
          size="s"
          v-model="newTasklistData.name"
      />
      <BaseTextarea
        :with-label="true"
        label="Описание"
        placeholder="Описание списка"
        v-model="newTasklistData.description"
      />
      <BaseButton
          v-if="tasklistStore.createTasklistStatus !== 'loading'"
          text="Добавить"
          @click="addTasklist"
      />
      <VueSpinner v-else-if="tasklistStore.createTasklistStatus === 'loading'"/>
    </div>
  </BaseModal>
</template>

<style lang=scss scoped>
.new-tasklist {
  background: #fff0f6;
  padding: 25px 30px;
  border-radius: 20px;
  box-shadow: 0 6px 15px rgba(240, 98, 146, 0.4);
  width: 350px;
  max-height: 70%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: fadeIn 0.3s ease;

  &__header {
    margin: 0 0 10px;
    color: #9e1b56;
    text-align: center;
    font-size: 1.5em;
  }
}
</style>