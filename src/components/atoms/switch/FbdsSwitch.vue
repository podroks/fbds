<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';

import type { TooltipProps } from '@/constants/atoms/fbds-tooltip';
import { Icon } from '@/constants/icon';
import { OnTheme, Theme } from '@/constants/theme';

import FbdsTooltip from '@/components/atoms/tooltip/FbdsTooltip.vue';
import FbdsIcon from '@/components/subatoms/icon/FbdsIcon.vue';

const checked = defineModel<boolean>('checked', { required: true });
const props = withDefaults(
  defineProps<{
    name: string;
    label?: string;
    theme?: Exclude<Theme, 'base-disable'>;
    icon?: Icon;
    border?: boolean;
    themeUnchecked?: Exclude<Theme, 'base-disable'>;
    iconUnchecked?: Icon;
    borderUnchecked?: boolean;
    disabled?: boolean;
    tooltip?: TooltipProps['trigger'];
    tooltipOptions?: Omit<TooltipProps, 'trigger'>;
  }>(),
  {
    label: undefined,
    theme: Theme.BasePrimary,
    icon: () => Icon.fasCircle,
    border: false,
    themeUnchecked: undefined,
    iconUnchecked: () => Icon.fasCircle,
    borderUnchecked: false,
    disabled: false,
    tooltip: undefined,
    tooltipOptions: () => ({}),
  },
);

const trigger = useTemplateRef('trigger');

const currentTheme = computed<Theme>(() => (props.disabled ? Theme.BaseDisable : props.theme));

const bgClass = computed<string>(() => {
  if (checked.value || props.disabled) {
    return `bg-fbds-${currentTheme.value}`;
  }
  return `bg-fbds-${props.themeUnchecked ?? 'surface-elevation-neutral-highest'}`;
});

const textClass = computed<string>(() => {
  if (checked.value || props.disabled) {
    return `text-fbds-${OnTheme[currentTheme.value]}`;
  }
  if (props.themeUnchecked) {
    return `text-fbds-${OnTheme[props.themeUnchecked]}`;
  }
  return 'text-fbds-on-base-surface-inverted-high';
});

const outlineClass = computed<string>(() => {
  if ((checked.value && !props.border) || (!checked.value && !props.borderUnchecked) || props.disabled) {
    return '';
  }
  const outlineBase = 'outline -outline-offset-1';
  if (checked.value) {
    return `${outlineBase} outline-fbds-${OnTheme[currentTheme.value]}`;
  }
  if (props.themeUnchecked) {
    return `${outlineBase} outline-fbds-${OnTheme[props.themeUnchecked]}`;
  }
  return `${outlineBase} outline-fbds-${props.themeUnchecked ?? 'on-base-surface-inverted-high'}`;
});

function handleClick() {
  if (!props.disabled) {
    checked.value = !checked.value;
  }
}
</script>

<template>
  <div
    ref="trigger"
    class="flex flex-nowrap items-center gap-1 fbds-font-label-medium rounded-full"
    :class="disabled ? 'cursor-not-allowed text-fbds-on-base-disable' : 'cursor-pointer text-fbds-on-base-surface-high'"
    :tabindex="1"
    @click="handleClick"
  >
    <button
      class="relative rounded-full p-1 pointer-events-none"
      :disabled
      :tabindex="-1"
    >
      <div
        class="h-6 w-10 flex items-center px-1 rounded-full"
        :class="[bgClass, textClass, outlineClass]"
      >
        <FbdsIcon
          :icon="checked ? icon : iconUnchecked"
          :size="5"
          :class="['transform transition-transform duration-150', checked ? 'translate-x-3' : 'translate-x-0']"
        />
      </div>
    </button>
    <label
      v-if="label"
      :for="name"
      class="pr-2 pointer-events-none"
    >
      {{ label }}
    </label>
    <FbdsTooltip
      v-if="tooltip"
      :trigger
      v-bind="tooltipOptions"
    >
      {{ tooltip }}
    </FbdsTooltip>
  </div>
</template>
