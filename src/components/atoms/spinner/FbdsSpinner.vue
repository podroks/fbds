<script setup lang="ts">
import { computed } from 'vue';

import { SpinnerSize } from '@/constants/atoms/fbds-spinner';
import { Icon } from '@/constants/icon';

import FbdsIcon from '@/components/subatoms/icon/FbdsIcon.vue';

const props = withDefaults(
  defineProps<{
    size?: SpinnerSize;
  }>(),
  {
    size: SpinnerSize.Md,
  },
);

const sizeMap: Record<SpinnerSize, number> = { sm: 5, md: 8, lg: 11 };

const iconSize = computed(() => sizeMap[props.size]);
</script>

<template>
  <FbdsIcon
    :icon="Icon.Spinner"
    :size="iconSize"
    inner-class="animate-spin"
  />
</template>
