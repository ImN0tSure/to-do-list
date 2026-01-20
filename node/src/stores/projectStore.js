import {defineStore} from 'pinia'
import axios from "../api/axios.js"
import {useRoute} from 'vue-router'
import {useRoleStore} from "./roleStore.js";

export const useProjectStore = defineStore ('projectStore', {
    state() {
        return {
            projects: null,
            currentProject: '',
            status: 'idle', // idle, loading, success, error
            quitStatus: 'idle', // idle, loading, success, error
        }
    },
    actions: {
        async getProjects() {
            this.status = 'loading';

            try {
                const response = await axios.get('/api/project')

                if(response.data.success) {
                    this.projects = response.data.projects
                    this.status = 'success'
                }

            } catch (e) {
                this.status = 'error'
                console.log(e.response?.data?.message)
            }
        },
        async storeProject(newProject) {
            this.status = 'loading'

            try {
                const response = await axios.post('/api/project', newProject)

                if(response.data.success) {
                    await this.getProjects()
                    this.status = 'success'
                    console.log(response.data.message)
                    this.router.push('/cabinet')
                } else {
                    this.status = 'error'
                    console.log(response.data)
                }
            } catch (e) {
                this.status = 'error'
                console.log(e.response?.data?.message)
            }
        },
        async quitProject() {
            this.quitStatus = 'loading'
            try {
                const targetUrl = `/api/project/${this.currentProject}/quit`

                const response = await axios.get(targetUrl)

                if (response.data.success) {
                    this.projects = this.projects.filter(project => project.url !== this.currentProject)
                    this.currentProject = ''
                    this.quitStatus = 'success'
                    return true
                } else {
                    this.quitStatus = 'error'
                    console.log(response.data)
                    return false
                }
            } catch (e) {
                this.quitStatus = 'error'
                console.log(e.response.data.message)
                return false
            }
        },
        async getProjectRole () {
            if (this.currentProject.length < 1) {
                return false
            }

            try {
                const response = await axios.get(`/api/project/${this.currentProject}/role`)

                if (response.data.success) {
                    const roleStore = useRoleStore()
                    console.log(response.data)
                    const data = response.data
                    roleStore.set(data.role, data.permissions)
                } else {
                    console.log(response.data)
                }
            } catch (e) {
                console.log(e.response.data.message)
            }
        }
    },
    getters: {
        currentProjectKey() {
            if(this.currentProject) {
                {
                    return this.projects.findIndex(item => item.url === this.currentProject)
                }
            }
        }
    }
})