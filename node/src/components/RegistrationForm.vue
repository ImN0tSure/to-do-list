<script setup>
import BaseInput from "./structure/BaseInput.vue";
import {computed, ref} from "vue";
import {useRegistrationStore} from "../stores/registrationStore.js";

const registrationStore = useRegistrationStore()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const sendForm = () => {
  const userData = {
    email: email.value,
    password: password.value,
    confirm_password: confirmPassword.value
  }

  tmpSaveUser(userData)

}

const tmpSaveUser = (userData) => {
  registrationStore.tmpSaveUser(userData)
}

const isButtonDisabled = computed(() => {
  const emailLength = email.value.length
  const passwordLength = password.value.length
  const confirmPasswordLength = confirmPassword.value.length

  if(!!emailLength && !!passwordLength && !!confirmPasswordLength) {
    return !isPasswordsEqual.value;
  } else {
    return true
  }
})

const isPasswordsEqual = computed(() => {
    return password.value === confirmPassword.value
})

</script>

<template>
  <form>
    <BaseInput
        type="email"
        name="email"
        placeholder="Электронная почта"
        v-model="email"
    />
    <BaseInput
        type="password"
        name="password"
        placeholder="Пароль"
        v-model="password"
    />
    <BaseInput
        type="password"
        name="password-confirm"
        placeholder="Подтвердите пароль"
        v-model="confirmPassword"
    />
    <p v-if="!isPasswordsEqual">
      Пароли не совпадают
    </p>
    <BaseButton
        size="l"
        text="Зарегистрироваться"
        @click.prevent.stop="sendForm"
        :is-disabled="isButtonDisabled"
    />

  </form>
</template>

<style scoped>

</style>