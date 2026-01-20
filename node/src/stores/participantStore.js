import {defineStore} from 'pinia'
import axios from "../api/axios.js"
import {useProjectStore} from "./projectStore.js";
import {useAuthStore} from "./authStore.js";

export const useParticipantStore = defineStore('participantStore', {
    state() {
        return {
            participants: {},
            selectedParticipant: {},
            participantsLoading: 'idle', // idle, loading, success, error
            participantLoading: 'idle', // idle, loading, success, error
            excludeParticipantLoading: 'idle' // idle, loading, success, error
        }
    },
    actions: {
        async getParticipants() {
            this.participantsLoading = 'loading'
            try {
                const response = await axios.get('/api/project/' + this.currentProject + '/participants')
                this.participants = response.data.participants
                this.participantsLoading = 'success'
            } catch (e) {
                this.participantsLoading = 'error'
                console.log(e.response?.data?.message)
            }
        },
        async getParticipant(userId) {
            this.participantLoading = 'loading'

            const targetUrl = `/api/project/${this.currentProject}/participants/${userId}`

            try {
                const response = await axios.get(targetUrl)

                if (response.data.success) {
                    this.selectedParticipant = response.data.participant
                    this.participantLoading = 'success'
                } else {
                    this.participantLoading = 'error'
                    console.log(response.data.message)
                }
            } catch (e) {
                this.participantLoading = 'error'
                console.log(e.response?.data?.message)
            }
        },
        async addParticipant(newParticipantEmail) {
            this.participantLoading = 'loading'

            try {
                const targetUrl = `/api/project/${this.currentProject}/invite-participant`

                const newParticipantData = {
                    email: newParticipantEmail,
                    project_url: this.currentProject
                }

                const response = await axios.post(targetUrl, newParticipantData)

                if (response.data.success) {
                    console.log(response.data)
                    this.participantLoading = 'success'

                    return true
                } else {
                    this.participantLoading = 'error'
                    return false
                }
            } catch (e) {
                console.log(e.response?.data?.message)
                this.participantLoading = 'error'
                return false
            }
        },
        async excludeParticipants(userIds) {
            this.excludeParticipantLoading = 'loading'

            try {
                const targetUrl = `/api/project/${this.currentProject}/participants/exclude`
                const data = {
                    ids: userIds
                }

                const response = await axios.put(targetUrl, data)

                if (response.data.success) {
                    this.excludeParticipantLoading = 'success'
                    console.log(response.data)
                    return true
                } else {
                    this.excludeParticipantLoading = 'error'
                    console.log(response.data)
                    return false
                }

            } catch (e) {
                this.excludeParticipantLoading = 'error'
                console.log(e.response.data.message)
                return false
            }
        },
        removeParticipantsFromStore(userIds) {
            console.log(userIds)
            userIds.forEach((id) => {
                this.participants = this.participants.filter(participant => participant.user_id !== id)
            })
        },
        clear() {
            this.participants = {}
            this.selectedParticipant = {}
            this.participantsLoading = 'idle'
            this.participantLoading = 'idle'
            this.excludeParticipantLoading = 'idle'
        }
    },
    getters: {
        currentProject() {
            const projectStore = useProjectStore()

            if (projectStore.currentProject.length > 0) {
                return projectStore.currentProject
            } else {
                return ''
            }
        },
        currentUserParticipant() {
            const authStore = useAuthStore()
            if(this.participants.length > 0) {
                return this.participants?.filter(p => p.user_id === authStore.user.id)
            }
        }
    }
})