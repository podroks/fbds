<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';

import type { TooltipProps } from '@/constants/atoms/fbds-tooltip';
import type { Icon } from '@/constants/icon';
import { OnTheme, StateLayerDefault, Theme } from '@/constants/theme';

import { useColorTheme } from '@/composables/useColorTheme';
import { getContrast } from '@/utils/contrast.util';

import FbdsTooltip from '@/components/atoms/tooltip/FbdsTooltip.vue';
import FbdsIcon from '@/components/subatoms/icon/FbdsIcon.vue';

const props = withDefaults(
  defineProps<{
    label: string;
    icon?: Icon;
    rightIcon?: Icon;
    interactif?: boolean;
    theme?: Exclude<Theme, 'base-disable'>;
    tooltip?: TooltipProps['trigger'];
    tooltipOptions?: Omit<TooltipProps, 'trigger'>;
  }>(),
  {
    icon: undefined,
    rightIcon: undefined,
    interactif: false,
    theme: Theme.BasePrimary,
    tooltip: undefined,
    tooltipOptions: () => ({}),
  },
);

const emit = defineEmits<{ click: [event: MouseEvent] }>();

const { isDark } = useColorTheme();
const trigger = useTemplateRef<HTMLDivElement | HTMLButtonElement>('trigger');

const bgClass = computed<`bg-fbds-${Theme}` | 'bg-transparent'>(() => {
  return `bg-fbds-${props.theme}`;
});

const textClass = computed<`text-fbds-${OnTheme}`>(() => {
  return `text-fbds-${OnTheme[props.theme]}`;
});

const stateLayerClass = computed<string>(() => {
  if (!props.interactif) {
    return '';
  }

  let stateLayerClass: StateLayerDefault;
  const contrast = getContrast(props.theme);

  if (isDark.value) {
    stateLayerClass = contrast < 128 ? StateLayerDefault.High : StateLayerDefault.Low;
  } else {
    stateLayerClass = contrast < 128 ? StateLayerDefault.Low : StateLayerDefault.High;
  }

  return `group-hover/tag:${stateLayerClass.hover} group-active/tag:${stateLayerClass.press}`;
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
    class="group/tag rounded-full w-fit fbds-font-label-large"
    :class="[bgClass, textClass, { 'cursor-pointer': interactif }]"
    @click="handleClick"
  >
    <div
      class="relative z-1 flex flex-nowrap gap-1 py-1 px-2.5 rounded-[inherit]"
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
