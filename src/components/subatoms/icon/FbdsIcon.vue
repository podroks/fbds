<script setup lang="ts">
import { ref } from 'vue';

import type { Icon } from '@/constants/icon';

withDefaults(
  defineProps<{
    icon: Icon;
    size?: number;
    innerClass?: string;
  }>(),
  {
    size: 5,
    innerClass: '',
  },
);

const el = ref<HTMLDivElement | null>(null);

defineExpose({ el });
</script>

<template>
  <div
    ref="el"
    class="flex items-center justify-center"
    :class="`size-${size}`"
  >
    <component
      :is="icon"
      class="size-full"
      :class="innerClass"
    />
  </div>
</template>
