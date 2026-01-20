<script setup>
import {defineProps, computed, defineEmits} from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'text'
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
    default:
        'Здесь могла быть ваша реклама.'
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  withLabel: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'l'
  }
})

const emit =defineEmits(['update:modelValue'])

const inputValueChange = (value, name) => {
  emit('update:modelValue', value, name)
}

const rootClasses = computed(() => {
  return [`size-${props.size}`]
})

</script>

<template>
  <div class="input-wrap">
    <label v-if="withLabel" :for="name">{{ label }}</label>
    <input
        class="base-input"
        :class="rootClasses"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="isDisabled"
        :id="name"
        @input="inputValueChange($event.target.value, name)"
    />
  </div>

</template>

<style lang=scss scoped>
.base-input {
  width: 100%;
  border: 2px solid #f06292;
  border-radius: 30px;
  color: #4b2c42;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(240, 98, 146, 0.3);
}
.input-wrap {
  margin-bottom: 20px;
}
label {
  font-size: 1.1em;
  color: #7a2350;
  font-weight: 600;
  margin-bottom: 10px;
  display: block;
}

.size {

  &-l {
    padding: 16px;
    font-size: 1.1em;
  }

  &-s {
    padding: 10px 12px;
    font-size: 1em;
  }

}


</style>