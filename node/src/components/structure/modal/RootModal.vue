<script setup>
import {useModalStore} from "../../../stores/modalStore.js";
import ParticipantModal from "./ParticipantModal.vue";
import AddTasklistModal from "./AddTasklistModal.vue";
import RedactTasklistModal from "./RedactTasklistModal.vue";
import AddParticipantModal from "./AddParticipantModal.vue";
import ExcludeParticipantModal from "./ExcludeParticipantModal.vue";

const modalStore = useModalStore()
</script>

<template>
  <ParticipantModal
    v-if="modalStore.type === 'participant'"
    :participant = modalStore.payload
  />
  <AddTasklistModal
    v-if="modalStore.type === 'addTasklist'"
    :add-tasklist = modalStore.payload
  />
  <RedactTasklistModal
    v-if="modalStore.type === 'redactTasklist'"
    :redact-tasklist = modalStore.payload
  />
  <AddParticipantModal
    v-if="modalStore.type === 'addParticipant'"
  />
  <ExcludeParticipantModal
    v-if="modalStore.type === 'excludeParticipant'"
  />
</template>

<style scoped>

</style>