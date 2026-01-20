<script setup>
import BaseNotificationLayout from "./BaseNotificationLayout.vue";
import BaseButton from "../structure/BaseButton.vue";
import {defineEmits, defineProps} from 'vue'
import VueSpinner from "../structure/VueSpinner.vue";

const props = defineProps({
  notification: {
    type: Object,
    default: {}
  },
  isDeleting: {
    type: Boolean,
    default: false
  }
})

const taskName = props.notification?.notifiable?.name
const timeLeft = props.notification?.event_type

defineEmits(['view', 'delete'])

</script>

<template>
  <BaseNotificationLayout>
    <template #message>
      До окончания срока выполнения задачи "{{ taskName }}" менее {{ timeLeft }} часов.
    </template>
    <template #buttons>
      <VueSpinner v-if="props.isDeleting"/>
      <div class="buttons" v-else>
        <BaseButton
            text="Просмотреть"
            @click="$emit('view', notification)"
        />
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