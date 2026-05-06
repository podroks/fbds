<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';

import type { TooltipPropsOptionnal } from '@/constants/atoms/fbds-tooltip';
import type { Icon } from '@/constants/icon';

import { TagTheme } from './FbdsTag';

import FbdsTooltip from '@/components/atoms/tooltip/FbdsTooltip.vue';
import FbdsIcon from '@/components/subatoms/icon/FbdsIcon.vue';

const props = withDefaults(
  defineProps<{
    label: string;
    icon?: Icon;
    rightIcon?: Icon;
    interactif?: boolean;
    theme?: TagTheme;
    tooltip?: string;
    tooltipOptions?: TooltipPropsOptionnal;
  }>(),
  {
    icon: undefined,
    rightIcon: undefined,
    interactif: false,
    theme: TagTheme.Primary,
    tooltip: undefined,
    tooltipOptions: () => ({}),
  },
);

const emit = defineEmits<{ click: [event: MouseEvent] }>();

const trigger = useTemplateRef<HTMLDivElement | HTMLButtonElement>('trigger');

const bgClass = computed<string>(() => {
  if (props.theme === TagTheme.Ghost) {
    return 'bg-fbds-surface-1';
  }
  return `bg-fbds-container-${props.theme}`;
});

const textClass = computed<string>(() => {
  if (props.theme === TagTheme.Ghost) {
    return 'text-fbds-on-surface-contrast-medium';
  }
  return `text-fbds-on-container-${props.theme}`;
});

const stateLayerClass = computed<string>(() => {
  if (!props.interactif) {
    return '';
  }

  return 'group-hover/tag:bg-fbds-state-layer-high-hover group-active/tag:bg-fbds-state-layer-high-press';
});

function handleClick(event: MouseEvent) {
  if (!props.interactif) {
    emit('click', event);
  }
}
</script>

<template>
  <component
    :is="interactif ? 'button' : 'div'"
    ref="trigger"
    class="group/tag rounded-md w-fit fbds-font-label"
    :class="[bgClass, textClass, { 'cursor-pointer': interactif }]"
    @click="handleClick"
  >
    <div
      class="relative z-1 flex flex-nowrap gap-1 p-1.5 rounded-[inherit]"
      :class="stateLayerClass"
    >
      <FbdsIcon
        v-if="icon"
        :icon
      />
      {{ label }}
      <FbdsIcon
        v-if="rightIcon"
        :icon="rightIcon"
      />
      <FbdsTooltip
        v-if="tooltip"
        :trigger
        v-bind="tooltipOptions"
      >
        {{ tooltip }}
      </FbdsTooltip>
    </div>
  </component>
</template>
