<script setup lang="ts">
import FbdsTypographyCard from '@/components/subatoms/typography/FbdsTypographyCard.vue';
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1 class="fbds-font-title-large border-b border-fbds-border-medium">Display</h1>
    <FbdsTypographyCard font="display-large" />
    <FbdsTypographyCard font="display-medium" />
    <FbdsTypographyCard font="display-small" />

    <h1 class="fbds-font-title-large border-b border-fbds-border-medium">Headline</h1>
    <FbdsTypographyCard font="headline-large" />
    <FbdsTypographyCard font="headline-medium" />
    <FbdsTypographyCard font="headline-small" />

    <h1 class="fbds-font-title-large border-b border-fbds-border-medium">Title</h1>
    <FbdsTypographyCard font="title-large" />
    <FbdsTypographyCard font="title-medium" />
    <FbdsTypographyCard font="title-small" />

    <h1 class="fbds-font-title-large border-b border-fbds-border-medium">Label</h1>
    <FbdsTypographyCard font="label-large-prominent" />
    <FbdsTypographyCard font="label-large" />
    <FbdsTypographyCard font="label-medium-prominent" />
    <FbdsTypographyCard font="label-medium" />

    <h1 class="fbds-font-title-large border-b border-fbds-border-medium">Body</h1>
    <FbdsTypographyCard font="body-large" />
    <FbdsTypographyCard font="body-medium" />
    <FbdsTypographyCard font="body-small" />
  </div>
</template>
