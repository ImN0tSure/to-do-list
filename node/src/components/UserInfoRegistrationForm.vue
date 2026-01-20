<script setup>
import BaseInput from "./structure/BaseInput.vue";
import {ref, computed} from 'vue'
import {useRegistrationStore} from "../stores/registrationStore.js";

const registrationStore = useRegistrationStore()

const name = ref('')
const surname = ref('')
const patronymic = ref('')
const about = ref('')
const phone = ref('')
const contactEmail = ref('')
const avatarImg = ref(null)
const previewUrl = ref('')

const acceptAvatar = (event) => {
  avatarImg.value = event.target.files[0]

  previewUrl.value = avatarImg.value ? URL.createObjectURL(avatarImg.value) : ''
}

const isRequiredInputsFilled = computed(() => {
  return !name.value.length || !surname.value.length || !contactEmail.value.length
})

const sendForm = () => {

  registrationStore.setUserInfo({
    name: name.value,
    surname: surname.value,
    patronymic: patronymic.value,
    about: about.value,
    phone: phone.value,
    contact_email: contactEmail.value
  })

  registrationStore.setAvatarImg(avatarImg.value)
  registrationStore.sendUserInfo()
}

</script>

<template>
  <form>
    <div class="avatar-wrap">
      <label for="avatar">Аватарка</label>
      <div class="avatar-placeholder" v-if="previewUrl">
        <img
            id="avatarPreview"
            class="avatar-preview"
            :src="previewUrl"
            alt="preview-avatar"
        >
      </div>
      <input
          type="file"
          id="avatarUpload"
          name="avatar_file"
          accept="image/*"
          @change="acceptAvatar"
      >
    </div>
    <div class="user-info">
      <div class="full-name">
        <div class="full-name__surname">
          <label for="surname">Фамилия*</label>
          <BaseInput
              type="text"
              name="surname"
              placeholder="Иванов"
              id="surname"
              v-model="surname"
          />
        </div>
        <div class="full-name__name">
          <label for="name">Имя*</label>
          <BaseInput
              type="text"
              name="name"
              placeholder="Иван"
              v-model="name"
          />
        </div>
        <div class="full-name__patronymic">
          <label for="patronymic">Отчество</label>
          <BaseInput
              type="text"
              name="patronymic"
              placeholder="Иванович"
              v-model="patronymic"
          />
        </div>
      </div>
      <div class="contact-info">
        <div class="contact-info__phone">
          <label for="phone">Контактный телефон</label>
          <BaseInput
              type="text"
              name="phone"
              placeholder="+375-XX-XXX-XX-XX"
              v-model="phone"
          />
        </div>
        <div class="contact-info__email">
          <label for="email">Email для связи*</label>
          <BaseInput
              type="email"
              name="contact-email"
              placeholder="work.mail@corp.com"
              v-model="contactEmail"
          />
        </div>
      </div>
    </div>
    <div class="about-info">
      <label for="about-me">О себе</label>
      <textarea
          id="about-me"
          name="about"
          placeholder="Расскажите о себе"
          style="height: 159px;"
          v-model="about"
      ></textarea>
    </div>
    <BaseButton
        size="l"
        text="Сохранить изменения"
        @click.prevent.stop="sendForm"
        :is-disabled="isRequiredInputsFilled"
    />
  </form>
</template>

<style lang=scss scoped>
input, textarea {
  width: 100%;
  padding: 12px 18px;
  margin-bottom: 20px;
  border-radius: 20px;
  border: 1px solid #d83979;
  font-size: 1em;
  color: #7a2350;
  background: #fff0f6;
  transition: border-color 0.3s ease;
}
input[type="file"] {
  padding: 0;
  border: none;
  background: transparent;
}
label {
  font-size: 1.1em;
  color: #7a2350;
  font-weight: 600;
  margin-bottom: 10px;
  display: block;
}

.avatar-wrap, label {
  text-align: left;
}

.avatar-placeholder {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #f06292;
  margin-bottom: 10px;
}
.avatar-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.full-name {
  display: flex;
  justify-content: space-between;
  gap: 20px;

  & > div {
    flex-grow: 1;
  }
}
.about-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>