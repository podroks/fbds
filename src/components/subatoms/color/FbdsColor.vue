<script setup lang="ts">
import FbdsColorCard from '@/components/subatoms/color/FbdsColorCard.vue';
</script>

<template>
  <div class="flex flex-col gap-6 w-full">
    <h1 class="fbds-font-heading-lg border-b border-fbds-border">Surface</h1>
    <FbdsColorCard
      label="Background"
      background="bg-fbds-background"
    />
    <FbdsColorCard
      label="Surface"
      background="bg-fbds-surface"
      :foregrounds="[
        'bg-fbds-on-surface-contrast-low',
        'bg-fbds-on-surface-contrast-medium',
        'bg-fbds-on-surface-contrast-high',
      ]"
    />
    <FbdsColorCard
      label="Surface 1"
      background="bg-fbds-surface-1"
      :foregrounds="[
        'bg-fbds-on-surface-contrast-low',
        'bg-fbds-on-surface-contrast-medium',
        'bg-fbds-on-surface-contrast-high',
      ]"
    />

    <h1 class="fbds-font-heading-lg border-b border-fbds-border">Base</h1>
    <FbdsColorCard
      label="Primary"
      background="bg-fbds-primary"
      :foregrounds="['bg-fbds-on-primary']"
    />
    <FbdsColorCard
      label="Alert"
      background="bg-fbds-alert"
      :foregrounds="['bg-fbds-on-alert']"
    />
    <FbdsColorCard
      label="Warning"
      background="bg-fbds-warning"
      :foregrounds="['bg-fbds-on-warning']"
    />
    <FbdsColorCard
      label="Success"
      background="bg-fbds-success"
      :foregrounds="['bg-fbds-on-success']"
    />
    <FbdsColorCard
      label="Info"
      background="bg-fbds-info"
      :foregrounds="['bg-fbds-on-info']"
    />
    <FbdsColorCard
      label="Disable"
      background="bg-fbds-disable"
      :foregrounds="['bg-fbds-on-disable']"
    />

    <h1 class="fbds-font-heading-lg border-b border-fbds-border">Container</h1>
    <FbdsColorCard
      label="Primary"
      background="bg-fbds-container-primary"
      :foregrounds="['bg-fbds-on-container-primary']"
    />
    <FbdsColorCard
      label="Alert"
      background="bg-fbds-container-alert"
      :foregrounds="['bg-fbds-on-container-alert']"
    />
    <FbdsColorCard
      label="Warning"
      background="bg-fbds-container-warning"
      :foregrounds="['bg-fbds-on-container-warning']"
    />
    <FbdsColorCard
      label="Success"
      background="bg-fbds-container-success"
      :foregrounds="['bg-fbds-on-container-success']"
    />
    <FbdsColorCard
      label="Info"
      background="bg-fbds-container-info"
      :foregrounds="['bg-fbds-on-container-info']"
    />
    <FbdsColorCard
      label="Accent 1"
      background="bg-fbds-container-accent-1"
      :foregrounds="['bg-fbds-on-container-accent-1']"
    />
    <FbdsColorCard
      label="Accent 2"
      background="bg-fbds-container-accent-2"
      :foregrounds="['bg-fbds-on-container-accent-2']"
    />
    <FbdsColorCard
      label="Accent 3"
      background="bg-fbds-container-accent-3"
      :foregrounds="['bg-fbds-on-container-accent-3']"
    />
    <FbdsColorCard
      label="Accent 4"
      background="bg-fbds-container-accent-4"
      :foregrounds="['bg-fbds-on-container-accent-4']"
    />

    <h1 class="fbds-font-heading-lg border-b border-fbds-border">Border</h1>
    <FbdsColorCard
      label="Border"
      background="bg-fbds-border"
    />

    <h1 class="fbds-font-heading-lg border-b border-fbds-border">Overlay</h1>
    <FbdsColorCard
      label="-"
      background="bg-fbds-overlay"
    />
  </div>
</template>
