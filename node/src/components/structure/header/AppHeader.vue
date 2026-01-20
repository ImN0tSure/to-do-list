<script setup>

import HeaderLogo from "./HeaderLogo.vue";
import HeaderClock from "./HeaderClock.vue";
import HeaderNav from "./HeaderNav.vue";
</script>

<template>
  <header>
    <HeaderLogo/>
    <HeaderClock/>
    <HeaderNav/>
  </header>
</template>

<style scoped>
  header {
    background: #f06292;
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 8px rgba(240, 98, 146, 0.5);
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
    color: white;
    user-select: none;
    position: relative;
  }
</style>