<script setup>
import {useAuthStore} from "../../../stores/authStore.js";
import {computed} from 'vue'
import VueSpinner from "../VueSpinner.vue";

const authStore = useAuthStore()

const checkAuthorization = computed(() => {
  return !!authStore.isLoggedIn
})

const logout = () => {
  authStore.logout()
}
</script>

<template>
  <VueSpinner v-if="authStore.status === 'loading'"/>
  <nav v-else>
    <div v-if="checkAuthorization">
      <RouterLink class="nav-item" to="/cabinet">Главная</RouterLink>
      <RouterLink class="nav-item" to="/cabinet/notifications">Уведомления</RouterLink>
      <RouterLink class="nav-item" to="/cabinet/profile">Профиль</RouterLink>
      <span class="nav-item" @click="logout">Выйти</span>
    </div>
    <div v-else>
      <RouterLink class="nav-item" to="/">Главная</RouterLink>
      <RouterLink class="nav-item" to="/login">Войти</RouterLink>
      <RouterLink class="nav-item" to="/registration">Зарегистрироваться</RouterLink>
    </div>
  </nav>

</template>

<style scoped>
nav .nav-item {
  color: #ffe1eb;
  text-decoration: none;
  margin-left: 30px;
  font-weight: 600;
  font-size: 1.1em;
  transition: color 0.3s ease;
  position: relative;
}

nav .nav-item:hover {
  color: #fff;
  cursor:pointer;
}

nav .nav-item::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 100%;
  height: 3px;
  background: #ffd0e0;
  border-radius: 4px;
  transform: scaleX(0);
  transition: transform 0.3s ease;
  transform-origin: right;
}

nav .nav-item:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
</style>