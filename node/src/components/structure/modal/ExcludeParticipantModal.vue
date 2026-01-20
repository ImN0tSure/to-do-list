<script setup>
import BaseModal from "./BaseModal.vue";
import {useModalStore} from "../../../stores/modalStore.js";
import BaseButton from "../BaseButton.vue";
import ParticipantPreview from "../../ProjectPage/ParticipantPreview.vue";
import {useParticipantStore} from "../../../stores/participantStore.js";
import {ref} from "vue";
import VueSpinner from "../VueSpinner.vue";

const modalStore = useModalStore()
const participantStore = useParticipantStore()

const excludedParticipantsIds = ref([])
const toggleParticipant = (id) => {
  if (excludedParticipantsIds.value.includes(id)) {
    excludedParticipantsIds.value = excludedParticipantsIds.value.filter(
        participantId => participantId !== id
    )
  } else {
    excludedParticipantsIds.value.push(id)

  }
}

const excludeSelectedParticipants = async () => {
  if (excludedParticipantsIds.value.length) {
    const result = await participantStore.excludeParticipants(excludedParticipantsIds.value)

    if (result) {
      participantStore.removeParticipantsFromStore(excludedParticipantsIds.value)
    }
  }
  close()
}

const testStoreRemove = () => {
  participantStore.removeParticipantsFromStore(excludedParticipantsIds.value)
}

const close = () => {
  excludedParticipantsIds.value = []
  modalStore.close()
}
</script>

<template>
  <BaseModal @close="close">
    <section class="exclude-participant">
      <p>Выберите участников, которых хотите исключить</p>
      <div class="exclusion-wrapper">
        <div class="participant-list">
          <ParticipantPreview
              v-for="participant in participantStore.participants"
              :key="participant.user_id"
              :name="participant.name"
              :surname="participant.surname"
              :img="participant.avatar_img"
              :status="participant.pivot.status"
              :excluded="excludedParticipantsIds.includes(participant.user_id)"
              @click="toggleParticipant(participant.user_id)"
          />
        </div>
        <div class="exclude-button-wrapper">
          <VueSpinner v-if="participantStore.excludeParticipantLoading === 'loading'"/>
          <BaseButton
              v-else
              text="Х Исключить выбранных"
              class="exclude-button"
              @click="excludeSelectedParticipants"
          />

        </div>
      </div>
    </section>
  </BaseModal>
</template>

<style scoped>
.exclude-participant {
  background: #fff0f6;
  padding: 25px 30px;
  border-radius: 20px;
  box-shadow: 0 6px 15px rgba(240, 98, 146, 0.4);
  width: 380px;
  max-width: 90%;
  max-height: 70%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: fadeIn 0.3s ease;
}

.participant-list {
  overflow-y: auto;
  max-height: 350px;
}

.participant {
  justify-content: flex-start;
}

.exclusion-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.exclude-button {
  background-color: #d13737;
}
</style>