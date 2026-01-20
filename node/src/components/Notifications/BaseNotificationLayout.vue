<script setup>

</script>

<template>
  <div class="notification">
    <p>
      <slot name="message"/>
    </p>
    <div>
      <slot name="buttons"/>
    </div>
  </div>
</template>

<style>
.notification {
  background: #f06292;
  color: white;
  padding: 25px;
  margin-bottom: 15px;
  border-radius: 10px;
  font-weight: 600;
  box-shadow: 2px 2px 10px rgba(240, 98, 146, 0.3);
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 35px;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>