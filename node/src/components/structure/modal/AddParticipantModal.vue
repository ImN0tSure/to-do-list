<script setup>
import {useModalStore} from "../../../stores/modalStore.js";
import BaseModal from "./BaseModal.vue";
import {ref} from "vue";
import BaseInput from "../BaseInput.vue";
import BaseButton from "../BaseButton.vue";
import VueSpinner from "../VueSpinner.vue";
import {useParticipantStore} from "../../../stores/participantStore.js";

const participantStore = useParticipantStore()
const modalStore = useModalStore()

const newParticipantEmail = ref('')

const close = () => {
  newParticipantEmail.value = ''
  modalStore.close()
}

const addParticipant = async () => {
  const result = await participantStore.addParticipant(newParticipantEmail.value)

  if (result) {
    close()
  }
}
</script>

<template>
  <BaseModal @close="close">
    <div class="new-participant">
      <h3 class="new-participant__header">Добавление участника в проект</h3>
      <BaseInput
          :with-label="true"
          type="email"
          label="Email пользователя"
          name="email"
          placeholder="Введите email"
          class="add-participant-input"
          size="s"
          v-model="newParticipantEmail"
      />
      <BaseButton
          v-if="participantStore.participantLoading !== 'loading'"
          text="Добавить"
          @click="addParticipant"
      />
      <VueSpinner v-else-if="participantStore.participantLoading === 'loading'"/>
    </div>
  </BaseModal>
</template>

<style lang=scss scoped>
.new-participant {
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