<script setup>
import BaseInput from "../components/structure/BaseInput.vue";
import UserInfoRegistrationForm from "../components/UserInfoRegistrationForm.vue";

</script>

<template>
  <main class="main">
    <section class="profile-edit">
      <h2>Заполните информацию о себе</h2>
      <UserInfoRegistrationForm />
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
.profile-edit {
  flex-grow: 1;
  background: #ffd0e0;
  border-radius: 40px;
  padding: 40px 50px;
  box-shadow: 0 6px 20px rgba(240, 98, 146, 0.35);
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

h2 {
  margin-top: 0;
  font-size: 2em;
  color: #9e1b56;
  margin-bottom: 30px;
  text-shadow: 1px 1px 3px #d83979;
  text-align: left;
}
</style>