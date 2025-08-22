import type { Meta, StoryObj } from '@storybook/vue3-vite';

import FbdsTypography from '@/components/subatoms/typography/FbdsTypography.vue';

const meta = {
  title: 'FBDS/Subatomes/Typographies',
  component: FbdsTypography,
  tags: ['!dev'],
} satisfies Meta<typeof FbdsTypography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Typography: Story = {};
