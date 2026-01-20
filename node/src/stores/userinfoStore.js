import {defineStore} from 'pinia'
import axios from "../api/axios.js";

export const useUserinfoStore = defineStore('userinfoStore', {
    state() {
        return {
            userInfo: {},
            getUserStatus: 'idle',  // idle, loading, success, error
            updateUserStatus: 'idle',  // idle, loading, success, error
        }
    },
    actions: {
        async getUserInfo() {
            this.getUserStatus = 'loading'

            try {
                const response = await axios.get('/api/userinfo')

                if (response.data.success) {
                    this.getUserStatus = 'success'
                    this.userInfo = response.data.userInfo
                    console.log(response.data)
                    return true
                } else {
                    this.getUserStatus = 'error'
                    console.log(response.data)
                    return false
                }
            } catch (e) {
                this.getUserStatus = 'error'
                console.log(e.response?.data)
                return false
            }
        },
        async updateUserInfo(newUserInfo) {
            this.updateUserStatus = 'loading'

            const formData = new FormData()

            for (const key in newUserInfo) {
                formData.append(key, newUserInfo[key])
            }

            formData.append('_method', 'PUT')

            try {
                const response = await axios.post('/api/userinfo', formData)

                if (response.data.success) {
                    this.updateUserStatus = 'success'
                    this.userInfo = response.data.userInfo
                    console.log(response.data.userInfo)
                    return true
                } else {
                    this.updateUserStatus = 'error'
                    console.log(response.data)
                    return false
                }
            } catch (e) {
                this.updateUserStatus = 'error'
                console.log(e?.response?.data?.message)
                return false
            }
        }
    }
})