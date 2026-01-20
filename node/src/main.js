import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import VueSpinner from "./components/structure/VueSpinner.vue"
import BaseButton from "./components/structure/BaseButton.vue"
import { markRaw } from 'vue'
import {useAuthStore} from "./stores/authStore.js";



const pinia = createPinia()
const app = createApp(App)

app.component('VueSpinner', VueSpinner)
app.component('BaseButton', BaseButton)

app.use(pinia)
app.use(router)

pinia.use(({ store })=>{
    store.router = markRaw(router)
})

// const authStore = useAuthStore()
// authStore.restoreAuth()

app.mount('#app')
