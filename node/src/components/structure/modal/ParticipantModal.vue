<script setup>
import {useModalStore} from "../../../stores/modalStore.js";
import BaseModal from "./BaseModal.vue";
import {useParticipantStore} from "../../../stores/participantStore.js";
import VueSpinner from "../VueSpinner.vue";
import {computed} from "vue";

const participantStore = useParticipantStore()
const participant = computed(() => {
  return participantStore.selectedParticipant
})
const modalStore = useModalStore()
const props = defineProps({
  participant: Object
})

const close = () => {
  participantStore.selectedParticipant = {}
  modalStore.close()
}
</script>

<template>
  <BaseModal @close="close">
    <VueSpinner
        v-if="participantStore.participantLoading === 'loading'"
    />
    <section
        v-else-if="participantStore.participantLoading === 'success'"
        class="profile"
    >
      <div class="avatar-placeholder">
        <img :src="participant.avatar_img" alt="avatar_img" class="avatar-img"/>
      </div>
      <div class="name">
        {{ participant.surname }} {{ participant.name }} {{ participant.patronymic }}
      </div>
      <div class="contact-phone">
        <label>Контактный телефон:</label>
        <p class="info">{{ participant.phone }}</p>
      </div>
      <div class="contact-email">
        <label>Email для связи:</label>
        <p class="info">{{ participant.contact_email }}</p>
      </div>
      <div class="about">
        <label>О себе:</label>
        <p class="info">{{ participant.about }}</p>
      </div>
    </section>
    <p v-else-if="participantStore.participantLoading === 'error'"> Ошибка загрузки. Смотри консоль.</p>

  </BaseModal>
</template>

<style scoped>
.profile {
  flex-grow: 1;
  background: #ffd0e0;
  border-radius: 40px;
  padding: 40px 50px;
  box-shadow: 0 6px 20px rgba(240, 98, 146, 0.35);
  display: flex;
  gap: 15px;
  flex-direction: column;
  max-width: 1000px;
  margin: 0 auto
}

.avatar-placeholder {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #f06292;
  margin-bottom: 10px;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  align-self: center;
}

.info {
  font-size: 20px;
  font-weight: 500;
}

.name {
  font-weight: 600;
  font-size: 20px;
}
</style>