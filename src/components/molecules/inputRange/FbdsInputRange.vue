<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';

import { Icon } from '@/constants/icon';
import { Positioning } from '@/constants/positioning';
import { StatusTheme, type Theme } from '@/constants/theme';

import FbdsTooltip from '@/components/atoms/tooltip/FbdsTooltip.vue';
import FbdsInput from '@/components/molecules/input/FbdsInput.vue';
import FbdsIcon from '@/components/subatoms/icon/FbdsIcon.vue';

const value = defineModel<number | undefined>('value', { default: undefined });

const props = withDefaults(
  defineProps<{
    title: string;
    status?: {
      label?: string;
      value?: string;
      theme?: StatusTheme;
    };
    step?: number;
    min?: number;
    max?: number;
    showTooltip?: boolean;
    showSteps?: boolean;
    emitOnChange?: boolean;
    disabled?: boolean;
    prependIcon?: Icon;
    prependIconTheme?: Exclude<Theme, 'base-disable'>;
    appendIcon?: Icon;
    appendIconTheme?: Exclude<Theme, 'base-disable'>;
  }>(),
  {
    status: undefined,
    step: 1,
    min: undefined,
    max: undefined,
    showTooltip: false,
    showSteps: false,
    emitOnChange: false,
    disabled: false,
    prependIcon: undefined,
    prependIconTheme: undefined,
    appendIcon: undefined,
    appendIconTheme: undefined,
  },
);

const slots = defineSlots<{
  prepend?: () => void;
  append?: () => void;
}>();

const emit = defineEmits<{ click: [event: MouseEvent] }>();

/* ------------------------------ Style Classes ----------------------------- */
const inputRangeClasses = computed(() => [
  'h-10 w-full rounded-md fbds-font-body-medium',
  outlineClass.value,
  bgClass.value,
  textClass.value,
  cursorClass.value,
]);

const focusVisibleClass = computed(
  () =>
    'has-[#range-input:focus]:outline-2 has-[#range-input:focus]:outline-fbds-base-primary has-[#range-input:focus]:outline-offset-2',
);

const outlineClass = computed(() => {
  if (props.disabled) {
    return 'outline -outline-offset-1 outline-fbds-on-base-disable';
  }
  if (props.status?.theme && props.status.theme !== StatusTheme.Neutral) {
    return `outline -outline-offset-1 outline-fbds-${props.status.theme}`;
  }
  return 'outline -outline-offset-1 outline-fbds-border-medium';
});

const bgClass = computed(() => (props.disabled ? 'bg-fbds-base-disable' : 'bg-fbds-base-surface'));
const textClass = computed(() => (props.disabled ? 'text-fbds-on-base-disable' : 'text-fbds-on-base-surface-high'));
const cursorClass = computed(() => (props.disabled ? 'cursor-not-allowed' : 'cursor-pointer'));
const hrBgClass = computed(() => (props.disabled ? 'bg-fbds-on-base-disable' : 'bg-fbds-border-medium'));

const prependIconClass = computed(() => {
  if (props.disabled) {
    return 'text-fbds-on-base-disable';
  }
  return props.prependIconTheme ? `text-fbds-${props.prependIconTheme}` : undefined;
});
const appendIconClass = computed(() => {
  if (props.disabled) {
    return 'text-fbds-on-base-disable';
  }
  return props.appendIconTheme ? `text-fbds-${props.appendIconTheme}` : undefined;
});

const barFillClass = computed(() => (props.disabled ? 'bg-fbds-on-base-disable' : 'bg-fbds-base-primary'));
const pinClass = computed(() =>
  [
    'absolute -top-1.5 size-4 rounded-full border-2 box-content',
    props.disabled
      ? 'bg-fbds-on-base-disable border-fbds-base-disable'
      : 'bg-fbds-base-primary border-fbds-base-surface',
  ].join(' '),
);

function stepClass(s: number) {
  const currentStep = min.value + (s - 1) * step.value;
  if (tmpValue.value === undefined) {
    return 'bg-fbds-on-base-surface-low';
  }
  if (currentStep === tmpValue.value) {
    return 'bg-transparent';
  }
  if (currentStep < tmpValue.value) {
    return props.disabled ? 'bg-fbds-base-disable' : 'bg-fbds-on-base-primary';
  }
  return props.disabled ? 'bg-fbds-on-base-disable' : 'bg-fbds-on-base-surface-low';
}
/* ----------------------------- \Style Classes ----------------------------- */

/* ------------------------------- Drag Logic ------------------------------- */
const trigger = ref<HTMLElement | null>(null);
const tooltip = ref<typeof FbdsTooltip | null>(null);
const inputBar = ref<HTMLDivElement | null>(null);
const isDragging = ref(false);
const showTooltipFromKeypress = ref(false);
const tmpValue = ref<number | undefined>(value.value ?? props.min ?? 0);

const min = computed(() => props.min ?? 0);
const step = computed(() => props.step ?? 1);
const max = computed(() => props.max ?? 100);
const steps = computed(() => Math.max(Math.floor((max.value - min.value) / step.value), 1));

// Synchronise tmpValue avec value
watch(value, (newVal) => {
  if (newVal !== tmpValue.value) tmpValue.value = newVal ?? min.value;
});
watch([max, min, step], () => {
  if (clampToRange(value.value) !== value.value) value.value = clampToRange(value.value);
});
watch(tmpValue, (newVal) => {
  nextTick(() => tooltip.value?.updatePosition());
  if (props.emitOnChange && newVal !== value.value) value.value = newVal;
});

