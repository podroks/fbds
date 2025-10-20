<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import { computed, nextTick, onUnmounted, ref, watch } from 'vue';

import { Icon } from '@/constants/icon';
import { Positioning } from '@/constants/positioning';
import type { Theme } from '@/constants/theme';

import { useFloating } from '@/composables/useFloating';

import FbdsIcon from '@/components/subatoms/icon/FbdsIcon.vue';
import FbdsTruncableText from '@/components/subatoms/truncableText/FbdsTruncableText.vue';

export type Option = {
  label: string;
  value: string | number;
  children?: Option[];
  icon?: Icon;
  disabled?: boolean;
  theme?: Theme;
};

const isOpen = defineModel<boolean>('open', { default: false });

const props = withDefaults(
  defineProps<{
    options: Option[];
    trigger: HTMLElement | { el: HTMLElement | null } | string | null;
    container?: HTMLElement | { el: HTMLElement | null } | string | null;
    positioning?: Positioning;
    offset?: number;
    containerOffset?: number;
  }>(),
  {
    positioning: Positioning.Bottom,
    container: null,
    offset: 8,
    containerOffset: 8,
  },
);

const emit = defineEmits<{ click: [option: Option] }>();

const dropDownMenu = ref<HTMLElement | null>(null);
const optionsRef = ref<{ [key: Option['value']]: HTMLElement | null }>({});

const { top, left, height, width, maxHeight, maxWidth, triggerEl, updateAllRect } = useFloating(
  computed(() => dropDownMenu.value),
  computed(() => props.trigger),
  computed(() => props.positioning),
  {
    container: computed(() => props.container),
    triggerOffset: computed<number>(() => props.offset),
    containerOffset: computed<number>(() => props.containerOffset),
  },
);

function handleClick(option: Option) {
  if (option.disabled) {
    return;
  }
  if (option.children?.length) {
    seletedNestedOption.value = option !== seletedNestedOption.value ? option : null;
  } else {
    seletedNestedOption.value = null;
    emit('click', option);
  }
}

function propagateClick(option: Option) {
  emit('click', option);
}

/* --------------------------------- Nested --------------------------------- */
const seletedNestedOption = ref<Option | null>(null);
const nestedOptions = computed<Option[]>(() =>
  seletedNestedOption.value ? seletedNestedOption.value.children || [] : [],
);
const nestedTrigger = computed<HTMLElement | null>(
  () => optionsRef.value[seletedNestedOption.value?.value || ''] || null,
);

watch([isOpen, () => props.options], () => (seletedNestedOption.value = null));
/* --------------------------------- /Nested -------------------------------- */

/* ----------------------- Réactivité - positionnement ---------------------- */
let mutationObserver: MutationObserver | null = null;
let resizeObserver: ResizeObserver | null = null;

function addObservers() {
  const el = triggerEl.value;
  if (!el) return;
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
  () => triggerEl.value,
  (el, _, onCleanup) => {
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

onClickOutside(dropDownMenu, () => (isOpen.value = false), { ignore: ['.drop-down-menu', triggerEl] });
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      enter-active-class="transition-opacity delay-100 duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
      leave-active-class="transition-opacity delay-0 duration-150"
    >
      <div
        v-if="isOpen"
        class="absolute top-0 left-0 h-full w-full z-500 pointer-events-none"
      >
        <div
          ref="dropDownMenu"
          class="drop-down-menu fbds-scrollbar small absolute bg-fbds-base-surface text-fbds-on-base-surface-high border border-fbds-border-low shadow-md rounded-md pointer-events-auto overflow-auto"
          :style="{ top, left, width, height, maxHeight, maxWidth }"
        >
          <div
            v-for="option in options"
            :key="option.value"
            :ref="(el) => (optionsRef[option.value] = el as HTMLElement | null)"
            class="group/dropmenu relative h-10 flex items-center cursor-pointer"
            @click="handleClick(option)"
          >
            <div
              class="absolute top-0 -left-2 h-full border-b border-fbds-border-low group-last/dropmenu:border-0"
              :class="`group-hover/dropmenu:bg-fbds-state-layer-${option.theme ?? 'base-primary'}-hover group-active/dropmenu:bg-fbds-state-layer-${option.theme ?? 'base-primary'}-press`"
              style="width: calc(100% + 16px)"
            />
            <div class="relative flex items-center gap-3 px-1 z-1">
              <slot
                name="option"
                :option
              >
                <FbdsIcon
                  v-if="option.icon"
                  :icon="option.icon"
                />
                <FbdsTruncableText
                  :text="option.label"
                  class="flex-1"
                  :class="{ 'pr-1': !option.children }"
                />
                <FbdsIcon
                  v-if="option.children"
                  :icon="Icon.fasCaretRight"
                />
              </slot>
            </div>
          </div>
        </div>
        <FbdsDropDownMenu
          v-if="nestedOptions.length"
          :open="nestedOptions.length > 0"
          :options="nestedOptions"
          :trigger="nestedTrigger"
          :positioning="Positioning.RightTop"
          :container
          :offset="8"
          :container-offset
          @click="propagateClick"
        />
      </div>
    </Transition>
  </Teleport>
</template>
