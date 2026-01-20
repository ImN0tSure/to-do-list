<script setup>
import {defineProps, computed, defineEmits, ref} from 'vue'
import EditIcon from "./EditIcon.vue";
import ConfirmIcon from "./ConfirmIcon.vue";

const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
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
    default: false
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

const setCorrectTimeFormat = (time) => {
  const [hours, minutes] = time.split(':')
  return `${hours}:${minutes}`
}

const inputValueChange = (value, name) => {
  if(props.type === 'time') {
    value = setCorrectTimeFormat(value)
  }
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
    <input
        class="input-enabled"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :value="modelValue"
        :id="name"
        @input="inputValueChange($event.target.value, name)"
        v-else
    />
  </div>

</template>

<style scoped>
label {
  font-size: 1.1em;
  color: #7a2350;
  font-weight: 600;
  margin-bottom: 10px;
}
.input-enabled {
  width: 100%;
  padding: 16px;
  font-size: 1.1em;
  border: 2px solid #f06292;
  border-radius: 30px;
  color: #4b2c42;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(240, 98, 146, 0.3);
}
.input-wrap {
  margin-bottom: 20px;
}

.input-disabled {
  padding: 16px;
  font-size: 1.1em;
}
</style>