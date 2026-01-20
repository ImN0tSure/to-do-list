import {defineStore} from 'pinia'
import axios from "../api/axios.js"
import {useAuthStore} from "./authStore.js";

export const useRegistrationStore = defineStore('registrationStore', {
    state() {
        return {
            regToken: '',
            userInfo: {},
            avatarImg: null
        }
    },
    actions: {
        async tmpSaveUser(userData) {
            console.log(userData)
            try {
                await axios.get('/sanctum/csrf-cookie')
                const response = await axios.post('/api/tmp-save-user', userData)
                console.log(response)

                this.regToken = response.data.token
                this.router.push('/user-info')
            } catch(e) {
                console.log(e.response.data.errors)
            }
        },
        async sendUserInfo() {

            const formData = new FormData()

            for (const key in this.userInfo) {
                formData.append(key, this.userInfo[key])
            }

            if (this.avatarImg) {
                formData.append('avatar_file', this.avatarImg)
            }

            formData.append('token', this.regToken)

            try {
                await axios.get('/sanctum/csrf-cookie')
                const response = await axios.post('/api/register-user', formData, {
                    headers: {'Content-Type' : 'multipart/form-data'}
                })

                if(response.data.success) {
                    const authStore = useAuthStore()
                    authStore.user = response.data.userData
                    authStore.isLoggedIn = true
                    this.router.push('/cabinet')
                }

                console.log(response.data)
            } catch(e) {
                console.log(e.response?.message)
            }
        },
        setUserInfo(data) {
            this.userInfo = data
        },
        setAvatarImg(file) {
            this.avatarImg = file
        }
    },
    getters: {
        inProgress: (state) => !!state.regToken.length
    }
})