<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';

import type { TooltipPropsOptionnal } from '@/constants/atoms/fbds-tooltip';
import { OnTheme, Theme } from '@/constants/theme';

import FbdsTooltip from '@/components/atoms/tooltip/FbdsTooltip.vue';

const props = withDefaults(
  defineProps<{
    value: number;
    max?: number;
    pined?: boolean;
    theme?: Exclude<Theme, 'base-disable'>;
    tooltip?: string;
    tooltipOptions?: TooltipPropsOptionnal;
  }>(),
  {
    max: 99,
    pined: false,
    theme: Theme.BasePrimary,
    tooltip: undefined,
    tooltipOptions: () => ({}),
  },
);

const trigger = useTemplateRef<HTMLDivElement | HTMLButtonElement>('trigger');

const bgClass = computed<`bg-fbds-${Theme}` | 'bg-transparent'>(() => {
  return `bg-fbds-${props.theme}`;
});

const textClass = computed<`text-fbds-${OnTheme}`>(() => {
  return `text-fbds-${OnTheme[props.theme]}`;
});

const label = computed(() => (props.value > props.max ? `+${props.max}` : `${Math.max(0, props.value)}`));
</script>

<template>
  <div
    ref="trigger"
    class="rounded-full flex justify-center"
    :class="[bgClass, textClass, pined ? 'size-2' : 'w-fit min-w-6 p-1 fbds-font-label-medium indent-[0.5px]']"
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
