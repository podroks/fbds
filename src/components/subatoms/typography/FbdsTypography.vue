<script setup lang="ts">
import FbdsTypographyCard from '@/components/subatoms/typography/FbdsTypographyCard.vue';
</script>

<template>
  <div class="flex flex-col gap-6 w-full">
    <h1 class="fbds-font-heading-md border-b border-fbds-border">Heading</h1>
    <FbdsTypographyCard font="heading-xl" />
    <FbdsTypographyCard font="heading-lg" />
    <FbdsTypographyCard font="heading-md" />

    <h1 class="fbds-font-heading-md border-b border-fbds-border">Button</h1>
    <FbdsTypographyCard font="button" />
    <FbdsTypographyCard font="button-sm" />

    <h1 class="fbds-font-heading-md border-b border-fbds-border">Link</h1>
    <FbdsTypographyCard font="link" />

    <h1 class="fbds-font-heading-md border-b border-fbds-border">Label</h1>
    <FbdsTypographyCard font="label-prominent" />
    <FbdsTypographyCard font="label" />
    <FbdsTypographyCard font="label-subtle" />

    <h1 class="fbds-font-heading-md border-b border-fbds-border">Body</h1>
    <FbdsTypographyCard font="body-prominent" />
    <FbdsTypographyCard font="body" />

    <h1 class="fbds-font-heading-md border-b border-fbds-border">Overline</h1>
    <FbdsTypographyCard font="overline" />
    <FbdsTypographyCard font="overline-dense" />

    <h1 class="fbds-font-heading-md border-b border-fbds-border">Caption</h1>
    <FbdsTypographyCard font="caption-prominent" />
    <FbdsTypographyCard font="caption" />
  </div>
</template>
