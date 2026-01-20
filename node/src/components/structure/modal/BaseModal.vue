<script setup>

</script>

<template>
  <div class="modal-wrapper" @click.stop="this.$emit('close')">
    <div class="modal-content" @click.stop>
      <slot/>
    </div>
  </div>
</template>

<style scoped>
h2 {
  padding: 1rem;
}

.modal-wrapper {
  position: fixed;
  z-index: 999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .36);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  max-width: 70%;
}
</style>