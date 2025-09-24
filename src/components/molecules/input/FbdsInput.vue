<script setup lang="ts">
import { StatusTheme } from '@/constants/theme';

import FbdsTruncableText from '@/components/subatoms/truncableText/FbdsTruncableText.vue';

withDefaults(
  defineProps<{
    title: string;
    status?: {
      label?: string;
      value?: string;
      theme?: StatusTheme;
    };
  }>(),
  {
    status: undefined,
  },
);
</script>

<template>
  <div class="flex flex-col w-full gap-1">
    <FbdsTruncableText
      class="fbds-font-title-small"
      :text="title"
    />
    <slot />
    <div
      v-if="status"
      class="flex flex-nowrap fbds-font-body-small"
      :class="`text-fbds-${status.theme ?? StatusTheme.Neutral}`"
    >
      <FbdsTruncableText
        v-if="status.label"
        class="flex-1"
        :text="status.label"
        :truncate-at-line="3"
      />
      <FbdsTruncableText
        v-if="status.value"
        class="flex-1 text-right"
        :text="status.value"
        :truncate-at-line="3"
      />
    </div>
  </div>
</template>
