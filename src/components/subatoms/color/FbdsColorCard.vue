<script setup lang="ts">
import { type ComponentPublicInstance, computed, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    label: string;
    background: string;
    foregrounds?: string[];
  }>(),
  {
    foregrounds: () => [],
  },
);

const preview = ref<Record<string, HTMLDivElement | null>>({});

const hex = computed(() =>
  Object.fromEntries(
    Object.entries(preview.value).map(([k, v]) => [k, v ? rgbToHex(getComputedStyle(v).backgroundColor) : '']),
  ),
);

const rgbToHex = (css: string) => {
  const m = css.match(/\d+(\.\d+)?/g)?.map(Number);
  if (!m) return '';
  const [r, g, b, a] = m.map((n, i) => (i < 3 ? clamp(n, 0, 255) : clamp(n, 0, 1)));
  const toHex = (n: number | undefined) => n?.toString(16).padStart(2, '0') ?? '';
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${a !== undefined ? toHex(Math.round(a * 255)) : ''}`;
};

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

const handlePreviewRef = (el: Element | ComponentPublicInstance | null, color: string) =>
  (preview.value[color] = el as HTMLDivElement | null);

const getClassWithoutPrefix = (color: string) => color.replace(/^bg-fbds-/, '');

const isHexa = (hexa: string | undefined) => hexa && hexa.length > 7;

const hexToRgb = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
};

const relativeLuminance = ({ r, g, b }: { r: number; g: number; b: number }) => {
  const f = (v: number) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};

const contrastRatio = (h1: string, h2: string) => {
  const [l1, l2] = [h1, h2].map((c) => relativeLuminance(hexToRgb(c)));
  return (Math.max(l1!, l2!) + 0.05) / (Math.min(l1!, l2!) + 0.05);
};

const checkRGAA = (h1: string | undefined, h2: string | undefined) => {
  if (!h1 || !h2) {
    return { ratio: '' };
  }
  const ratio = contrastRatio(h1, h2);
  return { ratio: +ratio.toFixed(2), normalText: ratio >= 4.5, largeText: ratio >= 3 };
};
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <div class="basis-40 shrink-0">
      <span class="fbds-font-label-large-prominent text-fbds-on-base-surface-high">
        {{ props.label }}
      </span>
    </div>
    <aside class="basis-40 grow flex flex-wrap gap-2">
      <div
        v-for="(color, index) in [props.background, ...props.foregrounds]"
        :key="color"
        class="basis-40 grow flex flex-col overflow-hidden"
      >
        <div class="relative h-10 mb-2 rounded-md shadow-md border border-fbds-border-low overflow-hidden">
          <div class="absolute h-full w-full -z-10 striped-diag" />
          <div
            :ref="(el) => handlePreviewRef(el, color)"
            class="w-full"
            :class="[color, isHexa(hex[color]) ? 'h-1/2' : 'h-full']"
          />
        </div>

        <span class="w-full px-3 text-center fbds-font-label-medium-prominent text-fbds-on-base-surface-low truncate">
          {{ getClassWithoutPrefix(color) }}
        </span>
        <span
          v-if="hex[color]"
          class="w-full px-3 text-center fbds-font-label-large text-fbds-on-base-surface-medium uppercase"
        >
          {{ hex[color] }}
        </span>
        <span
          v-if="index > 0 && hex[color] && hex[props.background]"
          class="self-center rounded-full px-2 text-center fbds-font-label-medium border"
          :class="
            checkRGAA(hex[props.background], hex[color]).normalText
              ? 'text-fbds-base-success border-fbds-base-success'
              : 'text-fbds-base-alert border-fbds-base-alert'
          "
        >
          {{ checkRGAA(hex[props.background], hex[color]).ratio }}
        </span>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.striped-diag {
  --stripe-color: #ffbbbb;
  --stripe-size: 20px;
  --stripe-thickness: 3px;
  background-image: repeating-linear-gradient(
    45deg,
    var(--stripe-color) 0,
    var(--stripe-color) var(--stripe-thickness),
    transparent var(--stripe-thickness),
    transparent var(--stripe-size)
  );
}
</style>
