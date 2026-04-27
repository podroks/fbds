<script setup lang="ts">
import { useTemplateRef } from 'vue';

import type { TooltipPropsOptionnal } from '@/constants/atoms/fbds-tooltip';
import { Icon } from '@/constants/icon';

import FbdsTooltip from '@/components/atoms/tooltip/FbdsTooltip.vue';
import FbdsIcon from '@/components/subatoms/icon/FbdsIcon.vue';

const checked = defineModel<boolean>('checked', { required: true });
const props = withDefaults(
  defineProps<{
    name: string;
    label?: string;
    undetermined?: boolean;
    disabled?: boolean;
    tooltip?: string;
    tooltipOptions?: TooltipPropsOptionnal;
  }>(),
  {
    label: undefined,
    undetermined: false,
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
    class="flex flex-nowrap items-center gap-1 fbds-font-label rounded-full"
    :class="disabled ? 'cursor-not-allowed text-fbds-on-base-disable' : 'cursor-pointer text-fbds-on-base-surface-high'"
    :tabindex="disabled ? -1 : 1"
    @click="handleClick"
    @keydown.space.prevent="handleClick"
    @keydown.enter="handleClick"
  >
    <input
      class="absolute invisible pointer-events-none"
      type="checkbox"
      :name
      :checked
    />
    <div
      class="rounded-full p-2"
      :class="{
        'hover:bg-fbds-state-layer-high-hover active:bg-fbds-state-layer-high-press': !disabled,
      }"
    >
      <div
        class="relative size-4 rounded-sm -outline-offset-1 outline transition duration-150 ease-in-out"
        :class="checked ? 'outline-transparent' : 'outline-fbds-on-surface-contrast-medium'"
      >
        <Transition
          enter-active-class="transition duration-150 ease-in-out"
          enter-from-class="opacity-0 scale-50"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-150 ease-in-out"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-if="checked"
            class="absolute top-0 left-0 size-full rounded-sm flex items-center justify-center"
            :class="disabled ? 'bg-fbds-disable text-fbds-on-disable' : 'bg-fbds-primary text-fbds-on-primary'"
          >
            <FbdsIcon :icon="undetermined ? Icon.Remove : Icon.Check" />
          </div>
        </Transition>
      </div>
    </div>
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
