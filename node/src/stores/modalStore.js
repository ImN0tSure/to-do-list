import {defineStore} from 'pinia'
import axios from "../api/axios.js"

export const useModalStore = defineStore('modalStore', {
    state() {
        return {
            isOpen: false,
            type: null,
            payload: null
        }
    },
    actions: {
        open(type, payload = null) {
            this.type = type
            this.payload = payload
            this.isOpen = true
        },
        close() {
            this.isOpen = false
            this.type = null
            this.payload = null
        }
    }
})