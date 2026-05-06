<script setup lang="ts">
import { ref } from 'vue';

import type { SegmentProps, Segment } from './FbdsSegment';

import FbdsIcon from '@/components/subatoms/icon/FbdsIcon.vue';
import FbdsTooltip from '@/components/atoms/tooltip/FbdsTooltip.vue';

const props = withDefaults(defineProps<SegmentProps>(), {
  multiple: false,
  required: false,
});

const selected = defineModel<(string | number)[]>('selected', { default: () => [] });

const triggers = ref<(HTMLElement | null)[]>([]);

function isActive(segment: Segment): boolean {
  return selected.value.includes(segment.id);
}

function toggle(segment: Segment) {
  if (segment.disabled) return;

  if (props.multiple) {
    if (isActive(segment)) {
      if (props.required && selected.value.length === 1) return;
      selected.value = selected.value.filter((id) => id !== segment.id);
    } else {
      selected.value = [...selected.value, segment.id];
    }
  } else {
    if (props.required && isActive(segment)) return;
    selected.value = isActive(segment) ? [] : [segment.id];
  }
}

function getEnabledIndexes(): number[] {
  return props.segments.reduce<number[]>((acc, s, i) => {
    if (!s.disabled) acc.push(i);
    return acc;
  }, []);
}

function moveFocus(index: number) {
  triggers.value[index]?.focus();
}

function handleKeydown(event: KeyboardEvent, index: number) {
  const enabled = getEnabledIndexes();
  const pos = enabled.indexOf(index);

  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowDown': {
      event.preventDefault();
      const next = enabled[(pos + 1) % enabled.length];
      if (next !== undefined) moveFocus(next);
      break;
    }
    case 'ArrowLeft':
    case 'ArrowUp': {
      event.preventDefault();
      const prev = enabled[(pos - 1 + enabled.length) % enabled.length];
      if (prev !== undefined) moveFocus(prev);
      break;
    }
    case 'Home': {
      event.preventDefault();
      if (enabled[0] !== undefined) moveFocus(enabled[0]);
      break;
    }
    case 'End': {
      event.preventDefault();
      const last = enabled[enabled.length - 1];
      if (last !== undefined) moveFocus(last);
      break;
    }
    case ' ':
    case 'Enter': {
      event.preventDefault();
      toggle(props.segments[index]);
      break;
    }
  }
}
</script>

<template>
  <div
    class="inline-flex items-center gap-1 p-1 rounded-md outline outline-fbds-border -outline-offset-1"
    :role="multiple ? 'toolbar' : 'radiogroup'"
    :aria-required="required || undefined"
  >
    <div
      v-for="(segment, index) in segments"
      :key="segment.id"
      :ref="(el) => (triggers[index] = el as HTMLElement | null)"
      class="relative flex items-center rounded-sm group/segment fbds-font-button-sm"
      :class="[
        segment.disabled
          ? 'cursor-not-allowed text-fbds-on-disable'
          : isActive(segment)
            ? 'cursor-pointer text-fbds-on-container-primary'
            : 'cursor-pointer text-fbds-on-surface-contrast-medium',
      ]"
      :role="multiple ? 'button' : 'radio'"
      :aria-checked="multiple ? undefined : isActive(segment)"
      :aria-pressed="multiple ? isActive(segment) : undefined"
      :aria-disabled="segment.disabled || undefined"
      :tabindex="segment.disabled ? -1 : 0"
      @click="toggle(segment)"
      @keydown="handleKeydown($event, index)"
    >
      <div
        v-if="isActive(segment) && !segment.disabled"
        class="absolute inset-0 rounded-[inherit] bg-fbds-container-primary"
      />
      <div
        class="relative z-1 flex items-center gap-1.5 px-1.5 h-8 fbds-state-layer rounded-[inherit]"
        :class="
          segment.disabled
            ? ''
            : isActive(segment)
              ? 'group-hover/segment:bg-fbds-state-layer-primary-hover group-active/segment:bg-fbds-state-layer-primary-press'
              : 'group-hover/segment:bg-fbds-state-layer-high-hover group-active/segment:bg-fbds-state-layer-high-press'
        "
      >
        <FbdsIcon
          v-if="segment.icon"
          :icon="segment.icon"
        />
        {{ segment.label }}
      </div>
      <FbdsTooltip
        v-if="segment.tooltip"
        :trigger="triggers[index]"
        v-bind="segment.tooltipOptions"
      >
        {{ segment.tooltip }}
      </FbdsTooltip>
    </div>
  </div>
</template>
