<script setup>
import BaseButton from "../structure/BaseButton.vue";
import BaseNotificationLayout from "./BaseNotificationLayout.vue";
import {computed, defineEmits, defineProps} from 'vue'

const props = defineProps({
  notification: {
    type: Object,
    default: {}
  }
})

const eventType = props.notification.event_type


const inviter = props.notification?.notifiable?.inviter
const invitee = props.notification?.notifiable?.invitee
const inviterFullName = `${inviter.name} ${inviter.surname}`
const inviteeFullName = `${invitee.name} ${invitee.surname}`
const projectName = props.notification?.notifiable?.project?.name


const accept = () => {
  return props.notification?.notifiable.is_accepted === 1 ? 'принял' : 'отклонил'
}

const message = computed(() => {
  if (eventType === 'created') {
    return `Пользователь ${inviterFullName} приглашает вас в проект ${projectName}`
  } else {
    return `Пользователь ${inviteeFullName} ${accept()} ваше приглашение в проект ${projectName}`
  }
})

defineEmits(['accept', 'decline', 'delete'])

</script>

<template>
  <BaseNotificationLayout>
    <template #message>
      {{ message }}
    </template>
    <template #buttons>
      <div
          v-if="eventType === 'created'"
          class="buttons"
      >
        <BaseButton
            text="Принять"
            @click="$emit('accept', notification)"
        />
        <BaseButton
            text="Отклонить"
            @click="$emit('decline', notification)"
        />
      </div>
      <div
          v-else
          class="buttons"
      >
        <BaseButton
            text="Ok"
            @click="$emit('delete', notification)"
        />
      </div>
    </template>
  </BaseNotificationLayout>
</template>

<style scoped>
.base-button {
  background-color: #ffd0e0;
  color: #4b2c42;
}
</style>