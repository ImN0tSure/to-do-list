<script setup>

import AppHeader from "./components/structure/header/AppHeader.vue";
import AppFooter from "./components/structure/AppFooter.vue";
import {useAuthStore} from "./stores/authStore.js";

const authStore = useAuthStore()
</script>

<template>
  <AppHeader/>

  <main class="main" v-if="authStore.status === 'loading'">
    <VueSpinner size="l" color="#000"/>
  </main>
  <RouterView v-else/>

  <AppFooter/>
</template>

<style scoped>
.main {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  text-align: center;
}
</style>
