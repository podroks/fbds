<script setup lang="ts">
const toto = 'tutu';
</script>

<template>
  <button class="bg-blue-400">
    <slot>Button {{ toto }}</slot>
  </button>
</template>
