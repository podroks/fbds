<script setup lang="ts">
import { computed, ref } from 'vue';

import type { Icon } from '@/types/icon';

const props = withDefaults(
  defineProps<{
    icon: Icon;
    size?: `size-${number}`;
  }>(),
  {
    size: 'size-5',
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
    :class="size"
  >
    <component
      :is="icon"
      v-if="isVueComponent"
      class="size-4/5!"
    />
    <font-awesome-icon
      v-else
      :icon
      class="size-4/5!"
    />
  </div>
</template>
