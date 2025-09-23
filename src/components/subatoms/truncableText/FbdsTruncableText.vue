<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';

import type { TooltipProps } from '@/constants/atoms/fbds-tooltip';

import FbdsTooltip from '@/components/atoms/tooltip/FbdsTooltip.vue';

const props = withDefaults(
  defineProps<{
    text: string;
    truncateAtLine?: number;
    tooltip?: TooltipProps['trigger'];
    tooltipOptions?: Omit<TooltipProps, 'trigger'>;
  }>(),
  {
    truncateAtLine: 1,
    tooltip: undefined,
    tooltipOptions: () => ({}),
  },
);

const truncateClass = computed(() => {
  return `line-clamp-${props.truncateAtLine < 1 ? 'none' : props.truncateAtLine}`;
});

const textRef = ref<HTMLElement | null>(null);
const isTruncated = ref(false);

const checkTruncate = () => {
  const el = textRef.value;
  if (!el) return;

  const style = window.getComputedStyle(el);
  const lineClamp = style.getPropertyValue('-webkit-line-clamp');
  const scrollTruncated = el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;

  isTruncated.value = lineClamp && lineClamp !== 'none' ? scrollTruncated : scrollTruncated;
};

onMounted(() => {
  nextTick(checkTruncate);
  window.addEventListener('resize', checkTruncate);
});
watch(
  () => props.text,
  () => nextTick(checkTruncate),
);
watch(
  () => props.truncateAtLine,
  () => nextTick(checkTruncate),
);
</script>

<template>
  <span
    ref="textRef"
    :class="truncateClass"
  >
    {{ text }}

    <FbdsTooltip
      v-if="isTruncated"
      :trigger="textRef"
      v-bind="tooltipOptions"
    >
      {{ text }}
    </FbdsTooltip>
  </span>
</template>
