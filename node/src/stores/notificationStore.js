import {defineStore} from 'pinia'
import axios from "../api/axios.js"

export const useNotificationStore = defineStore('notificationStore', {
    state() {
        return {
            notifications: [],
            getNotificationsStatus: 'idle',  // idle, loading, success, error
        }
    },
    actions: {
        async getNotifications() {
            this.getNotificationsStatus = 'loading'

            try {
                const targetUrl = 'api/notifications'

                const response = await axios.get(targetUrl)

                if (response.data.success) {
                    this.getNotificationsStatus = 'success'

                    this.notifications = response.data.notifications
                    console.log(response.data)
                } else {
                    this.getNotificationsStatus = 'error'
                    console.log(response.data)
                }
            } catch (e) {
                this.getNotificationsStatus = 'error'
                console.log(e?.response?.data?.message)
            }
        },
        async deleteNotification(notificationId) {
            const backup = [...this.notifications]
            this.notifications = this.notifications.filter(notification => notification.id !== notificationId)

            try {
                const response = await axios.delete(`api/notifications/${notificationId}`)

                if (response.data.success) {
                    console.log(response.data.message)
                } else {
                    this.notifications = backup
                    console.log(response.data.message)
                }
            } catch (e) {
                this.notifications = backup
                console.log(e?.response?.data?.message)
            }
        },
        async respondToInvitation(notificationId, notifiableId, isAccepted) {
            const backup = [...this.notifications]
            this.notifications = this.notifications.filter(notification => notification.id !== notificationId)

            try {
                const targetUrl = `/api/invitation/response`
                const response = await axios.put(
                    targetUrl,
                    {
                        notifiable_id: notifiableId,
                        is_accepted: isAccepted
                    }
                )

                if (response.data.success) {
                    console.log(response.data)
                } else {
                    this.notifications = backup
                    console.log(response.data)
                }
            } catch (e) {
                this.notifications = backup
                console.log(e.response?.data?.message)
            }
        }
    },
    getters: {
        deadlines: (state) => {
            return state.notifications.filter(notification => notification?.event === 'deadline')
        },
        invitations: (state) => {
            return state.notifications.filter(notification => notification?.event === 'invitation')
        },
        others: (state) => {
            return state.notifications.filter(notification => notification?.event === 'other')
        }
    }
})