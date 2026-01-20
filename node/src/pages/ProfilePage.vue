<script setup>
import {useUserinfoStore} from "../stores/userinfoStore.js";
import {onMounted, ref} from "vue";
import BaseInput from "../components/structure/BaseInput.vue";
import EditableInput from "../components/structure/EditableInput.vue";
import EditableTextarea from "../components/structure/EditableTextarea.vue";
import VueSpinner from "../components/structure/VueSpinner.vue";

const userinfoStore = useUserinfoStore()
const newUserInfo = ref({})
const newAvatarPreviewUrl = ref('')
const resetUserInfo = () => {
  newUserInfo.value = {...userinfoStore.userInfo}
  newUserInfo.value.avatar_file = ''
}

onMounted(async () => {
  const result = await userinfoStore.getUserInfo()

  if (result) {
    resetUserInfo()
  }
})

const acceptAvatar = (event) => {

  newUserInfo.value.avatar_file = event?.target?.files[0]
  newAvatarPreviewUrl.value = newUserInfo.value.avatar_file ? URL.createObjectURL(newUserInfo.value.avatar_file) : ''

  if (newAvatarPreviewUrl.value.length < 1) {
    newUserInfo.value.avatar_file = ''
  }
}

const updateUserData = async () => {
  const result = await userinfoStore.updateUserInfo(newUserInfo.value)

  if (result) {
    newUserInfo.value = {...userinfoStore.userInfo}
  }
}

</script>

<template>
  <VueSpinner
    v-if="userinfoStore.getUserStatus === 'loading'"
  />
  <form v-else>
    <div class="avatar-wrap">
      <label for="avatar">Аватарка</label>
      <div class="avatar-placeholder">
        <img
            v-if="newAvatarPreviewUrl"
            id="avatarPreview"
            class="avatar-preview"
            :src="newAvatarPreviewUrl"
            alt="preview-avatar"
        >
        <img
            v-else
            id="avatarPreview"
            class="avatar-preview"
            :src="userinfoStore.userInfo.avatar_img"
            alt="preview-avatar"
        >
      </div>
      <input
          type="file"
          id="avatarUpload"
          name="avatar_img"
          accept="image/*"
          @change="acceptAvatar"
      >
    </div>
    <div class="user-info">
      <div class="full-name">
        <div class="full-name__surname">
          <EditableInput
              label="Фамилия"
              type="text"
              name="surname"
              placeholder="Иванов"
              id="surname"
              v-model="newUserInfo.surname"
              :is-editable="true"
          />
        </div>
        <div class="full-name__name">
          <EditableInput
              label="Имя"
              type="text"
              name="name"
              placeholder="Иван"
              id="name"
              v-model="newUserInfo.name"
              :is-editable="true"
          />
        </div>
        <div class="full-name__patronymic">
          <EditableInput
              label="Отчество"
              type="text"
              name="patronymic"
              placeholder="Иванович"
              id="patronymic"
              v-model="newUserInfo.patronymic"
              :is-editable="true"
          />
        </div>
      </div>
      <div class="contact-info">
        <div class="contact-info__phone">
          <EditableInput
              label="Контактный телефон"
              type="text"
              name="phone"
              placeholder="+375-XX-XXX-XX-XX"
              v-model="newUserInfo.phone"
              :is-editable="true"
          />
        </div>
        <div class="contact-info__email">
          <EditableInput
              label="Email для связи"
              type="email"
              name="contact-email"
              placeholder="work.mail@corp.com"
              v-model="newUserInfo.contact_email"
              :is-editable="true"
          />
        </div>
      </div>
    </div>
    <div class="about-info">
      <EditableTextarea
          label="О себе"
          id="about-me"
          name="about"
          placeholder="Расскажите о себе"
          style="height: 159px;"
          v-model="newUserInfo.about"
          :is-editable="true"
      />
    </div>
    <VueSpinner v-if="userinfoStore.updateUserStatus === 'loading'"/>
    <BaseButton
        v-else
        size="l"
        text="Сохранить изменения"
        @click.prevent.stop="updateUserData"
        :is-disabled="false"
    />
  </form>
</template>

<style scoped>
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
    max-width: 33%;
  }
}

.about-info {
  display: flex;
  flex-direction: column;
}
</style>