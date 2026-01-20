<script setup>
import {ref, onMounted} from "vue";
import {useNotificationStore} from "../stores/notificationStore.js";
import BaseNotificatioinLayout from "../components/Notifications/BaseNotificationLayout.vue";
import DeadlineNotification from "../components/Notifications/DeadlineNotification.vue";
import router from "../router/index.js";
import VueSpinner from "../components/structure/VueSpinner.vue";
import InvitationNotification from "../components/Notifications/InvitationNotification.vue";
import {useProjectStore} from "../stores/projectStore.js";

const currentTab = ref('deadlines')
const notificationStore = useNotificationStore()
const projectStore = useProjectStore()

const switchTab = (tab) => {
  currentTab.value = tab
}

onMounted(async () => {
  await notificationStore.getNotifications()
})

const viewTask = (notification) => {
  const projectUrl = notification?.notifiable?.project?.url
  const taskId = notification?.notifiable?.id

  const targetUrl = `/cabinet/project/${projectUrl}/tasks/${taskId}`
  router.push(targetUrl)
}

const acceptInvitation = async (notification) => {
  const notifiableId = notification.notifiable_id
  const notificationId = notification.id
  await notificationStore.respondToInvitation(notificationId, notifiableId, true)
  await projectStore.getProjects()
}

const declineInvitation = (notification) => {
  const notifiableId = notification.notifiable_id
  const notificationId = notification.id
  notificationStore.respondToInvitation(notificationId, notifiableId, false)
}

const deleteNotification = (notification) => {
  const notificationId = notification.id
  notificationStore.deleteNotification(notificationId)
}
</script>

<template>
  <h2 class="notes-header">Уведомления</h2>
  <div class="content-header">
    <div class="content-header__tabs">
      <div
          class="tab"
          :class="{active: currentTab === 'deadlines'}"
          @click="switchTab('deadlines')"
      >Дедлайны
      </div>
      <div
          class="tab"
          :class="{active: currentTab === 'invitations'}"
          @click="switchTab('invitations')"
      >Приглашения
      </div>
      <div
          class="tab"
          :class="{active: currentTab === 'others'}"
          @click="switchTab('others')"
      >Прочие
      </div>
    </div>
  </div>
  <VueSpinner v-if="notificationStore.getNotificationsStatus === 'loading'"/>
  <div class="tab-wrapper" v-else>
    <div v-if="currentTab === 'deadlines'">
      <DeadlineNotification
          v-for="deadline in notificationStore.deadlines"
          :key="deadline.id"
          :notification="deadline"
          @view="viewTask"
          @delete="deleteNotification"
      />
    </div>
    <div v-if="currentTab === 'invitations'">
      <InvitationNotification
        v-for="invitation in notificationStore.invitations"
        :key="invitation.id"
        :notification="invitation"
        @accept="acceptInvitation"
        @decline="declineInvitation"
        @delete="deleteNotification"
      />
    </div>
  </div>


</template>

<style lang=scss scoped>

.notes-header {
  color: #9e1b56;
  margin-bottom: 30px;
  font-size: 2em;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #d83979;

  &__tabs {
    display: flex;

    & .tab {
      padding: 10px 20px;
      cursor: pointer;
      font-weight: 600;
      color: #9e1b56;
      background: #ffd0e0;
      border: 1px solid #d83979;
      border-radius: 20px 20px 0 0;
      transition: background-color 0.3s ease;
    }

    & .active {
      background: #f06292;
      color: white;
    }

  }
}

</style>