<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref, watch } from 'vue';

import type { TooltipProps } from '@/constants/atoms/fbds-tooltip';
import { Positioning } from '@/constants/positioning';

import { useFloating } from '@/composables/useFloating';

const props = withDefaults(defineProps<TooltipProps>(), {
  positioning: Positioning.Top,
  container: null,
  offset: 8,
  containerOffset: 8,
  persistent: false,
  followTrigger: false,
  class: '',
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
    if (!el || props.persistent) return;

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
/* ------------------------ /Gestion de la visibilité ----------------------- */

/* ----------------------- Réactivité - positionnement ---------------------- */
let mutationObserver: MutationObserver | null = null;
let resizeObserver: ResizeObserver | null = null;

function addObservers() {
  const el = triggerEl.value;
  if (!el) return;
  console.log('Add observers to', el);
  // Observe DOM mutations
  mutationObserver = new MutationObserver(updateAllRect);
  mutationObserver.observe(el, {
    attributes: true,
    childList: true,
    subtree: true,
  });
  // Observe size/position changes
  resizeObserver = new ResizeObserver(updateAllRect);
  resizeObserver.observe(el);
  // Listen to window scroll/resize
  window.addEventListener('scroll', updateAllRect, true);
  window.addEventListener('resize', updateAllRect);
}

function removeObservers() {
  if (mutationObserver) {
    mutationObserver.disconnect();
    mutationObserver = null;
  }
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
  window.removeEventListener('scroll', updateAllRect, true);
  window.removeEventListener('resize', updateAllRect);
}

watch(
  [() => props.persistent, () => props.followTrigger, () => triggerEl.value],
  ([persistent, follow, el], _, onCleanup) => {
    if (!persistent || !follow) {
      removeObservers();
      return;
    }
    if (!el) return;
    nextTick(addObservers);
    onCleanup(() => {
      removeObservers();
    });
  },
  { immediate: true },
);

onUnmounted(() => {
  removeObservers();
});
/* ---------------------- /Réactivité - positionnement ---------------------- */

defineExpose({
  updatePosition: updateAllRect,
});
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
        v-if="persistent || tooltipVisible"
        class="absolute top-0 left-0 h-full w-full pointer-events-none z-1000"
      >
        <div
          ref="tooltip"
          class="absolute bg-fbds-base-surface-inverted text-fbds-on-base-surface-inverted-high rounded-sm p-2 fbds-font-label-large overflow-hidden break-words"
          :class="props.class"
          :style="{ top, left, width, height, maxHeight, maxWidth }"
        >
          <slot />
        </div>
      </div>
    </transition>
  </Teleport>
</template>
