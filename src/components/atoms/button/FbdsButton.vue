<script setup lang="ts">
import { computed, ref } from 'vue';

import { type ButtonProps, Contrast } from '@/constants/atoms/fbds-button';
import { OnTheme, StateLayerDefault, StateLayerTheme, Theme } from '@/constants/theme';

import { useColorTheme } from '@/composables/useColorTheme';
import { getContrast } from '@/utils/contrast.util';

import FbdsTooltip from '@/components/atoms/tooltip/FbdsTooltip.vue';
import FbdsIcon from '@/components/subatoms/icon/FbdsIcon.vue';

const props = withDefaults(defineProps<ButtonProps>(), {
  label: undefined,
  icon: undefined,
  contrast: Contrast.Primary,
  theme: Theme.BasePrimary,
  disabled: false,
  href: undefined,
  target: undefined,
  to: undefined,
  tooltip: undefined,
  tooltipOptions: () => ({}),
});

const emit = defineEmits<{ click: [event: MouseEvent] }>();

const { isDark } = useColorTheme();
const trigger = ref<HTMLElement | null>(null);

const currentTheme = computed<Theme>(() => (props.disabled ? Theme.BaseDisable : props.theme));

const bgClass = computed<`bg-fbds-${Theme}` | 'bg-transparent'>(() => {
  if (props.contrast === Contrast.Primary) {
    return `bg-fbds-${currentTheme.value}`;
  }
  return 'bg-transparent';
});

const textClass = computed<`text-fbds-${OnTheme | Theme}`>(() => {
  if (props.contrast === Contrast.Primary) {
    return `text-fbds-${OnTheme[currentTheme.value]}`;
  }
  return `text-fbds-${currentTheme.value}`;
});

const outlineClass = computed<string>(() => {
  if (props.contrast === Contrast.Tertiary) {
    return '';
  }
  return `outline -outline-offset-1 outline-fbds-${currentTheme.value}`;
});

const stateLayerClass = computed<string>(() => {
  if (props.disabled) {
    return '';
  }

  let stateLayerClass: StateLayerTheme | StateLayerDefault;
  if (props.contrast === Contrast.Primary) {
    const contrast = getContrast(props.theme);

    if (isDark.value) {
      stateLayerClass = contrast < 128 ? StateLayerDefault.High : StateLayerDefault.Low;
    } else {
      stateLayerClass = contrast < 128 ? StateLayerDefault.Low : StateLayerDefault.High;
    }
  } else {
    stateLayerClass = StateLayerTheme[props.theme];
  }

  return `group-hover/button:${stateLayerClass.hover} group-active/button:${stateLayerClass.press}`;
});

const component = computed(() => {
  if (props.href) {
    return 'a';
  }
  if (props.to) {
    return 'router-link';
  }
  return 'button';
});

const componentProps = computed(() => {
  if (props.href) {
    return {
      href: props.href,
      target: props.target,
    };
  }
  if (props.to) {
    return {
      to: props.to,
    };
  }
  return {};
});

function handleClick(event: MouseEvent) {
  if (!props.disabled) {
    emit('click', event);
  }
}
</script>

<template>
  <component
    :is="component"
    v-bind="componentProps"
    ref="trigger"
    class="fbds-font-label-large rounded-md group/button"
    :class="[bgClass, textClass, disabled ? 'cursor-not-allowed' : 'cursor-pointer']"
    :disabled
    @click="handleClick"
  >
    <div
      class="relative z-1 flex flex-nowrap gap-2 py-2.5 px-3 rounded-[inherit] fbds-state-layer"
      :class="[stateLayerClass, outlineClass, !label && icon ? 'size-10' : 'py-2.5 px-3']"
    >
      <FbdsIcon
        v-if="icon"
        :icon
      />
      {{ label }}
    </div>
    <FbdsTooltip
      v-if="tooltip"
      :trigger
      v-bind="tooltipOptions"
    >
      {{ tooltip }}
    </FbdsTooltip>
  </component>
</template>
