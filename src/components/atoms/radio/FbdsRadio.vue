<script setup lang="ts">
import { useTemplateRef } from 'vue';

import type { TooltipProps } from '@/constants/atoms/fbds-tooltip';
import { Icon } from '@/constants/icon';

import FbdsTooltip from '@/components/atoms/tooltip/FbdsTooltip.vue';
import FbdsIcon from '@/components/subatoms/icon/FbdsIcon.vue';

const checked = defineModel<boolean>('checked', { required: true });
const props = withDefaults(
  defineProps<{
    name: string;
    label?: string;
    disabled?: boolean;
    tooltip?: TooltipProps['trigger'];
    tooltipOptions?: Omit<TooltipProps, 'trigger'>;
  }>(),
  {
    label: undefined,
    disabled: false,
    tooltip: undefined,
    tooltipOptions: () => ({}),
  },
);

const trigger = useTemplateRef('trigger');

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
    <input
      class="absolute invisible pointer-events-none"
      type="radio"
      :name
      :checked
    />
    <div
      class="relative rounded-full p-1"
      :class="{
        'hover:bg-fbds-state-layer-base-primary-hover active:bg-fbds-state-layer-base-primary-press': !disabled,
      }"
    >
      <FbdsIcon
        :icon="Icon.farCircle"
        :size="6"
      />
      <Transition
        enter-active-class="transition duration-150 ease-in-out"
        enter-from-class="opacity-0 scale-50"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in-out"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <FbdsIcon
          v-if="checked"
          :icon="Icon.fasCircleDot"
          :size="6"
          class="absolute top-1 left-1"
          :class="disabled ? 'text-fbds-on-base-disable' : 'text-fbds-base-primary'"
        />
      </Transition>
    </div>
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
