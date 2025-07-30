<script setup lang="ts">
// No script logic needed for a basic button
</script>

<template>
  <button class="btn">
    <slot>Button</slot>
  </button>
</template>

<style scoped>
.btn {
  padding: 0.5em 1.5em;
  background-color: #1976d2;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}
.btn:hover {
  background-color: #1565c0;
}
</style>
