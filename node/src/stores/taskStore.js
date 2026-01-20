import {defineStore} from 'pinia'
import axios from "../api/axios.js"
import {useProjectStore} from "./projectStore.js";

export const useTaskStore = defineStore('taskStore', {
    state() {
        return {
            tasks: [],
            status: 'idle', // idle, loading, success, error
            currentTask: [],
            priorities: {
                1: 'Высокий',
                2: 'Средний',
                3: 'Низкий'
            },
            inProgress: {
                0: 'Завершено',
                1: 'В процессе'
            }
        }
    },
    actions: {
        async getTasks() {
            this.status = 'loading'
            try {
                const response = await axios.get('/api/project/' + this.currentProject + '/tasks')
                this.tasks = response.data.tasks
                this.status = 'success'
                console.log(response.data)
            } catch (e) {
                this.status = 'error'
                console.log(e.response?.data?.message)
            }
        },
        async getTasksForToday() {
            this.status = 'loading'
            try {
                const response = await axios.get('/api/tasks-for-today')
                if (response.data.success) {
                    this.tasks = response.data.tasks
                    this.status = 'success'
                    console.log(response.data)
                }
            } catch (e) {
                this.status = 'error'
                console.log(e.response?.data?.message)
            }
        },
        async getTask(projectUrl, taskId) {
            this.status = 'loading'
            try {
                const response = await axios.get(`/api/project/${projectUrl}/tasks/${taskId}`)

                if (response.data.success) {
                    this.currentTask = response.data.task
                    this.status = 'success'
                    console.log(response.data)
                }
            } catch (e) {
                this.status = 'error'
                console.log(e.response?.data?.message)
            }
        },
        async saveCurrentTask() {
            this.status = 'loading'

            const projectUrl = this.currentProject
            const taskId = this.currentTask?.id
            const targetUrl = `/api/project/${projectUrl}/tasks/${taskId}`

            try {
                const response = await axios.put(targetUrl, this.currentTask)

                if (response.data.success) {
                    this.status = 'success'
                    console.log(response.data)
                } else {
                    this.status = 'error'
                    console.log(response.data)
                }
            } catch (e) {
                this.status = 'error'
                console.log(e.response?.data?.message)
            }
        },
        async storeTask(newTask) {
            this.status = 'loading'

            const projectUrl = this.currentProject
            const targetUrl = `/api/project/${projectUrl}/tasks`

            try {
                const response = await axios.post(targetUrl, newTask)

                if (response.data.success) {
                    this.status = 'success'
                    console.log(response?.data)
                    this.router.push(`/cabinet/project/${projectUrl}`)
                } else {
                    this.status = 'error'
                    console.log(response.data)
                }
            } catch (e) {
                this.status = 'error'
                console.log(e.response?.data?.message)
            }
        },
        clear() {
            this.tasks = []
            this.status = 'idle'
            this.currentTask = []
        },
        async deleteTask(taskId) {
            this.status = 'loading'

            try {
                const targetUrl = `/api/project/${this.currentProject}/tasks/${taskId}`
                const response = await axios.delete(targetUrl)

                if (response.data.success) {
                    this.currentTask = []
                    this.tasks = this.tasks.filter(task => task.id !== taskId)
                    return true
                } else {
                    this.status = 'success'
                    console.log(response.data)
                    return false
                }
            } catch (e) {
                this.status = 'error'
                console.log(e.response?.data?.message)
            }
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
        tasksByList: (state) => {
            return (listId) => state.tasks?.filter(t => t.tasklist_id === listId) || []
        }
    }
})