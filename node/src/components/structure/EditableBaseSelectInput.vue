<script setup>
import {defineEmits, defineProps, ref} from 'vue'
import EditIcon from "./EditIcon.vue";
import ConfirmIcon from "./ConfirmIcon.vue";
import BaseSelectInputOption from "./BaseSelectInputOption.vue";
import VueSpinner from "./VueSpinner.vue";

const props = defineProps({
  label: {
    type: [String, Number],
    default: 'Название поля'
  },
  name: {
    type: [String, Number],
    default: 'name'
  },
  options: {
    type: Object,
    default: {
      value1: 'text1',
      value2: 'text2',
      value3: 'text3',
    }
  },
  isDisabled: {
    type: Boolean,
    default: true
  },
  isEditable: {
    type: Boolean,
    default: true
  },
  withNullable: {
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

const currentValue = defineModel()

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
    >{{ options[currentValue] }}
    </div>
    <select
        class="input-enabled"
        :name="name"
        :id="name"
        v-model="currentValue"
        v-else
    >
      <BaseSelectInputOption v-if="withNullable"/>
      <BaseSelectInputOption
          v-for="(text, value) in options"
          :key="value"
          :optionValue="value"
          :optionText="text"
      />
    </select>
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