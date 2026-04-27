<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';

import type { TooltipPropsOptionnal } from '@/constants/atoms/fbds-tooltip';
import { Icon } from '@/constants/icon';

import FbdsTooltip from '@/components/atoms/tooltip/FbdsTooltip.vue';
import FbdsIcon from '@/components/subatoms/icon/FbdsIcon.vue';

const checked = defineModel<boolean>('checked', { required: true });
const props = withDefaults(
  defineProps<{
    name: string;
    label?: string;
    icon?: Icon;
    iconUnchecked?: Icon;
    disabled?: boolean;
    tooltip?: string;
    tooltipOptions?: TooltipPropsOptionnal;
  }>(),
  {
    label: undefined,
    icon: () => Icon.Circle,
    iconUnchecked: () => Icon.Circle,
    disabled: false,
    tooltip: undefined,
    tooltipOptions: () => ({}),
  },
);

const trigger = useTemplateRef('trigger');

const bgClass = computed<string>(() => {
  if (props.disabled) {
    return 'bg-fbds-disable';
  }
  if (checked.value) {
    return 'bg-fbds-primary';
  }
  return 'bg-fbds-on-surface-contrast-low';
});

const textClass = computed<string>(() => {
  if (props.disabled) {
    return 'text-fbds-on-disable';
  }
  if (checked.value) {
    return 'text-fbds-on-primary';
  }
  return 'text-fbds-surface';
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
    class="flex flex-nowrap items-center gap-1 fbds-font-label rounded-full"
    :class="disabled ? 'cursor-not-allowed text-fbds-on-base-disable' : 'cursor-pointer text-fbds-on-base-surface-high'"
    :tabindex="disabled ? -1 : 1"
    @click="handleClick"
    @keydown.space.prevent="handleClick"
    @keydown.enter="handleClick"
  >
    <button
      class="relative rounded-full p-1 pointer-events-none"
      :disabled
      :tabindex="-1"
    >
      <div
        class="h-6 w-10 flex items-center px-1 rounded-full"
        :class="[bgClass, textClass]"
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
      class="pr-2 pointer-events-none fbds-font-label-subtle"
      :class="disabled ? 'text-fbds-on-disable' : 'text-fbds-on-surface-contrast-high'"
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
