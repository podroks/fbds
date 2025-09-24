<script setup lang="ts">
import { computed, type CSSProperties, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import type { Tab } from '@/constants/atoms/fbds-tabs';
import { Positioning } from '@/constants/positioning';

import FbdsTooltip from '@/components/atoms/tooltip/FbdsTooltip.vue';
import FbdsIcon from '@/components/subatoms/icon/FbdsIcon.vue';
import FbdsTruncableText from '@/components/subatoms/truncableText/FbdsTruncableText.vue';

const selected = defineModel<Tab['id'] | undefined>('selected', { default: undefined });

const props = withDefaults(
  defineProps<{
    tabs: Tab[];
    showContent?: boolean;
  }>(),
  {
    showContent: false,
  },
);

const tabRefs = ref<(HTMLElement | null)[]>([]);

function bgClass(tab: Tab): string {
  if (tab.disabled) {
    return 'bg-fbds-base-disable';
  }
  return 'bg-transparent';
}

function textClass(tab: Tab): string {
  if (tab.disabled) {
    return 'text-fbds-on-base-disable';
  }
  if (selected.value === tab.id) {
    return 'text-fbds-base-primary';
  }
  return 'text-fbds-on-base-surface-high';
}

function cursorClass(tab: Tab): string {
  return tab.disabled ? 'cursor-not-allowed' : 'cursor-pointer';
}

function handleClick(tab: Tab) {
  if (!tab.disabled) {
    selected.value = tab.id;
  }
}

/* ------------------------- Indicateur de sélection ------------------------ */
const indicator = ref<HTMLElement | null>(null);
const indicatorLeft = ref<number>(0);
const indicatorWidth = ref<number>(0);
const direction = ref<'left' | 'right'>('right');
const isIndicatorTransitionActive = ref<boolean>(false);
let hasMounted = false;
let resizeObserver: ResizeObserver | null = null;

const indicatorStyle = computed<CSSProperties>(() => ({
  left: indicatorLeft.value + 'px',
  width: indicatorWidth.value + 'px',
}));

watch(selected, (newVal, oldVal) => {
  if (oldVal && newVal) {
    const oldIdx = props.tabs.findIndex((tab) => tab.id === oldVal);
    const newIdx = props.tabs.findIndex((tab) => tab.id === newVal);
    direction.value = newIdx > oldIdx ? 'right' : 'left';
  }
  updateIndicator();
});

function updateIndicator() {
  nextTick(() => {
    const idx = props.tabs.findIndex((tab) => tab.id === selected.value);
    const el = tabRefs.value[idx];
    if (el) {
      const { offsetLeft, offsetWidth } = el;
      indicatorLeft.value = offsetLeft;
      indicatorWidth.value = offsetWidth;

      if (resizeObserver) resizeObserver.disconnect();
      resizeObserver = new ResizeObserver(() => {
        updateIndicator();
      });
      resizeObserver.observe(el);

      if (!hasMounted) {
        hasMounted = true;
        void indicator.value?.clientWidth;
        requestAnimationFrame(() => {
          isIndicatorTransitionActive.value = true;
        });
      }
    } else {
      if (resizeObserver) resizeObserver.disconnect();
    }
  });
}

onMounted(() => {
  updateIndicator();
});

onBeforeUnmount(() => {
  if (resizeObserver) resizeObserver.disconnect();
});
</script>

<template>
  <div
    class="flex flex-col"
    :class="{ 'w-full': showContent }"
  >
    <div class="relative flex flex-nowrap">
      <button
        v-for="(tab, i) in tabs"
        :key="tab.id"
        :ref="(el) => (tabRefs[i] = el as HTMLElement | null)"
        class="group/tab rounded-t-md fbds-font-label-medium flex-1 overflow-hidden"
        :class="[cursorClass(tab), bgClass(tab), textClass(tab)]"
        :disabled="tab.disabled"
        @click="handleClick(tab)"
      >
        <div
          class="flex gap-2 flex-nowrap items-center justify-center h-10 p-2.5 rounded-[inherit]"
          :class="{
            'group-hover/tab:bg-fbds-state-layer-base-primary-hover group-active/tab:bg-fbds-state-layer-base-primary-press':
              !tab.disabled,
          }"
        >
          <FbdsIcon
            v-if="tab.icon"
            :icon="tab.icon"
            class="shrink-0"
          />
          <FbdsTruncableText
            v-if="tab.label"
            :text="tab.label"
            :tooltip-options="{
              ...(tab.tooltipOptions ?? {}),
              positioning: tab.tooltipOptions?.positioning ?? Positioning.Bottom,
              trigger: tab.tooltipOptions?.trigger ?? tabRefs[i],
            }"
          />
          <FbdsTooltip
            v-if="tab.tooltip"
            :trigger="tab.tooltipOptions?.trigger ?? tabRefs[i]!"
            v-bind="{
              ...(tab.tooltipOptions ?? {}),
              positioning: tab.tooltipOptions?.positioning ?? Positioning.Bottom,
            }"
          >
            {{ tab.tooltip }}
          </FbdsTooltip>
        </div>
      </button>
      <div
        v-if="tabs.length"
        ref="indicator"
        class="absolute h-1 bottom-0 bg-fbds-base-primary"
        :class="{ 'duration-150 transition-all': isIndicatorTransitionActive }"
        :style="indicatorStyle"
      />
    </div>

    <div
      v-if="showContent"
      class="relative w-full overflow-hidden"
    >
      <Transition
        mode="out-in"
        enter-active-class="transition duration-250 ease-in-out"
        :enter-from-class="direction === 'left' ? '-translate-x-full' : 'translate-x-full'"
        enter-to-class="translate-x-0"
        leave-active-class="transition duration-250 ease-in-out"
        leave-from-class="translate-x-0"
        :leave-to-class="direction === 'left' ? 'translate-x-full' : '-translate-x-full'"
      >
        <div
          :key="selected"
          class="w-full"
        >
          <slot :name="`tab(${selected?.toString()})`" />
        </div>
      </Transition>
    </div>
  </div>
</template>