// Clamp la valeur dans la plage et arrondit au step
function clampToRange(val: number | undefined): number {
  if (val === undefined) return min.value;
  let clamped = Math.max(min.value, Math.min(max.value, val));
  clamped = min.value + Math.round((clamped - min.value) / step.value) * step.value;
  return clamped;
}

// Calcule la valeur selon la position X dans la barre
function getValueFromBarX(x: number): number | undefined {
  if (!inputBar.value) return value.value;
  const rect = inputBar.value.getBoundingClientRect();
  let percent = (x - rect.left) / rect.width;
  percent = Math.max(0, Math.min(1, percent));
  let val = percent * (max.value - min.value);
  val = min.value + Math.round(val / step.value) * step.value;
  val = Math.max(min.value, Math.min(max.value, val));
  const leftValue = max.value - val;
  if (leftValue < step.value) {
    const percentToBeAtMax = (val + leftValue / 2) / max.value;
    return percent > percentToBeAtMax ? max.value : val;
  }
  return val;
}

function onDragStart(e: MouseEvent) {
  if (props.disabled) return;
  inputBar.value?.focus();
  isDragging.value = true;
  onDragMove(e);
  document.addEventListener('mousemove', onDragMove);
  document.addEventListener('mouseup', onDragEnd);
}

function onDragMove(e: MouseEvent) {
  if (!isDragging.value) return;
  tmpValue.value = getValueFromBarX(e.clientX);
}

function onDragEnd() {
  isDragging.value = false;
  document.removeEventListener('mousemove', onDragMove);
  document.removeEventListener('mouseup', onDragEnd);
  if (value.value !== tmpValue.value) value.value = tmpValue.value;
}

// Incrémentation/décrémentation via clavier
function incrementStep() {
  if (props.disabled) return;
  tmpValue.value = clampToRange((tmpValue.value ?? min.value) + step.value);
  value.value = tmpValue.value;
  showTooltipOnKeypress();
}
function decrementStep() {
  if (props.disabled) return;
  tmpValue.value = clampToRange((tmpValue.value ?? min.value) - step.value);
  value.value = tmpValue.value;
  showTooltipOnKeypress();
}

// Affiche le tooltip temporairement au clavier
let showTooltipTimeout: ReturnType<typeof setTimeout> | null = null;
function showTooltipOnKeypress() {
  if (props.showTooltip) {
    if (showTooltipTimeout) clearTimeout(showTooltipTimeout);
    showTooltipFromKeypress.value = true;
    showTooltipTimeout = setTimeout(() => {
      showTooltipFromKeypress.value = false;
    }, 1000);
  }
}
/* ------------------------------- \Drag Logic ------------------------------ */

function handleClick(event: MouseEvent) {
  if (!props.disabled) {
    emit('click', event);
  }
}
</script>

<template>
  <FbdsInput
    :title
    :status
  >
    <div :class="inputRangeClasses">
      <div
        class="flex items-center rounded-[inherit] h-full"
        :class="focusVisibleClass"
      >
        <template v-if="slots.prepend">
          <slot name="prepend" />
          <hr
            class="h-2/3 w-px border-none border-0 shrink-0"
            :class="hrBgClass"
          />
        </template>

        <div
          class="relative flex flex-nowrap items-center gap-1 px-3 grow h-full"
          :class="cursorClass"
          @mousedown.prevent
          @click="handleClick"
        >
          <FbdsIcon
            v-if="prependIcon"
            :icon="prependIcon"
            class="mr-2"
            :class="prependIconClass"
          />

          <div
            id="range-input"
            ref="inputBar"
            class="grow py-4 outline-none"
            :class="cursorClass"
            :tabindex="0"
            @mousedown="onDragStart"
            @keydown.left="decrementStep"
            @keydown.right="incrementStep"
          >
            <div class="relative h-2 w-full bg-fbds-surface-elevation-neutral-medium rounded-full">
              <div
                class="h-full rounded-full"
                :class="barFillClass"
                :style="{ width: `${(((tmpValue ?? min) - min) / (max - min)) * 100}%` }"
              />

              <div class="absolute top-0 left-0 h-full w-full">
                <div
                  ref="trigger"
                  :class="pinClass"
                  :style="{ left: `calc((100% - 8px) * ${((tmpValue ?? min) - min) / (max - min)} - 6px)` }"
                />
              </div>

              <template v-if="showSteps">
                <div
                  v-for="s in steps + 1"
                  :key="s"
                  class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-1 rounded-full pointer-events-none"
                  :class="stepClass(s)"
                  :style="{
                    left: `min(calc((100% - 8px) * ${((s - 1) / steps) * ((steps * step) / (max - min))} + 4px), 100%)`,
                  }"
                />
              </template>
            </div>
          </div>

          <FbdsIcon
            v-if="appendIcon"
            :icon="appendIcon"
            class="ml-2"
            :class="appendIconClass"
          />
        </div>

        <template v-if="slots.append">
          <hr
            class="h-2/3 w-px border-none border-0 shrink-0"
            :class="hrBgClass"
          />
          <slot name="append" />
        </template>
      </div>

      <FbdsTooltip
        v-if="showTooltip"
        ref="tooltip"
        :trigger
        :positioning="Positioning.Top"
        :always-show="isDragging || showTooltipFromKeypress"
        class="bg-fbds-base-primary! text-fbds-on-base-primary!"
      >
        {{ tmpValue ?? min }}
      </FbdsTooltip>
    </div>
  </FbdsInput>
</template>
