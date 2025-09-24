<script setup lang="ts">
import { computed, ref } from 'vue';

import type { Icon } from '@/constants/icon';
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
    disabled?: boolean;
    prependIcon?: Icon;
    prependIconTheme?: Exclude<Theme, 'base-disable'>;
    appendIcon?: Icon;
    appendIconTheme?: Exclude<Theme, 'base-disable'>;
  }>(),
  {
    placeholder: '',
    status: undefined,
    disabled: false,
    prependIcon: undefined,
    appendIcon: undefined,
    prependIconTheme: undefined,
    appendIconTheme: undefined,
  },
);

const slots = defineSlots<{
  prepend?: () => void;
  append?: () => void;
}>();

const emit = defineEmits<{ click: [event: MouseEvent] }>();

const input = ref<HTMLInputElement | null>(null);
const focusVisibleClass =
  'has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-fbds-base-primary has-[input:focus-visible]:outline-offset-2';

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

const appendIconTextClass = computed<string | undefined>(() => {
  if (props.disabled) {
    return 'text-fbds-on-base-disable';
  }
  return props.appendIconTheme ? `text-fbds-${props.appendIconTheme}` : undefined;
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
      class="h-10 w-full rounded-md fbds-font-body-medium"
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
          class="flex flex-nowrap items-center gap-3 px-3 grow h-full"
          :class="cursorClass"
          @mousedown.prevent
          @click="handleClick"
        >
          <FbdsIcon
            v-if="prependIcon"
            :icon="prependIcon"
            :class="prependIconTextClass"
          />
          <input
            :id
            ref="input"
            v-model="value"
            type="text"
            class="grow focus-visible:outline-none w-10"
            :class="[placeholderClass, cursorClass]"
            :placeholder
            :disabled
            @mousedown.stop
          />
          <FbdsIcon
            v-if="appendIcon"
            :icon="appendIcon"
            :class="appendIconTextClass"
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
