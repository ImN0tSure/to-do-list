import {createRouter, createWebHistory} from 'vue-router'

import HelloPage from "../pages/HelloPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import {useAuthStore} from "../stores/authStore.js";
import RegistrationPage from "../pages/RegistrationPage.vue";
import UserInfoPage from "../pages/UserInfoPage.vue";
import ProjectPage from "../pages/ProjectPage.vue";
import CabinetLayout from "../layouts/CabinetLayout.vue";
import UserCabinetPage from "../pages/UserCabinetPage.vue";
import {useProjectStore} from "../stores/projectStore.js";
import TaskPage from "../pages/TaskPage.vue";
import CreateTaskPage from "../pages/CreateTaskPage.vue";
import CreateProjectPage from "../pages/CreateProjectPage.vue";
import NotificationPage from "../pages/NotificationPage.vue";
import ProfilePage from "../pages/ProfilePage.vue";


const routes = [
    {
        path: '/',
        name: 'home',
        component: HelloPage
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage
    },
    {
        path: '/cabinet',
        component: CabinetLayout,
        children: [
            {
                path: '',
                name: 'cabinet',
                component: UserCabinetPage
            },
            {
                path: 'project/:url',
                name: 'project',
                component: ProjectPage,
                beforeEnter: (to) => {
                    const projectStore = useProjectStore()

                    if (!projectStore.currentProject || projectStore.currentProject !== to.params.url) {
                        projectStore.currentProject = to.params.url
                    }
                }
            },
            {
                path: 'project/create',
                name: 'project.create',
                component: CreateProjectPage
            },
            {
                path: 'project/:url/tasks/:taskId',
                name: 'project.task',
                component: TaskPage
            },
            {
                path: 'project/:url/tasks/create',
                name: 'project.task.create',
                component: CreateTaskPage
            },
            {
                path: 'notifications',
                name: 'notifications',
                component: NotificationPage
            },
            {
                path: 'profile',
                name: 'profile',
                component: ProfilePage
            }
        ]
    },
    {
        path: '/registration',
        name: 'registration',
        component: RegistrationPage
    },
    {
        path: '/user-info',
        name: 'userInfo',
        component: UserInfoPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

function isToGuestPage(pageName) {
    const guestPages = [
        'home',
        'login',
        'registration',
        'userInfo'
    ]

    return guestPages.includes(pageName)
}


router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore()

    if (authStore.status !== 'success') {
        await authStore.restoreAuth()
    }

    if (!authStore.isAuth() && !isToGuestPage(to.name)) {
        next({name: 'login'})
    } else if (authStore.isAuth() && isToGuestPage(to.name)) {
        next({name: 'cabinet'})
    } else {
        next()
    }
})

export default router
