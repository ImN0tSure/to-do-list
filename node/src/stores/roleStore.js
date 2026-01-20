import {defineStore} from 'pinia'

export const useRoleStore = defineStore('roleStore', {
    state() {
        return {
            currentRole: '',
            currentPermissions: []
        }
    },
    actions: {
        set(role, permissions) {
            this.currentRole = role
            this.currentPermissions = permissions
        },
        unset() {
            this.currentRole = ''
            this.currentPermissions = []
        }
    },
    getters: {
        can: (state) => (permission) => {
            return (
                state.currentPermissions.includes('*') ||
                state.currentPermissions.includes(permission)
            )
        }
    }
})