<script setup>
import {computed, defineProps } from 'vue';

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: 'Click me, please'
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'm'
  }
})

const rootClasses = computed(() => {
  return {
    'is-disabled': props.isDisabled,
    [`base-button_size--${props.size}`]: true
  }
})
</script>

<template>
  <button
      class="base-button"
      :class="rootClasses"
      :disabled="isDisabled"
  >
    <VueSpinner v-if="loading"/>
    <span v-else>
      {{ text }}
    </span>
  </button>

</template>

<style lang=scss>
.base-button {
  background: #f06292;
  color: white;
  cursor: pointer;
  font-family: "Comic Neue", cursive, Arial, sans-serif;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      opacity: 0.5;
    }
  }

  &:hover {
    background-color: #d83979;
    transform: scale(1.05);
  }

}

.base-button_size--s {

}

.base-button_size--m {
  font-weight: 600;
  box-shadow: rgba(216, 57, 121, 0.6) 0px 3px 6px;
  border-radius: 20px;
  padding: 8px 15px;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
}

.base-button_size--l {
  font-weight: 700;
  box-shadow: 0 6px 10px rgba(240, 98, 146, 0.6);
  border-radius: 40px;
  padding: 18px 50px;
  border: none;
  font-size: 1.3em;
}


</style>