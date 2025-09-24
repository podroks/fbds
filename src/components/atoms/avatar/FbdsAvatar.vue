<script setup lang="ts">
import { computed, ref } from 'vue';

import type { TooltipPropsOptionnal } from '@/constants/atoms/fbds-tooltip';
import { OnTheme, Theme } from '@/constants/theme';

import { getContrastOfHex } from '@/utils/contrast.util';

import FbdsTooltip from '@/components/atoms/tooltip/FbdsTooltip.vue';

const props = withDefaults(
  defineProps<{
    fallback: string;
    theme?: Exclude<Theme, 'base-disable'>;
    color?: string;
    src?: string;
    alt?: string;
    tooltip?: string;
    tooltipOptions?: TooltipPropsOptionnal;
  }>(),
  {
    theme: Theme.BasePrimary,
    color: undefined,
    src: undefined,
    alt: undefined,
    tooltip: undefined,
    tooltipOptions: () => ({}),
  },
);

const trigger = ref<HTMLElement | null>(null);

const bgClass = computed<string>(() => {
  return props.color ? '' : `bg-fbds-${props.theme}`;
});

const textClass = computed<string>(() => {
  return props.color ? '' : `text-fbds-${OnTheme[props.theme]}`;
});

const bgStyle = computed<string>(() => {
  return props.color ? `background-color: ${props.color};` : '';
});

const textStyle = computed<string>(() => {
  if (props.color) {
    const contrast = getContrastOfHex(props.color);
    return `color: ${contrast < 128 ? '#fff' : '#000'};`;
  }
  return '';
});
</script>

<template>
  <div
    ref="trigger"
    class="size-8 rounded-full flex items-center justify-center"
    :class="[bgClass, textClass]"
    :style="[bgStyle, textStyle]"
  >
    <img
      v-if="src"
      class="size-[inherit] rounded-[inherit]"
      :src
      :alt
    />
    <span
      v-else
      class="fbds-font-label-large-prominent"
    >
      {{ fallback }}
    </span>
    <FbdsTooltip
      v-if="tooltip"
      :trigger
      v-bind="tooltipOptions"
    >
      {{ tooltip }}
    </FbdsTooltip>
  </div>
</template>
