<script setup lang="ts">
import { computed, ref } from 'vue';

import { type ButtonProps, ButtonSize, ButtonVariant } from '@/constants/atoms/fbds-button';

import FbdsTooltip from '@/components/atoms/tooltip/FbdsTooltip.vue';
import FbdsIcon from '@/components/subatoms/icon/FbdsIcon.vue';

const props = withDefaults(defineProps<ButtonProps>(), {
  label: undefined,
  icon: undefined,
  variant: ButtonVariant.Primary,
  size: ButtonSize.Md,
  disabled: false,
  href: undefined,
  target: undefined,
  to: undefined,
  tooltip: undefined,
  tooltipOptions: () => ({}),
});

const emit = defineEmits<{ click: [event: MouseEvent] }>();

const trigger = ref<HTMLElement | null>(null);

type VariantConfig = {
  bg: string;
  text: string;
  outline: string;
  stateLayerHover: string;
  stateLayerPress: string;
};

const variantConfigs: Record<ButtonVariant, VariantConfig> = {
  [ButtonVariant.Primary]: {
    bg: 'bg-fbds-primary',
    text: 'text-fbds-on-primary',
    outline: '',
    stateLayerHover: 'bg-fbds-state-layer-low-hover',
    stateLayerPress: 'bg-fbds-state-layer-low-press',
  },
  [ButtonVariant.Secondary]: {
    bg: 'bg-transparent',
    text: 'text-fbds-on-surface-contrast-medium',
    outline: 'outline -outline-offset-1 outline-fbds-border',
    stateLayerHover: 'bg-fbds-state-layer-high-hover',
    stateLayerPress: 'bg-fbds-state-layer-high-press',
  },
  [ButtonVariant.Tertiary]: {
    bg: 'bg-transparent',
    text: 'text-fbds-on-surface-contrast-medium',
    outline: '',
    stateLayerHover: 'bg-fbds-state-layer-high-hover',
    stateLayerPress: 'bg-fbds-state-layer-high-press',
  },
  [ButtonVariant.Success]: {
    bg: 'bg-fbds-success',
    text: 'text-fbds-on-success',
    outline: '',
    stateLayerHover: 'bg-fbds-state-layer-low-hover',
    stateLayerPress: 'bg-fbds-state-layer-low-press',
  },
  [ButtonVariant.SuccessSecondary]: {
    bg: 'bg-transparent',
    text: 'text-fbds-success',
    outline: 'outline -outline-offset-1 outline-fbds-success',
    stateLayerHover: 'bg-fbds-state-layer-success-hover',
    stateLayerPress: 'bg-fbds-state-layer-success-press',
  },
  [ButtonVariant.Danger]: {
    bg: 'bg-fbds-alert',
    text: 'text-fbds-on-alert',
    outline: '',
    stateLayerHover: 'bg-fbds-state-layer-low-hover',
    stateLayerPress: 'bg-fbds-state-layer-low-press',
  },
  [ButtonVariant.DangerSecondary]: {
    bg: 'bg-transparent',
    text: 'text-fbds-alert',
    outline: 'outline -outline-offset-1 outline-fbds-alert',
    stateLayerHover: 'bg-fbds-state-layer-alert-hover',
    stateLayerPress: 'bg-fbds-state-layer-alert-press',
  },
};

const config = computed<VariantConfig>(() => {
  if (props.disabled) {
    return {
      bg: 'bg-fbds-disable',
      text: 'text-fbds-on-disable',
      outline: '',
      stateLayerHover: '',
      stateLayerPress: '',
    };
  }
  return variantConfigs[props.variant];
});

const fontClass = computed<string>(() => (props.size === ButtonSize.Md ? 'fbds-font-button' : 'fbds-font-button-sm'));

const sizeClass = computed<string>(() => {
  const isMd = props.size === ButtonSize.Md;
  if (!props.label && props.icon) {
    return isMd ? 'size-10 justify-center' : 'size-8 justify-center';
  }
  return isMd ? 'h-10 px-3 gap-2' : 'h-8 px-2.5 gap-1.5';
});

const stateLayerClass = computed<string>(() => {
  if (!config.value.stateLayerHover) return '';
  return `group-hover/button:${config.value.stateLayerHover} group-active/button:${config.value.stateLayerPress}`;
});

const component = computed(() => {
  if (props.href) return 'a';
  if (props.to) return 'router-link';
  return 'button';
});

const componentProps = computed(() => {
  if (props.href) return { href: props.href, target: props.target };
  if (props.to) return { to: props.to };
  return {};
});

function handleClick(event: MouseEvent) {
  if (!props.disabled) {
    emit('click', event);
  }
}

defineExpose({
  el: trigger,
});
</script>

<template>
  <component
    :is="component"
    v-bind="componentProps"
    ref="trigger"
    class="rounded-md group/button"
    :class="[fontClass, config.bg, config.text, disabled ? 'cursor-not-allowed' : 'cursor-pointer']"
    :disabled
    @click="handleClick"
  >
    <div
      class="relative z-1 flex flex-nowrap items-center rounded-[inherit] fbds-state-layer"
      :class="[stateLayerClass, config.outline, sizeClass]"
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
