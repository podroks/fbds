<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';

import type { TooltipPropsOptionnal } from '@/constants/atoms/fbds-tooltip';

import FbdsTooltip from '@/components/atoms/tooltip/FbdsTooltip.vue';

const props = withDefaults(
  defineProps<{
    value: number;
    max?: number;
    pined?: boolean;
    tooltip?: string;
    tooltipOptions?: TooltipPropsOptionnal;
  }>(),
  {
    max: 99,
    pined: false,
    tooltip: undefined,
    tooltipOptions: () => ({}),
  },
);

const trigger = useTemplateRef<HTMLDivElement | HTMLButtonElement>('trigger');

const label = computed(() => (props.value > props.max ? `+${props.max}` : `${Math.max(0, props.value)}`));
</script>

<template>
  <div
    ref="trigger"
    class="rounded-full flex justify-center bg-fbds-primary text-fbds-on-primary"
    :class="pined ? 'size-2' : 'w-fit min-w-6 h-6 p-1 fbds-font-caption indent-[0.5px]'"
  >
    {{ pined ? null : label }}
    <FbdsTooltip
      v-if="tooltip"
      :trigger
      v-bind="tooltipOptions"
    >
      {{ tooltip }}
    </FbdsTooltip>
  </div>
</template>
