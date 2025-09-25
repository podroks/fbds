<script setup lang="ts">
import { computed, ref } from 'vue';

import { Icon } from '@/constants/icon';
import { StatusTheme, type Theme } from '@/constants/theme';

import FbdsInput from '@/components/molecules/input/FbdsInput.vue';
import FbdsIcon from '@/components/subatoms/icon/FbdsIcon.vue';

const value = defineModel<string>('value', { default: '' });

const props = withDefaults(
  defineProps<{
    id: string;
    title: string;
    placeholder?: string;
    status?: {
      label?: string;
      value?: string;
      theme?: StatusTheme;
    };
    rows?: number;
    resizable?: boolean;
    disabled?: boolean;
    prependIcon?: Icon;
    prependIconTheme?: Exclude<Theme, 'base-disable'>;
  }>(),
  {
    placeholder: '',
    status: undefined,
    rows: 1,
    resizable: false,
    disabled: false,
    prependIcon: undefined,
    prependIconTheme: undefined,
  },
);

const slots = defineSlots<{
  prepend?: () => void;
  append?: () => void;
}>();

const emit = defineEmits<{ click: [event: MouseEvent] }>();

const input = ref<HTMLInputElement | null>(null);
const focusVisibleClass =
  'has-[textarea:focus-visible]:outline-2 has-[textarea:focus-visible]:outline-fbds-base-primary has-[textarea:focus-visible]:outline-offset-2';

const outlineClass = computed<string>(() => {
  if (props.disabled) {
    return 'outline -outline-offset-1 outline-fbds-on-base-disable';
  }
  if (props.status?.theme && props.status.theme !== StatusTheme.Neutral) {
    return `outline -outline-offset-1 outline-fbds-${props.status.theme}`;
  }
  return 'outline -outline-offset-1 outline-fbds-border-medium';
});

const bgClass = computed<string>(() => (props.disabled ? 'bg-fbds-base-disable' : 'bg-fbds-base-surface'));

const textClass = computed<string>(() =>
  props.disabled ? 'text-fbds-on-base-disable' : 'text-fbds-on-base-surface-high',
);

const cursorClass = computed<string>(() => (props.disabled ? 'cursor-not-allowed' : 'cursor-text'));

const placeholderClass = computed<string>(() =>
  props.disabled ? 'placeholder:text-fbds-on-base-disable' : 'placeholder:text-fbds-on-base-surface-medium',
);

const hrBgClass = computed<string>(() => (props.disabled ? 'bg-fbds-on-base-disable' : 'bg-fbds-border-medium'));

const prependIconTextClass = computed<string | undefined>(() => {
  if (props.disabled) {
    return 'text-fbds-on-base-disable';
  }
  return props.prependIconTheme ? `text-fbds-${props.prependIconTheme}` : undefined;
});

const height = computed<string>(() => {
  if (props.rows && props.rows > 0) {
    return `${props.rows * 1.25 + 1.25}rem`;
  }
  return '2.5rem';
});

function handleClick(event: MouseEvent) {
  if (!props.disabled) {
    input.value?.focus();
    emit('click', event);
  }
}
</script>

<template>
  <FbdsInput
    :title
    :status
  >
    <div
      class="min-h-10 w-full rounded-md fbds-font-body-medium"
      :class="[outlineClass, bgClass, textClass, cursorClass]"
    >
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
        <label
          :for="id"
          class="relative flex flex-nowrap grow h-fit"
          :class="cursorClass"
          @mousedown.prevent
          @click="handleClick"
        >
          <FbdsIcon
            v-if="prependIcon"
            class="ml-3 mt-2.5"
            :icon="prependIcon"
            :class="prependIconTextClass"
          />
          <textarea
            :id
            ref="input"
            v-model="value"
            class="grow block focus-visible:outline-none w-10 py-2.5 pr-3 fbds-scrollbar min-h-10"
            :class="[placeholderClass, cursorClass, `h-[${height}]`, resizable ? 'resize-y' : 'resize-none']"
            :placeholder
            :rows
            :disabled
            @mousedown.stop
          />
        </label>

        <template v-if="slots.append">
          <hr
            class="h-2/3 w-px border-none border-0 shrink-0"
            :class="hrBgClass"
          />
          <slot name="append" />
        </template>
      </div>
    </div>
  </FbdsInput>
</template>

<style scoped>
textarea::-webkit-resizer {
  background: url('/resize-handle-light.svg') no-repeat center center !important;
  background-size: contain !important;
}

html[theme='dark'] textarea::-webkit-resizer {
  background: url('/resize-handle-dark.svg') no-repeat center center !important;
  background-size: contain !important;
}

textarea::-webkit-scrollbar-corner {
  background: transparent !important;
}
</style>
