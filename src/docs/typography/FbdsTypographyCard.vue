<script setup lang="ts">
import { computed, ref } from 'vue';

const FONT_WEIGHT_NAME = {
  100: 'Thin',
  200: 'ExtraLight',
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  600: 'SemiBold',
  700: 'Bold',
  800: 'ExtraBold',
  900: 'Black',
} as const;

const props = defineProps<{ font: string }>();

const preview = ref<HTMLDivElement | null>(null);

const fontWithoutPrefix = computed<string>(() => {
  const name = props.font.replace(/\w+-/, '').replace('-', ' ');
  return name.charAt(0).toUpperCase() + name.slice(1);
});

const fontProperties = computed<string>(() => {
  if (preview.value) {
    const { fontSize, lineHeight, letterSpacing, fontWeight } = getComputedStyle(preview.value);
    const fontWeightName = FONT_WEIGHT_NAME[Number(fontWeight) as keyof typeof FONT_WEIGHT_NAME];
    return `${fontSize} / ${lineHeight} / ${letterSpacing} / ${fontWeightName}`;
  }
  return '';
});
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <div class="basis-40 shrink-0">
      <span class="fbds-font-label-large-prominent text-fbds-on-base-surface-high">
        {{ fontWithoutPrefix }}
      </span>
    </div>
    <aside class="basis-40 grow gap-2 flex flex-col overflow-hidden">
      <div
        ref="preview"
        class="rounded-md shadow-md border border-fbds-border-high overflow-hidden text-center"
        :class="`fbds-font-${font}`"
      >
        {{ font }}
      </div>

      <span class="w-full px-3 text-center fbds-font-label-medium-prominent text-fbds-on-base-surface-low truncate">
        {{ fontProperties }}
      </span>
    </aside>
  </div>
</template>
