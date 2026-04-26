<script setup lang="ts">
import { computed, ref } from 'vue';

import type { TooltipPropsOptionnal } from '@/constants/atoms/fbds-tooltip';

import { getContrastOfHex } from '@/utils/contrast.util';

import FbdsTooltip from '@/components/atoms/tooltip/FbdsTooltip.vue';

const props = withDefaults(
  defineProps<{
    fallback: string;
    color: string;
    src?: string;
    alt?: string;
    tooltip?: string;
    tooltipOptions?: TooltipPropsOptionnal;
  }>(),
  {
    src: undefined,
    alt: undefined,
    tooltip: undefined,
    tooltipOptions: () => ({}),
  },
);

const trigger = ref<HTMLElement | null>(null);

const bgStyle = computed<string>(() => `background-color: ${props.color};`);

const textStyle = computed<string>(() => {
  const contrast = getContrastOfHex(props.color);
  return `color: ${contrast < 128 ? '#fff' : '#000'};`;
});
</script>

<template>
  <div
    ref="trigger"
    class="size-8 rounded-full flex items-center justify-center"
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
      class="fbds-font-label-prominent"
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
