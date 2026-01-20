import {defineStore} from 'pinia'
import axios from "../api/axios.js"

export const useAuthStore = defineStore('authStore', {
    state() {
        return {
            user: null,
            isLoggedIn: false,
            isAuthResolved: false,
            status: 'idle' // idle, loading, success, error
        }
    },
    actions: {
        async login(userData) {
            console.log(userData)
            this.status = 'loading'
            try {
                await axios.get('/sanctum/csrf-cookie')
                const response = await axios.post('/authorize', userData)

                if (response.data.success) {
                    this.user = response.data.user
                    this.isLoggedIn = true
                    this.status = 'success'
                    this.router.push('/cabinet')
                } else {
                    this.status = 'error'
                    console.log(response.data)
                }
            } catch(e) {
                this.status = 'error'
                console.log(e.response.data)
            }
        },

        async logout() {
            this.status = 'loading'
            try {
                const response = await axios.get('/logout')
                this.isLoggedIn = false
                this.router.push('/login')
                console.log(response.data)
                this.status = 'success'
            } catch (e) {
                console.log(e.message)
                this.status = 'error'
            }
        },

        isAuth() {
            return !!this.isLoggedIn
        },

        async restoreAuth() {
            this.status = 'loading'
            try {
                const { data } = await axios.get('api/user')
                this.user = data
                this.isLoggedIn = true
                this.status = 'success'
            } catch {
                this.user = null
                this.isLoggedIn = false
                this.status = 'error'
            }
        }
    }
})