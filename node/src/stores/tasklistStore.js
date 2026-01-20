import {defineStore} from 'pinia'
import axios from "../api/axios.js"
import {useProjectStore} from "./projectStore.js";

export const useTasklistStore = defineStore('tasklistStore', {
    state() {
        return {
            tasklists: [],
            newTasklist: {
                name: '',
                description: ''
            },
            status: 'idle', // idle, loading, success, error
            createTasklistStatus: 'idle', // idle, loading, success, error
            changeTasklistStatus: 'idle', // idle, loading, success, error
        }
    },
    actions: {
        async getTasklists() {
            this.status = 'loading'
            try {
                const response = await axios.get('/api/project/' + this.currentProject + '/tasklists')
                this.tasklists = response.data.tasklists
                this.status = 'success'
                console.log(response.data)
            } catch (e) {
                this.status = 'error'
                console.log(e.response?.data?.message)
            }
        },
        async createTasklist(newTasklistData) {
            this.createTasklistStatus = 'loading'
            if (newTasklistData.name?.length > 0) {
                try {
                    const targetUrl = `/api/project/${this.currentProject}/tasklists`

                    const response = await axios.post(targetUrl, newTasklistData)

                    if (response.data.success) {
                        this.tasklists.push(response.data.tasklist)
                        this.createTasklistStatus = 'success'
                        console.log(response.data)
                        return true
                    } else {
                        this.createTasklistStatus = 'error'
                        console.log(response.data)
                        return false
                    }
                } catch (e) {
                    this.createTasklistStatus = 'error'
                    console.log(e.response?.data?.message)
                    return false
                }
            } else {
                console.log(newTasklistData)
            }
        },
        async redactTasklist(newTasklist) {
            this.changeTasklistStatus = 'loading'
            const tasklistId = newTasklist.id
            const tasklistKey = Object.keys(this.tasklists).find(key => this.tasklists[key].id === tasklistId)
            const currentTasklist = this.tasklists[tasklistKey]

            if (newTasklist.name === currentTasklist.name) {
                this.changeTasklistStatus = 'error'
                return false

            } else {
                const newTasklistData = {
                    name: newTasklist.name,
                    oldName: currentTasklist.name
                }

                try {
                    const targetUrl = `/api/project/${this.currentProject}/tasklists/${tasklistId}`
                    const response = await axios.put(targetUrl, newTasklistData)

                    if (response.data.success) {
                        this.tasklists[tasklistKey] = newTasklist
                        this.changeTasklistStatus = 'success'
                        console.log(response.data)
                        return true
                    } else {
                        this.changeTasklistStatus = 'error'
                        return false
                    }
                } catch (e) {
                    this.changeTasklistStatus = 'error'
                    console.log(e.response?.data?.message)
                    return false
                }
            }
        },

        async deleteTasklist(tasklistId) {
            this.changeTasklistStatus = 'loading'

            try {
                const targetUrl = `/api/project/${this.currentProject}/tasklists/${tasklistId}`

                const response = await axios.delete(targetUrl)

                if (response.data.success) {
                    console.log(response.data.message)
                    const tasklistKey = Object.keys(this.tasklists).find(key => this.tasklists[key].id === tasklistId)
                    this.tasklists.splice(tasklistKey, 1)
                    this.changeTasklistStatus = 'success'

                    return true
                } else {
                    console.log(response.data)
                    this.changeTasklistStatus = 'error'
                    return false
                }
            } catch (e) {
                console.log(e.response.data.message)
                this.changeTasklistStatus = 'error'
                return false
            }
        },
        clear() {
            this.tasklists = []
                this.newTasklist = {
                    name: '',
                    description: ''
                }
            this.status = 'idle'
            this.createTasklistStatus = 'idle'
            this.changeTasklistStatus = 'idle'
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
        }
    }
})