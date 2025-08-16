<script setup lang="ts">
import FbdsColorCard from '@/components/subatoms/color/FbdsColorCard.vue';
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1 class="fbds-font-title-large border-b border-fbds-border-medium">
      Base
    </h1>
    <FbdsColorCard
      label="Surface"
      background="bg-fbds-base-surface"
      :foregrounds="[
        'bg-fbds-on-base-surface-low',
        'bg-fbds-on-base-surface-medium',
        'bg-fbds-on-base-surface-high',
      ]"
    />
    <FbdsColorCard
      label="Primary"
      background="bg-fbds-base-primary"
      :foregrounds="['bg-fbds-on-base-primary']"
    />
    <FbdsColorCard
      label="Alert"
      background="bg-fbds-base-alert"
      :foregrounds="['bg-fbds-on-base-alert']"
    />
    <FbdsColorCard
      label="Warning"
      background="bg-fbds-base-warning"
      :foregrounds="['bg-fbds-on-base-warning']"
    />
    <FbdsColorCard
      label="Success"
      background="bg-fbds-base-success"
      :foregrounds="['bg-fbds-on-base-success']"
    />
    <FbdsColorCard
      label="Info"
      background="bg-fbds-base-info"
      :foregrounds="['bg-fbds-on-base-info']"
    />
    <FbdsColorCard
      label="Disable"
      background="bg-fbds-base-disable"
      :foregrounds="['bg-fbds-on-base-disable']"
    />

    <h1 class="fbds-font-title-large border-b border-fbds-border-medium">
      Container
    </h1>
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

    <h1 class="fbds-font-title-large border-b border-fbds-border-medium">
      Surface elevation
    </h1>
    <FbdsColorCard
      label="Neutral lowest"
      background="bg-fbds-surface-elevation-neutral-lowest"
    />
    <FbdsColorCard
      label="Neutral low"
      background="bg-fbds-surface-elevation-neutral-low"
    />
    <FbdsColorCard
      label="Neutral medium"
      background="bg-fbds-surface-elevation-neutral-medium"
    />
    <FbdsColorCard
      label="Neutral high"
      background="bg-fbds-surface-elevation-neutral-high"
    />
    <FbdsColorCard
      label="Neutral highest"
      background="bg-fbds-surface-elevation-neutral-highest"
    />

    <FbdsColorCard
      label="Primary lowest"
      background="bg-fbds-surface-elevation-primary-lowest"
    />
    <FbdsColorCard
      label="Primary low"
      background="bg-fbds-surface-elevation-primary-low"
    />
    <FbdsColorCard
      label="Primary medium"
      background="bg-fbds-surface-elevation-primary-medium"
    />
    <FbdsColorCard
      label="Primary high"
      background="bg-fbds-surface-elevation-primary-high"
    />
    <FbdsColorCard
      label="Primary highest"
      background="bg-fbds-surface-elevation-primary-highest"
    />

    <h1 class="fbds-font-title-large border-b border-fbds-border-medium">
      Border
    </h1>
    <FbdsColorCard
      label="Low"
      background="bg-fbds-border-low"
    />
    <FbdsColorCard
      label="Medium"
      background="bg-fbds-border-medium"
    />
    <FbdsColorCard
      label="High"
      background="bg-fbds-border-high"
    />

    <h1 class="fbds-font-title-large border-b border-fbds-border-medium">
      Overlay
    </h1>
    <FbdsColorCard
      label="-"
      background="bg-fbds-overlay"
    />
  </div>
</template>
