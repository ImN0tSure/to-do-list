<script setup>
import {defineProps, computed, defineEmits, ref} from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: 'Название поля'
  },
  withLabel: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    default: 'name'
  },
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Здесь могла быть ваша реклама.'
  }
})
const emit =defineEmits(['update:modelValue'])
const inputValueChange = (value, name) => {
  emit('update:modelValue', value, name)
}
</script>

<template>
  <div class="input-wrap">
    <label v-if="withLabel" :for="name">{{ label }}</label>
    <textarea
        :value="modelValue"
        :id="name"
        :name="name"
        :placeholder="placeholder"
        @input="inputValueChange($event.target.value, name)"
    ></textarea>
  </div>

</template>

<style scoped>
label {
  font-size: 1.1em;
  color: #7a2350;
  font-weight: 600;
  margin-bottom: 10px;
  display: block;
}

textarea {
  resize: vertical;
  height: 150px;
  width: 100%;
  font-size: 1rem;
  color: rgb(122, 35, 80);
  padding: 12px 18px;
  border-radius: 20px;
  border: 2px solid #f06292;
  border-image: initial;
  transition: border-color 0.3s;
}

.input-wrap {
  margin-bottom: 20px;
}
</style>