<script setup lang="ts">
import { Icon } from '@/constants/icon';

import FbdsIcon from '@/components/subatoms/icon/FbdsIcon.vue';

const checked = defineModel<boolean>('checked', { required: true });
const props = withDefaults(
  defineProps<{
    name: string;
    label?: string;
    undetermined?: boolean;
    disabled?: boolean;
  }>(),
  {
    label: undefined,
    undetermined: false,
    disabled: false,
  },
);

function handleClick() {
  if (!props.disabled) {
    checked.value = !checked.value;
  }
}
</script>

<template>
  <div
    class="flex flex-nowrap items-center gap-1 fbds-font-label-medium rounded-full"
    :class="disabled ? 'cursor-not-allowed text-fbds-on-base-disable' : 'cursor-pointer text-fbds-on-base-surface-high'"
    @click="handleClick"
  >
    <input
      class="absolute invisible pointer-events-none"
      type="checkbox"
      :name
      :checked
    />
    <div
      class="relative rounded-full p-1"
      :class="{
        'hover:bg-fbds-state-layer-base-primary-hover active:bg-fbds-state-layer-base-primary-press': !disabled,
      }"
    >
      <FbdsIcon
        :icon="Icon.farSquare"
        size="size-6"
      />
      <Transition
        enter-active-class="transition duration-150 ease-in-out"
        enter-from-class="opacity-0 scale-50"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in-out"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <FbdsIcon
          v-if="checked"
          :icon="undetermined ? Icon.fasSquareMinus : Icon.fasSquareCheck"
          size="size-6"
          class="absolute top-1 left-1"
          :class="disabled ? 'text-fbds-on-base-disable' : 'text-fbds-base-primary'"
        />
      </Transition>
    </div>
    <label
      v-if="label"
      :for="name"
      class="pr-2 pointer-events-none"
    >
      {{ label }}
    </label>
  </div>
</template>
