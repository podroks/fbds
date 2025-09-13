<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';

import type { TooltipProps } from '@/constants/atoms/fbds-tooltip';
import { Positioning } from '@/constants/positioning';

import { useFloating } from '@/composables/useFloating';

const props = withDefaults(defineProps<TooltipProps>(), {
  positioning: Positioning.Right,
  container: null,
  offset: 8,
  containerOffset: 8,
});

defineSlots<{ default?(): unknown }>();

const tooltip = ref<HTMLElement | null>(null);

const { top, left, height, width, maxHeight, maxWidth, triggerEl, updateAllRect } = useFloating(
  computed(() => tooltip.value),
  computed(() => props.trigger),
  computed(() => props.positioning),
  {
    container: computed(() => props.container),
    triggerOffset: computed<number>(() => props.offset),
    containerOffset: computed<number>(() => props.containerOffset),
  },
);

/* ------------------------ Gestion de la visibilité ------------------------ */
const tooltipVisible = ref<boolean>(false);

watch(
  () => triggerEl.value,
  (el, _, onCleanup) => {
    if (!el) return;

    el.addEventListener('mouseenter', showTooltip);
    el.addEventListener('mouseleave', hideTooltip);
    el.addEventListener('focus', showTooltip);
    el.addEventListener('blur', hideTooltip);

    onCleanup(() => {
      el.removeEventListener('mouseenter', showTooltip);
      el.removeEventListener('mouseleave', hideTooltip);
      el.removeEventListener('focus', showTooltip);
      el.removeEventListener('blur', hideTooltip);
    });
  },
  { immediate: true },
);

function showTooltip() {
  tooltipVisible.value = true;
  nextTick(() => {
    updateAllRect();
  });
}
function hideTooltip() {
  tooltipVisible.value = false;
}
</script>

<template>
  <Teleport to="body">
    <transition
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      enter-active-class="transition-opacity delay-100 duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
      leave-active-class="transition-opacity delay-0 duration-150"
    >
      <div
        v-if="tooltipVisible"
        class="absolute top-0 left-0 h-full w-full pointer-events-none"
      >
        <div
          ref="tooltip"
          class="absolute bg-fbds-base-surface-inverted text-fbds-on-base-surface-inverted-high rounded-sm p-2 fbds-font-label-large overflow-hidden break-words"
          :style="{ top, left, width, height, maxHeight, maxWidth }"
        >
          <slot />
        </div>
      </div>
    </transition>
  </Teleport>
</template>
