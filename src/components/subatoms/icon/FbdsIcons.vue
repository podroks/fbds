<script setup lang="ts">
import { Icon } from '@/constants/icon';

import FbdsIcon from '@/components/subatoms/icon/FbdsIcon.vue';

const group = [
  { prefix: 'fas', label: 'Solid' },
  { prefix: 'far', label: 'Regular' },
  { prefix: 'fab', label: 'Brend' },
  { prefix: 'fac', label: 'Custom' },
];
</script>

<template>
  <div class="flex flex-col gap-6 w-full">
    <template
      v-for="{ prefix, label } in group"
      :key="prefix"
    >
      <h1 class="fbds-font-title-large border-b border-fbds-border-medium">
        {{ label }}
      </h1>

      <div class="flex flex-wrap gap-4">
        <FbdsIcon
          v-for="[key, icon] in Object.entries(Icon).filter(([key]) => key.match(new RegExp(`^${prefix}`, 'g')))"
          :key
          :icon
          class="rounded-xs"
          :tabindex="1"
        />
      </div>
    </template>
  </div>
</template>
