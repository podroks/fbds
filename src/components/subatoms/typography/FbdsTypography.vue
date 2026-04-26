<script setup lang="ts">
import FbdsTypographyCard from '@/components/subatoms/typography/FbdsTypographyCard.vue';
</script>

<template>
  <div class="flex flex-col gap-6 w-full">
    <h1 class="fbds-font-title-large border-b border-fbds-border">Display</h1>
    <FbdsTypographyCard font="display-large" />
    <FbdsTypographyCard font="display-medium" />
    <FbdsTypographyCard font="display-small" />

    <h1 class="fbds-font-title-large border-b border-fbds-border">Headline</h1>
    <FbdsTypographyCard font="headline-large" />
    <FbdsTypographyCard font="headline-medium" />
    <FbdsTypographyCard font="headline-small" />

    <h1 class="fbds-font-title-large border-b border-fbds-border">Title</h1>
    <FbdsTypographyCard font="title-large" />
    <FbdsTypographyCard font="title-medium" />
    <FbdsTypographyCard font="title-small" />

    <h1 class="fbds-font-title-large border-b border-fbds-border">Label</h1>
    <FbdsTypographyCard font="label-large-prominent" />
    <FbdsTypographyCard font="label-large" />
    <FbdsTypographyCard font="label-medium-prominent" />
    <FbdsTypographyCard font="label-medium" />

    <h1 class="fbds-font-title-large border-b border-fbds-border">Body</h1>
    <FbdsTypographyCard font="body-large" />
    <FbdsTypographyCard font="body-medium" />
    <FbdsTypographyCard font="body-small" />
  </div>
</template>
