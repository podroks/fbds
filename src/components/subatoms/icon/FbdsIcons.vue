<script setup lang="ts">
import { Icons } from '@/constants/icons';

import FbdsIcon from '@/components/subatoms/icon/FbdsIcon.vue';

const group = [
  { prefix: 'fas', label: 'Solid' },
  { prefix: 'far', label: 'Regular' },
  { prefix: 'fab', label: 'Brend' },
  { prefix: 'fac', label: 'Custom' },
];
</script>

<template>
  <div class="flex flex-col gap-6">
    <template
      v-for="{ prefix, label } in group"
      :key="prefix"
    >
      <h1 class="fbds-font-title-large border-b border-fbds-border-medium">
        {{ label }}
      </h1>

      <div class="flex flex-wrap gap-4">
        <FbdsIcon
          v-for="[key, icon] in Object.entries(Icons).filter(([key]) => key.match(new RegExp(`^${prefix}`, 'g')))"
          :key
          :icon
        />
      </div>
    </template>
  </div>
</template>
