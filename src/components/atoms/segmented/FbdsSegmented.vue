<script setup lang="ts">
import { Contrast } from '@/constants/atoms/fbds-button';
import type { TooltipProps } from '@/constants/atoms/fbds-tooltip';
import type { Icon } from '@/constants/icon';
import { Theme } from '@/constants/theme';

import FbdsButton from '@/components/atoms/button/FbdsButton.vue';

type Segment = {
  id: string | number;
  theme?: Exclude<Theme, 'base-disable'>;
  label?: string;
  icon?: Icon;
  disabled?: boolean;
  tooltip?: TooltipProps['trigger'];
  tooltipOptions?: Omit<TooltipProps, 'trigger'>;
};

const selected = defineModel<Segment['id']>('selected', { default: undefined });

defineProps<{ segments: Segment[] }>();

function handleClick(segment: Segment) {
  if (!segment.disabled) {
    selected.value = segment.id;
  }
}
</script>

<template>
  <FbdsButton
    v-for="segment in segments"
    :key="segment.id"
    :label="segment.label"
    :icon="segment.icon"
    :contrast="selected === segment.id ? Contrast.Primary : Contrast.Secondary"
    :theme="segment.theme || Theme.BasePrimary"
    :disabled="segment.disabled"
    :tooltip="segment.tooltip"
    :tooltip-options="segment.tooltipOptions"
    class="rounded-none first:rounded-l-md last:rounded-r-md -ml-px first:ml-0"
    @click="handleClick(segment)"
  />
</template>
