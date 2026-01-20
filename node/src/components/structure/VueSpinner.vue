<template>
  <svg class="vue-spinner" :class="rootClass"  viewBox="0 0 24 24" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3a9 9 0 1 0 9 9h2A11 11 0 1 1 12 1v2Z" :fill="color" />
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 's'
    },
    color: {
      type: String,
      default: '#fff'
    }
  },

  computed: {
    rootClass() {
      return {
        [`vue-spinner_size--${this.size}`]: true
      }
    }
  }
}

</script>

<style scoped>
.vue-spinner {
  animation: spinner 0.7s infinite linear;
  transform-origin: center;
  width: 40px;
  height: 40px;
}

@keyframes spinner {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.vue-spinner_size--s {
  height: 24px;
  width: 24px;
}

.vue-spinner_size--m {
  height: 36px;
  width: 36px;
}

.vue-spinner_size--l {
  height: 48px;
  width: 48px;
}
</style>