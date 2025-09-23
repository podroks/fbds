<script setup lang="ts">
import { Icon } from '@/constants/icon';
import { Theme } from '@/constants/theme';

import FbdsIcon from '@/components/subatoms/icon/FbdsIcon.vue';

withDefaults(
  defineProps<{
    icon?: Icon;
    size?: number;
    theme?: Exclude<Theme, 'base-disable'>;
  }>(),
  {
    icon: () => Icon.facSpinner,
    size: 5,
    theme: Theme.BaseSurfaceInverted,
  },
);
</script>

<template>
  <FbdsIcon
    :class="`text-fbds-${theme}`"
    :icon
    :size
    inner-class="animate-spin"
  />
</template>
