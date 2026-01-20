<script setup>
import {defineEmits, defineProps, ref} from 'vue'
import EditIcon from "./EditIcon.vue";
import ConfirmIcon from "./ConfirmIcon.vue";
import BaseSelectInputOption from "./BaseSelectInputOption.vue";

const props = defineProps({
  label: {
    type: [String, Number],
    default: 'Название поля'
  },
  withLabel: {
    type: Boolean,
    default: false
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
  withNullable: {
    type: Boolean,
    default: true
  }
})

const currentValue = defineModel()

</script>

<template>
  <div class="input-wrap">
    <label :for="name" v-if="withLabel">
      <span>{{ label }}</span>
    </label>
    <select
        class="input-enabled"
        :name="name"
        :id="name"
        v-model="currentValue"
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
  display: block;
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