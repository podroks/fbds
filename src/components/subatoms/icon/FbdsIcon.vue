<script setup lang="ts">
import { computed, ref } from 'vue';

import type { Icon } from '@/constants/icon';

const props = withDefaults(
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

const isVueComponent = computed<boolean>(() => {
  return typeof props.icon === 'object' && 'render' in props.icon;
});

const el = ref(null);
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
      v-if="isVueComponent"
      class="size-4/5!"
      :class="innerClass"
    />
    <font-awesome-icon
      v-else
      :icon
      class="size-4/5!"
      :class="innerClass"
    />
  </div>
</template>
