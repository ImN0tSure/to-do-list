<script setup>
import {defineProps, computed, defineEmits, ref} from 'vue'
import EditIcon from "./EditIcon.vue";
import ConfirmIcon from "./ConfirmIcon.vue";

const props = defineProps({
  label: {
    type: String,
    default: 'Название поля'
  },
  name: {
    type: String,
    default: 'name'
  },
  modelValue: {
    type: String,
    default: 'Здесь могла быть ваша реклама.'
  },
  placeholder: {
    type: String,
    default:
        'Здесь могла быть ваша реклама.'
  },
  isDisabled: {
    type: Boolean,
    default: true
  },
  isEditable: {
    type: Boolean,
    default: true
  }
})

const currentStation = ref(props.isDisabled)
const enableEdit = () => {
  currentStation.value = false
}

const disableEdit = () => {
  currentStation.value = true
}

const emit =defineEmits(['update:modelValue'])

const inputValueChange = (value, name) => {
  emit('update:modelValue', value, name)
}


</script>

<template>
  <div class="input-wrap">
    <label :for="name">
      <span>{{ label }}</span>
    </label>
    <EditIcon
        size="16"
        @click="enableEdit"
        v-if="currentStation && isEditable"
    />
    <ConfirmIcon
        size="16"
        @click="disableEdit"
        v-else-if="!currentStation && isEditable"
    />
    <div
        class="input-disabled"
        v-if="currentStation"
    >
      {{ modelValue }}
    </div>
    <textarea
        :value="modelValue"
        :id="name"
        :name="name"
        :placeholder="placeholder"
        @input="inputValueChange($event.target.value, name)"
        v-else
    ></textarea>
  </div>

</template>

<style scoped>
label {
  font-size: 1.1em;
  color: #7a2350;
  font-weight: 600;
  margin-bottom: 10px;
}
textarea {
  resize: vertical;
  height: 150px;
  width: 100%;
  font-size: 1em;
  color: rgb(122, 35, 80);
  padding: 12px 18px;
  border-radius: 20px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(216, 57, 121);
  border-image: initial;
  background: rgb(255, 240, 246);
  transition: border-color 0.3s;
}
.input-wrap {
  margin-bottom: 20px;
}

.input-disabled {
  padding: 16px;
  font-size: 1.1em;
}
</style>