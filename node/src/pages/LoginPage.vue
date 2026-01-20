<script setup>

import SignInForm from "../components/SignInForm.vue";
</script>

<template>
  <main class="main">
    <section class="hello">
      <h1 class="hello__header">Вход</h1>
      <p class="hello__message">Введите электронную почту и пароль.</p>
      <SignInForm/>
    </section>
  </main>
</template>

<style lang=scss scoped>
.main {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  text-align: center;
}
.hello {
  background: #ffd0e0;
  padding: 50px 60px;
  max-width: 700px;
  border-radius: 50px;
  box-shadow: 0 10px 30px rgba(240, 98, 146, 0.4);
  position: relative;
  user-select: none;

  &__header {
    font-size: 3em;
    margin-bottom: 20px;
    color: #9e1b56;
    text-shadow: 2px 2px 6px #d83979;
  }

  &__message {
    font-size: 1.3em;
    margin-bottom: 40px;
    line-height: 1.5;
    color: #7a2350;
  }
}
</style>