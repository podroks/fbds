<script setup lang="ts">
import { type ButtonProps, Contrast } from '@/constants/atoms/fbds-button';
import { Icon } from '@/constants/icon';

import FbdsButton from '@/components/atoms/button/FbdsButton.vue';
import FbdsIcon from '@/components/subatoms/icon/FbdsIcon.vue';
import FbdsTruncableText from '@/components/subatoms/truncableText/FbdsTruncableText.vue';

withDefaults(
  defineProps<{
    icon?: Icon;
    text?: string;
    truncateAtLine?: number;
    button?: ButtonProps;
  }>(),
  {
    icon: undefined,
    text: undefined,
    truncateAtLine: 0,
    button: undefined,
  },
);
</script>

<template>
  <div class="flex flex-col items-center gap-4 p-3">
    <div
      v-if="icon"
      class="size-14 bg-fbds-surface-elevation-neutral-medium text-fbds-on-base-surface-low rounded-full flex items-center justify-center"
    >
      <FbdsIcon
        :icon
        :size="10"
      />
    </div>
    <FbdsTruncableText
      v-if="text"
      class="fbds-font-body-medium"
      :text
      :truncate-at-line
    />
    <FbdsButton
      v-if="button"
      v-bind="button"
      :contrast="button?.contrast || Contrast.Secondary"
    />
  </div>
</template>
