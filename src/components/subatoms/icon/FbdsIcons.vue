<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { reactive, ref } from 'vue';

import { Icon } from '@/constants/icon';

import FbdsIcon from '@/components/subatoms/icon/FbdsIcon.vue';
import FbdsTooltip from '@/components/atoms/tooltip/FbdsTooltip.vue';

const { copy } = useClipboard();

const copiedKey = ref<string | null>(null);
const triggers = reactive<Record<string, HTMLElement | null>>({});

const stateLayerClass =
  'rounded-[inherit] group-hover:bg-fbds-state-layer-high-hover group-active:bg-fbds-state-layer-high-press';

const icons = Object.entries(Icon);

async function handleCopy(key: string) {
  await copy(key);
  copiedKey.value = key;
  setTimeout(() => {
    if (copiedKey.value === key) copiedKey.value = null;
  }, 2000);
}
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <div
      v-for="[key, icon] in icons"
      :key
      :ref="
        (el) => {
          triggers[key] = el as HTMLElement | null;
        }
      "
      class="relative group cursor-pointer rounded-xs"
      @click="handleCopy(key)"
    >
      <div :class="stateLayerClass">
        <FbdsIcon
          :icon
          :size="5"
        />
      </div>
      <FbdsTooltip :trigger="triggers[key]">
        {{ copiedKey === key ? 'Copié !' : key }}
      </FbdsTooltip>
    </div>
  </div>
</template>
